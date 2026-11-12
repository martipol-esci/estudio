/* Chat de la portada. NO es una IA: entiende unas cuantas clases de pregunta y responde con lo que ya hay en la web.
   - Tareas, exámenes, horario y notas: de datos.js + cal.js (incluye lo que el usuario añade o edita en el calendario).
   - Temario y ejercicios: carga cada asignatura (business.html, communication.html, francais.html) en un iframe oculto
     y lee de ahí sus datos (T, MC, WR, EX, C…), así el chat siempre está al día con lo que tenga cada página.
   La conversación se guarda en este dispositivo (localStorage «hub-chat»). */
(function () {
'use strict';
const box = document.getElementById('chat'); if (!box) return;
const log = box.querySelector('.log'), form = box.querySelector('form'), inp = form.querySelector('input');
const K = 'hub-chat';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = s => String(s == null ? '' : s).replace(/<[^>]+>/g, ' ');
const norm = s => strip(s).toLowerCase().replace(/œ/g, 'oe').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9%]+/g, ' ').trim();
const P = s => ' ' + norm(s) + ' ';
const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);

const SUBJ = {
  business: { pag: 'business.html', nombre: 'Business Organization', emoji: '📊', re: /\b(business|bussines|bussiness|busines|organization)\b/ },
  communication: { pag: 'communication.html', nombre: 'Communication Techniques', emoji: '🗣️', re: /\b(communication|comunication|comunicacion|techniques)\b/ },
  francais: { pag: 'francais.html', nombre: 'Français A1', emoji: '🇫🇷', re: /\b(frances|francais|french)\b/ }
};
const IDS = Object.keys(SUBJ);
let ctx = {};          /* último tema del que se ha hablado: {asig, ti, si} */
let EX = null, sid = 0, PEND = '';
/* IA: solo existe cuando la página se abre como artefacto de claude.ai (window.claude). En la web normal SAMPLE queda en null y el chat funciona sin IA. */
let SAMPLE = null, TURNS = [], CTL = null, STICKY = '';
try { if (window.claude && window.claude.use) window.claude.use('sample').then(s => { SAMPLE = s || null; document.querySelectorAll('.iab').forEach(b => { b.textContent = s ? '✨ IA activada' : 'IA no disponible aquí: funciona sin IA'; b.classList.toggle('off', !s) }) }) } catch (e) {}

