/* Mathematics · exercise generators (English only, no theory).
   Every exercise is modelled on one from AulaESCI (Problem Sets A–I, Midterm 1 2024/2025, Midterm 2 2024/2025 and the practice tests),
   but the numbers are drawn at random each time, so the same exercise never repeats with the same data.
   A generator returns {q, sol, src} plus either  {type:'num', ans, d, unit}  or  {type:'mc', opts:[4 html strings], a: index of the right one}. */
(function () {
'use strict';
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pk = a => a[Math.floor(Math.random() * a.length)];
const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
const nz = (a, b) => { let v = 0; while (!v) v = ri(a, b); return v };
const F = (x, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toLocaleString('en-US', { maximumFractionDigits: d });
const E = x => '€' + (Math.round(x * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(Math.round(x * 100) / 100) ? 0 : 2, maximumFractionDigits: 2 });
const sg = x => (x < 0 ? '− ' : '+ ') + F(Math.abs(x), 4);          /* "+ 3" / "− 3" */
const neg = x => (x < 0 ? '−' : '') + F(Math.abs(x), 4);             /* "−3" */
const par = x => x < 0 ? '(' + neg(x) + ')' : F(x, 4);
const sup = n => '<sup>' + n + '</sup>';
/* polynomial as text: P([1,-3,0,2]) → x³ − 3x² + 2 */
function P(c, v = 'x') {
  const n = c.length - 1; let s = '';
  c.forEach((k, i) => { if (!k) return; const e = n - i, a = Math.abs(k), body = (a !== 1 || e === 0 ? F(a, 4) : '') + (e ? v + (e > 1 ? sup(e) : '') : '');
    s += s ? (k < 0 ? ' − ' : ' + ') + body : (k < 0 ? '−' : '') + body });
  return s || '0';
}
const lin = (m, n, v = 'x') => P([m, n], v);
const num = (q, ans, d, unit, sol, src) => ({ type: 'num', q, ans, d, unit: unit || '', sol, src });
function mc(q, right, wrong, sol, src) {
  const seen = new Set([right]), w = []; wrong.forEach(x => { if (!seen.has(x) && w.length < 3) { seen.add(x); w.push(x) } });
  const opts = shuf([right].concat(w)); return { type: 'mc', q, opts, a: opts.indexOf(right), sol, src };
}
const G = []; const add = (lec, fn) => G.push({ lec, fn });
const YR = () => ri(2005, 2022);

/* ============ LECTURE 1 · Percentages (Problem Set A) ============ */
add(1, () => { const a = ri(105, 135) / 100, b = +(a * (1 + nz(-9, 9) / 100)).toFixed(2), r = (b / a - 1) * 100;
  return num(`During a certain period, the exchange rate of the euro against the US dollar changed from 1 EUR = ${a.toFixed(2)} USD to 1 EUR = ${b.toFixed(2)} USD. Calculate the percentage change in the exchange rate.`, r, 2, '%',
    `Percentage change = (final − initial) / initial × 100 = (${b.toFixed(2)} − ${a.toFixed(2)}) / ${a.toFixed(2)} × 100 = <b>${F(r)}%</b>.`, 'Problem Set A · A1') });
add(1, () => { const a = ri(105, 130) / 100, b = +(a * (1 + nz(-8, 8) / 100)).toFixed(2), c = +(b * (1 + nz(-8, 8) / 100)).toFixed(2), r = (c / a - 1) * 100;
  return num(`An exchange rate goes from ${a.toFixed(2)} USD/EUR to ${b.toFixed(2)} USD/EUR, and one year later to ${c.toFixed(2)} USD/EUR. Determine the <b>overall</b> percentage change between the initial and the final rate.`, r, 2, '%',
    `Only the initial and final values matter: (${c.toFixed(2)} − ${a.toFixed(2)}) / ${a.toFixed(2)} × 100 = <b>${F(r)}%</b>. (Adding the two yearly percentages would be wrong.)`, 'Problem Set A · A1') });
add(1, () => { const s = ri(15, 40) * 100, p = pk([5, 8, 10, 12, 15, 20]), f = s * (1 - p / 100) * (1 + p / 100);
  return num(`In ${YR()}, an employee’s salary was ${E(s)}. The company reduced it by ${p}% and, the year after, increased it by ${p}%. Calculate the salary after both changes.`, f, 2, '€',
    `After the cut: ${E(s)} × ${F(1 - p / 100, 4)} = ${E(s * (1 - p / 100))}.<br>After the rise: ${E(s * (1 - p / 100))} × ${F(1 + p / 100, 4)} = <b>${E(f)}</b>.<br>It is lower than the original: a −${p}% and a +${p}% do not cancel out.`, 'Problem Set A · A2') });
add(1, () => { const p = pk([5, 8, 10, 12, 15, 20, 25, 30, 40]), r = (1 / (1 - p / 100) - 1) * 100;
  return num(`A salary has been reduced by ${p}%. Determine the percentage increase required to restore the original salary.`, r, 2, '%',
    `Let the salary be S. After the cut it is ${F(1 - p / 100, 4)}·S. We need a factor k with ${F(1 - p / 100, 4)}·k = 1 → k = 1 / ${F(1 - p / 100, 4)} = ${F(1 / (1 - p / 100), 4)}.<br>Increase = (k − 1) × 100 = <b>${F(r)}%</b>.`, 'Problem Set A · A2') });
add(1, () => { const p = pk([2, 3, 4, 5, 6]), n = ri(3, 8), r = ((1 + p / 100) ** n - 1) * 100;
  return num(`The price of a product increases by ${p}% every year for ${n} consecutive years. Determine the overall percentage increase with respect to the initial price.`, r, 2, '%',
    `Each year multiplies the price by ${F(1 + p / 100, 4)}. After ${n} years: ${F(1 + p / 100, 4)}${sup(n)} = ${F((1 + p / 100) ** n, 4)}.<br>Overall increase = (${F((1 + p / 100) ** n, 4)} − 1) × 100 = <b>${F(r)}%</b> (not ${p} × ${n} = ${p * n}%).`, 'Problem Set A · A3') });
add(1, () => { const R = [ri(1, 4), ri(3, 6), ri(4, 8), ri(5, 9)], k = R.reduce((s, x) => s * (1 + x / 100), 1), r = (k - 1) * 100;
  return num(`The price of a product increases by ${R[0]}% in the first year, ${R[1]}% in the second, ${R[2]}% in the third and ${R[3]}% in the fourth. Determine the overall percentage increase with respect to the initial price.`, r, 2, '%',
    `Multiply the growth factors: ${R.map(x => F(1 + x / 100, 4)).join(' × ')} = ${F(k, 4)}.<br>Overall increase = (${F(k, 4)} − 1) × 100 = <b>${F(r)}%</b>.`, 'Problem Set A · A3') });
add(1, () => { const C = ri(20, 60) * 100, mk = pk([50, 60, 80, 100]), S = C * (1 + mk / 100), d1 = pk([10, 20, 25]), d2 = pk([50, 60]), pr = S * (1 - d1 / 100) - C, ls = C - S * (1 - d2 / 100);
  if (pr <= 0 || ls <= 0) return null;
  return num(`A retailer offers a ${d1}% discount on the selling price of an item and still makes a profit of ${E(pr)} over its cost price. If the retailer offers a ${d2}% discount, a loss of ${E(ls)} is incurred. Determine the <b>cost price</b> of the item.`, C, 2, '€',
    `Let P be the selling price and C the cost.<br>${F(1 - d1 / 100, 2)}·P − C = ${F(pr)} and C − ${F(1 - d2 / 100, 2)}·P = ${F(ls)}.<br>Adding both equations: (${F(1 - d1 / 100, 2)} − ${F(1 - d2 / 100, 2)})·P = ${F(pr + ls)} → P = ${E(S)}.<br>Then C = ${F(1 - d1 / 100, 2)} × ${F(S)} − ${F(pr)} = <b>${E(C)}</b>.`, 'Problem Set A · A4') });
add(1, () => { const C = ri(20, 80) * 50, mk = pk([25, 40, 50, 60, 80, 120]), S = C * (1 + mk / 100);
  return num(`An item costs the retailer ${E(C)} and is sold for ${E(S)}. Determine the percentage markup on the cost price.`, mk, 2, '%',
    `Markup = (selling price − cost) / cost × 100 = (${F(S)} − ${F(C)}) / ${F(C)} × 100 = <b>${mk}%</b>.`, 'Problem Set A · A4') });

/* ============ LECTURES 2–3 · Sequences (Problem Sets A–B, Midterm 1) ============ */
add(2, () => { const a0 = ri(20, 60), d = pk([0.25, 0.5, 0.75, 1.5, 2]), n = ri(8, 30), an = a0 - d * n;
  return num(`A company’s transport cost is ${E(a0)} per unit in the first month (a<sub>0</sub> = ${a0}) and decreases by ${E(d)} each month. Determine the transport cost in month n = ${n}.`, an, 2, '€',
    `Arithmetic sequence with difference d = −${d}: a<sub>n</sub> = a<sub>0</sub> + d·n = ${a0} − ${d}·n.<br>a<sub>${n}</sub> = ${a0} − ${d} × ${n} = <b>${E(an)}</b>.`, 'Problem Set A · A5') });
add(2, () => { const d = pk([0.25, 0.5, 0.2, 0.4]), k = ri(8, 20), p = pk([10, 20, 25]), a0 = d * k * 100 / p;
  return num(`A transport cost is ${E(a0)} per unit in the first month (a<sub>0</sub>) and decreases by ${E(d)} each month. After how many months will the cost have decreased by ${p}% with respect to its initial value?`, k, 0, 'months',
    `A ${p}% decrease means a drop of ${p / 100} × ${F(a0)} = ${E(a0 * p / 100)}.<br>Each month the cost drops ${E(d)}, so n = ${F(a0 * p / 100)} / ${d} = <b>${k} months</b>.`, 'Problem Set A · A5') });
add(2, () => { const a0 = ri(2, 12) * 100, p = pk([5, 8, 10, 12, 15]), n = ri(5, 12), an = a0 * (1 + p / 100) ** n;
  return num(`A company expects production to increase by ${p}% each month. During the first month, production is ${F(a0)} units (a<sub>0</sub> = ${a0}). Determine the number of units produced in month ${n} (round to the nearest unit).`, an, 0, 'units',
    `Geometric sequence with ratio r = ${F(1 + p / 100, 2)}: a<sub>n</sub> = ${a0} · ${F(1 + p / 100, 2)}${sup('n')}.<br>a<sub>${n}</sub> = ${a0} × ${F(1 + p / 100, 2)}${sup(n)} = ${F(an, 2)} ≈ <b>${F(an, 0)} units</b>.`, 'Problem Set A · A6') });
add(2, () => { const t = pk(['a', 'g', 'n']); let s, why;
  if (t === 'a') { const a = ri(-5, 9), d = nz(-6, 6); s = [0, 1, 2, 3].map(i => a + d * i); why = `Each term is the previous one ${d > 0 ? 'plus' : 'minus'} ${Math.abs(d)}: constant difference → <b>arithmetic</b>.` }
  else if (t === 'g') { const a = pk([2, 3, 5, 6, 100]), r = pk([2, 3, -2, 0.5, -0.1, 0.1]); s = [0, 1, 2, 3].map(i => +(a * r ** i).toFixed(4)); why = `Each term is the previous one times ${neg(r)}: constant ratio → <b>geometric</b>.` }
  else { const a = ri(1, 4); s = [a, a + 1, (a + 1) * 3, (a + 1) * 3 + ri(5, 9) * 10]; why = `Differences (${s[1] - s[0]}, ${s[2] - s[1]}, …) are not constant and ratios (${F(s[1] / s[0], 2)}, ${F(s[2] / s[1], 2)}, …) are not constant either → <b>neither</b>.` }
  const L = { a: 'Arithmetic', g: 'Geometric', n: 'Neither arithmetic nor geometric' };
  return mc(`Classify the sequence { ${s.map(x => neg(x)).join(', ')}, … }.`, L[t], [L.a, L.g, L.n, 'Both arithmetic and geometric'], why, 'Problem Set B · B1') });
add(3, () => { const a0 = ri(15, 30) * 1000, d = ri(1, 4) * 500, y0 = YR(), n = ri(10, 30), S = (n + 1) * (2 * a0 + d * n) / 2;
  return num(`A person’s annual salary in ${y0} was ${E(a0)} and increases by ${E(d)} each year. Calculate the total income earned between ${y0} and ${y0 + n} (both years included).`, S, 0, '€',
    `Arithmetic sequence a<sub>n</sub> = ${F(a0)} + ${F(d)}·n, with a<sub>0</sub> in ${y0}. There are ${n + 1} terms (n = 0 … ${n}).<br>a<sub>${n}</sub> = ${F(a0 + d * n)}.<br>Sum = (number of terms) × (first + last) / 2 = ${n + 1} × (${F(a0)} + ${F(a0 + d * n)}) / 2 = <b>${E(S)}</b>.`, 'Problem Set B · B2') });
add(3, () => { const a = ri(1, 6), d = ri(2, 6), n = ri(15, 50), last = a + d * n, S = (n + 1) * (a + last) / 2;
  return num(`Calculate the sum of all the terms of the arithmetic sequence { ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, …, ${last} }.`, S, 0, '',
    `Difference d = ${d}. Number of terms: (${last} − ${a}) / ${d} + 1 = ${n + 1}.<br>Sum = ${n + 1} × (${a} + ${last}) / 2 = <b>${F(S)}</b>.`, 'Problem Set B · B1') });
add(3, () => { const a0 = ri(10, 40) * 1000, p = pk([3, 4, 5, 6, 7, 8]), y0 = YR(), n = ri(6, 15), an = a0 * (1 + p / 100) ** n;
  return num(`A company had an annual electricity bill of ${E(a0)} in ${y0}. From that year onwards, the cost increases by ${p}% each year. What will the electricity bill be in ${y0 + n}?`, an, 2, '€',
    `Geometric sequence a<sub>n</sub> = ${F(a0)} · ${F(1 + p / 100, 2)}${sup('n')}, with n = 0 in ${y0}. Year ${y0 + n} is n = ${n}.<br>a<sub>${n}</sub> = ${F(a0)} × ${F(1 + p / 100, 2)}${sup(n)} = <b>${E(an)}</b>.`, 'Problem Set B · B3') });
add(3, () => { const a0 = ri(10, 40) * 1000, p = pk([3, 4, 5, 6, 7]), y0 = YR(), n = ri(6, 14), r = 1 + p / 100, S = a0 * (r ** (n + 1) - 1) / (r - 1);
  return num(`A company had an annual electricity bill of ${E(a0)} in ${y0}, and the cost increases by ${p}% each year. How much will the company spend on electricity between ${y0} and ${y0 + n} (both years included)?`, S, 2, '€',
    `Geometric sum with a<sub>0</sub> = ${F(a0)}, r = ${F(r, 2)} and ${n + 1} terms (n = 0 … ${n}):<br>S = a<sub>0</sub> · (r${sup('n+1')} − 1) / (r − 1) = ${F(a0)} × (${F(r, 2)}${sup(n + 1)} − 1) / ${F(r - 1, 2)} = <b>${E(S)}</b>.`, 'Problem Set B · B3') });
add(3, () => { const a0 = ri(10, 30) * 1000, p = pk([4, 5, 6, 7, 8]), y0 = YR(), T = a0 * pk([2, 3, 4, 5]), x = Math.log(T / a0) / Math.log(1 + p / 100), n = Math.floor(x) + 1;
  return num(`A company had an annual electricity bill of ${E(a0)} in ${y0}, and the cost increases by ${p}% each year. In which year will the annual bill first exceed ${E(T)}?`, y0 + n, 0, '',
    `Solve ${F(a0)} · ${F(1 + p / 100, 2)}${sup('n')} > ${F(T)} → ${F(1 + p / 100, 2)}${sup('n')} > ${F(T / a0)} → n > ln(${F(T / a0)}) / ln(${F(1 + p / 100, 2)}) = ${F(x, 2)}.<br>The first whole year is n = ${n}, that is, <b>${y0 + n}</b>.`, 'Problem Set B · B3') });
add(3, () => { const a0 = pk([50, 64, 81, 100, 200, 500]), r = pk([-0.8, -0.5, 0.5, 0.9, -0.25, 0.75, 0.6, -0.6]), n = ri(5, 10), an = a0 * r ** n;
  return num(`Given the sequence { ${[0, 1, 2, 3].map(i => neg(+(a0 * r ** i).toFixed(4))).join(', ')}, … }, determine a<sub>${n}</sub> (the first term is a<sub>0</sub>).`, an, 2, '',
    `Geometric sequence with ratio r = ${neg(+(a0 * r).toFixed(4))} / ${a0} = ${neg(r)}, so a<sub>n</sub> = ${a0} · (${neg(r)})${sup('n')}.<br>a<sub>${n}</sub> = ${a0} × (${neg(r)})${sup(n)} = <b>${F(an, 2)}</b>.`, 'Midterm 1 (2025) · Q1') });
add(3, () => { const a0 = pk([50, 64, 81, 100, 200]), r = pk([-0.8, -0.5, 0.5, 0.9, 0.75, 0.6, 1 / 3]), k = ri(4, 8), S = a0 * (1 - r ** k) / (1 - r);
  return num(`A geometric sequence has a<sub>0</sub> = ${a0} and a<sub>1</sub> = ${neg(+(a0 * r).toFixed(4))}. Calculate the sum of its first ${k} terms.`, S, 2, '',
    `Ratio r = a<sub>1</sub> / a<sub>0</sub> = ${neg(+r.toFixed(4))}. The first ${k} terms are a<sub>0</sub> … a<sub>${k - 1}</sub>.<br>S = a<sub>0</sub> · (1 − r${sup(k)}) / (1 − r) = ${a0} × (1 − (${neg(+r.toFixed(4))})${sup(k)}) / ${F(1 - r, 4)} = <b>${F(S, 2)}</b>.`, 'Midterm 1 (2024/2025) · Q1') });
add(3, () => { const a0 = pk([6, 50, 81, 100, 200, 500]), r = pk([-0.8, -0.5, 0.5, 0.9, -0.1, 0.75, 0.25, 1 / 3]), S = a0 / (1 - r);
  return num(`A geometric sequence has a<sub>0</sub> = ${a0} and ratio r = ${neg(+r.toFixed(4))}. Calculate the infinite sum of its terms.`, S, 2, '',
    `Since |r| = ${F(Math.abs(r), 4)} &lt; 1, the infinite sum exists: S<sub>∞</sub> = a<sub>0</sub> / (1 − r) = ${a0} / ${F(1 - r, 4)} = <b>${F(S, 2)}</b>.`, 'Midterm 1 (2025) · Q1 · Problem Set B · B1') });
add(3, () => { const r = pk([-0.8, 0.8, 1.2, -1.5, 0.5, -0.5, 2]), a0 = pk([81, 100, 64]); const A = Math.abs(r);
  const right = r < 0 ? (A < 1 ? 'Not monotonic; its limit is 0' : 'Not monotonic; it has no limit') : (A < 1 ? 'Monotonically decreasing; its limit is 0' : 'Monotonically increasing; it has no finite limit');
  return mc(`A geometric sequence has a<sub>0</sub> = ${a0} and ratio r = ${neg(r)}. Which statement is true?`, right, ['Not monotonic; its limit is 0', 'Not monotonic; it has no limit', 'Monotonically decreasing; its limit is 0', 'Monotonically increasing; it has no finite limit', 'Monotonically decreasing; its limit is ' + a0],
    `${r < 0 ? 'r &lt; 0, so the signs alternate: the sequence is <b>not monotonic</b>.' : (A < 1 ? '0 &lt; r &lt; 1 and a<sub>0</sub> &gt; 0: every term is smaller than the previous one → <b>decreasing</b>.' : 'r &gt; 1 and a<sub>0</sub> &gt; 0: every term is larger than the previous one → <b>increasing</b>.')}<br>${A < 1 ? '|r| &lt; 1, so the terms shrink towards <b>0</b>.' : '|r| &gt; 1, so the terms grow without bound: <b>no finite limit</b>.'}`, 'Midterm 1 (2024/2025) · Q1') });
add(3, () => { const u = ri(15, 40) * 100, p = pk([2, 3, 4, 5]), y0 = YR(), n = ri(5, 15), an = u * (1 - p / 100) ** n;
  return num(`In ${y0} a company sells ${F(u)} units of a product and, from then on, annual demand decreases by ${p}% compared with the previous year. How many units will be sold in ${y0 + n}? (Round to the nearest unit.)`, an, 0, 'units',
    `Geometric sequence with ratio r = ${F(1 - p / 100, 2)}: a<sub>n</sub> = ${F(u)} · ${F(1 - p / 100, 2)}${sup('n')}.<br>a<sub>${n}</sub> = ${F(u)} × ${F(1 - p / 100, 2)}${sup(n)} = ${F(an, 2)} ≈ <b>${F(an, 0)} units</b>.`, 'Problem Set B · B4') });

/* ============ LECTURE 4 · Simple and compound interest (Problem Set B, Midterm 1) ============ */
const PER = { 1: ['annually', 'year'], 2: ['every six months', 'semester'], 4: ['quarterly', 'quarter'], 12: ['monthly', 'month'] };
add(4, () => { const C = ri(1, 50) * 100, i = pk([2, 2.5, 3, 3.5, 4, 5]), m = pk([2, 4, 12]), t = ri(3, 25), f = C * (1 + i / 100 / m) ** (m * t);
  return num(`A bank offers an account paying compound interest at a nominal annual rate of ${i}%, with interest credited ${PER[m][0]}. How much money will be in the account after ${t} years if ${E(C)} is deposited today?`, f, 2, '€',
    `Rate per period = ${i}% / ${m} = ${F(i / m, 4)}%. Number of periods = ${m} × ${t} = ${m * t}.<br>C<sub>f</sub> = C<sub>0</sub> · (1 + i/m)${sup('m·t')} = ${F(C)} × ${F(1 + i / 100 / m, 6)}${sup(m * t)} = <b>${E(f)}</b>.`, 'Problem Set B · B5') });
add(4, () => { const T = ri(1, 20) * 5000, i = pk([2, 3, 3.5, 4, 5]), m = pk([2, 4, 12]), t = ri(3, 15), C = T / (1 + i / 100 / m) ** (m * t);
  return num(`A bank deposit offers ${i}% nominal annual compound interest, with interest credited ${PER[m][0]}. What initial amount must be deposited in order to have ${E(T)} in ${t} years?`, C, 2, '€',
    `C<sub>f</sub> = C<sub>0</sub> · (1 + i/m)${sup('m·t')} → C<sub>0</sub> = C<sub>f</sub> / (1 + i/m)${sup('m·t')}.<br>C<sub>0</sub> = ${F(T)} / ${F(1 + i / 100 / m, 6)}${sup(m * t)} = <b>${E(C)}</b>.`, 'Midterm 1 (2024) · Q2 · Problem Set B · B5') });
add(4, () => { const C = ri(10, 60) * 5000, k = pk([1.25, 4 / 3, 1.5, 2]), T = Math.round(C * k / 1000) * 1000, i = pk([3, 4, 5, 6]), m = pk([2, 4]), x = Math.log(T / C) / Math.log(1 + i / 100 / m), n = Math.ceil(x - 1e-9);
  if (T <= C) return null;
  return num(`A bank offers an account paying ${i}% nominal annual interest, credited ${PER[m][0]}. If ${E(C)} is deposited, how many ${PER[m][1]}s will it take for the balance to reach ${E(T)}?`, n, 0, PER[m][1] + 's',
    `Solve ${F(C)} · ${F(1 + i / 100 / m, 4)}${sup('n')} = ${F(T)} → ${F(1 + i / 100 / m, 4)}${sup('n')} = ${F(T / C, 4)} → n = ln(${F(T / C, 4)}) / ln(${F(1 + i / 100 / m, 4)}) = ${F(x, 2)}.<br>Interest is credited at the end of each ${PER[m][1]}, so we need <b>${n} ${PER[m][1]}s</b>.`, 'Problem Set B · B6 · Midterm 1 (2024) · Q2') });
add(4, () => { const C = ri(5, 60) * 100, i = pk([2, 3, 4, 5, 6]), t = ri(2, 10), f = C * (1 + i / 100 * t);
  return num(`${E(C)} is invested at <b>simple</b> interest of ${i}% per year. What is the final capital after ${t} years?`, f, 2, '€',
    `With simple interest the interest is always computed on the initial capital: C<sub>f</sub> = C<sub>0</sub> · (1 + i·t) = ${F(C)} × (1 + ${F(i / 100, 2)} × ${t}) = <b>${E(f)}</b>.`, 'Lecture 4 · simple interest') });
add(4, () => { const Cf = ri(5, 30) * 1000, i = pk([3, 3.6, 4.5, 4.8, 6]), g = (1 + i / 1200) ** 12, s = g ** 3 + g ** 2 + g, C = Cf / s, y = ri(2018, 2024);
  return num(`A bank deposit pays a ${i}% nominal annual interest rate, compounded monthly. You invest the same amount C<sub>0</sub> on 1 January ${y}, ${y + 1} and ${y + 2}. On 1 January ${y + 3}, before any new contribution, the balance is ${E(Cf)}. Determine C<sub>0</sub>.`, C, 2, '€',
    `One year multiplies a deposit by (1 + ${F(i / 100, 3)}/12)${sup(12)} = ${F(g, 6)}.<br>The three deposits stay 3, 2 and 1 years: C<sub>f</sub> = C<sub>0</sub> · (${F(g, 6)}${sup(3)} + ${F(g, 6)}${sup(2)} + ${F(g, 6)}) = C<sub>0</sub> · ${F(s, 6)}.<br>C<sub>0</sub> = ${F(Cf)} / ${F(s, 6)} = <b>${E(C)}</b>.`, 'Midterm 1 (2025) · Q2') });
add(4, () => { const T = ri(5, 40) * 5000, i = pk([2, 3, 4]), g = (1 + i / 400) ** 4, a = ri(2, 4) * 10, s = g ** a + g ** (a - 10), C = T / s, y = 2030;
  return num(`An account pays ${i}% nominal annual interest, credited quarterly. Two equal deposits are made at the beginning of ${y} and ${y + 10}. How much should each deposit be so that the balance is ${E(T)} at the beginning of ${y + a}?`, C, 2, '€',
    `One year multiplies the balance by (1 + ${F(i / 100, 2)}/4)${sup(4)} = ${F(g, 6)}.<br>The first deposit stays ${a} years and the second ${a - 10} years: ${F(T)} = C · (${F(g, 6)}${sup(a)} + ${F(g, 6)}${sup(a - 10)}) = C · ${F(s, 5)}.<br>C = ${F(T)} / ${F(s, 5)} = <b>${E(C)}</b>.`, 'Problem Set B · B5') });

/* ============ LECTURE 5 · EAR (Problem Set C, Midterm 1) ============ */
const ear = (i, m) => (1 + i / 100 / m) ** m - 1;
add(5, () => { const i = pk([2.4, 2.9, 3, 3.5, 4, 4.5, 5, 6]), m = pk([2, 4, 12, 365]), e = ear(i, m) * 100, w = { 2: 'semi-annually', 4: 'quarterly', 12: 'monthly', 365: 'daily' }[m];
  return num(`A bank deposit pays a ${i}% nominal annual interest rate, compounded ${w}. Calculate the effective annual rate (EAR).`, e, 2, '%',
    `EAR = (1 + i/m)${sup('m')} − 1 = (1 + ${F(i / 100, 4)}/${m})${sup(m)} − 1 = ${F(e / 100, 6)} → <b>${F(e)}%</b>.`, 'Problem Set C · C1 · Midterm 1 (2025) · Q2') });
add(5, () => { const B = [[pk([2.4, 2.5, 2.6]), 12, 'monthly'], [pk([2.7, 2.8, 3]), 4, 'quarterly'], [pk([2.65, 2.75, 2.9]), 365, 'daily']], e = B.map(b => ear(b[0], b[1]) * 100), best = e.indexOf(Math.max(...e)), N = ['Bank A', 'Bank B', 'Bank C'];
  if (Math.abs(e[0] - e[1]) < .02 || Math.abs(e[1] - e[2]) < .02 || Math.abs(e[0] - e[2]) < .02) return null;
  return mc(`We want to invest a capital and have three options:<br>Bank A: nominal annual rate of ${B[0][0]}%, compounded monthly.<br>Bank B: nominal annual rate of ${B[1][0]}%, compounded quarterly.<br>Bank C: nominal annual rate of ${B[2][0]}%, compounded daily.<br>Which one offers the highest effective annual rate (EAR)?`, N[best], N.concat(['All three offer the same EAR']),
    `EAR = (1 + i/m)${sup('m')} − 1.<br>${B.map((b, k) => `${N[k]}: (1 + ${F(b[0] / 100, 4)}/${b[1]})${sup(b[1])} − 1 = ${F(e[k], 3)}%`).join('<br>')}<br>The highest is <b>${N[best]}</b>.`, 'Problem Set C · C1') });
add(5, () => { const i = pk([2.4, 3, 3.6, 4.2, 4.8]), m = pk([4, 12]), n = ri(3, 10), k = ((1 + i / 100 / m) ** (m * n) - 1) * 100;
  return num(`A capital is invested for ${n} years at a nominal annual rate of ${i}%, compounded ${m === 12 ? 'monthly' : 'quarterly'}. What is the overall percentage increase in the capital after the ${n} years?`, k, 2, '%',
    `Growth factor = (1 + ${F(i / 100, 4)}/${m})${sup(m * n)} = ${F(1 + k / 100, 5)}.<br>Overall increase = (${F(1 + k / 100, 5)} − 1) × 100 = <b>${F(k)}%</b>.`, 'Problem Set C · C1') });

/* ============ LECTURE 6 · Mortgages (Problem Set C, Midterm 1) ============ */
const pay = (L, r, N) => L * r / (1 - (1 + r) ** -N), bal = (a, r, n) => a * (1 - (1 + r) ** -n) / r;
const MW = { 2: ['six-monthly', 'six-month period'], 4: ['quarterly', 'quarter'], 12: ['monthly', 'month'] };
const mort = () => { const L = ri(10, 50) * 10000, i = pk([2, 2.3, 2.4, 2.5, 3, 3.5, 4, 6]), m = pk([2, 4, 12]), T = pk([15, 20, 25, 30]), r = i / 100 / m, N = m * T; return { L, i, m, T, r, N, a: pay(L, r, N) } };
const form = M => `Rate per period r = ${M.i}% / ${M.m} = ${F(M.r, 6)}; number of payments N = ${M.m} × ${M.T} = ${M.N}.<br>Payment a = L · r / (1 − (1 + r)${sup('−N')}) = ${F(M.L)} × ${F(M.r, 6)} / (1 − ${F(1 + M.r, 6)}${sup('−' + M.N)}) = ${E(M.a)}.`;
add(6, () => { const M = mort();
  return num(`We buy a property and finance ${E(M.L)} with a ${M.T}-year mortgage at a fixed nominal annual interest rate of ${M.i}%, with ${MW[M.m][0]} payments made at the end of each ${MW[M.m][1]}. What is the ${MW[M.m][0]} payment?`, M.a, 2, '€',
    form(M).replace(/= (€[\d,.]+)\.$/, '= <b>$1</b>.'), 'Problem Set C · C2–C3 · Midterm 1 · Q3') });
add(6, () => { const M = mort(), k = pk([5, 8, 10, 12, 15].filter(x => x < M.T)), B = bal(M.a, M.r, M.N - M.m * k);
  return num(`A ${E(M.L)} property is financed with a ${M.T}-year mortgage at a fixed nominal annual rate of ${M.i}%, with ${MW[M.m][0]} payments. What is the outstanding mortgage balance after ${k} years?`, B, 2, '€',
    form(M) + `<br>After ${k} years there are ${M.N} − ${M.m * k} = ${M.N - M.m * k} payments left. The outstanding balance is their present value:<br>B = a · (1 − (1 + r)${sup('−' + (M.N - M.m * k))}) / r = <b>${E(B)}</b>.`, 'Problem Set C · C2') });
add(6, () => { const M = mort(), k = pk([5, 10].filter(x => x < M.T)), B = bal(M.a, M.r, M.N - M.m * k), cap = M.L - B;
  return num(`A ${E(M.L)} property is purchased with a ${M.T}-year mortgage at a fixed nominal annual rate of ${M.i}%, with ${MW[M.m][0]} payments. How much capital is repaid during the first ${k} years of the loan?`, cap, 2, '€',
    form(M) + `<br>Outstanding balance after ${k} years (${M.N - M.m * k} payments left): B = a · (1 − (1 + r)${sup('−' + (M.N - M.m * k))}) / r = ${E(B)}.<br>Capital repaid = ${F(M.L)} − ${F(B, 2)} = <b>${E(cap)}</b>.`, 'Problem Set C · C3') });
add(6, () => { const P = ri(20, 60) * 12500, fin = pk([70, 80, 90]), tax = pk([5, 8, 10]), x = P * (1 - fin / 100) + P * tax / 100;
  return num(`We buy a property for ${E(P)}. The bank finances ${fin}% of the purchase price. What is the total amount we need to pay at the time of purchase, taking into account the part not financed by the bank and a property transfer tax equal to ${tax}% of the purchase price?`, x, 2, '€',
    `Part not financed: ${100 - fin}% of ${F(P)} = ${E(P * (1 - fin / 100))}.<br>Tax: ${tax}% of ${F(P)} = ${E(P * tax / 100)}.<br>Total = <b>${E(x)}</b>.`, 'Problem Set C · C4') });
add(6, () => { const M = mort(), x = M.a - M.a / (1 + M.r);
  return num(`A ${E(M.L)} loan is repaid over ${M.T} years at a fixed nominal annual rate of ${M.i}%, with ${MW[M.m][0]} payments at the end of each ${MW[M.m][1]}. In the <b>final</b> payment, how much is paid in interest?`, x, 2, '€',
    form(M) + `<br>Before the last payment the outstanding balance is a / (1 + r) = ${E(M.a / (1 + M.r))}.<br>Interest in the last payment = balance × r = ${F(M.a / (1 + M.r), 2)} × ${F(M.r, 6)} = <b>${E(x)}</b>.`, 'Problem Set C · C4') });
add(6, () => { const M = mort(), k = pk([5, 8, 10].filter(x => x < M.T)), ex = ri(1, 5) * 10000, n2 = M.N - M.m * k, B = bal(M.a, M.r, n2), a2 = pay(B - ex, M.r, n2);
  if (ex >= B * .8) return null;
  return num(`A loan of ${E(M.L)} is repaid in ${MW[M.m][0]} instalments over ${M.T} years at a nominal annual rate of ${M.i}%. After ${k} years the borrower makes an early repayment of ${E(ex)}, keeping the remaining term. What will the new ${MW[M.m][0]} payment be?`, a2, 2, '€',
    form(M) + `<br>Balance after ${k} years (${n2} payments left): B = a · (1 − (1 + r)${sup('−' + n2)}) / r = ${E(B)}.<br>New balance = ${F(B, 2)} − ${F(ex)} = ${E(B - ex)}.<br>New payment over the same ${n2} payments: (B − ${F(ex)}) · r / (1 − (1 + r)${sup('−' + n2)}) = <b>${E(a2)}</b>.`, 'Midterm 1 (2024) · Q3 · Problem Set C · C5') });
add(6, () => { const M = mort(), tot = M.a * M.N - M.L;
  return num(`A loan of ${E(M.L)} is repaid by equal ${MW[M.m][0]} instalments over ${M.T} years at a nominal annual rate of ${M.i}%. How much interest is paid in total over the life of the loan?`, tot, 2, '€',
    form(M) + `<br>Total paid = a × N = ${F(M.a, 2)} × ${M.N} = ${E(M.a * M.N)}.<br>Total interest = total paid − loan = <b>${E(tot)}</b>.`, 'Midterm 1 (2025) · Q3') });

/* ============ LECTURE 7 · One-variable functions: evaluating, domain and range (Problem Set D, Midterm 2) ============ */
add(7, () => { const a = ri(1, 4), b = ri(2, 8) * 10, c = ri(2, 9) * 100, x = ri(5, 15), v = a * (2 * x + 1) + b;
  return num(`The total cost of producing x hundreds of units of a product is C(x) = ${P([a, b, c])}, in thousands of euros. Calculate C(${x + 1}) − C(${x}), the cost of increasing production from ${x} to ${x + 1} hundreds of units.`, v, 2, 'thousand €',
    `C(${x + 1}) = ${F(a * (x + 1) ** 2 + b * (x + 1) + c)} and C(${x}) = ${F(a * x * x + b * x + c)}.<br>C(${x + 1}) − C(${x}) = <b>${F(v)}</b> thousand euros.`, 'Problem Set D · D1') });
add(7, () => { const a = ri(1, 3), b = ri(1, 6) * 10, c = ri(2, 9) * 100, x = ri(8, 20), K = a * x * x + b * x + c;
  return num(`The total cost of producing x hundreds of units is C(x) = ${P([a, b, c])}, in thousands of euros. What level of production x corresponds to a total cost of ${F(K)} thousand euros?`, x, 2, 'hundreds of units',
    `Solve ${P([a, b, c])} = ${F(K)} → ${P([a, b, c - K])} = 0.<br>x = (−${b} ± √(${b}${sup(2)} − 4·${a}·(${c - K}))) / (2·${a}) = (−${b} ± ${F(Math.sqrt(b * b - 4 * a * (c - K)), 2)}) / ${2 * a}.<br>Only the positive root makes sense: <b>x = ${x}</b>.`, 'Problem Set D · D1') });
const iv = (l, r, lo, ro) => (lo ? '[' : '(') + l + ', ' + r + (ro ? ']' : ')');
add(7, () => { const a = nz(-4, 4), k = ri(-5, 5), b = -a * k, t = pk(['sqrt', 'ln']);     /* a·x + b ≥ 0 (or > 0), root x = k */
  const right = a > 0 ? iv(neg(k), '∞', t === 'sqrt', false) : iv('−∞', neg(k), false, t === 'sqrt');
  const all = [iv(neg(k), '∞', true, false), iv(neg(k), '∞', false, false), iv('−∞', neg(k), false, true), iv('−∞', neg(k), false, false), iv(neg(-k), '∞', true, false), 'ℝ'];
  return mc(`Determine the domain of f(x) = ${t === 'sqrt' ? '√(' + lin(a, b) + ')' : 'ln(' + lin(a, b) + ')'}.`, right, all,
    `${t === 'sqrt' ? 'The expression inside a square root must be ≥ 0' : 'The argument of a logarithm must be &gt; 0'}: ${lin(a, b)} ${t === 'sqrt' ? '≥' : '&gt;'} 0 → ${a}x ${t === 'sqrt' ? '≥' : '&gt;'} ${neg(-b)} → x ${a > 0 ? (t === 'sqrt' ? '≥' : '&gt;') : (t === 'sqrt' ? '≤' : '&lt;')} ${neg(k)}${a < 0 ? ' (dividing by a negative number reverses the inequality)' : ''}.<br>Domain = <b>${right}</b>.`, 'Problem Set D · D3') });
add(7, () => { const p = ri(-6, 8), q = p + ri(2, 12), right = iv(neg(p), neg(q), true, true);
  return mc(`Determine the domain of f(x) = √(−(x ${sg(-p)})(x ${sg(-q)})).`, right, [iv(neg(p), neg(q), false, false), `(−∞, ${neg(p)}] ∪ [${neg(q)}, ∞)`, `(−∞, ${neg(p)}) ∪ (${neg(q)}, ∞)`, 'ℝ'],
    `We need −(x ${sg(-p)})(x ${sg(-q)}) ≥ 0, that is, (x ${sg(-p)})(x ${sg(-q)}) ≤ 0.<br>The product of the two factors is negative only <b>between</b> the roots x = ${neg(p)} and x = ${neg(q)}, and it is zero at the roots.<br>Domain = <b>${right}</b>.`, 'Problem Set D · D4, D6') });
add(7, () => { const p = ri(5, 40), w = pk([2, 4, 6, 8, 10, 12]), q = p + w;
  return num(`A company distributes dividends according to D(t) = √(−(t − ${p})(t − ${q})), in millions of euros, where t is the number of years elapsed since 2020. What is the maximum amount of dividends the company can distribute?`, w / 2, 2, 'million €',
    `Inside the root there is a parabola opening downwards with roots ${p} and ${q}; its maximum is at the midpoint t = (${p} + ${q}) / 2 = ${(p + q) / 2}.<br>D(${(p + q) / 2}) = √(−(${w / 2})(−${w / 2})) = √${(w / 2) ** 2} = <b>${w / 2}</b> million euros.`, 'Problem Set D · D6') });
add(7, () => { const h = ri(1, 4), k = ri(2, 6), top = 1 / (k - h * h);                     /* x² + 2hx + k, min = k − h² */
  if (k - h * h <= 0) return null; const m = k - h * h, inside = pk([1 / m, 1 / (m + 1), 1 / (2 * m)]), fr = x => Number.isInteger(1 / x) ? (1 / x === 1 ? '1' : '1/' + (1 / x)) : F(x, 3);
  return mc(`Determine which of the following values belongs to the range of f(x) = 1 / (${P([1, 2 * h, k])}).`, fr(inside), [F(1 / m + ri(1, 3), 0), '0', neg(-ri(1, 3)), F(1 / m + 0.5, 1)],
    `Complete the square: ${P([1, 2 * h, k])} = (x + ${h})${sup(2)} + ${m}, whose smallest value is ${m} and which can be as large as we like.<br>So f takes every value in (0, 1/${m}] = (0, ${F(top, 3)}]: never 0, never negative, never above ${F(top, 3)}.<br>The only option inside that interval is <b>${fr(inside)}</b>.`, 'Midterm 2 (2025) · Q2') });
add(7, () => { const BAD = [['f(x) = log(x<sup>2</sup>)', 'x = 0 is excluded: log(0) does not exist'], ['f(x) = 1 / (x − ' + ri(1, 5) + ')', 'the denominator is zero at one point'], ['f(x) = √(x + ' + ri(1, 5) + ')', 'the square root needs a non-negative argument'], ['f(x) = ln(x)', 'only defined for x &gt; 0'], ['f(x) = (x + 1) / (x<sup>2</sup> − ' + pk([1, 4, 9]) + ')', 'the denominator is zero at two points']];
  const OK = ['f(x) = (2x + 1) / (x<sup>2</sup> + 1)', 'f(x) = √(e<sup>x</sup> + 1)', 'f(x) = (x<sup>3</sup> + 5x − 1)<sup>5</sup>', 'f(x) = e<sup>−x</sup>', 'f(x) = ln(x<sup>2</sup> + 1)', 'f(x) = √(x<sup>2</sup> + ' + ri(1, 6) + ')', 'f(x) = |x| − 3'], b = pk(BAD);
  return mc('Determine which of the following functions does <b>not</b> have domain equal to ℝ.', b[0], shuf(OK),
    `${b[0]}: ${b[1]}.<br>The other three are defined for every real x (their denominators and the arguments of their roots and logarithms are always positive).`, 'Midterm 2 (2025) · Q1') });
add(7, () => { const a = ri(1, 6), b = a + ri(1, 6), sw = Math.random() < .3, A = sw ? b : a, B = sw ? a : b;
  const right = sw ? '∅ (empty set)' : iv(neg(a), neg(b), true, true);
  return mc(`Determine the domain of f(x) = √(x − ${A}) + √(${B} − x).`, right, [iv(neg(a), neg(b), true, true), '∅ (empty set)', `[${A}, ∞)`, `(−∞, ${B}]`, iv(neg(a), neg(b), false, false)],
    `Both roots must exist at the same time: x − ${A} ≥ 0 → x ≥ ${A}, and ${B} − x ≥ 0 → x ≤ ${B}.<br>${sw ? `No number is ≥ ${A} and ≤ ${B} at once, so the domain is <b>empty</b>.` : `Domain = <b>${right}</b>.`}`, 'Problem Set D · D3') });

/* ============ LECTURE 8 · Graph shifting (Problem Set D, Midterm 2) ============ */
add(8, () => { const B = pk([['x<sup>2</sup>', h => `(x ${sg(h)})<sup>2</sup>`, 'f(x) = x<sup>2</sup>'], ['√x', h => `√(x ${sg(h)})`, 'f(x) = √x'], ['3<sup>x</sup>', h => `3<sup>x ${sg(h)}</sup>`, 'the exponential function f(x) = 3<sup>x</sup>'], ['ln x', h => `ln(x ${sg(h)})`, 'f(x) = ln x']]);
  const h = nz(-3, 3), k = nz(-4, 4), ref = Math.random() < .5;
  const ex = (hh, kk, r) => 'f(x) = ' + (r ? `−${B[1](hh)} ${sg(-kk)}` : `${B[1](hh)} ${sg(kk)}`);
  const right = ex(h, k, ref);   /* shift left by h>0 means x + h; reflection after the vertical shift flips the sign of k too */
  return mc(`We start from ${B[2]} and apply these transformations in this order:<br>1) Horizontal shift ${Math.abs(h)} unit${Math.abs(h) > 1 ? 's' : ''} to the ${h > 0 ? 'left' : 'right'}.<br>2) Vertical shift ${Math.abs(k)} unit${Math.abs(k) > 1 ? 's' : ''} ${k > 0 ? 'up' : 'down'}.${ref ? '<br>3) Reflection across the x-axis.' : ''}<br>Which is the final expression?`,
    right, [ex(-h, k, ref), ex(h, -k, ref), ex(-h, -k, ref), ex(h, k, !ref)],
    `1) A shift to the ${h > 0 ? 'left' : 'right'} replaces x by x ${sg(h)}: ${B[1](h)}.<br>2) A shift ${k > 0 ? 'up' : 'down'} ${k > 0 ? 'adds' : 'subtracts'} ${Math.abs(k)}: ${B[1](h)} ${sg(k)}.${ref ? `<br>3) Reflecting across the x-axis multiplies the <b>whole</b> expression by −1: −${B[1](h)} ${sg(-k)}.` : ''}<br>Result: <b>${right}</b>.`, 'Midterm 2 (2025) · Q3 · Problem Set D · D7') });
add(8, () => { const h = nz(-5, 5), k = nz(-6, 6);
  return mc(`Determine the range of f(x) = (x ${sg(-h)})<sup>2</sup> ${sg(k)}.`, `[${neg(k)}, ∞)`, [`(−∞, ${neg(k)}]`, `[${neg(h)}, ∞)`, 'ℝ', `[${neg(-k)}, ∞)`, `(${neg(k)}, ∞)`],
    `It is the parabola x<sup>2</sup> moved ${Math.abs(h)} to the ${h > 0 ? 'right' : 'left'} and ${Math.abs(k)} ${k > 0 ? 'up' : 'down'}. Its lowest point (vertex) is (${neg(h)}, ${neg(k)}) and it opens upwards.<br>Range = <b>[${neg(k)}, ∞)</b>.`, 'Problem Set D · D7') });
add(8, () => { const h = ri(1, 6), k = nz(-5, 5);
  return mc(`Determine the domain and range of g(x) = √(x + ${h}) ${sg(k)}.`, `Domain [−${h}, ∞), range [${neg(k)}, ∞)`, [`Domain [${h}, ∞), range [${neg(k)}, ∞)`, `Domain [−${h}, ∞), range [${neg(-k)}, ∞)`, `Domain [−${h}, ∞), range ℝ`, `Domain ℝ, range [${neg(k)}, ∞)`],
    `It is √x shifted ${h} to the left and ${Math.abs(k)} ${k > 0 ? 'up' : 'down'}.<br>Domain: x + ${h} ≥ 0 → x ≥ −${h}. Range: the root is ≥ 0, so g(x) ≥ ${neg(k)}.<br><b>Domain [−${h}, ∞), range [${neg(k)}, ∞)</b>.`, 'Problem Set D · D7') });

/* ============ LECTURE 9 · Linear and exponential functions (Problem Set E, Midterm 2) ============ */
add(9, () => { const m = nz(-5, 5), n = ri(-6, 6), x1 = ri(-4, 0), x2 = ri(1, 5);
  return mc(`Compute the line passing through (${neg(x1)}, ${neg(m * x1 + n)}) and (${x2}, ${neg(m * x2 + n)}).`, 'y = ' + lin(m, n), ['y = ' + lin(-m, n), 'y = ' + lin(m, -n || 1), 'y = ' + lin(n || 1, m), 'y = ' + lin(m, n + ri(1, 3)), 'y = ' + lin(1 / m, n)],
    `Slope m = Δy / Δx = (${neg(m * x2 + n)} − ${par(m * x1 + n)}) / (${x2} − ${par(x1)}) = ${neg(m)}.<br>y-intercept: n = y − m·x = ${neg(m * x2 + n)} − ${par(m)}·${x2} = ${neg(n)}.<br><b>y = ${lin(m, n)}</b>.`, 'Problem Set E · E1') });
add(9, () => { const m = nz(-5, 5), x1 = nz(-4, 4), y1 = ri(-5, 8), n = y1 - m * x1;
  return num(`A line passes through (${neg(x1)}, ${neg(y1)}) and has slope ${neg(m)}. What is its y-intercept?`, n, 2, '',
    `y = m·x + n → ${neg(y1)} = ${par(m)}·${par(x1)} + n → n = ${neg(y1)} − ${par(m * x1)} = <b>${neg(n)}</b>.<br>The line is y = ${lin(m, n)}.`, 'Problem Set E · E1') });
add(9, () => { const a = ri(1, 5), c = ri(1, 5), x = ri(2, 12) * 5, d = ri(5, 40), b = d + (a + c) * x / 10;
  return num(`The demand for a product is D(x) = −(${a}/10)x + ${F(b)} and its supply is S(x) = (${c}/10)x + ${d}, where x is the price. Determine the equilibrium price.`, x, 2, '€',
    `At equilibrium, supply equals demand: −${a / 10}x + ${F(b)} = ${c / 10}x + ${d}.<br>${F(b)} − ${d} = (${a / 10} + ${c / 10})x → x = ${F(b - d)} / ${F((a + c) / 10, 1)} = <b>${x}</b>.`, 'Problem Set E · E3') });
add(9, () => { const p0 = ri(1, 4) * 10, D0 = ri(40, 90), S0 = D0 - ri(8, 30), dd = ri(2, 6), ds = ri(1, 4), x = p0 + 10 * (D0 - S0) / (dd + ds);
  return num(`When the price of a product is ${p0} euros, its demand is ${D0} units and its supply is ${S0} units. If the price increases by 10 euros, demand decreases by ${dd} units and supply increases by ${ds} units. Assuming both are linear, determine the equilibrium price.`, x, 2, '€',
    `Demand: slope −${dd}/10, through (${p0}, ${D0}). Supply: slope ${ds}/10, through (${p0}, ${S0}).<br>The gap D − S is ${D0 - S0} at x = ${p0} and closes by (${dd} + ${ds})/10 = ${F((dd + ds) / 10, 1)} units per euro.<br>Equilibrium: x = ${p0} + ${D0 - S0} / ${F((dd + ds) / 10, 1)} = <b>${F(x)}</b> euros.`, 'Problem Set E · E3') });
add(9, () => { const b0 = ri(1, 9), p = pk([4, 5, 6, 8, 10, 12]), y0 = pk([2000, 2005, 2010]), t = ri(6, 20), v = b0 * (1 + p / 100) ** t;
  return num(`The profits of a company were ${b0} million euros in the year ${y0} and are expected to increase by ${p}% each year. What will the profits be in ${y0 + t}? (In millions of euros.)`, v, 2, 'million €',
    `Exponential growth: B(t) = ${b0} · ${F(1 + p / 100, 2)}${sup('t')}, with t = 0 in ${y0}.<br>B(${t}) = ${b0} × ${F(1 + p / 100, 2)}${sup(t)} = <b>${F(v)}</b> million euros.`, 'Problem Set E · E4') });
add(9, () => { const v0 = ri(1, 5) * 1000, n = ri(4, 10), up = Math.random() < .4, v1 = Math.round(v0 * (up ? pk([1.3, 1.5, 2]) : pk([.5, .6, .8])) / 10) * 10, r = (Math.pow(v1 / v0, 1 / n) - 1) * 100;
  return num(`A company’s profits were ${E(v0 * 1000)} in 2000 and ${E(v1 * 1000)} in ${2000 + n}. Assuming that profits changed each year by the same fixed percentage, what was that annual percentage? (Use a negative sign for a decrease.)`, r, 2, '%',
    `${F(v1 * 1000)} = ${F(v0 * 1000)} · k${sup(n)} → k = (${F(v1 / v0, 4)})${sup('1/' + n)} = ${F(Math.pow(v1 / v0, 1 / n), 5)}.<br>Annual change = (k − 1) × 100 = <b>${F(r)}%</b>.`, 'Problem Set E · E4') });
add(9, () => { const a = pk([0.5, 2, 3, 4, 5]), b = pk([2, 3, 0.5, 1.5]), k = ri(3, 5), v = a * b ** k;
  return num(`An exponential function f(x) = a · b<sup>x</sup> passes through (0, ${F(a, 3)}) and (1, ${F(a * b, 3)}). Calculate f(${k}).`, v, 3, '',
    `f(0) = a → a = ${F(a, 3)}. f(1) = a·b = ${F(a * b, 3)} → b = ${F(b, 3)}.<br>f(x) = ${F(a, 3)} · ${F(b, 3)}<sup>x</sup>, so f(${k}) = ${F(a, 3)} × ${F(b, 3)}${sup(k)} = <b>${F(v, 3)}</b>.`, 'Problem Set E · E5 · Midterm 2 (2024) · Q2') });
add(9, () => { const a = pk([2, 3, 4]), b = pk([2, 3]), c = nz(-4, 4);
  return mc(`A shifted exponential function g(x) = a · b<sup>x</sup> + c has horizontal asymptote y = ${neg(c)} and passes through (0, ${neg(a + c)}) and (1, ${neg(a * b + c)}). Which is its expression?`, `g(x) = ${a} · ${b}<sup>x</sup> ${sg(c)}`, [`g(x) = ${a} · ${b}<sup>x</sup> ${sg(-c)}`, `g(x) = ${b} · ${a + 1}<sup>x</sup> ${sg(c)}`, `g(x) = ${a + 1} · ${b}<sup>x</sup> ${sg(c)}`, `g(x) = ${a} · ${b + 1}<sup>x</sup> ${sg(c)}`],
    `The asymptote gives c = ${neg(c)}.<br>g(0) = a + c = ${neg(a + c)} → a = ${a}.<br>g(1) = a·b + c = ${neg(a * b + c)} → b = ${b}.<br><b>g(x) = ${a} · ${b}<sup>x</sup> ${sg(c)}</b>.`, 'Midterm 2 (2024) · Q2 · Problem Set E · E5') });
add(9, () => { const A0 = ri(100, 140) * 100, B0 = ri(10, 30) * 100, ga = ri(5, 20) * 10, gb = ga / 2 + ri(15, 40) * 10, t = (A0 / 2 - B0) / (gb - ga / 2), y = Math.round(2000 + t);
  if (t <= 2 || t > 60) return null;
  return num(`In a natural park, in the year 2000 the population of species A was ${F(A0)} individuals and that of species B was ${F(B0)}. In 2010 the population of A was ${F(A0 + 10 * ga)} and that of B was ${F(B0 + 10 * gb)}. Assuming linear growth, in which year (approximately) will the population of B reach half the population of A?`, y, 0, '',
    `A(t) = ${F(A0)} + ${ga}t and B(t) = ${F(B0)} + ${gb}t, with t in years since 2000.<br>B = A/2 → ${F(B0)} + ${gb}t = ${F(A0 / 2)} + ${ga / 2}t → t = ${F(A0 / 2 - B0)} / ${F(gb - ga / 2)} = ${F(t, 2)}.<br>Approximately the year <b>${y}</b>.`, 'Problem Set E · E2') });

/* ============ LECTURE 10 · Polynomial functions (Problem Set E, Midterm 2) ============ */
add(10, () => { const a = ri(1, 4), h = nz(-4, 5), k = ri(-8, 8), b = -2 * a * h, c = a * h * h + k;
  return mc(`Given f(x) = ${P([a, b, c])}, find the range of f.`, `[${neg(k)}, ∞)`, [`(−∞, ${neg(k)}]`, `[${neg(h)}, ∞)`, 'ℝ', `[${neg(c)}, ∞)`, `[${neg(-k)}, ∞)`],
    `It is a parabola opening upwards. Vertex: x = −b / (2a) = ${neg(-b)} / ${2 * a} = ${neg(h)}, and f(${neg(h)}) = ${neg(k)}.<br>The lowest value is ${neg(k)}: range = <b>[${neg(k)}, ∞)</b>.`, 'Problem Set E · E6') });
add(10, () => { const a = ri(1, 3), p = ri(-6, 3), q = p + ri(1, 7), b = -a * (p + q), c = a * p * q;
  return mc(`Given f(x) = ${P([a, b, c])}, find the domain of √f(x).`, `(−∞, ${neg(p)}] ∪ [${neg(q)}, ∞)`, [`[${neg(p)}, ${neg(q)}]`, `(−∞, ${neg(p)}) ∪ (${neg(q)}, ∞)`, `(${neg(p)}, ${neg(q)})`, 'ℝ'],
    `We need f(x) ≥ 0. Roots: ${P([a, b, c])} = ${a === 1 ? '' : a}(x ${sg(-p)})(x ${sg(-q)}) = 0 → x = ${neg(p)} and x = ${neg(q)}.<br>The parabola opens upwards, so it is ≥ 0 <b>outside</b> the roots (and at them).<br>Domain = <b>(−∞, ${neg(p)}] ∪ [${neg(q)}, ∞)</b>.`, 'Problem Set E · E6') });
add(10, () => { const r1 = ri(-4, -1), r2 = pk([0, 1]), r3 = ri(2, 4), a = pk([0.25, 0.5, -0.25, -0.5, 1, -1]), k = pk([0, 0, 2, -2]), x = pk([-1, 1, 2, 3].filter(v => v !== r1 && v !== r2 && v !== r3)), y = a * (x - r1) * (x - r2) * (x - r3) + k;
  const ex = (aa, kk, s) => `f(x) = ${neg(aa)}(x ${sg(-s * r1)})${r2 ? `(x ${sg(-s * r2)})` : 'x'}(x ${sg(-s * r3)})${kk ? ' ' + sg(kk) : ''}`;
  return mc(`A cubic polynomial has been obtained by shifting g(x) = a(x − r<sub>1</sub>)(x − r<sub>2</sub>)(x − r<sub>3</sub>) vertically by ${neg(k)} units. The roots of g are ${neg(r1)}, ${r2} and ${r3}, and the polynomial passes through (${neg(x)}, ${F(y, 3)}). Which is its expression?`, ex(a, k, 1), [ex(-a, k, 1), ex(a, k, -1), ex(a, k ? -k : 2, 1), ex(a * 2, k, 1)],
    `Roots ${neg(r1)}, ${r2}, ${r3} give the factors (x ${sg(-r1)})${r2 ? `(x ${sg(-r2)})` : 'x'}(x ${sg(-r3)}) — a root r gives the factor (x − r).<br>${k ? `The vertical shift adds ${neg(k)}.<br>` : ''}Check the point: at x = ${neg(x)} the product of the factors is ${neg((x - r1) * (x - r2) * (x - r3))}, so a·${par((x - r1) * (x - r2) * (x - r3))} ${k ? sg(k) + ' ' : ''}= ${F(y, 3)} → a = ${neg(a)}.<br><b>${ex(a, k, 1)}</b>.`, 'Midterm 2 (2025) · Q10') });
add(10, () => { const p = ri(-5, 2), q = p + ri(1, 6), a = ri(1, 3);
  return num(`Find the <b>largest</b> root of f(x) = ${P([a, -a * (p + q), a * p * q])}.`, q, 2, '',
    `x = (−b ± √(b${sup(2)} − 4ac)) / (2a) with a = ${a}, b = ${neg(-a * (p + q))}, c = ${neg(a * p * q)}.<br>Discriminant = ${F((a * (p + q)) ** 2 - 4 * a * a * p * q)} → roots x = ${neg(p)} and x = ${neg(q)}.<br>The largest is <b>${neg(q)}</b>.`, 'Problem Set E · E6 · practice test (Polynomials)') });

/* ============ LECTURE 11 · Logarithmic functions (Problem Set F, Midterm 2) ============ */
add(11, () => { const b = pk([2, 3, 5, 10]), k = ri(2, b === 2 ? 6 : b === 10 ? 3 : 4);
  return num(`Solve the equation log<sub>${b}</sub>(x) = ${k}.`, b ** k, 2, '',
    `log<sub>b</sub>(x) = k means x = b${sup('k')}.<br>x = ${b}${sup(k)} = <b>${F(b ** k)}</b>.`, 'Problem Set F · F3') });
add(11, () => { const b = pk([2, 3, 5]), k = ri(2, b === 2 ? 5 : 3), a = ri(2, 4), x = ri(1, 9), c = b ** k - a * x;
  return num(`Solve the equation log<sub>${b}</sub>(${lin(a, c)}) = ${k}.`, x, 2, '',
    `${lin(a, c)} = ${b}${sup(k)} = ${b ** k} → ${a}x = ${b ** k - c} → <b>x = ${x}</b>.<br>Check: the argument ${lin(a, c)} is positive at x = ${x}, so the solution is valid.`, 'Problem Set F · F3') });
add(11, () => { const a = ri(2, 6), x = ri(1, 6);
  return num(`Solve the equation ln(e<sup>${a}x</sup>) = ${a * x}.`, x, 2, '',
    `ln and e cancel: ln(e<sup>${a}x</sup>) = ${a}x.<br>${a}x = ${a * x} → <b>x = ${x}</b>.`, 'Problem Set F · F3') });
add(11, () => { const a = pk([2, 3]), b = pk([5, 7, 4]), x = ri(2, 4);
  return num(`Solve the equation ${a}<sup>x</sup> · ${b}<sup>x</sup> = ${F((a * b) ** x)}.`, x, 2, '',
    `Same exponent: ${a}<sup>x</sup> · ${b}<sup>x</sup> = (${a}·${b})<sup>x</sup> = ${a * b}<sup>x</sup>.<br>${a * b}<sup>x</sup> = ${F((a * b) ** x)} → x = ln(${F((a * b) ** x)}) / ln(${a * b}) = <b>${x}</b>.`, 'Problem Set F · F2') });
add(11, () => { const b = pk([2, 3, 5]), k = pk(b === 2 ? [3, 4, 5] : [1, 2]), N = b ** k, ds = []; for (let d = 1; d * d < N; d++) if (N % d === 0) ds.push([d, N / d]);
  const [u, v] = pk(ds), x0 = ri(Math.max(2, v - 6), v + 4), p = x0 - u, q = x0 - v;   /* (x−p)(x−q) = N has the valid root x0 */
  if (u === v) return null; const other = p + q - x0;
  return num(`Solve the logarithmic equation log<sub>${b}</sub>(x ${sg(-p)}) + log<sub>${b}</sub>(x ${sg(-q)}) = ${k}. Give the valid solution.`, x0, 2, '',
    `Domain: both arguments must be positive → x &gt; ${neg(Math.max(p, q))}.<br>Sum of logs = log of the product: (x ${sg(-p)})(x ${sg(-q)}) = ${b}${sup(k)} = ${N}.<br>${P([1, -(p + q), p * q - N])} = 0 → x = ${neg(x0)} or x = ${neg(other)}.<br>x = ${neg(other)} is outside the domain, so the only solution is <b>x = ${neg(x0)}</b>.`, 'Problem Set F · F4–F5 · Midterm 2 (2025) · Q4') });
add(11, () => { const N0 = ri(5, 30), g = pk([1.5, 2, 1.25, 3]), t1 = ri(4, 12), k = Math.log(g) / t1;
  return num(`A user base grows according to N(t) = ${N0}·e<sup>kt</sup>, with t in months and N in thousands of users. After ${t1} months the company has ${F(N0 * g, 2)} thousand users. Find k (4 decimals).`, k, 4, '',
    `${F(N0 * g, 2)} = ${N0}·e<sup>${t1}k</sup> → e<sup>${t1}k</sup> = ${F(g, 3)} → ${t1}k = ln(${F(g, 3)}) → k = ln(${F(g, 3)}) / ${t1} = <b>${F(k, 4)}</b>.`, 'Problem Set F · F6') });
add(11, () => { const N0 = ri(5, 30), k = ri(20, 80) / 1000, m = pk([2, 3, 4, 5]), t = Math.log(m) / k;
  return num(`A user base grows according to N(t) = ${N0}·e<sup>${k}t</sup>, with t in months. How long will it take for the initial user base to be multiplied by ${m}? (2 decimals.)`, t, 2, 'months',
    `${m}·${N0} = ${N0}·e<sup>${k}t</sup> → e<sup>${k}t</sup> = ${m} → t = ln(${m}) / ${k} = <b>${F(t)}</b> months.`, 'Problem Set F · F6') });
add(11, () => { const a = ri(2, 12), x = Math.log(a);
  return num(`Solve the equation e<sup>2x</sup> − ${a}e<sup>x</sup> = 0 (3 decimals).`, x, 3, '',
    `Factor: e<sup>x</sup>(e<sup>x</sup> − ${a}) = 0. Since e<sup>x</sup> is never 0, e<sup>x</sup> = ${a} → x = ln ${a} = <b>${F(x, 3)}</b>.`, 'Problem Set F · F5') });
add(11, () => { const n = ri(2, 4), m = ri(2, 5), k = pk([100, 1000]);
  const R = `${Math.log10(k)} + ${n}·log x − ${m}·log(y + 10)`;
  return mc(`Simplify log( ${k}x<sup>${n}</sup> / (y + 10)<sup>${m}</sup> ) using the properties of logarithms (log = base 10).`, R, [`${Math.log10(k)} + ${n}·log x + ${m}·log(y + 10)`, `${k} + ${n}·log x − ${m}·log(y + 10)`, `${Math.log10(k)}·${n}·log x − ${m}·log(y + 10)`, `${Math.log10(k)} + ${n}·log x − ${m}·log y − ${m}`],
    `log of a quotient = difference; log of a product = sum; exponents come down as factors.<br>log ${k} + log x<sup>${n}</sup> − log (y + 10)<sup>${m}</sup> = <b>${R}</b>.<br>(log(y + 10) cannot be split: there is no rule for the log of a sum.)`, 'Problem Set F · F1') });

/* ============ LECTURE 12 · Power and irrational functions ============ */
add(12, () => { const b = ri(2, 9), a = ri(1, 20), x = b * b - a;
  return num(`Solve the equation √(x + ${a}) = ${b}.`, x, 2, '',
    `Square both sides: x + ${a} = ${b * b} → <b>x = ${neg(x)}</b>.<br>Check: √(${neg(x)} + ${a}) = √${b * b} = ${b} ✓.`, 'Lecture 12 · irrational functions') });
add(12, () => { const B = pk([[8, 3], [27, 3], [16, 4], [32, 5], [64, 3], [81, 4], [4, 2], [9, 2], [25, 2]]), p = ri(2, 3), neg1 = Math.random() < .35, e = (neg1 ? -1 : 1) * p / B[1], v = Math.pow(Math.round(Math.pow(B[0], 1 / B[1])), neg1 ? -p : p);
  if (p === B[1]) return null;
  return num(`Compute ${B[0]}<sup>${neg1 ? '−' : ''}${p}/${B[1]}</sup>.`, v, 4, '',
    `x<sup>p/q</sup> is the q-th root of x raised to p: the ${B[1] === 2 ? 'square' : B[1] === 3 ? 'cube' : B[1] + 'th'} root of ${B[0]} is ${Math.round(Math.pow(B[0], 1 / B[1]))}, and ${Math.round(Math.pow(B[0], 1 / B[1]))}${sup(p)} = ${Math.round(Math.pow(B[0], 1 / B[1])) ** p}.${neg1 ? `<br>The negative exponent means the reciprocal: 1 / ${Math.round(Math.pow(B[0], 1 / B[1])) ** p}.` : ''}<br>Result: <b>${F(v, 4)}</b>.`, 'Lecture 12 · power functions') });
add(12, () => { const n = pk([2, 3]), a = ri(1, 9);
  const right = n === 2 ? `[${a}, ∞)` : 'ℝ';
  return mc(`Determine the domain of f(x) = ${n === 2 ? '√' : '∛'}(x − ${a}).`, right, [`[${a}, ∞)`, 'ℝ', `(${a}, ∞)`, `(−∞, ${a}]`, `ℝ \\ {${a}}`],
    n === 2 ? `An even root needs a non-negative argument: x − ${a} ≥ 0 → <b>[${a}, ∞)</b>.` : `An odd root exists for every real number (cube roots of negative numbers are fine), so the domain is <b>ℝ</b>.`, 'Lecture 12 · Problem Set D · D3') });

/* ============ LECTURE 13 · Derivative function (Problem Sets F–G, Midterm 2) ============ */
add(13, () => { const c = [nz(-3, 3), nz(-4, 4), ri(-6, 6), ri(-9, 9)], x = nz(-2, 3), v = 3 * c[0] * x * x + 2 * c[1] * x + c[2];
  return num(`Given f(x) = ${P(c)}, compute f′(${neg(x)}).`, v, 2, '',
    `Differentiate term by term: f′(x) = ${P([3 * c[0], 2 * c[1], c[2]])}.<br>f′(${neg(x)}) = <b>${neg(v)}</b>.`, 'Problem Set F · F7') });
add(13, () => { const a = ri(1, 5), b = nz(-5, 5), c = ri(1, 4), d = nz(-4, 4), x = pk([0, 1, 2].filter(v => c * v + d !== 0)), det = a * d - b * c, v = det / (c * x + d) ** 2;
  if (!det) return null;
  return num(`Given f(x) = (${lin(a, b)}) / (${lin(c, d)}), compute f′(${x}) (3 decimals).`, v, 3, '',
    `Quotient rule: f′ = (u′v − uv′) / v<sup>2</sup> with u = ${lin(a, b)}, v = ${lin(c, d)}.<br>f′(x) = (${a}(${lin(c, d)}) − ${c}(${lin(a, b)})) / (${lin(c, d)})<sup>2</sup> = ${neg(det)} / (${lin(c, d)})<sup>2</sup>.<br>f′(${x}) = ${neg(det)} / ${(c * x + d) ** 2} = <b>${F(v, 3)}</b>.`, 'Problem Set G · G1') });
add(13, () => { const a = nz(-3, 3), b = ri(1, 5), n = ri(2, 5), x = pk([0, 1, -1, 2]), v = n * (a * x * x + b) ** (n - 1) * 2 * a * x;
  return num(`Given f(x) = (${P([a, 0, b])})<sup>${n}</sup>, compute f′(${neg(x)}).`, v, 2, '',
    `Chain rule: f′(x) = ${n}(${P([a, 0, b])})<sup>${n - 1}</sup> · ${P([2 * a, 0])} = ${neg(2 * a * n)}x(${P([a, 0, b])})<sup>${n - 1}</sup>.<br>f′(${neg(x)}) = ${neg(2 * a * n)} · ${par(x)} · ${par(a * x * x + b)}<sup>${n - 1}</sup> = <b>${neg(v)}</b>.`, 'Problem Set G · G3') });
add(13, () => { const k = nz(-3, 3), x = pk([0, 1]), v = Math.exp(k * x) * (1 + k * x);
  return num(`Given f(x) = x · e<sup>${k === 1 ? '' : k === -1 ? '−' : neg(k)}x</sup>, compute f′(${x}) (3 decimals).`, v, 3, '',
    `Product rule: f′(x) = 1·e<sup>${neg(k)}x</sup> + x·${par(k)}e<sup>${neg(k)}x</sup> = e<sup>${neg(k)}x</sup>(1 ${sg(k)}x).<br>f′(${x}) = e<sup>${neg(k * x)}</sup> × ${neg(1 + k * x)} = <b>${F(v, 3)}</b>.`, 'Problem Set G · G1, G7') });
add(13, () => { const s = ri(2, 6), a = ri(1, 4), x = ri(1, 4), b = s * s - a * x, v = a / (2 * s);
  return num(`Given f(x) = √(${lin(a, b)}), compute f′(${x}) (4 decimals).`, v, 4, '',
    `Chain rule: f′(x) = ${a} / (2√(${lin(a, b)})).<br>At x = ${x} the root is √${s * s} = ${s}, so f′(${x}) = ${a} / ${2 * s} = <b>${F(v, 4)}</b>.`, 'Problem Set G · G3 · Midterm 2 (2024) · Q1') });
add(13, () => { const a = ri(1, 4), b = ri(1, 6), x = ri(1, 3), v = 2 * a * x / (a * x * x + b);
  return num(`Given f(x) = ln(${P([a, 0, b])}), compute f′(${x}) (4 decimals).`, v, 4, '',
    `Chain rule: (ln u)′ = u′ / u → f′(x) = ${P([2 * a, 0])} / (${P([a, 0, b])}).<br>f′(${x}) = ${2 * a * x} / ${a * x * x + b} = <b>${F(v, 4)}</b>.`, 'Problem Set G · G3') });
add(13, () => { const n = ri(2, 5), a = ri(1, 4), x = pk([1, Math.E]), v = x === 1 ? a : a * Math.E ** (n - 1) * (n + 1);
  return num(`Given f(x) = ${a === 1 ? '' : a}x<sup>${n}</sup> · ln(x), compute f′(${x === 1 ? '1' : 'e'}) (3 decimals).`, v, 3, '',
    `Product rule: f′(x) = ${a * n}x<sup>${n - 1}</sup>·ln x + ${a === 1 ? '' : a}x<sup>${n}</sup>·(1/x) = ${a === 1 ? '' : a}x<sup>${n - 1}</sup>(${n}·ln x + 1).<br>${x === 1 ? `ln 1 = 0, so f′(1) = ${a}·1·(0 + 1) = <b>${a}</b>.` : `ln e = 1, so f′(e) = ${a === 1 ? '' : a + '·'}e<sup>${n - 1}</sup>·${n + 1} = <b>${F(v, 3)}</b>.`}`, 'Problem Set F · F7') });
add(13, () => { const c = [nz(-3, 3), nz(-4, 4), ri(-6, 6), ri(-9, 9)], x = nz(-2, 3), v = 6 * c[0] * x + 2 * c[1];
  return num(`Given f(x) = ${P(c)}, compute the second derivative f″(${neg(x)}).`, v, 2, '',
    `f′(x) = ${P([3 * c[0], 2 * c[1], c[2]])}.<br>f″(x) = ${P([6 * c[0], 2 * c[1]])}.<br>f″(${neg(x)}) = <b>${neg(v)}</b>.`, 'Problem Set G · G2') });
add(13, () => { const k = ri(1, 5), u = `x<sup>2</sup> + ${k}`;
  return mc(`Compute the derivative of f(x) = (${u}) · ln(${u}).`, `f′(x) = 2x(ln(${u}) + 1)`, [`f′(x) = 2x / (${u})`, `f′(x) = 2x·ln(${u}) + 1`, `f′(x) = 2x·ln(${u}) + (${u}) / (2x)`, `f′(x) = ln(${u}) + 1`],
    `Product rule with u = ${u} and v = ln(${u}): u′ = 2x and v′ = 2x / (${u}).<br>f′ = 2x·ln(${u}) + (${u}) · 2x / (${u}) = 2x·ln(${u}) + 2x = <b>2x(ln(${u}) + 1)</b>.`, 'Midterm 2 (2025) · Q5') });
add(13, () => { const n = ri(2, 5), R = `f′(x) = x<sup>${n - 1}</sup>(${n}·ln x − 1) / ln<sup>2</sup>x`;
  return mc(`Compute the derivative of f(x) = x<sup>${n}</sup> / ln(x).`, R, [`f′(x) = ${n}x<sup>${n - 1}</sup> / (1/x)`, `f′(x) = x<sup>${n - 1}</sup>(${n}·ln x + 1) / ln<sup>2</sup>x`, `f′(x) = x<sup>${n - 1}</sup>(${n}·ln x − 1) / ln x`, `f′(x) = ${n}x<sup>${n - 1}</sup> / ln x`],
    `Quotient rule: f′ = (${n}x<sup>${n - 1}</sup>·ln x − x<sup>${n}</sup>·(1/x)) / ln<sup>2</sup>x = (${n}x<sup>${n - 1}</sup>·ln x − x<sup>${n - 1}</sup>) / ln<sup>2</sup>x.<br><b>${R}</b>.`, 'Problem Set G · G1') });

/* ============ LECTURE 14 · Derivative at a point and tangent line (Problem Set G, Midterm 2) ============ */
add(14, () => { const a = nz(-5, 5), b = nz(-6, 6), p = ri(-2, 2), q = p + ri(1, 5), v = a * (p + q) + b;
  return num(`Compute the average rate of change of f(x) = ${P([a, b, 0])} on [${neg(p)}, ${neg(q)}].`, v, 2, '',
    `ARC = (f(b) − f(a)) / (b − a).<br>f(${neg(q)}) = ${neg(a * q * q + b * q)} and f(${neg(p)}) = ${neg(a * p * p + b * p)}.<br>ARC = (${neg(a * q * q + b * q)} − ${par(a * p * p + b * p)}) / (${neg(q)} − ${par(p)}) = <b>${neg(v)}</b>.`, 'Problem Set G · G4') });
add(14, () => { const s1 = ri(1, 3), s2 = s1 + ri(1, 3), c = ri(0, 4), p = s1 * s1 - c, q = s2 * s2 - c, k = pk([1, 2, 3]), v = k * (s2 - s1) / (q - p);
  return num(`Determine the average rate of change of f(x) = ${k === 1 ? '' : k}√(x${c ? ' + ' + c : ''}) on the interval [${neg(p)}, ${neg(q)}] (4 decimals).`, v, 4, '',
    `f(${neg(q)}) = ${k === 1 ? '' : k + '·'}√${s2 * s2} = ${k * s2} and f(${neg(p)}) = ${k === 1 ? '' : k + '·'}√${s1 * s1} = ${k * s1}.<br>ARC = (${k * s2} − ${k * s1}) / (${neg(q)} − ${par(p)}) = ${k * (s2 - s1)} / ${q - p} = <b>${F(v, 4)}</b>.`, 'Midterm 2 (2025) · Q6 · Problem Set G · G4') });
add(14, () => { const a = nz(-4, 4), b = ri(-5, 6), x0 = nz(-2, 2), m = 3 * x0 * x0 + a, y0 = x0 ** 3 + a * x0 + b, n = y0 - m * x0;
  return mc(`Find the tangent line to f(x) = ${P([1, 0, a, b])} at x = ${neg(x0)}.`, 'y = ' + lin(m, n), ['y = ' + lin(m, y0), 'y = ' + lin(-m, n), 'y = ' + lin(m, -n || 1), 'y = ' + lin(a, b), 'y = ' + lin(m, n + 2)],
    `Point: f(${neg(x0)}) = ${neg(y0)}.<br>Slope: f′(x) = ${P([3, 0, a])} → f′(${neg(x0)}) = ${neg(m)}.<br>Tangent: y = f(x<sub>0</sub>) + f′(x<sub>0</sub>)(x − x<sub>0</sub>) = ${neg(y0)} ${sg(m)}(x ${sg(-x0)}) = <b>${lin(m, n)}</b>.`, 'Problem Set G · G6') });
add(14, () => { const c = ri(1, 4), k = ri(1, 5), m = k + c, n = -k;       /* f = k·ln x + c·x at x = 1: f(1) = c, f'(1) = k + c */
  return mc(`Find the tangent line to f(x) = ${k === 1 ? '' : k}ln x + ${c === 1 ? '' : c}x at x = 1.`, 'y = ' + lin(m, n), ['y = ' + lin(m, -n), 'y = ' + lin(m, c), 'y = ' + lin(c, n), 'y = ' + lin(k, c), 'y = ' + lin(m, n - 1)],
    `Point: f(1) = ${k === 1 ? '' : k + '·'}ln 1 + ${c} = ${c} (ln 1 = 0).<br>Slope: f′(x) = ${k}/x + ${c} → f′(1) = ${m}.<br>Tangent: y = ${c} + ${m}(x − 1) = <b>${lin(m, n)}</b>.`, 'Midterm 2 (2025) · Q7') });
add(14, () => { const c = ri(1, 6), k = nz(-3, 3);
  return mc(`Compute the tangent line to f(x) = e<sup>${k === 1 ? '' : k === -1 ? '−' : neg(k)}x</sup> + ${c} at the point x = 0.`, 'y = ' + lin(k, c + 1), ['y = ' + lin(k, c), 'y = ' + lin(1, c + 1 + (k === 1 ? 1 : 0)), 'y = ' + lin(-k, c + 1), 'y = ' + lin(k, 1), 'y = ' + lin(c, k)],
    `Point: f(0) = e<sup>0</sup> + ${c} = ${c + 1}.<br>Slope: f′(x) = ${neg(k)}e<sup>${neg(k)}x</sup> → f′(0) = ${neg(k)}.<br>Tangent: y = ${c + 1} ${sg(k)}(x − 0) = <b>${lin(k, c + 1)}</b>.`, 'Problem Set G · G5') });
add(14, () => { const k = nz(-4, 4), x = -1 / k;
  return num(`Determine at which point x the tangent line to f(x) = x · e<sup>${k === 1 ? '' : k === -1 ? '−' : neg(k)}x</sup> is parallel to the x-axis (3 decimals).`, x, 3, '',
    `Parallel to the x-axis means slope 0: f′(x) = e<sup>${neg(k)}x</sup>(1 ${sg(k)}x) = 0.<br>The exponential is never 0, so 1 ${sg(k)}x = 0 → <b>x = ${F(x, 3)}</b>.`, 'Problem Set G · G7') });
add(14, () => { const a = nz(-3, 3), h = nz(-4, 4), c = ri(-5, 5), b = -2 * a * h;
  return num(`At which point x does f(x) = ${P([a, b, c])} have a horizontal tangent line?`, h, 2, '',
    `Horizontal tangent → f′(x) = 0.<br>f′(x) = ${P([2 * a, b])} = 0 → x = ${neg(-b)} / ${par(2 * a)} = <b>${neg(h)}</b>.`, 'Problem Set G · G7') });

/* ============ LECTURE 15 · Stationary points and local optima (Problem Set H, Midterm 2) ============ */
const cubic = () => { const p = ri(-3, 1), q = p + ri(1, 4) * 2, c = ri(-10, 10); return { p, q, c, co: [1, -3 * (p + q) / 2, 3 * p * q, c] } };   /* f' = 3(x−p)(x−q) */
add(15, () => { const K = cubic(), mx = Math.random() < .5;
  return num(`Find the stationary points of f(x) = ${P(K.co)}. At which x does f have a local <b>${mx ? 'maximum' : 'minimum'}</b>?`, mx ? K.p : K.q, 2, '',
    `f′(x) = ${P([3, -3 * (K.p + K.q), 3 * K.p * K.q])} = 3(x ${sg(-K.p)})(x ${sg(-K.q)}) = 0 → x = ${neg(K.p)} and x = ${neg(K.q)}.<br>f″(x) = ${P([6, -3 * (K.p + K.q)])}: f″(${neg(K.p)}) = ${neg(6 * K.p - 3 * (K.p + K.q))} &lt; 0 → local maximum; f″(${neg(K.q)}) = ${neg(6 * K.q - 3 * (K.p + K.q))} &gt; 0 → local minimum.<br>Local ${mx ? 'maximum' : 'minimum'} at <b>x = ${neg(mx ? K.p : K.q)}</b>.`, 'Problem Set H · H1 · Midterm 2 (2024) · Q3') });
add(15, () => { const p = ri(-4, 1), q = p + ri(2, 6), b = -(p + q), c = p * q;
  const T = [`f(x) is increasing on (−∞, ${neg(p)}).`, 'f(x) has two stationary points.', `f(x) has a local minimum at x = ${neg(q)}.`, `f(x) has a local maximum at x = ${neg(p)}.`, `f(x) is decreasing on (${neg(p)}, ${neg(q)}).`];
  const Fa = pk([`f(x) has a local minimum at x = ${neg((p + q) / 2)}.`, `f(x) has a local minimum at x = ${neg(p)}.`, `f(x) is increasing on (${neg(p)}, ${neg(q)}).`, `f(x) has a local maximum at x = ${neg(q)}.`]);
  return mc(`Determine which of the following statements is <b>false</b>, given the derivative f′(x) = ${P([1, b, c])}.`, Fa, shuf(T),
    `f′(x) = (x ${sg(-p)})(x ${sg(-q)}): it is zero at x = ${neg(p)} and x = ${neg(q)} (two stationary points).<br>f′ &gt; 0 for x &lt; ${neg(p)} (increasing), f′ &lt; 0 between ${neg(p)} and ${neg(q)} (decreasing), f′ &gt; 0 for x &gt; ${neg(q)} (increasing).<br>So there is a local maximum at x = ${neg(p)} and a local minimum at x = ${neg(q)}.<br>The false statement is: <b>${Fa}</b>`, 'Midterm 2 (2025) · Q8') });
add(15, () => { const k = pk([2, 4, -2, 6, -4]), c0 = ri(1, 12), a = -3 * k / 2;
  return num(`Let f(x) = x<sup>3</sup> + ax<sup>2</sup> + bx + c. The function has a stationary point at P = (0, ${c0}) and an extremum when x = ${neg(k)}. Find the value of the parameter a.`, a, 2, '',
    `f(0) = c = ${c0}.<br>f′(x) = 3x<sup>2</sup> + 2ax + b. Stationary at x = 0: f′(0) = b = 0.<br>Extremum at x = ${neg(k)}: f′(${neg(k)}) = ${3 * k * k} ${sg(2 * k)}a = 0 → <b>a = ${neg(a)}</b>.<br>So f(x) = ${P([1, a, 0, c0])}.`, 'Problem Set H · H2') });
add(15, () => { const K = cubic();
  return mc(`Let f(x) = ${P(K.co)}. On which intervals is f increasing?`, `(−∞, ${neg(K.p)}) ∪ (${neg(K.q)}, ∞)`, [`(${neg(K.p)}, ${neg(K.q)})`, `(−∞, ${neg(K.q)})`, `(${neg(K.p)}, ∞)`, 'ℝ'],
    `f′(x) = 3(x ${sg(-K.p)})(x ${sg(-K.q)}). The product is positive outside the roots and negative between them.<br>Increasing on <b>(−∞, ${neg(K.p)}) ∪ (${neg(K.q)}, ∞)</b>; decreasing on (${neg(K.p)}, ${neg(K.q)}).`, 'Midterm 2 (2024) · Q3 · Problem Set H · H4') });
add(15, () => { const p = ri(2, 5), q = p + ri(2, 5), a = (p + q) / 2, b = p * q;       /* B = t³/3 − a t² + b t, B' = (t−p)(t−q) */
  return num(`The number of beneficiaries of a new technique after t years follows B(t) = t<sup>3</sup>/3 − ${F(a, 1)}t<sup>2</sup> + ${b}t, for 0 ≤ t ≤ ${q + 1}. Determine when the reduction in the number of beneficiaries is fastest.`, a, 2, 'years',
    `B′(t) = t<sup>2</sup> − ${F(2 * a)}t + ${b} = (t − ${p})(t − ${q}): B decreases between t = ${p} and t = ${q}.<br>The reduction is fastest where B′ is most negative, i.e. where B″(t) = 2t − ${F(2 * a)} = 0 → <b>t = ${F(a, 1)}</b>.`, 'Problem Set H · H4') });

/* ============ LECTURE 16 · Global minima and maxima (Problem Set H, Midterm 2) ============ */
add(16, () => { const p = ri(1, 3), c = ri(-5, 9), lo = -p - ri(0, 2), hi = p + ri(1, 3), f = x => x ** 3 - 3 * p * p * x + c, C = [lo, -p, p, hi].filter(x => x >= lo && x <= hi), mx = Math.random() < .5, v = (mx ? Math.max : Math.min)(...C.map(f));
  return num(`Let f(x) = ${P([1, 0, -3 * p * p, c])}. Determine the global <b>${mx ? 'maximum' : 'minimum'}</b> value of f on the interval [${neg(lo)}, ${hi}].`, v, 2, '',
    `f′(x) = 3x<sup>2</sup> − ${3 * p * p} = 0 → x = ±${p}. On a closed interval, compare the stationary points inside it with the endpoints:<br>${[...new Set(C)].map(x => `f(${neg(x)}) = ${neg(f(x))}`).join(', ')}.<br>Global ${mx ? 'maximum' : 'minimum'} = <b>${neg(v)}</b>.`, 'Midterm 2 (2024) · Q3 · Problem Set H · H3') });
add(16, () => { const k = pk([2, 3, 4, 5]), b = k + ri(2, 6);
  return mc(`Given the closed interval [0, ${b}], determine the global optima of f(x) = x · e<sup>−x/${k}</sup>.`, `Maximum at x = ${k} and minimum at x = 0.`, [`Maximum at x = 0 and minimum at x = ${b}.`, `Maximum at x = ${k} and no minimum.`, `No maximum, and minimum at x = 0.`, `Maximum at x = ${b} and minimum at x = 0.`, `Maximum at x = ${k} and minimum at x = ${b}.`],
    `f′(x) = e<sup>−x/${k}</sup>(1 − x/${k}) = 0 → x = ${k}.<br>Compare: f(0) = 0, f(${k}) = ${k}/e = ${F(k / Math.E, 3)}, f(${b}) = ${F(b * Math.exp(-b / k), 3)}.<br>A continuous function on a closed interval always has both: <b>maximum at x = ${k}, minimum at x = 0</b>.`, 'Midterm 2 (2025) · Q9') });
add(16, () => { const a = pk([1, 2, 4]), s = ri(2, 6), c = a * s * s, b = ri(5, 40);
  return num(`A company has cost function C(x) = ${P([a, b, c])}, where x is hundreds of units produced. Determine the production level x that minimizes the <b>average</b> cost C(x)/x.`, s, 2, 'hundreds of units',
    `Average cost: A(x) = C(x)/x = ${a === 1 ? '' : a}x + ${b} + ${c}/x.<br>A′(x) = ${a} − ${c}/x<sup>2</sup> = 0 → x<sup>2</sup> = ${c / a} → x = ${s} (x &gt; 0).<br>A″(x) = ${2 * c}/x<sup>3</sup> &gt; 0, so it is a minimum: <b>x = ${s}</b>, with average cost ${F(a * s + b + c / s)}.`, 'Problem Set H · H5') });
add(16, () => { const h = ri(2, 8), a = ri(1, 3), k = ri(10, 60), lo = ri(0, h - 1), hi = h + ri(1, 5), f = x => -a * (x - h) ** 2 + k, v = Math.min(f(lo), f(hi));
  return num(`Find the global <b>minimum</b> value of f(x) = ${P([-a, 2 * a * h, k - a * h * h])} on the interval [${lo}, ${hi}].`, v, 2, '',
    `f′(x) = ${P([-2 * a, 2 * a * h])} = 0 → x = ${h}, which is a maximum (the parabola opens downwards): f(${h}) = ${k}.<br>So the minimum must be at an endpoint: f(${lo}) = ${neg(f(lo))}, f(${hi}) = ${neg(f(hi))}.<br>Global minimum = <b>${neg(v)}</b>.`, 'Problem Set H · H3') });
add(16, () => { const k = pk([0.1, 0.2, 0.25, 0.5]), t = 1 / k;
  return num(`The effectiveness of a drug after t hours follows E(t) = ${k}t · e<sup>−${k}t + 1</sup>. Determine when the drug reaches its maximum effectiveness.`, t, 2, 'hours',
    `E′(t) = ${k}e<sup>−${k}t + 1</sup> + ${k}t·(−${k})e<sup>−${k}t + 1</sup> = ${k}e<sup>−${k}t + 1</sup>(1 − ${k}t).<br>E′(t) = 0 → 1 − ${k}t = 0 → <b>t = ${F(t)}</b> hours, where E = ${k}·${F(t)}·e<sup>0</sup> = 1 (100%).`, 'Problem Set H · H6') });

/* ============ LECTURES 17–18 · Functions of two variables (Problem Set I) — only in "Everything" ============ */
add(17, () => { const a = ri(1, 4), b = ri(1, 4), c = ri(-5, 5), x = nz(-3, 3), y = nz(-5, 5), v = a * x * x + b * y * y + c;
  return num(`Consider f(x, y) = ${a === 1 ? '' : a}x<sup>2</sup> + ${b === 1 ? '' : b}y<sup>2</sup> ${sg(c)}. Compute the image of the point (${neg(x)}, ${neg(y)}).`, v, 2, '',
    `Substitute x = ${neg(x)} and y = ${neg(y)}: ${a}·${x * x} + ${b}·${y * y} ${sg(c)} = <b>${neg(v)}</b>.`, 'Problem Set I · I1') });
add(17, () => { const a = ri(2, 6), b = ri(1, 5), x = ri(1, 4), y = ri(1, 4), s = pk([1, 2, 3]);
  const A = Math.round((s * s * (x + y) ** 2 - y - b) / (x * x)); const val = A * x * x + y + b;
  if (val < 0 || A === 0) return null; const v = Math.sqrt(val) / (x + y);
  return num(`Consider f(x, y) = √(${A}x<sup>2</sup> + y + ${b}) / (x + y). Compute f(${x}, ${y}) (3 decimals).`, v, 3, '',
    `Numerator: √(${A}·${x * x} + ${y} + ${b}) = √${val} = ${F(Math.sqrt(val), 4)}.<br>Denominator: ${x} + ${y} = ${x + y}.<br>f(${x}, ${y}) = <b>${F(v, 3)}</b>.`, 'Problem Set I · I1, I3') });
add(18, () => { const a = ri(1, 4), b = ri(1, 3), x = nz(-3, 3), y = nz(-3, 3), wx = Math.random() < .5, v = wx ? 2 * a * x * y : a * x * x + 3 * b * y * y;
  return num(`Consider f(x, y) = ${a === 1 ? '' : a}x<sup>2</sup>y + ${b === 1 ? '' : b}y<sup>3</sup>. Compute the partial derivative ∂f/∂${wx ? 'x' : 'y'} at the point (${neg(x)}, ${neg(y)}).`, v, 2, '',
    wx ? `Treat y as a constant: ∂f/∂x = ${2 * a}xy.<br>At (${neg(x)}, ${neg(y)}): ${2 * a}·${par(x)}·${par(y)} = <b>${neg(v)}</b>.` : `Treat x as a constant: ∂f/∂y = ${a === 1 ? '' : a}x<sup>2</sup> + ${3 * b}y<sup>2</sup>.<br>At (${neg(x)}, ${neg(y)}): ${a}·${x * x} + ${3 * b}·${y * y} = <b>${neg(v)}</b>.`, 'Problem Set I · I4') });
add(18, () => { const p = nz(-4, 4), q = ri(1, 3), wx = Math.random() < .5;         /* f = x² + y³ − 2p·x − 3q²·y → stationary (p, ±q) */
  return wx ? num(`Determine the stationary points of f(x, y) = x<sup>2</sup> + y<sup>3</sup> ${sg(-2 * p)}x − ${3 * q * q}y. What is their x-coordinate?`, p, 2, '',
    `∂f/∂x = 2x ${sg(-2 * p)} = 0 → x = ${neg(p)}.<br>∂f/∂y = 3y<sup>2</sup> − ${3 * q * q} = 0 → y = ±${q}.<br>Stationary points: (${neg(p)}, ${q}) and (${neg(p)}, −${q}). x-coordinate: <b>${neg(p)}</b>.`, 'Problem Set I · I5')
    : mc(`Determine the stationary points of f(x, y) = x<sup>2</sup> + y<sup>3</sup> ${sg(-2 * p)}x − ${3 * q * q}y.`, `(${neg(p)}, ${q}) and (${neg(p)}, −${q})`, [`(${neg(p)}, ${q}) only`, `(${neg(-p)}, ${q}) and (${neg(-p)}, −${q})`, `(${q}, ${neg(p)}) and (−${q}, ${neg(p)})`, `(${neg(2 * p)}, ${3 * q * q})`],
    `∂f/∂x = 2x ${sg(-2 * p)} = 0 → x = ${neg(p)}.<br>∂f/∂y = 3y<sup>2</sup> − ${3 * q * q} = 0 → y = ±${q}.<br>Both partial derivatives vanish at <b>(${neg(p)}, ${q}) and (${neg(p)}, −${q})</b>.`, 'Problem Set I · I5') });
add(18, () => { const a = ri(1, 4), m = ri(2, 3), n = ri(2, 3), x = nz(-2, 2), y = nz(-2, 2), v = a * m * n * x ** (m - 1) * y ** (n - 1);
  return num(`Consider f(x, y) = ${a === 1 ? '' : a}x<sup>${m}</sup>y<sup>${n}</sup>. Compute the mixed second derivative ∂<sup>2</sup>f/∂x∂y (the off-diagonal entry of the Hessian matrix) at (${neg(x)}, ${neg(y)}).`, v, 2, '',
    `∂f/∂x = ${a * m}x<sup>${m - 1}</sup>y<sup>${n}</sup>. Now differentiate with respect to y: ∂<sup>2</sup>f/∂x∂y = ${a * m * n}x<sup>${m - 1}</sup>y<sup>${n - 1}</sup>.<br>At (${neg(x)}, ${neg(y)}): <b>${neg(v)}</b>.`, 'Problem Set I · I4') });
add(18, () => { const c0 = ri(-5, 5), a = ri(1, 4), b = -2 * a, im = a + b + c0;
  return num(`Consider f(x, y) = ax<sup>2</sup> + y<sup>3</sup> + bx + c. The image of A = (0, 0) is ${neg(c0)}, and B = (1, 0) is a stationary point whose image is ${neg(im)}. Determine the value of a.`, a, 2, '',
    `f(0, 0) = c = ${neg(c0)}.<br>Stationary at (1, 0): ∂f/∂x = 2ax + b = 0 at x = 1 → b = −2a.<br>f(1, 0) = a + b + c = a − 2a ${sg(c0)} = ${neg(im)} → −a = ${neg(im - c0)} → <b>a = ${a}</b> (and b = ${b}).`, 'Problem Set I · I6') });

const NAMES = { 1: 'Percentages', 2: 'Sequences I', 3: 'Sequences II', 4: 'Simple and compound interest', 5: 'EAR', 6: 'Mortgages', 7: 'Introduction to one-variable functions', 8: 'Graph shifting', 9: 'Linear and exponential functions', 10: 'Polynomial functions', 11: 'Logarithmic functions', 12: 'Power and irrational functions', 13: 'Derivative function', 14: 'Derivative at a point and tangent line', 15: 'Stationary points and local optima', 16: 'Global minima and maxima', 17: 'Introduction to two-variable functions', 18: 'Partial derivatives' };
window.MATES = { G, NAMES,
  make(g) { for (let i = 0; i < 30; i++) { let q = null; try { q = g.fn() } catch (e) {} if (q && (q.type === 'mc' ? q.opts.length === 4 && q.a >= 0 : Number.isFinite(q.ans))) { q.lec = g.lec; return q } } return null } };
})();
