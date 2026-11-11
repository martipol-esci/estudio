/* Calendario: junta lo leído del aula (datos.js) con lo que añade el usuario en este dispositivo, y calcula el color de importancia.
   Reglas de color:
     rojo (3)    examen (parcial o final) · entrega que pesa 15 % o más
     naranja (2) entrega del 5 al 15 % (o de peso desconocido)
     amarillo (1) entrega de menos del 5 % · seminario · recordatorio
   Urgencia: lo amarillo pasa a naranja si faltan menos de 3 días; lo naranja pasa a rojo si es para hoy o mañana.
   Gris (0): ya hecho o ya pasado. */
window.CAL = (function () {
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch (e) { return d } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) {} }
  };
  const K_MIO = 'hub-cal', K_OV = 'hub-cal-ov';
  const p2 = n => String(n).padStart(2, '0');
  const ymd = d => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate());
  const pd = s => new Date(s.length === 10 ? s + 'T00:00' : s);
  const hoy = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d };
  const TIPOS = { examen: 'Examen', entrega: 'Entrega / proyecto', seminario: 'Seminario', otro: 'Recordatorio' };
  const NIV = ['Hecho o pasado', 'Poco importante', 'Importante', 'Muy importante'];

  function eventos() {
    const D = window.DATOS || { tareas: [], fechas: [] }, ov = LS.get(K_OV, {}), out = [];
    (D.tareas || []).forEach(t => out.push({ id: 'a:' + t.t, src: 'aula', t: t.t, asig: t.asig, desde: t.vence.slice(0, 10), hora: t.vence.slice(11, 16),
      tipo: t.tipo || 'entrega', peso: t.peso == null ? null : t.peso, pesoEst: !!t.pesoEst, hecha: t.estado !== 'pendiente', nota: t.porque || '', donde: t.donde || '' }));
    (D.fechas || []).forEach(f => out.push({ id: 'a:' + f.t, src: 'aula', t: f.t, asig: f.asig, desde: f.desde, hasta: f.hasta || '', hora: f.hora || '',
      tipo: f.tipo || 'otro', peso: f.peso == null ? null : f.peso, pesoEst: !!f.pesoEst, hecha: false, nota: f.nota || '', donde: '' }));
    out.forEach(e => { const o = ov[e.id]; if (o) { Object.assign(e, o); e.editado = true } });
    LS.get(K_MIO, []).forEach(m => out.push(Object.assign({ src: 'mio', hasta: '', hora: '', nota: '', donde: '', peso: null, hecha: false }, m)));
    return out;
  }
  function dias(e) { return Math.round((pd(e.desde) - hoy()) / 864e5) }
  function base(e) {
    if (e.tipo === 'examen') return 3;
    if (e.tipo === 'seminario' || e.tipo === 'otro') return 1;
    if (e.peso == null) return 2;
    return e.peso >= 15 ? 3 : e.peso >= 5 ? 2 : 1;
  }
  function nivel(e) {
    if (e.hecha) return 0;
    const fin = Math.round((pd(e.hasta || e.desde) - hoy()) / 864e5), dd = dias(e);
    if (fin < 0) return (e.tipo === 'entrega' || e.tipo === 'seminario') && e.src === 'aula' ? 3 : 0;
    const b = base(e);
    if (b === 1 && dd < 3) return 2;
    if (b === 2 && dd <= 1) return 3;
    return b;
  }
  function cuando(e) {
    const dd = dias(e), fin = Math.round((pd(e.hasta || e.desde) - hoy()) / 864e5);
    if (e.hecha) return 'Hecho';
    if (fin < 0) return nivel(e) ? 'Fuera de plazo' : 'Ya ha pasado';
    if (dd <= 0) return 'Hoy'; if (dd === 1) return 'Mañana';
    return 'En ' + dd + ' días';
  }
  /* pendientes: primero lo que vence en menos de 3 días; después lo más importante y, a igual importancia, lo que vence antes */
  function pendientes() {
    const ya = e => dias(e) < 3 ? 0 : 1;
    return eventos().map(e => (e.n = nivel(e), e)).filter(e => e.n > 0)
      .sort((a, b) => ya(a) - ya(b) || b.n - a.n ||a.desde.localeCompare(b.desde) || (a.hora || '').localeCompare(b.hora || ''));
  }
  /* pendientes por orden de entrega: lo que vence antes, primero */
  function porFecha() {
    return eventos().map(e => (e.n = nivel(e), e)).filter(e => e.n > 0)
      .sort((a, b) => a.desde.localeCompare(b.desde) || (a.hora || '99').localeCompare(b.hora || '99'));
  }
  function enDia(evs, s) { return evs.filter(e => e.desde <= s && s <= (e.hasta || e.desde)) }
  function guardarMio(m) { const L = LS.get(K_MIO, []); const i = L.findIndex(x => x.id === m.id); if (i >= 0) L[i] = m; else L.push(m); LS.set(K_MIO, L) }
  function borrarMio(id) { LS.set(K_MIO, LS.get(K_MIO, []).filter(x => x.id !== id)) }
  function guardarOv(id, o) { const ov = LS.get(K_OV, {}); if (o) ov[id] = o; else delete ov[id]; LS.set(K_OV, ov) }
  return { eventos, nivel, base, dias, cuando, pendientes, porFecha, enDia, guardarMio, borrarMio, guardarOv, ymd, pd, hoy, TIPOS, NIV };
})();