/* ================= carga de asignaturas ================= */
const LOADING = {};
function load(id) {
  return LOADING[id] || (LOADING[id] = new Promise((ok, ko) => {
    const f = document.createElement('iframe'); f.hidden = true; f.tabIndex = -1; f.setAttribute('aria-hidden', 'true'); f.src = SUBJ[id].pag;
    f.onload = () => { try { ok(build(id, f.contentWindow)) } catch (e) { ko(e) } }; f.onerror = ko; document.body.appendChild(f);
    setTimeout(() => ko(new Error('La asignatura ' + id + ' no ha cargado a tiempo')), 15000);
  }));
}
const loadAll = () => Promise.all(IDS.map(load));
function secText(s) { return [(s.k || []).map(x => x.join(' ')).join(' '), (s.tbl || []).map(r => r.join(' ')).join(' '), (s.f || []).join(' '), s.ej || '', s.tr || ''].join(' ') }
function build(id, w) {
  const g = x => w.eval(x), D = { id, w, idx: [] };
  if (id === 'francais') {
    D.fnorm = g('norm'); D.num = g('num'); D.C = g('C'); D.QG = g('QG'); D.CJ = g('CJ'); D.VOC = g('VOC'); D.VER = g('VER'); D.conjER = g('conjER');
    const secs = g('learnSecs()'), GR = g('GR');
    D.T = GR.map(x => ({ n: '', t: x[0], d: '', s: [] })); const rest = { n: '', t: 'Otros', d: '', s: [] };
    secs.forEach(h => {
      const t = (h.match(/<h3 class="rt">(.*?)<\/h3>/) || [])[1] || ''; let done = false;
      for (let i = 0; i < GR.length && !done; i++) { const r = GR[i][1].findIndex(x => x.test(t)); if (r >= 0) { D.T[i].s.push({ h: t, html: h.replace(/ onclick="[^"]*"/g, ''), r }); done = true } }
      if (!done) rest.s.push({ h: t, html: h.replace(/ onclick="[^"]*"/g, ''), r: 0 });
    });
    /* resumen en castellano (los apuntes antiguos de la página) para los apartados que lo tienen */
    let TH = []; try { TH = g('TH') } catch (e) {}
    const ES = [[/possessifs|articles ind/i, /Mon \/ ma/], [/TU ou VOUS/i, /^Tu o vous/], [/saluer|informations personnelles/i, /^Saludar/], [/À, DANS, CHEZ/i, /^Lugares/], [/famille/i, /^Familia/], [/nationalités|professions$/i, /^Nacionalidades/], [/écrit/i, /^Deletreo/]];
    D.T.forEach(x => x.s.forEach(s => { const m = ES.find(e => e[0].test(s.h)), th = m && TH.find(t => m[1].test(t[0])); if (th) s.es = th[1] }));
    D.T.forEach(x => x.s.sort((a, b) => a.r - b.r)); if (rest.s.length) D.T.push(rest); D.T = D.T.filter(x => x.s.length);
  } else {
    D.T = g('T');
    const mc = q => ({ type: 'mc', t: q[0], q: q[1], o: q[2], a: q[3], e: q[4] });
    D.mc = g('MC').map(mc);
    if (id === 'business') {
      D.fmc = g('FMC').map(q => Object.assign(mc(q), { fx: 1 }));
      D.wr = g('WR').map(q => ({ type: 'wr', t: q[0], q: q[1], k: q[2], m: q[3] }));
      D.calc = g('CALC');
    } else D.ex = g('EX').map(q => Object.assign({ type: 'wr', comm: 1 }, q));
    try { D.rec = g('rec') } catch (e) {}
  }
  D.T.forEach((tp, ti) => {
    D.idx.push({ k: 'topic', ti, a: P(tp.n + ' ' + tp.t), c: '', b: P(tp.d) });
    tp.s.forEach((s, si) => D.idx.push({ k: 'sec', ti, si, a: P(s.h), c: P((s.k || []).map(x => x[0]).join(' ')), b: P(s.html || secText(s)) }));
  });
  return D;
}

/* ================= búsqueda en el temario ================= */
const STOP = new Set(('a al algo algun alguna algunos algunas ante asi aun aunque bien cada como con cual cuales cuando de del desde donde dos e el ella ellos en entre era es esa ese eso esos esta este esto estos estoy fue ha hay he la las le les lo los mas me mi mis mucho muy no nos o os otra otro para pero poco por porque que quien se sea ser si sin sobre solo son su sus tambien te ti tiene tengo todo toda todos todas tu tus un una uno unos unas va y ya ' +
  'tema temas temario teoria apartado apartados parte partes punto explica explicame explicar explicas explicacion dime dame ponme pon pone ponerme quiero queria quisiera necesito puedes podrias ensename ensenar muestrame muestra mostrar resumen resume resumeme repasar repaso repasa estudiar estudio ver saber significa significado duda dudas entiendo entender acerca hablame cuentame ' +
  'ejercicio ejercicios pregunta preguntas preguntame practicar practica practico test tests tipo tipos quiz centrandose centrado centrados centrate centrandote prepara preparame preparar hazme haz hacer examen examenes simulacro asignatura clase ' +
  'business bussines bussiness busines organization communication comunication techniques frances francais french ' +
  'desarrollo casos caso traduccion formulas formula calculo calculos escritas escrita cortas largas sobre mismo eso esto favor porfa gracias hola').split(' '));
const ALIAS = [[/^posesiv/, 'possessif'], [/^verbo/, 'verbe'], [/^numero/, 'nombre'], [/^pais/, 'pays'], [/^nacionalidad/, 'nationalit'], [/^profesi/, 'profession'], [/^familia/, 'famille'],
  [/^gusto/, 'gouts'], [/^habito/, 'habitude'], [/^negac|^negativ/, 'negative'], [/^salud/, 'saluer'], [/^tonic/, 'tonique'], [/^articulo/, 'article'], [/^preposic/, 'preposition'],
  [/^fecha/, 'date'], [/^deletre/, 'ecrit'], [/^objeto/, 'vocabulaire'], [/^sector/, 'secteur'], [/^cortesia/, 'politesse'], [/^conjug/, 'conjugaison'], [/^maleta/, 'valise'], [/^avion/, 'avion']];
function toks(text) {
  return norm(text).split(' ').filter(w => w && !STOP.has(w) && !/^\d+$/.test(w) && !/^t\d+$/.test(w)).map(w => {
    const st = w.length >= 7 ? w.slice(0, -2) : w.length >= 5 ? w.slice(0, -1) : w.length <= 3 ? w + ' ' : w, alts = [st];
    ALIAS.forEach(([re, a]) => { if (re.test(w)) alts.push(a) }); return alts;
  });
}
function score(e, T) {
  let sc = 0, hit = 0;
  T.forEach(t => { const m = f => t.some(a => f.includes(' ' + a)); if (m(e.a)) { sc += 6; hit++ } else if (m(e.c)) { sc += 4; hit++ } else if (m(e.b)) { sc += 1.5; hit++ } });
  if (hit === T.length && T.length > 1) sc *= 1.4; return { sc, hit };
}
/* busca en las asignaturas dadas; devuelve los mejores resultados */
function find(Ds, T) {
  if (!T.length) return [];
  const R = [];
  Ds.forEach(D => D.idx.forEach(e => { const r = score(e, T); if (r.sc >= 4 || (r.hit === T.length && r.sc >= 3)) R.push({ D, e, sc: r.sc }) }));
  return R.sort((a, b) => b.sc - a.sc);
}
function topicRef(n, D) { /* «tema 3», «T3», «OPS» */
  const m = n.match(/\b(?:tema|topic|t) ?(\d+)\b/); let code = m ? 'T' + m[1] : /\bops\b/.test(n) ? 'OPS' : null;
  if (!code) return -1; return D.T.findIndex(x => x.n === code);
}
const hasTopicRef = n => /\b(?:tema|topic|t) ?\d+\b|\bops\b/.test(n);

/* ================= pintar ================= */
function secHTML(s) {
  if (s.html) return `<div class="fra">${s.es ? `<div class="short"><b>En castellano:</b> ${s.es}</div>` : ''}${s.html}</div>`;
  let h = `<h4>${s.h}</h4>`;
  if (s.k && s.k.length) h += `<ul>${s.k.map(([a, b]) => `<li><b>${a}</b>${b ? ': ' + b : ''}</li>`).join('')}</ul>`;
  if (s.tbl) h += `<div class="tw"><table>${s.tbl.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</table></div>`;
  (s.f || []).forEach(x => h += `<div class="fx">${x}</div>`);
  if (s.ej) h += `<div class="ej"><b>Ejemplo:</b> ${s.ej}</div>`;
  if (s.tr) h += `<div class="tr">⚠️ ${s.tr}</div>`;
  return `<div class="sec">${h}</div>`;
}
const tName = (D, ti) => (D.T[ti].n ? D.T[ti].n + ' · ' : '') + D.T[ti].t;
const btn = (cmd, label, cls) => `<button class="${cls || 'chip'}" data-cmd="${esc(cmd)}">${label}</button>`;
const sayb = t => `<button class="chip" data-say="${esc(t)}">${esc(t)}</button>`;
function add(who, html, keep) {
  const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = html; log.appendChild(d); modo();
  if (!keep) log.scrollTop = Math.max(0, (who === 'yo' ? d.offsetTop : (d.previousElementSibling && d.previousElementSibling.classList.contains('yo') ? d.previousElementSibling : d).offsetTop) - 10);
  save(); return d;
}
/* sin mensajes: portada con «Hola, Martí» y el buscador; con mensajes: solo la conversación, desde arriba */
function modo() { document.body.classList.toggle('chatting', log.children.length > 0) }
function save() {
  const L = [...log.children].filter(x => !x.classList.contains('tmp')).map(x => [x.className, x.innerHTML]);
  for (const n of [60, 25, 8]) { try { localStorage.setItem(K, JSON.stringify({ L: L.slice(-n), ctx, T: TURNS.slice(-12), S: STICKY })); return } catch (e) {} }
}
function welcome() {
  add('bot', `<p><b>¡Hola, Martí!</b> Pregúntame por tus tareas, pídeme una parte del temario o que te ponga ejercicios.</p>
  <p class="mut">No soy una IA: busco en el temario, los ejercicios y el calendario de esta web. Escribe con palabras clave y te entenderé mejor.</p>
  <div class="row">${['¿Qué tengo para hoy?', '¿Qué tengo esta semana?', '¿Cuándo es el próximo examen?', 'Temario de Business', 'Explícame moral hazard', 'Ejercicios tipo test de Communication', 'Ejercicios de francés: posesivos', 'Conjuga être'].map(sayb).join('')}</div>`);
}

/* ================= temario ================= */
function showTopics(D) {
  add('bot', `<p>${SUBJ[D.id].emoji} <b>${SUBJ[D.id].nombre}</b> — elige un tema:</p><div class="col">${D.T.map((t, i) => btn(`topic|${D.id}|${i}`, tName(D, i), 'chip wide')).join('')}</div>`);
}
function showTopic(D, ti) {
  const t = D.T[ti]; ctx = { asig: D.id, ti };
  add('bot', `<p>${SUBJ[D.id].emoji} <b>${tName(D, ti)}</b>${t.d ? `<br><span class="mut">${t.d}</span>` : ''}</p><p class="mut">Elige el apartado que quieras ver:</p>
  <div class="col">${t.s.map((s, i) => btn(`sec|${D.id}|${ti}|${i}`, strip(s.h), 'chip wide')).join('')}</div>
  <div class="row">${btn(`full|${D.id}|${ti}`, '📖 Ver el tema entero')}${btn(`ex|${D.id}|${ti}`, '✍️ Ejercicios de este tema')}</div>`);
}
function showFull(D, ti) {
  ctx = { asig: D.id, ti };
  add('bot', `<p>${SUBJ[D.id].emoji} <b>${tName(D, ti)}</b></p>${D.T[ti].s.map(secHTML).join('')}<div class="row">${btn(`ex|${D.id}|${ti}`, '✍️ Ejercicios de este tema')}</div>`);
}
function showSec(D, ti, si, T, others) {
  const s = D.T[ti].s[si]; ctx = { asig: D.id, ti, si };
  let pre = '';
  if (T && T.length && s.k) { /* si preguntan por un concepto concreto, primero la respuesta corta */
    const c = s.k.find(x => { const f = P(x[0]); return T.every(t => t.some(a => f.includes(' ' + a))) });
    if (c) pre = `<p class="short"><b>${c[0]}</b>${c[1] ? ': ' + c[1] : ''}</p><p class="mut">Está en este apartado:</p>`;
  }
  add('bot', `<p class="mut">${SUBJ[D.id].emoji} ${SUBJ[D.id].nombre} · ${tName(D, ti)}</p>${pre}${secHTML(s)}
  <div class="row">${btn(`ex|${D.id}|${ti}|${si}`, '✍️ Ejercicios de esto')}${btn(`topic|${D.id}|${ti}`, '📚 Más apartados del tema')}</div>
  ${others && others.length ? `<p class="mut" style="margin-bottom:4px">También puede ser lo que buscas:</p><div class="col">${others.map(r => btn(`sec|${r.D.id}|${r.e.ti}|${r.e.si}`, `${SUBJ[r.D.id].emoji} ${strip(r.D.T[r.e.ti].s[r.e.si].h)}`, 'chip wide')).join('')}</div>` : ''}`);
}
function subjIn(n) { return IDS.find(id => SUBJ[id].re.test(n)) || null }
async function theory(text, n) {
  const sj = subjIn(n), T = toks(text);
  if (hasTopicRef(n)) {
    const cand = sj ? [sj] : ctx.asig && ctx.asig !== 'francais' ? [ctx.asig] : ['business', 'communication'];
    const Ds = await Promise.all(cand.map(load)), ok = Ds.map(D => [D, topicRef(n, D)]).filter(x => x[1] >= 0);
    if (ok.length === 1) return T.length ? secOrTopic(ok[0][0], ok[0][1], T) : showTopic(ok[0][0], ok[0][1]);
    if (ok.length > 1) return add('bot', `<p>¿De qué asignatura?</p><div class="col">${ok.map(([D, ti]) => btn(`topic|${D.id}|${ti}`, `${SUBJ[D.id].emoji} ${tName(D, ti)}`, 'chip wide')).join('')}</div>`);
  }
  const Ds = sj ? [await load(sj)] : await loadAll();
  if (!T.length) { if (sj) return showTopics(Ds[0]); return notFound() }
  const R = find(Ds, T);
  if (!R.length) return notFound(sj);
  const b = R[0];
  if (b.e.k === 'topic') return showTopic(b.D, b.e.ti);
  const others = R.slice(1).filter(r => r.e.k === 'sec' && r.sc >= b.sc * .6).slice(0, 3);
  showSec(b.D, b.e.ti, b.e.si, T, others);
}
function secOrTopic(D, ti, T) { /* «tema 3: adverse selection» */
  const R = find([D], T).filter(r => r.e.ti === ti && r.e.k === 'sec');
  if (R.length) showSec(D, ti, R[0].e.si, T, []); else showTopic(D, ti);
}
function notFound(sj) {
  add('bot', `<p>No he encontrado eso en el temario${sj ? ' de ' + SUBJ[sj].nombre : ' de la web'}. Prueba con la palabra clave tal como sale en los apuntes (por ejemplo <i>adverse selection</i>, <i>register</i>, <i>pronoms toniques</i>) o elige una asignatura:</p>
  <div class="row">${IDS.map(id => btn(`topics|${id}`, `${SUBJ[id].emoji} ${SUBJ[id].nombre}`)).join('')}</div>`);
}

/* ================= francés: respuestas rápidas ================= */
async function frQuick(text, n) {
  let m = n.match(/como se dice (.+?)(?: en frances)?$/);
  if (m) {
    const D = await load('francais'), q = norm(m[1].replace(/^(el|la|los|las|un|una) /, ''));
    const L = D.VOC.filter(([es]) => (' ' + norm(es) + ' ').includes(' ' + q)).slice(0, 6);
    if (L.length) { add('bot', `<div class="fra">${L.map(([es, fr]) => `<p><b class="b">${esc(fr)}</b> <span class="mut">(${esc(es)})</span></p>`).join('')}</div>`); return true }
    return false;
  }
  m = n.match(/conjug\w* (?:el |le )?(?:verbo |verbe )?([a-z]+)/);
  if (m) {
    const D = await load('francais'), v = m[1], key = Object.keys(D.CJ).find(k => norm(k) === v);
    let rows = null, nota = '';
    if (key) rows = D.CJ[key].map(([p, f]) => [p, f]);
    else { const ver = D.VER.find(x => norm(x) === v) || (/er$/.test(v) && v.length > 3 ? v : null); if (ver) { rows = [0, 1, 2, 3, 4, 5].map(i => { const [f, pr] = D.conjER(ver, i); return [pr, f] }); if (!D.VER.includes(ver)) nota = '<p class="mut">No está en tu temario: lo conjugo como verbo regular en -ER.</p>'; } }
    if (!rows) return false;
    add('bot', `<div class="fra"><p><b>${esc((key || rows && m[1]).toUpperCase())}</b> — présent</p><table>${rows.map(([p, f]) => `<tr><td>${esc(p)}</td><td><b class="b">${esc(f)}</b></td></tr>`).join('')}</table></div>${nota}
    <div class="row">${sayb('Ejercicios de francés: conjugar verbos')}</div>`); ctx = { asig: 'francais' }; return true;
  }
  m = n.match(/(?:como se (?:dice|escribe)|en letras|numero)\D*(\d+)/);
  if (m && (SUBJ.francais.re.test(n) || /letras|numero/.test(n))) {
    const D = await load('francais'), k = +m[1];
    add('bot', k >= 0 && k <= 50 ? `<div class="fra"><p>${k} = <b class="b">${esc(D.num(k))}</b></p></div>` : '<p>En el temario solo tengo los números hasta el 50.</p>'); return true;
  }
  return false;
}

/* ================= tareas, horario, notas ================= */
const A = () => (window.DATOS || {}).asig || {};
function fecha(s) {
  const d = CAL.pd(s), dd = Math.round((d - CAL.hoy()) / 864e5);
  return dd === 0 ? 'hoy' : dd === 1 ? 'mañana' : d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
}
function li(e) {
  const a = A()[e.asig], f = e.hasta && e.hasta !== e.desde ? fecha(e.desde) + ' – ' + fecha(e.hasta) : fecha(e.desde);
  return `<li class="n${e.n}"><span class="tt">${esc(e.t)}</span><span class="mut">${a ? a.emoji + ' ' + esc(a.nombre) + ' · ' : ''}${f}${e.hora ? ' · ' + e.hora : ''}${e.peso != null ? ' · ' + e.peso + ' %' : ''}</span>${e.nota ? `<span class="mut">${esc(e.nota)}</span>` : ''}</li>`;
}
const lista = L => `<ol class="todo">${L.map(li).join('')}</ol>`;
function scope(n) {
  const h = CAL.hoy(), pl = d => { const x = new Date(h); x.setDate(x.getDate() + d); return x }, dow = (h.getDay() + 6) % 7;
  if (/pasado manana/.test(n)) return { a: pl(2), b: pl(2), txt: 'pasado mañana' };
  if (/\bmanana\b/.test(n) && !/(por|esta) la manana|esta manana/.test(n)) return { a: pl(1), b: pl(1), txt: 'mañana' };
  if (/\bhoy\b|esta (tarde|noche|manana)|\bahora\b/.test(n)) return { a: h, b: h, txt: 'hoy' };
  if (/semana que viene|proxima semana|siguiente semana/.test(n)) return { a: pl(7 - dow), b: pl(13 - dow), txt: 'la semana que viene' };
  if (/\bsemana\b/.test(n)) return { a: h, b: pl(6 - dow), txt: 'esta semana' };
  if (/\bmes\b/.test(n)) return { a: h, b: new Date(h.getFullYear(), h.getMonth() + 1, 0), txt: 'este mes' };
  const DN = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'], i = DN.findIndex(d => n.includes(d));
  if (i >= 0) { const d = pl((i - dow + 7) % 7); return { a: d, b: d, txt: 'el ' + ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'][i] } }
  return null;
}
function asigIn(n) { return /\b(mates|matematicas|maths?|mathematics)\b/.test(n) ? 'mates' : subjIn(n) }
function tasks(n) {
  let L = CAL.porFecha(); const sc = scope(n), as = asigIn(n), soloEx = /examen|parcial|midterm|\bfinal(es)?\b/.test(n), hoy = CAL.ymd(CAL.hoy());
  if (as) L = L.filter(e => e.asig === as);
  if (soloEx) L = L.filter(e => e.tipo === 'examen');
  const que = (soloEx ? 'exámenes' : 'tareas ni exámenes') + (as && A()[as] ? ' de ' + A()[as].nombre : '');
  const tarde = L.filter(e => (e.hasta || e.desde) < hoy), fut = L.filter(e => (e.hasta || e.desde) >= hoy);
  const pie = `<div class="row"><a class="chip" href="agenda.html">📅 Abrir el calendario</a></div>`;
  if (soloEx && /proximo|siguiente|primer/.test(n) && !sc) return add('bot', fut.length ? `<p>Tu próximo examen:</p>${lista(fut.slice(0, 1))}${pie}` : `<p>No tienes ${que} a la vista.</p>`);
  if (sc) {
    const a = CAL.ymd(sc.a), b = CAL.ymd(sc.b), R = fut.filter(e => e.desde <= b && (e.hasta || e.desde) >= a);
    let h = R.length ? `<p>Para <b>${sc.txt}</b> tienes:</p>${lista(R)}` : `<p>Para <b>${sc.txt}</b> no tienes ${que}. 🎉</p>`;
    if (!R.length) { const sig = fut.filter(e => e.desde > b).slice(0, 3); if (sig.length) h += `<p class="mut">Lo siguiente que viene:</p>${lista(sig)}` }
    if (tarde.length && a <= hoy) h += `<p class="mut">Y esto está fuera de plazo:</p>${lista(tarde)}`;
    return add('bot', h + pie);
  }
  if (!L.length) return add('bot', `<p>No tienes ${que} pendientes. 🎉</p>`);
  add('bot', `<p>${soloEx ? 'Tus exámenes' : 'Todo lo que tienes pendiente'}${as && A()[as] ? ' de ' + A()[as].nombre : ''}, por orden de fecha:</p>${lista(fut.slice(0, 12))}${tarde.length ? `<p class="mut">Fuera de plazo:</p>${lista(tarde)}` : ''}${pie}`);
}
function horario(n) {
  const sc = scope(n) || { a: CAL.hoy(), txt: 'hoy' }, d = (sc.a.getDay() + 6) % 7, H = (window.DATOS || {}).horario || [];
  const R = d > 4 ? [] : H.map(r => [r.hora, r.dias[d]]).filter(x => x[1]);
  add('bot', R.length ? `<p>Clases de <b>${sc.txt}</b>:</p><table>${R.map(([h, c]) => `<tr><td>${h}</td><td>${(A()[c.asig] || {}).emoji || ''} <b>${esc((A()[c.asig] || {}).nombre || c.asig)}</b><br><span class="mut">${esc(c.aula || '')}</span></td></tr>`).join('')}</table>`
    : `<p>${sc.txt[0].toUpperCase() + sc.txt.slice(1)} no tienes clase.</p>`);
}
function notas(n) {
  const as = asigIn(n), N = ((window.DATOS || {}).notas || []).filter(x => !as || x.asig === as);
  add('bot', N.map(x => { const a = A()[x.asig] || {}, v = x.items.map(i => i.nota), med = x.media != null ? x.media : v.length ? v.reduce((p, q) => p + q, 0) / v.length : null;
    return `<p>${a.emoji || ''} <b>${esc(a.nombre || x.asig)}</b>${med != null ? ` — media ${med.toFixed(2).replace('.', ',')}` : ''}</p><ul>${x.items.map(i => `<li>${esc(i.n)}: <b>${String(i.nota).replace('.', ',')}</b></li>`).join('')}</ul>` }).join('') + `<div class="row"><a class="chip" href="notas.html">Ver todas las notas</a></div>`);
}

/* ================= ejercicios ================= */
const CRIT = { K: 'Knowledge', A: 'Analysis (caso)', P: 'Application', R: 'Reasoned response' };
const qLabel = q => q.c && EX.D.id === 'francais' ? EX.D.C[q.c].l : q.type === 'num' ? 'Cálculo' : q.fx ? 'Fórmula' : q.type === 'mc' ? 'Tipo test' : q.c ? CRIT[q.c] : 'Desarrollo';
const FRCAT = [[/conjug|verbo|\betre\b|avoir|aller/, ['verbes', 'er']], [/verbos en er|primer grupo/, ['er']], [/negac|negativ/, ['neg']], [/posesiv|possessif|mon ma/, ['pos']], [/tonic/, ['ton']],
  [/tu o vous|tutear|\bvous\b/, ['tv']], [/famil/, ['vfam']], [/estado civil|datos person/, ['vper']], [/profesi/, ['pro']], [/sector/, ['vsec']], [/nacionalidad/, ['nat']], [/\bpais/, ['pays', 'prep']],
  [/preposic|au aux/, ['prep']], [/numer|cifra/, ['nb']], [/gusto|habito|frecuencia/, ['hab']], [/objeto|maleta|avion/, ['vobj']], [/vocabul|traduc/, ['vfam', 'vper', 'vsec', 'vobj', 'hab']], [/gramatic/, ['pos', 'ton', 'tv']]];
function wanted(n, id) { /* tipos de ejercicio pedidos */
  const W = [], t = (re, ...k) => { if (re.test(n)) k.forEach(x => W.includes(x) || W.push(x)) };
  t(/\btests?\b|tipo test|opcion|multiple/, 'mc');
  if (id === 'business') { t(/desarrollo|escrit|redact|abiert|\bcasos?\b|explicar|largas?/, 'wr'); t(/formula/, 'fmc'); t(/calcul|numeric|problema|cuentas/, 'num') }
  else { t(/desarrollo|escrit|redact|abiert|largas?/, 'K', 'A', 'P', 'R'); t(/knowledge|definic|concepto|teoric/, 'K'); t(/\bcasos?\b|analisis|analysis|analiz/, 'A'); t(/aplicac|application|reescrib|rewrite/, 'P'); t(/razonad|reasoned|opinion|argument|ensayo/, 'R') }
  return W;
}
function rank(L, T) { /* primero las preguntas que hablan de lo pedido */
  if (!T || !T.length) return shuf(L);
  const S = shuf(L).map(q => { const f = P([q.q, (q.o || []).join(' '), q.e || '', q.m || '', q.cs || ''].join(' ')); return [T.filter(t => t.some(a => f.includes(' ' + a))).length, q] }).sort((a, b) => b[0] - a[0]);
  const hit = S.filter(x => x[0] > 0); return (hit.length >= 3 ? hit : S).map(x => x[1]);
}
function makeQs(D, o) { /* o: {ti, T (foco), W (tipos), n, cats} */
  if (D.id === 'francais') {
    const ks = (o.cats && o.cats.length ? o.cats : Object.keys(D.C)).filter(k => D.C[k]);
    return shuf(ks.flatMap(k => D.C[k].g())).slice(0, o.n || 8);
  }
  const inT = q => o.ti == null || q.t === o.ti, pools = {};
  pools.mc = rank(D.mc.filter(inT), o.T);
  if (D.id === 'business') { pools.fmc = rank(D.fmc.filter(inT), o.T); pools.wr = rank(D.wr.filter(inT), o.T); pools.num = shuf(D.calc.map(f => Object.assign({ type: 'num' }, f())).filter(inT)) }
  else 'KAPR'.split('').forEach(c => pools[c] = rank(D.ex.filter(q => inT(q) && q.c === c), o.T));
  let pat = o.W && o.W.length ? o.W : D.id === 'business' ? ['mc', 'mc', 'wr', 'mc', 'num', 'fmc'] : ['mc', 'K', 'mc', 'A', 'mc', 'P', 'R'];
  if (!pat.some(k => pools[k] && pools[k].length)) pat = Object.keys(pools);
  const out = [], n = o.n || 5; let g = 0;
  while (out.length < n && pat.some(k => pools[k] && pools[k].length) && g < 400) { const p = pools[pat[g++ % pat.length]]; if (p && p.length) out.push(p.shift()) }
  return out;
}
async function exercises(text, n, forced) {
  const T = toks(text); let sj = forced || subjIn(n), ti = null, R = null, cats = [];
  FRCAT.forEach(([re, k]) => { if (re.test(n)) k.forEach(x => cats.includes(x) || cats.push(x)) });
  if (!sj && T.length) { R = find(await loadAll(), T); if (R.length) sj = R[0].D.id }
  if (!sj && cats.length && /conjug|posesiv|tonic|vous|profesi|nacionalidad|traduc|vocabul/.test(n)) sj = 'francais';
  if (!sj && ctx.asig) { sj = ctx.asig; ti = ctx.ti == null ? null : ctx.ti }
  if (!sj) { PEND = text; return add('bot', `<p>¿De qué asignatura quieres los ejercicios?</p><div class="row">${IDS.map(id => btn(`exs|${id}`, `${SUBJ[id].emoji} ${SUBJ[id].nombre}`)).join('')}</div>`) }
  const D = await load(sj), cnt = (n.match(/\b(\d{1,2}) (?:ejercicios|preguntas|tests?)/) || [])[1];
  if (sj === 'francais') {
    if (!cats.length && ctx.asig === 'francais' && ctx.ti != null && !T.length) { const w = norm(D.T[ctx.ti].t).split(' '); const g = D.QG.find(x => norm(x[0]).split(' ').some(y => y.length > 3 && w.includes(y))); if (g) cats = g[1].slice() }
    return begin(D, { cats, n: cnt ? Math.min(20, +cnt) : 8 }, cats.length ? cats.filter(k => D.C[k]).map(k => D.C[k].l).join(' · ') : 'mezcla de todo');
  }
  if (hasTopicRef(n)) { const i = topicRef(n, D); if (i >= 0) ti = i }
  if (ti == null && T.length) { const r = (R || find([D], T)).filter(x => x.D === D)[0]; if (r) ti = r.e.ti }
  if (ti == null && !T.length && ctx.asig === sj && ctx.ti != null) ti = ctx.ti;
  begin(D, { ti, T, W: wanted(n, sj), n: cnt ? Math.min(20, +cnt) : 5 }, ti == null ? 'todo el temario' : tName(D, ti));
}
function begin(D, o, about) {
  const qs = makeQs(D, o);
  if (!qs.length) return add('bot', '<p>No tengo ejercicios de eso en la web.</p>');
  EX = { id: ++sid, D, o, about, qs, i: 0, ok: 0, bad: [], wait: false };
  if (o.ti != null) ctx = { asig: D.id, ti: o.ti }; else ctx = { asig: D.id };
  add('bot', `<p>✍️ <b>${qs.length} ejercicios</b> de ${SUBJ[D.id].emoji} ${SUBJ[D.id].nombre} — ${esc(about)}. Te los corrijo uno a uno.</p>`);
  ask(true);
}
function ask(keep) {
  const q = EX.qs[EX.i]; if (!q) return end();
  const D = EX.D, fr = D.id === 'francais';
  const grp = fr ? (D.QG.find(x => x[1].includes(q.c)) || [])[0] : q.t != null && D.T[q.t] ? tName(D, q.t) : '';
  const hd = `<p class="mut">Ejercicio ${EX.i + 1}/${EX.qs.length} · ${qLabel(q)}</p>${grp ? `<p class="tema">📌 Tema: <b>${grp}</b></p>` : ''}`;
  const ctl = `<div class="row">${btn(`skip|${EX.id}|${EX.i}`, 'Saltar', 'chip ghost')}${btn(`stop|${EX.id}`, 'Terminar', 'chip ghost')}</div>`;
  EX.wait = q.type !== 'mc';
  let h;
  if (fr) h = `<div class="q">${q.p}</div>${q.es ? `<p class="mut">En castellano: <b>${esc(q.es)}</b></p>` : ''}<p class="mut">Escribe la respuesta en francés (vale sin acentos).</p>`;
  else if (q.type === 'mc') { const ord = shuf([0, 1, 2, 3].slice(0, q.o.length)); h = `<div class="q">${q.q}</div>${ord.map((oi, j) => `<button class="opt" data-x="${EX.id}|${EX.i}|${oi}"><span class="l">${'ABCD'[j]}</span><span>${q.o[oi]}</span></button>`).join('')}` }
  else if (q.type === 'num') h = `<div class="q">${q.q}</div><p class="mut">Escribe solo el número.</p>`;
  else h = `${q.cs ? `<div class="case">${q.cs}</div>` : ''}<div class="q">${q.q}</div><p class="mut">Escribe tu respuesta abajo (en inglés o en castellano).</p>`;
  add('bot', hd + h + ctl, keep === true);
  inp.placeholder = EX.wait ? 'Tu respuesta…' : 'Elige una opción arriba…';
  if (EX.wait) inp.focus();
}
function record(q, ok) {
  if (ok) EX.ok++; else EX.bad.push(q);
  try { const D = EX.D; if (D.id === 'francais') D.w.eval('rec')(q.c, ok); else if (D.rec) D.rec(String(q.t), ok) } catch (e) {}
}
let SCR = false;
function next(fb) { const d = add('bot', fb); EX.i++; ask(true); log.scrollTop = Math.max(0, d.offsetTop - 10); SCR = true }
function answerMC(b) {
  const [id, i, oi] = b.dataset.x.split('|').map(Number); if (!EX || EX.id !== id || EX.i !== i) return;
  const q = EX.qs[i], ok = oi === q.a;
  b.parentNode.querySelectorAll('[data-x]').forEach(x => { const o = +x.dataset.x.split('|')[2]; x.disabled = true; if (o === q.a) x.classList.add('good'); else if (o === oi) x.classList.add('bad') });
  record(q, ok);
  next(ok ? `<p class="okk"><b>✓ Correcto.</b> ${q.e || ''}</p>` : `<p class="kok"><b>✗ No.</b> La correcta es: <b>${q.o[q.a]}</b>.</p><p>${q.e || ''}</p>`);
}
function numOk(q, v) { const tol = q.tol != null ? q.tol : Math.max(q.d === 0 ? 0.5 : 0.5 * Math.pow(10, -q.d) + 1e-9, (q.rel || 0) * Math.abs(q.ans)); return Math.abs(v - q.ans) <= tol }
function answerText(a) {
  const q = EX.qs[EX.i], D = EX.D;
  if (D.id === 'francais') {
    const v = /^\d+$/.test(a.trim()) && +a <= 50 ? D.num(+a) : a, ok = q.a.some(x => D.fnorm(x) === D.fnorm(v) || norm(x) === norm(v));
    record(q, ok);
    return next(ok ? `<p class="okk"><b>✓ Très bien !</b> ${esc(q.a[0])}</p>` : `<p class="kok"><b>✗ No.</b> La respuesta correcta: <b>${esc(q.a[0])}</b></p>${q.h ? `<p class="mut">Pista: ${q.h}</p>` : ''}`);
  }
  if (q.type === 'num') {
    const v = parseFloat(a.replace(/\s/g, '').replace(',', '.').replace(/[^0-9.\-]/g, ''));
    if (isNaN(v)) { add('bot', '<p>Escribe solo el número (por ejemplo 2,5).</p>'); return }
    const ok = numOk(q, v); record(q, ok);
    return next(`<p class="${ok ? 'okk' : 'kok'}"><b>${ok ? '✓ Correcto.' : '✗ No.'}</b></p><p><b>Solución:</b> ${q.sol}</p>`);
  }
  const s = ' ' + norm(a) + ' ', hit = [], miss = [];
  q.k.forEach(k => { const p = k.split('|'); let alts = (q.comm ? p.slice(1) : p).map(norm).filter(Boolean); if (!alts.length) alts = [norm(p[0])]; (alts.some(x => s.includes(x)) ? hit : miss).push(p[0]) });
  const pr = hit.length / q.k.length, ok = pr >= .5; record(q, ok);
  next(`<p class="${pr >= .75 ? 'okk' : ok ? 'mid' : 'kok'}"><b>${ok ? '✓' : '✗'} ${hit.length} de ${q.k.length} puntos clave.</b></p>
  ${hit.length ? `<p><b>Has puesto:</b></p><ul>${hit.map(x => `<li>✓ ${x}</li>`).join('')}</ul>` : ''}${miss.length ? `<p><b>Te falta:</b></p><ul>${miss.map(x => `<li>➕ ${x}</li>`).join('')}</ul>` : ''}
  <p><b>Model answer:</b> ${q.m}</p><p class="mut">Corrección automática por palabras clave: comprueba si mencionas los conceptos, no si están bien usados. Compárala tú con la respuesta modelo.</p>`);
}
function skip() {
  const q = EX.qs[EX.i], fr = EX.D.id === 'francais'; record(q, false);
  next(`<p class="mut">Saltada. ${fr ? `Respuesta: <b>${esc(q.a[0])}</b>` : q.type === 'mc' ? `La correcta: <b>${q.o[q.a]}</b>. ${q.e || ''}` : q.type === 'num' ? `Solución: ${q.sol}` : `<b>Model answer:</b> ${q.m}`}</p>`);
}
function end(cut) {
  const E = EX, done = cut ? E.i : E.qs.length; EX = null; inp.placeholder = 'Pregúntame algo…';
  if (!done) return add('bot', '<p>Vale, lo dejamos aquí.</p>');
  const q1 = q => strip(E.D.id === 'francais' ? q.p : q.q).trim();
  E.last = { D: E.D, o: E.o, about: E.about, bad: E.bad }; LAST = E.last;
  add('bot', `<p><b>${cut ? 'Lo dejamos aquí.' : '¡Ronda terminada!'}</b> Has acertado <b>${E.ok} de ${done}</b>.${E.ok === done ? ' 🎉' : ''}</p>
  ${E.bad.length ? `<p class="mut">Para repasar:</p><ul>${E.bad.map(q => `<li>${esc(q1(q))}</li>`).join('')}</ul>` : ''}
  <div class="row">${E.bad.length ? btn('rep', '🔁 Repetir las falladas') : ''}${btn('again', '✍️ Otra ronda igual')}${E.o.ti != null ? btn(`topic|${E.D.id}|${E.o.ti}`, '📚 Ver la teoría') : ''}</div>`);
}
let LAST = null;

/* ================= órdenes de los botones ================= */
async function cmd(c) {
  const [k, a, b, d] = c.split('|');
  if (k === 'topics') return showTopics(await load(a));
  if (k === 'topic') return showTopic(await load(a), +b);
  if (k === 'full') return showFull(await load(a), +b);
  if (k === 'sec') return showSec(await load(a), +b, +d, null, []);
  if (k === 'ex') { const D = await load(a); if (D.id === 'francais') { ctx = { asig: a, ti: +b }; return exercises('', '', a) }
    const s = d != null && d !== '' ? D.T[+b].s[+d] : null; return begin(D, { ti: +b, T: s ? toks(s.h + ' ' + (s.k || []).map(x => x[0]).join(' ')) : [], W: [], n: 5 }, s ? strip(s.h) : tName(D, +b)) }
  if (k === 'exs') { const t = PEND; PEND = ''; return exercises(t, norm(t), a) }
  if (k === 'skip') { if (EX && EX.id === +a && EX.i === +b) skip(); return }
  if (k === 'stop') { if (EX && EX.id === +a) end(true); return }
  if (k === 'rep') { if (LAST && LAST.bad.length) { const L = LAST; EX = { id: ++sid, D: L.D, o: L.o, about: L.about, qs: shuf(L.bad), i: 0, ok: 0, bad: [], wait: false }; add('bot', '<p>🔁 Vamos con las que has fallado.</p>'); ask(true) } else add('bot', '<p>Esa ronda ya no la tengo guardada. Pídeme ejercicios otra vez.</p>'); return }
  if (k === 'again') { if (LAST) begin(LAST.D, LAST.o, LAST.about); else add('bot', '<p>Esa ronda ya no la tengo guardada. Pídeme ejercicios otra vez.</p>'); return }
}

/* ================= IA (solo en el artefacto) ================= */
/* Markdown sencillo → HTML (lo que escribe Claude): títulos, negrita, cursiva, código, listas y tablas */
function md(src) {
  const inl = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>').replace(/(^|[\s(])_([^_\s][^_]*)_(?=[\s).,;:!?]|$)/g, '$1<i>$2</i>');
  const L = String(src).replace(/\r/g, '').split('\n'), out = []; let i = 0;
  const cells = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  while (i < L.length) {
    const l = L[i];
    if (/^```/.test(l)) { const b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; out.push(`<pre>${esc(b.join('\n'))}</pre>`); continue }
    if (/^\s*$/.test(l)) { i++; continue }
    const h = l.match(/^(#{1,4})\s+(.*)$/); if (h) { out.push(`<h4>${inl(h[2])}</h4>`); i++; continue }
    if (/^\s*([-*_])\1\1+\s*$/.test(l)) { out.push('<hr>'); i++; continue }
    if (/^\s*\|.*\|\s*$/.test(l) && i + 1 < L.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(L[i + 1]) && L[i + 1].includes('-')) {
      const hd = cells(l), rows = []; i += 2; while (i < L.length && /^\s*\|.*\|\s*$/.test(L[i])) rows.push(cells(L[i++]));
      out.push(`<div class="tw"><table><tr>${hd.map(c => `<th>${inl(c)}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</table></div>`); continue;
    }
    const ul = /^\s*[-*•]\s+/, ol = /^\s*\d+[.)]\s+/;
    if (ul.test(l) || ol.test(l)) { const re = ul.test(l) ? ul : ol, tag = re === ul ? 'ul' : 'ol', it = [];
      while (i < L.length && (re.test(L[i]) || (/^\s{2,}\S/.test(L[i]) && it.length))) { if (re.test(L[i])) it.push(L[i].replace(re, '')); else it[it.length - 1] += ' ' + L[i].trim(); i++ }
      out.push(`<${tag}>${it.map(x => `<li>${inl(x)}</li>`).join('')}</${tag}>`); continue }
    if (/^>\s?/.test(l)) { const b = []; while (i < L.length && /^>\s?/.test(L[i])) b.push(L[i++].replace(/^>\s?/, '')); out.push(`<div class="case">${b.map(inl).join('<br>')}</div>`); continue }
    const p = [l]; i++; while (i < L.length && !/^\s*$/.test(L[i]) && !/^(#{1,4}\s|```|\s*[-*•]\s+|\s*\d+[.)]\s+|>|\s*\|)/.test(L[i])) p.push(L[i++]);
    out.push(`<p>${p.map(inl).join('<br>')}</p>`);
  }
  return out.join('');
}
const plain = s => strip(s).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
function secPlain(D, ti, si) {
  const s = D.T[ti].s[si];
  if (s.html) return `### ${plain(s.h)}\n${s.es ? 'Resumen en castellano: ' + plain(s.es) + '\n' : ''}${plain(s.html.replace(/<\/(tr|p|div|h3|li)>/g, '\n').replace(/<\/t[dh]>/g, ' | '))}`;
  return `### ${plain(s.h)}\n` + [(s.k || []).map(x => `- ${plain(x[0])}: ${plain(x[1] || '')}`).join('\n'), (s.tbl || []).map(r => r.map(plain).join(' | ')).join('\n'), (s.f || []).map(x => 'Fórmula: ' + plain(x)).join('\n'), s.ej ? 'Ejemplo: ' + plain(s.ej) : '', s.tr ? 'Trampa de examen: ' + plain(s.tr) : ''].filter(Boolean).join('\n');
}
function reglas(Ds) {
  const h = CAL.hoy(), A_ = A();
  const idx = Ds.map(D => `## ${SUBJ[D.id].nombre}\n` + D.T.map((t, i) => `- ${plain(tName(D, i))}: ${t.s.map(s => plain(s.h)).join(' · ')}`).join('\n')).join('\n\n');
  const pen = CAL.porFecha().map(e => `- ${e.desde}${e.hasta && e.hasta !== e.desde ? ' a ' + e.hasta : ''}${e.hora ? ' ' + e.hora : ''} · ${e.t} (${(A_[e.asig] || {}).nombre || 'sin asignatura'}; ${e.tipo}${e.peso != null ? '; ' + e.peso + ' % de la nota' : ''})${e.nota ? ' — ' + e.nota : ''}`).join('\n') || '- (nada pendiente)';
  const hor = ((window.DATOS || {}).horario || []).map(r => r.hora + ': ' + r.dias.map((c, d) => c ? ['L', 'M', 'X', 'J', 'V'][d] + ' ' + ((A_[c.asig] || {}).nombre || c.asig) : '').filter(Boolean).join(', ')).join('\n');
  const nts = ((window.DATOS || {}).notas || []).map(x => `- ${(A_[x.asig] || {}).nombre || x.asig}: ${x.items.map(i => i.n + ' ' + i.nota).join('; ')}`).join('\n');
  return `Eres el tutor de estudio de Martí, estudiante de primer curso en ESCI-UPF (Barcelona). Estás dentro de su web de estudio y le ayudas con tres asignaturas: Business Organization, Communication Techniques y Français A1. Hoy es ${h.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.

CÓMO RESPONDER
- Responde siempre en castellano, claro y directo, sin relleno. Usa Markdown sencillo (negritas, listas, tablas pequeñas). Nada de HTML.
- Business y Communication: explica en castellano pero deja los términos clave en inglés, tal como salen en sus apuntes (moral hazard, register…). Los ejercicios de estas dos asignaturas se formulan en inglés, como en su examen; él puede contestar en inglés o en castellano, y tú corriges en castellano.
- Francés: si pide vocabulario, frases, conjugaciones o que le hables en francés, eso va en francés, con la traducción entre paréntesis al lado. Las explicaciones de gramática van en castellano con los ejemplos en francés. Nivel A1: no uses estructuras que no ha visto.
- Básate en el MATERIAL DEL TEMARIO que acompaña a cada pregunta: es lo que entra en su examen. Si lo que pregunta no está en ese material ni en el índice, puedes explicarlo igualmente, pero avisa en una frase de que no está en sus apuntes.
- Si pide que le expliques algo porque no lo entiende, explícalo con otras palabras y un ejemplo cotidiano, no repitas el esquema tal cual.
- Ejercicios: ponlos del tipo y sobre el tema que pida (test con opciones A–D, desarrollo, casos, cálculo, traducción, conjugación…). Si no dice cuántos, pon 4. Antes de cada ejercicio indica el tema («Tema: T3 · Incentive conflicts» o «Tema: Posesivos») y qué hay que hacer. NO des las soluciones al plantearlos: espera su respuesta, y entonces corrige uno por uno diciendo qué está bien, qué falla y cuál era la respuesta correcta, con una explicación breve. Si deja alguno sin contestar, dale la solución.
- Para fechas, tareas, exámenes, horario y notas usa solo los datos de abajo; no inventes fechas.
- Mathematics no tiene temario en la web: si pregunta por mates, ayúdale con lo que sepas y dilo.

LO QUE TIENE PENDIENTE (por fecha)
${pen}

HORARIO SEMANAL
${hor}

NOTAS
${nts}

ÍNDICE DEL TEMARIO DE LA WEB (temas y apartados)
${idx}`;
}
function material(Ds, text, n) {   /* los apartados del temario que tienen que ver con la pregunta */
  const T = toks(text), sj = subjIn(n), use = sj ? Ds.filter(D => D.id === sj) : Ds, B = [], LIM = 16000;
  const push = (D, ti, si) => { const t = `[${SUBJ[D.id].nombre} · ${plain(tName(D, ti))}]\n${secPlain(D, ti, si)}`; if (!B.includes(t) && B.join('\n\n').length + t.length < LIM) B.push(t) };
  if (hasTopicRef(n)) (sj ? use : Ds.filter(D => D.id !== 'francais')).forEach(D => { const ti = topicRef(n, D); if (ti >= 0) { D.T[ti].s.forEach((s, si) => push(D, ti, si)); ctx = { asig: D.id, ti } } });
  const R = find(use, T);
  R.filter(r => r.e.k === 'topic').slice(0, 1).forEach(r => { r.D.T[r.e.ti].s.forEach((s, si) => push(r.D, r.e.ti, si)); ctx = { asig: r.D.id, ti: r.e.ti } });
  R.filter(r => r.e.k === 'sec').slice(0, 6).forEach((r, k) => { push(r.D, r.e.ti, r.e.si); if (!k && !B.length) ctx = { asig: r.D.id, ti: r.e.ti, si: r.e.si } });
  if (B.length) { const r = R.find(x => x.e.k === 'sec'); if (r && !hasTopicRef(n)) ctx = { asig: r.D.id, ti: r.e.ti, si: r.e.si }; STICKY = B.join('\n\n'); return STICKY }
  return STICKY;   /* pregunta de seguimiento («ponme ejercicios de eso»): se reutiliza el último material */
}
const AI_ERR = { not_granted: 'No has dado permiso para usar a Claude en esta página, así que no puedo contestar con IA. Si cambias de idea, recarga la página y acéptalo.', sampling_disabled: 'Claude no está disponible para esta cuenta.', rate_limited: 'Has llegado al límite de uso de tu plan de Claude o has preguntado muy seguido. Prueba dentro de un rato.', session_expired: 'Tu sesión de claude.ai ha caducado: vuelve a iniciar sesión y recarga.', refused: 'Claude no ha querido contestar a eso. Prueba a preguntarlo de otra forma.', prompt_too_large: 'La conversación es demasiado larga. Pulsa «Nueva conversación» y vuelve a preguntar.', empty_completion: 'No ha salido ninguna respuesta. Prueba a preguntarlo de otra forma.' };
async function ai(text) {
  const n = norm(text), Ds = await loadAll(), mat = material(Ds, text, n);
  const t0 = log.querySelector('.tmp'); if (t0) t0.remove();
  const d = document.createElement('div'); d.className = 'msg bot ia'; d.innerHTML = '<p class="mut"><span class="dots"><i></i><i></i><i></i></span> Pensando… <button class="chip ghost" data-stop>Parar</button></p>'; log.appendChild(d); modo();
  const ys = log.querySelectorAll('.msg.yo'), y = ys[ys.length - 1]; if (y) log.scrollTop = Math.max(0, y.offsetTop - 10);
  const msgs = [{ role: 'user', content: reglas(Ds) }].concat(TURNS.slice(-12), [{ role: 'user', content: text + (mat ? '\n\n---\nMATERIAL DEL TEMARIO relacionado (de la web de Martí; no lo ha escrito él en este mensaje):\n' + mat : '') }]);
  CTL = new AbortController(); let got = '';
  const pinta = (t, fin) => { d.innerHTML = md(t) + (fin ? '' : '<p class="mut"><button class="chip ghost" data-stop>Parar</button></p>') };
  try {
    const r = await SAMPLE(msgs, { cache: false, signal: CTL.signal, onText: ({ text: t }) => { got = t; pinta(t) } });
    got = r.text; pinta(got, true); if (r.truncated) d.insertAdjacentHTML('beforeend', '<p class="mut">La respuesta se ha cortado por larga. Pídeme que siga.</p>');
  } catch (e) {
    const code = e && e.code; got = (e && e.text) || (code === 'cancelled' ? got : '');
    if (got) pinta(got, true); else d.innerHTML = '';
    if (code !== 'cancelled') d.insertAdjacentHTML('beforeend', `<p class="kok">${AI_ERR[code] || 'Ha fallado la conexión con Claude. Vuelve a intentarlo.'}</p>`);
    else d.insertAdjacentHTML('beforeend', '<p class="mut">Parado.</p>');
    if (code === 'not_granted' || code === 'sampling_disabled' || code === 'capability_disabled' || code === 'not_declared') { SAMPLE = null; document.querySelectorAll('.iab').forEach(b => { b.textContent = 'Sin IA en esta visita'; b.classList.add('off') }) }
  }
  CTL = null;
  if (got) { TURNS.push({ role: 'user', content: text }, { role: 'assistant', content: got }); TURNS = TURNS.slice(-12); while (TURNS.length && TURNS[0].role !== 'user') TURNS.shift() }
  save();
}

/* ================= entender el mensaje ================= */
const RE_EX = /ejercic|practic|\bpregunt(ame|as?)\b|\btests?\b|quiz|ponme a prueba|examiname|simulacro|\bproblemas?\b/;
const RE_TASK = /\btareas?\b|pendiente|entrega|deberes|examen|parcial|midterm|que tengo|que me queda|que hay que hacer|que debo hacer|vence|calendario|agenda/;
async function handle(text) {
  const n = norm(text);
  if (EX && EX.wait && !/^(salir|terminar|para|parar|stop|cancelar|basta|fin)$/.test(n)) return answerText(text);
  if (EX && /^(salir|terminar|para|parar|stop|cancelar|basta|fin)$/.test(n)) return end(true);
  if (EX && /^[abcd]$/.test(n)) { const bs = log.querySelectorAll(`[data-x^="${EX.id}|${EX.i}|"]`), b = bs['abcd'.indexOf(n)]; if (b && !b.disabled) return answerMC(b) }
  if (EX) { EX = null; inp.placeholder = 'Pregúntame algo…' }   /* estaba en un test y pregunta otra cosa: se deja el ejercicio */
  if (SAMPLE) {   /* con IA: lo del calendario se responde al instante desde los datos; todo lo demás lo contesta Claude */
    const corto = n.split(' ').length <= 9 && !/explic|entra|estudi|prepar|resum|ejercic|practic|por que|como/.test(n);
    if (corto && /horario|que clases?\b|clases? (tengo|hay|de hoy|de manana)/.test(n)) return horario(n);
    if (corto && RE_TASK.test(n)) return tasks(n);
    if (corto && /\bnotas?\b|calificacion|que he sacado/.test(n)) return notas(n);
    return ai(text);
  }
  if (/^(hola|buenas|buenos dias|hey|ayuda|help|que puedes hacer|que sabes hacer)\b/.test(n) && n.split(' ').length <= 4) return welcome();
  if (/^(gracias|muchas gracias|vale|ok|perfecto|genial)$/.test(n)) return add('bot', '<p>¡A ti! Cuando quieras seguimos.</p>');
  if (RE_EX.test(n)) return exercises(text, n);
  if (/horario|que clases?\b|clases? (tengo|hay|de hoy|de manana)|a que hora/.test(n)) return horario(n);
  if (RE_TASK.test(n)) return tasks(n);
  if (/\bnotas?\b|calificacion|que he sacado|\bmedia\b/.test(n)) return notas(n);
  if (/como se (dice|escribe)|conjug|en letras/.test(n) && await frQuick(text, n)) return;
  return theory(text, n);
}
async function run(fn) {
  const t = document.createElement('div'); t.className = 'msg bot tmp'; t.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>'; log.appendChild(t);
  try { await fn() } catch (e) { console.error(e); add('bot', '<p>No he podido cargar esa parte de la web. Comprueba la conexión y vuelve a intentarlo.</p>') }
  t.remove(); save();
  /* la pregunta se queda arriba y la respuesta sale justo debajo */
  const ys = log.querySelectorAll('.msg.yo'), y = ys[ys.length - 1]; if (y && !SCR) log.scrollTop = Math.max(0, y.offsetTop - 10); SCR = false;
}
function send(text) { text = text.trim(); if (!text) return; add('yo', esc(text)); run(() => handle(text)) }

form.addEventListener('submit', e => { e.preventDefault(); const t = inp.value; inp.value = ''; send(t) });
box.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || b.disabled) return;
  if (b.dataset.say) send(b.dataset.say);
  else if (b.dataset.x) answerMC(b);
  else if (b.dataset.stop != null) { if (CTL) CTL.abort() }
  else if (b.dataset.cmd) { const c = b.dataset.cmd; if (!/^(skip|stop)\|/.test(c)) add('yo', esc(b.textContent)); run(() => cmd(c)) }
});
const clr = box.querySelector('.clr');
if (clr) clr.onclick = () => { if (CTL) CTL.abort(); TURNS = []; STICKY = ''; EX = null; LAST = null; ctx = {}; log.innerHTML = ''; inp.placeholder = 'Pregúntame algo…'; try { localStorage.removeItem(K) } catch (e) {} modo(); scrollTo(0, 0) };

/* ================= recuperar la conversación ================= */
let old = null; try { old = JSON.parse(localStorage.getItem(K) || 'null') } catch (e) {}
if (old && old.L && old.L.length) {
  ctx = old.ctx || {}; TURNS = old.T || []; STICKY = old.S || '';
  old.L.forEach(([c, h]) => { const d = document.createElement('div'); d.className = c; d.innerHTML = h; log.appendChild(d) });
  log.querySelectorAll('[data-x],[data-cmd^="skip|"],[data-cmd^="stop|"],[data-cmd="rep"],[data-cmd="again"]').forEach(b => b.disabled = true);  /* los ejercicios a medias no se retoman */
  modo(); log.scrollTop = log.scrollHeight;
}
setTimeout(() => { loadAll().catch(() => {}) }, 1200);   /* precarga el temario para que la primera respuesta sea rápida */
})();
