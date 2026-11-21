/* Mathematics · exam-level exercises.
   Taken from the harder items of the Problem Sets (A–I), the midterms and the seven practice tests in AulaESCI
   (Derivatives, Domain, Exponential, Global and local optima, Logarithms, Polynomials, Range), with the numbers changed at random.
   Loaded after mates-ejercicios.js. At the end, the one-step warm-up exercises of that file are removed: Martí wants exam difficulty only. */
(function () {
'use strict';
const { ri, pk, shuf, nz, F, E, sg, neg, par, sup, P, lin, num, mc, pay, bal, MW } = MATES.H, add = MATES.add;
const fr = (a, b) => `${a}/${b}`;
const x2 = 'x<sup>2</sup>', x3 = 'x<sup>3</sup>';
const fac = r => r === 0 ? 'x' : `(x ${sg(-r)})`;                    /* factor for the root r */
const YR = () => ri(2005, 2020);

/* ===================== MIDTERM 1 ===================== */
add(1, () => { const p = pk([10, 15, 20, 25, 30]), q = pk([5, 10, 12, 20]), k = (1 - p / 100) * (1 + q / 100), r = (1 / k - 1) * 100;
  if (Math.abs(r) < .5) return null;
  return num(`The price of a share falls by ${p}% and the following month rises by ${q}%. What further percentage change is needed for the share to return exactly to its original price? (Use a negative sign for a decrease.)`, r, 2, '%',
    `After both changes the price is P × ${F(1 - p / 100, 2)} × ${F(1 + q / 100, 2)} = ${F(k, 4)}·P.<br>We need a factor k with ${F(k, 4)}·k = 1 → k = ${F(1 / k, 5)}.<br>Change = (k − 1) × 100 = <b>${F(r)}%</b>.`, 'Problem Set A · A1–A2') });
add(3, () => { const a0 = ri(10, 30) * 1000, p = pk([5, 6, 7, 8]), r = 1 + p / 100, y0 = YR(), T = pk([5, 10, 20]) * 100000, x = Math.log(T * (r - 1) / a0 + 1) / Math.log(r) - 1, n = Math.ceil(x - 1e-9);
  return num(`A company had an annual electricity bill of ${E(a0)} in ${y0}. From that year onwards, the cost increases by ${p}% each year. In which year will the <b>cumulative</b> electricity costs (from ${y0} onwards) first exceed ${E(T)}?`, y0 + n, 0, '',
    `Cumulative cost up to year n: S<sub>n</sub> = a<sub>0</sub>(r<sup>n+1</sup> − 1)/(r − 1) = ${F(a0)}·(${F(r, 2)}<sup>n+1</sup> − 1)/${F(r - 1, 2)}.<br>S<sub>n</sub> &gt; ${F(T)} → ${F(r, 2)}<sup>n+1</sup> &gt; ${F(T * (r - 1) / a0 + 1, 4)} → n + 1 &gt; ln(${F(T * (r - 1) / a0 + 1, 4)})/ln(${F(r, 2)}) = ${F(x + 1, 2)} → n &gt; ${F(x, 2)}.<br>First whole year: n = ${n}, that is, <b>${y0 + n}</b>.`, 'Problem Set B · B3(d)') });
add(3, () => { const u = ri(15, 30) * 100, p = pk([2, 2.5, 4, 5]), r = 1 - p / 100, tot = u / (1 - r), st = Math.round(tot * pk([.6, .7, .8, .9]) / 1000) * 1000, y0 = YR(), x = Math.log(1 - st * (1 - r) / u) / Math.log(r) - 1, n = Math.ceil(x - 1e-9);
  return num(`A company has an initial stock of ${F(st)} units of a product. In ${y0} it sells ${F(u)} units and, from then on, annual demand decreases by ${p}% compared with the previous year. In which year will the stock run out?`, y0 + n, 0, '',
    `Sales form a geometric sequence with a<sub>0</sub> = ${F(u)} and r = ${F(r, 3)}. Even selling for ever, total demand would be a<sub>0</sub>/(1 − r) = ${F(tot)} units, which is more than the stock, so it does run out.<br>Units sold up to year n: ${F(u)}(1 − ${F(r, 3)}<sup>n+1</sup>)/${F(1 - r, 3)} ≥ ${F(st)} → ${F(r, 3)}<sup>n+1</sup> ≤ ${F(1 - st * (1 - r) / u, 4)} → n + 1 ≥ ${F(x + 1, 2)}.<br>n = ${n}: the stock runs out in <b>${y0 + n}</b>.`, 'Problem Set B · B4(c)') });
add(3, () => { const u = ri(15, 30) * 100, p = pk([2, 2.5, 4, 5]), r = 1 - p / 100, tot = u / (1 - r), st = Math.round(tot * pk([1.1, 1.2, 1.5]) / 1000) * 1000;
  return num(`A company has an initial stock of ${F(st)} units of a product. This year it sells ${F(u)} units and, from then on, annual demand decreases by ${p}% compared with the previous year. If demand continues like this for ever, how many units will remain unsold?`, st - tot, 0, 'units',
    `Total future demand is the infinite sum of a geometric sequence with a<sub>0</sub> = ${F(u)} and r = ${F(r, 3)} (|r| &lt; 1): S<sub>∞</sub> = ${F(u)}/(1 − ${F(r, 3)}) = ${F(tot)} units.<br>The stock is enough. Unsold: ${F(st)} − ${F(tot)} = <b>${F(st - tot, 0)} units</b>.`, 'Problem Set B · B4(c)') });
add(3, () => { const a0 = ri(15, 30) * 1000, d = ri(1, 4) * 500, y0 = 2015, n1 = ri(20, 40), n2 = n1 + ri(10, 25), S = (n2 - n1 + 1) * (2 * a0 + d * (n1 + n2)) / 2;
  return num(`A person’s annual salary in ${y0} was ${E(a0)} and increases by ${E(d)} each year. Calculate the total income earned between ${y0 + n1} and ${y0 + n2} (both years included).`, S, 0, '€',
    `a<sub>n</sub> = ${F(a0)} + ${F(d)}n with n = 0 in ${y0}. The years ${y0 + n1}–${y0 + n2} are n = ${n1} … ${n2}: ${n2 - n1 + 1} terms.<br>a<sub>${n1}</sub> = ${F(a0 + d * n1)} and a<sub>${n2}</sub> = ${F(a0 + d * n2)}.<br>Sum = ${n2 - n1 + 1} × (${F(a0 + d * n1)} + ${F(a0 + d * n2)})/2 = <b>${E(S)}</b>.`, 'Problem Set B · B2(d)') });
add(3, () => { const a0 = ri(10, 30) * 1000, p = pk([4, 5, 6, 7]), r = 1 + p / 100, y0 = 2010, n1 = ri(8, 14), n2 = n1 + ri(6, 12), S = a0 * r ** n1 * (r ** (n2 - n1 + 1) - 1) / (r - 1);
  return num(`A company had an annual electricity bill of ${E(a0)} in ${y0}, increasing by ${p}% each year. How much will the company spend on electricity between ${y0 + n1} and ${y0 + n2} (both years included)?`, S, 2, '€',
    `a<sub>n</sub> = ${F(a0)}·${F(r, 2)}<sup>n</sup>. The years are n = ${n1} … ${n2}: ${n2 - n1 + 1} terms, the first one being a<sub>${n1}</sub> = ${E(a0 * r ** n1)}.<br>Sum = a<sub>${n1}</sub>·(r<sup>${n2 - n1 + 1}</sup> − 1)/(r − 1) = ${F(a0 * r ** n1, 2)} × (${F(r, 2)}<sup>${n2 - n1 + 1}</sup> − 1)/${F(r - 1, 2)} = <b>${E(S)}</b>.<br>(Equivalently, S<sub>${n2}</sub> − S<sub>${n1 - 1}</sub>.)`, 'Problem Set B · B3(b)') });
add(2, () => { const k = ri(2, 6), c = ri(1, 9), O = [[`a<sub>n</sub> = ${k}/(n + 1) − ${c}`, 'dec'], [`a<sub>n</sub> = n<sup>2</sup> + ${c}`, 'inc'], [`a<sub>n</sub> = ${k}(−1)<sup>n</sup> + ${c}`, 'no'], [`a<sub>n</sub> = (−${fr(1, k)})<sup>n</sup>`, 'no'], [`a<sub>n</sub> = ${c} − ${k}n`, 'dec'], [`a<sub>n</sub> = ${k}·${fr(1, 2)}<sup>n</sup>`, 'dec'], [`a<sub>n</sub> = ${c}·${k}<sup>n</sup>`, 'inc']];
  const w = pk(['dec', 'inc', 'no']), right = pk(O.filter(o => o[1] === w)), others = shuf(O.filter(o => o[1] !== w)).slice(0, 3), L = { dec: 'monotonically decreasing', inc: 'monotonically increasing', no: 'not monotonic' };
  return mc(`Study the monotonicity of the following sequences (n = 0, 1, 2, …). Which one is <b>${L[w]}</b>?`, right[0], others.map(o => o[0]),
    `${[right].concat(others).map(o => `${o[0]}: ${L[o[1]]}`).join('.<br>')}.<br>A factor (−1)<sup>n</sup> or a negative ratio makes the signs alternate, so the sequence cannot be monotonic.`, 'Problem Set A · A8') });
add(4, () => { const C = ri(1, 20) * 500, g = pk([1.2, 1.25, 1.5, 1.8, 2]), t = ri(5, 15), m = pk([4, 12]), i = m * (Math.pow(g, 1 / (m * t)) - 1) * 100;
  return num(`${E(C)} is deposited into an account paying compound interest, with interest credited ${m === 12 ? 'monthly' : 'quarterly'}. After ${t} years the account balance is ${E(C * g)}. Determine the nominal annual interest rate.`, i, 2, '%',
    `${F(C * g)} = ${F(C)}·(1 + i/${m})<sup>${m * t}</sup> → (1 + i/${m})<sup>${m * t}</sup> = ${F(g, 2)} → 1 + i/${m} = ${F(g, 2)}<sup>1/${m * t}</sup> = ${F(Math.pow(g, 1 / (m * t)), 6)}.<br>i = ${m} × ${F(Math.pow(g, 1 / (m * t)) - 1, 6)} = ${F(i / 100, 5)} → <b>${F(i)}%</b>.`, 'Problem Set B · B7') });
add(4, () => { const C = ri(1, 20) * 100, i = pk([2, 3, 4]), t = ri(8, 25), y = 2030, f = C * (1 + i / 400) ** (4 * t + 3);
  return num(`A bank offers an account paying compound interest at a nominal annual rate of ${i}%, with interest credited quarterly (at the end of March, June, September and December). ${E(C)} is deposited on 1 January ${y}. How much money will be in the account in <b>November</b> ${y + t}?`, f, 2, '€',
    `From January ${y} to January ${y + t} there are ${4 * t} quarters. By November ${y + t}, three more quarters have been credited (March, June and September): ${4 * t + 3} in total.<br>C = ${F(C)} × (1 + ${F(i / 100, 2)}/4)<sup>${4 * t + 3}</sup> = <b>${E(f)}</b>.`, 'Problem Set B · B5(a)') });
add(5, () => { const B = [[pk([2.4, 2.5, 2.6]), 12, 'monthly'], [pk([2.7, 2.8, 3]), 4, 'quarterly'], [pk([2.65, 2.75, 2.9]), 365, 'daily']], e = B.map(b => (1 + b[0] / 100 / b[1]) ** b[1] - 1), best = e.indexOf(Math.max(...e)), n = ri(4, 8), v = ((1 + e[best]) ** n - 1) * 100, N = ['Bank A', 'Bank B', 'Bank C'];
  if (Math.abs(e[0] - e[1]) < 2e-4 || Math.abs(e[1] - e[2]) < 2e-4 || Math.abs(e[0] - e[2]) < 2e-4) return null;
  return num(`We want to invest a capital for ${n} years and have three options:<br>Bank A: nominal annual rate of ${B[0][0]}%, compounded monthly.<br>Bank B: nominal annual rate of ${B[1][0]}%, compounded quarterly.<br>Bank C: nominal annual rate of ${B[2][0]}%, compounded daily.<br>Choosing the option with the highest EAR, what is the overall percentage increase in the capital after the ${n} years?`, v, 2, '%',
    `EAR = (1 + i/m)<sup>m</sup> − 1:<br>${B.map((b, k) => `${N[k]}: ${F(e[k] * 100, 3)}%`).join(' · ')} → the best is ${N[best]}.<br>After ${n} years: (1 + ${F(e[best], 5)})<sup>${n}</sup> − 1 = ${F(v / 100, 4)} → <b>${F(v)}%</b>.`, 'Problem Set C · C1') });
const mort = () => { const L = ri(15, 45) * 10000, i = pk([2.4, 2.5, 3, 3.6, 4]), m = 12, T = pk([20, 25, 30]), r = i / 100 / m, N = m * T; return { L, i, m, T, r, N, a: pay(L, r, N) } };
add(6, () => { const M = mort(), k = pk([8, 10, 12]), ex = ri(2, 6) * 10000, n2 = M.N - 12 * k, B = bal(M.a, M.r, n2), B2 = B - ex, x = -Math.log(1 - B2 * M.r / M.a) / Math.log(1 + M.r), n = Math.ceil(x - 1e-9);
  if (ex > B * .6) return null;
  return num(`A family took out a ${E(M.L)} mortgage at a fixed nominal annual rate of ${M.i}%, to be repaid over ${M.T} years through constant monthly payments. After ${k} years they make a partial early repayment of ${E(ex)} and choose to <b>keep the current monthly payment and reduce the remaining term</b>. How many more monthly payments will they have to make? (Round up.)`, n, 0, 'payments',
    `Monthly rate r = ${F(M.r, 6)}; N = ${M.N}. Payment a = L·r/(1 − (1 + r)<sup>−N</sup>) = ${E(M.a)}.<br>Balance after ${k} years (${n2} payments left): a(1 − (1 + r)<sup>−${n2}</sup>)/r = ${E(B)}. After the repayment: ${E(B2)}.<br>With the same payment: ${F(B2, 2)} = a(1 − (1 + r)<sup>−n</sup>)/r → (1 + r)<sup>−n</sup> = 1 − ${F(B2, 2)}·r/a = ${F(1 - B2 * M.r / M.a, 5)} → n = −ln(${F(1 - B2 * M.r / M.a, 5)})/ln(${F(1 + M.r, 6)}) = ${F(x, 2)}.<br><b>${n} payments</b> (${Math.floor(n / 12)} years and ${n % 12} months) instead of ${n2}.`, 'Problem Set C · C5(c)') });
add(6, () => { const M = mort(), k = pk([2, 3, 5]), B = bal(M.a, M.r, 12 * k), v = M.a * 12 * k - B;
  return num(`A ${E(M.L)} property is purchased with a ${M.T}-year mortgage at a fixed nominal annual rate of ${M.i}%, with monthly payments. How much interest will be paid during the <b>final ${k} years</b> of the mortgage?`, v, 2, '€',
    `Payment a = L·r/(1 − (1 + r)<sup>−${M.N}</sup>) with r = ${F(M.r, 6)}: a = ${E(M.a)}.<br>Balance when ${k} years (${12 * k} payments) remain: a(1 − (1 + r)<sup>−${12 * k}</sup>)/r = ${E(B)}.<br>In those ${12 * k} payments we pay ${12 * k} × ${F(M.a, 2)} = ${E(M.a * 12 * k)}, of which ${E(B)} is capital.<br>Interest = <b>${E(v)}</b>.`, 'Problem Set C · C3(c)') });
add(6, () => { const M = mort(), B1 = bal(M.a, M.r, M.N - 12), cap = M.L - B1, int = 12 * M.a - cap, w = Math.random() < .5;
  return num(`We finance ${E(M.L)} with a ${M.T}-year mortgage at a fixed nominal annual rate of ${M.i}%, with monthly payments at the end of each month. During the <b>first year</b> of the mortgage, how much is ${w ? 'paid in interest' : 'used to repay the capital'}?`, w ? int : cap, 2, '€',
    `Payment a = ${E(M.a)} (r = ${F(M.r, 6)}, N = ${M.N}).<br>Balance after 12 payments (${M.N - 12} left): a(1 − (1 + r)<sup>−${M.N - 12}</sup>)/r = ${E(B1)}.<br>Capital repaid in year 1 = ${F(M.L)} − ${F(B1, 2)} = ${E(cap)}.<br>Total paid in year 1 = 12 × ${F(M.a, 2)} = ${E(12 * M.a)}, so interest = ${E(int)}.<br>Answer: <b>${E(w ? int : cap)}</b>.`, 'Problem Set C · C4(c)') });
add(6, () => { const M = mort(), k = pk([8, 10, 12]), ex = ri(2, 6) * 10000, n2 = M.N - 12 * k, B = bal(M.a, M.r, n2), a2 = pay(B - ex, M.r, n2), v = (M.a - a2) * n2 - ex;
  if (ex > B * .6) return null;
  return num(`A family took out a ${E(M.L)} mortgage at a fixed nominal annual rate of ${M.i}% over ${M.T} years (monthly payments). After ${k} years they repay ${E(ex)} early and choose to <b>reduce the monthly payment, keeping the remaining term</b>. How much interest do they save over the rest of the mortgage thanks to the early repayment?`, v, 2, '€',
    `Payment a = ${E(M.a)}. Balance after ${k} years (${n2} payments left): ${E(B)}.<br>New balance ${E(B - ex)} → new payment (B − ${F(ex)})·r/(1 − (1 + r)<sup>−${n2}</sup>) = ${E(a2)}.<br>Without the repayment they would still pay ${n2} × ${F(M.a, 2)}; now they pay ${n2} × ${F(a2, 2)} plus the ${F(ex)} repaid today.<br>Interest saved = (${F(M.a, 2)} − ${F(a2, 2)}) × ${n2} − ${F(ex)} = <b>${E(v)}</b>.`, 'Problem Set C · C5(b, d)') });

/* ===================== MIDTERM 2 ===================== */
/* ---- Lecture 7: domain and range (practice tests "Domain" and "Range", Problem Set D) ---- */
add(7, () => { const a = ri(1, 5), b = pk([a, a, ri(1, 3), a + ri(1, 3)]);
  const right = b > a ? `[${a}, ∞) \\ {${b}}` : b === a ? `(${a}, ∞)` : `[${a}, ∞)`;
  return mc(`Determine the domain of f(x) = √(x − ${a}) + 1/(${x2} − ${b * b}).`, right, [`[${a}, ∞)`, `(${a}, ∞)`, `[${a}, ∞) \\ {${b > a ? b : a + 1}}`, `(−∞, ${a}) ∪ (${a}, ∞)`, `[${a}, ∞) \\ {−${b * b}, ${b * b}}`],
    `Root: x − ${a} ≥ 0 → x ≥ ${a}.<br>Denominator: ${x2} − ${b * b} ≠ 0 → x ≠ ${b} and x ≠ −${b}.<br>${b > a ? `x = ${b} is inside [${a}, ∞), so it must be removed (−${b} is already outside).` : b === a ? `x = ${a} is exactly the endpoint, so the bracket opens.` : `Both ±${b} are already outside [${a}, ∞), so nothing else is removed.`}<br>Domain = <b>${right}</b>.`, 'Practice test (Domain) · Q1') });
add(7, () => { const q = ri(1, 3), p = q + ri(1, 4), right = `(−∞, −${p}] ∪ (−${q}, ${p}]`;
  return mc(`Determine the domain of f(x) = √( (−${x2} + ${p * p}) / (x + ${q}) ).`, right, [`(−∞, −${p}] ∪ (${p}, +∞)`, 'ℝ', `[−${p}, −${q}) ∪ (−${q}, ${p})`, `[−${p}, −${q}) ∪ [${p}, +∞)`, `(−∞, −${p}) ∪ (−${q}, ${p})`],
    `The quotient must be ≥ 0 and the denominator ≠ 0.<br>Numerator −${x2} + ${p * p} = (${p} − x)(${p} + x): zero at ±${p}, positive between them. Denominator: zero at −${q}, positive to its right.<br>Sign of the quotient: x &lt; −${p}: (−)/(−) = + · −${p} &lt; x &lt; −${q}: (+)/(−) = − · −${q} &lt; x &lt; ${p}: (+)/(+) = + · x &gt; ${p}: (−)/(+) = −.<br>Include ±${p} (numerator zero) and exclude −${q} (denominator zero): <b>${right}</b>.`, 'Practice test (Domain) · Q2') });
add(7, () => { const a = ri(1, 5), b = ri(1, 5), right = `(−∞, −${b}) ∪ (${a}, ∞)`;
  return mc(`Determine the domain of f(x) = ln( (x − ${a}) / (x + ${b}) ).`, right, [`(−${b}, ${a})`, `(−∞, −${b}] ∪ [${a}, ∞)`, `(${a}, ∞)`, `ℝ \\ {−${b}}`],
    `The argument of a logarithm must be strictly positive: (x − ${a})/(x + ${b}) &gt; 0.<br>Zeros of numerator and denominator: x = ${a} and x = −${b}. The quotient is positive when both have the same sign: x &lt; −${b} (both negative) or x &gt; ${a} (both positive).<br>Strict inequality → open intervals: <b>${right}</b>.`, 'Problem Set D · D4(d)') });
add(7, () => { const a = ri(-3, 2), b = a + ri(1, 3), c = b + ri(1, 3), right = `[${neg(a)}, ${neg(b)}) ∪ (${neg(c)}, ∞)`;
  return mc(`Determine the domain of f(x) = √( ${fac(a)} / (${fac(b)}${fac(c)}) ).`, right, [`(−∞, ${neg(a)}] ∪ (${neg(b)}, ${neg(c)})`, `[${neg(a)}, ${neg(b)}] ∪ [${neg(c)}, ∞)`, `(${neg(a)}, ${neg(b)}) ∪ (${neg(c)}, ∞)`, `[${neg(a)}, ∞) \\ {${neg(b)}, ${neg(c)}}`],
    `We need the quotient ≥ 0. Critical points: ${neg(a)}, ${neg(b)}, ${neg(c)}.<br>x &lt; ${neg(a)}: (−)/((−)(−)) = − · ${neg(a)} &lt; x &lt; ${neg(b)}: (+)/((−)(−)) = + · ${neg(b)} &lt; x &lt; ${neg(c)}: (+)/((+)(−)) = − · x &gt; ${neg(c)}: +.<br>x = ${neg(a)} is included (the root of 0 exists); ${neg(b)} and ${neg(c)} are excluded (division by zero).<br>Domain = <b>${right}</b>.`, 'Problem Set D · D4(b)') });
add(7, () => { const p = ri(1, 4), q = p + ri(1, 4), c = ri(2, 5);
  return mc(`Given the domain D<sub>f</sub> = ℝ \\ {${p}, ${q}}, indicate which function it corresponds to.`, `f(x) = (${c}x + 1) / (${fac(p)}${fac(q)})`, [`f(x) = (${c}x + 1) / (${fac(-p)}${fac(-q)})`, `f(x) = √(${fac(p)}${fac(q)})`, `f(x) = log[${fac(p)}${fac(q)}]`, `f(x) = (x − ${p})(x − ${q})`],
    `ℝ \\ {${p}, ${q}} means "every real number except ${p} and ${q}": exactly what a quotient gives when its denominator vanishes at ${p} and ${q}.<br>The root would need ${fac(p)}${fac(q)} ≥ 0 (a union of intervals), the logarithm &gt; 0 (open intervals), and the denominator ${fac(-p)}${fac(-q)} vanishes at −${p} and −${q}.<br><b>f(x) = (${c}x + 1) / (${fac(p)}${fac(q)})</b>.`, 'Practice test (Domain) · Q3') });
add(7, () => { const r1 = ri(-4, 1), r2 = r1 + ri(1, 3), r3 = r2 + ri(1, 3), right = `[${neg(r1)}, ${neg(r2)}] ∪ [${neg(r3)}, +∞)`;
  return mc(`The polynomial p(x) of degree 3 has three roots and a positive leading term. If the roots are x<sub>1</sub> = ${neg(r1)}, x<sub>2</sub> = ${neg(r2)}, x<sub>3</sub> = ${neg(r3)}, the domain of √p(x) is:`, right, ['ℝ', `(−∞, ${neg(r1)}] ∪ [${neg(r2)}, ${neg(r3)}]`, `ℝ \\ {${neg(r1)}, ${neg(r2)}, ${neg(r3)}}`, `[${neg(r3)}, +∞)`],
    `We need p(x) ≥ 0. A cubic with positive leading term comes from −∞ and ends at +∞, changing sign at each root:<br>negative before ${neg(r1)}, positive between ${neg(r1)} and ${neg(r2)}, negative between ${neg(r2)} and ${neg(r3)}, positive after ${neg(r3)}.<br>Domain = <b>${right}</b> (the roots are included: √0 exists).`, 'Practice test (Domain) · Q4') });
add(7, () => { const k = ri(1, 9);
  return mc(`Which of the following values does <b>not</b> belong to the range of f(x) = (${x2} − ${k}) / (${x2} + ${k})?`, '1', ['0', '−1', fr(1, 10), fr(1, 2), '−' + fr(1, 2)],
    `Write f(x) = 1 − ${2 * k}/(${x2} + ${k}). The fraction ${2 * k}/(${x2} + ${k}) takes every value in (0, 2]: it is 2 at x = 0 and gets close to 0 (but never reaches it) as x grows.<br>So the range is [−1, 1): −1 is reached at x = 0, and 1 is approached but never reached.<br>The value that does not belong is <b>1</b>.`, 'Practice test (Range) · Q4') });
add(7, () => { const a = nz(-5, 5), c = ri(1, 9), up = Math.random() < .5;
  const right = up ? `(−∞, ${neg(c - a)})` : `[${neg(c - a)}, +∞)`;
  return mc(`Knowing that the range of f(x) is R<sub>f</sub> = ${up ? `(${neg(a)}, +∞)` : `(−∞, ${neg(a)}]`}, determine the range of g(x) = −f(x) + ${c}.`, right, up ? [`(${neg(c - a)}, +∞)`, `(−∞, ${neg(c)})`, `(${neg(c + a)}, +∞)`, `(−∞, ${neg(-a)})`] : [`(−∞, ${neg(c - a)}]`, `[${neg(c)}, +∞)`, `(−∞, ${neg(c + a)}]`, `[${neg(-a)}, +∞)`],
    `Multiplying by −1 reflects the range: ${up ? `(${neg(a)}, +∞) becomes (−∞, ${neg(-a)})` : `(−∞, ${neg(a)}] becomes [${neg(-a)}, +∞)`}.<br>Adding ${c} shifts it up ${c} units: <b>${right}</b>.`, 'Practice test (Range) · Q5') });
add(7, () => { const a = ri(1, 6), b = ri(2, 7), O = shuf([-4, -3, -2, 0, 1, 2, 3, 4]).slice(0, 3).map(neg);
  return mc(`Which of the following values does <b>not</b> belong to the range of f(x) = (x + ${a}) / (${b} − x)?`, '−1', O,
    `A value y belongs to the range if y = (x + ${a})/(${b} − x) has a solution: y(${b} − x) = x + ${a} → x = (${b}y − ${a})/(y + 1).<br>That x exists for every y except y = −1 (division by zero): with y = −1 we would need x − ${b} = x + ${a}, which is impossible.<br>The range is ℝ \\ {−1}: <b>−1</b> does not belong.`, 'Problem Set D · D5') });
add(7, () => { const T = pk([[5, 4, 3], [5, 3, 4], [10, 6, 8], [10, 8, 6], [13, 5, 12], [13, 12, 5]]), mid = ri(T[0] + 5, 40), p = mid - T[0], q = mid + T[0];
  return num(`A company distributes dividends according to D(t) = √(−(t − ${p})(t − ${q})), in millions of euros, where t is the number of years elapsed since 2020. In which year will the company <b>first</b> distribute ${T[1]} million euros?`, 2020 + mid - T[2], 0, '',
    `Solve √(−(t − ${p})(t − ${q})) = ${T[1]} → −(t − ${p})(t − ${q}) = ${T[1] * T[1]} → t<sup>2</sup> − ${p + q}t + ${p * q + T[1] * T[1]} = 0.<br>t = (${p + q} ± √(${(p + q) ** 2} − ${4 * (p * q + T[1] * T[1])}))/2 = ${mid} ± ${T[2]} → t = ${mid - T[2]} or t = ${mid + T[2]}. Both lie in the domain [${p}, ${q}].<br>The first time is t = ${mid - T[2]}: the year <b>${2020 + mid - T[2]}</b>.`, 'Problem Set D · D6(b)') });

/* ---- Lectures 8–9: transformations and exponentials (practice test "Exponential") ---- */
add(8, () => { const B = pk([2, 3]), h = ri(1, 4), rt = Math.random() < .5, k = nz(-4, 4);
  const ex = (s, hh, kk, m) => `f(x) = ${m ? '−' : ''}${B}<sup>${s}x ${sg(hh)}</sup> ${sg(kk)}`, hh = rt ? h : -h;      /* reflect in Y, then x → x ∓ h */
  return mc(`We start from the exponential function f(x) = ${B}<sup>x</sup> and apply the following transformations in this order:<br>1) Reflection across the Y-axis.<br>2) Horizontal shift of ${h} unit${h > 1 ? 's' : ''} to the ${rt ? 'right' : 'left'}.<br>3) Vertical shift of ${Math.abs(k)} unit${Math.abs(k) > 1 ? 's' : ''} ${k > 0 ? 'upward' : 'downward'}.<br>Which is the final expression?`, ex('−', hh, k, 0), [ex('−', -hh, k, 0), ex('−', hh, k, 1), ex('', hh, k, 0), ex('', -hh, k, 0), ex('−', hh, -k, 0)],
    `1) Reflection across the Y-axis replaces x by −x: ${B}<sup>−x</sup>.<br>2) A shift to the ${rt ? 'right' : 'left'} replaces x by (x ${sg(rt ? -h : h)}): ${B}<sup>−(x ${sg(rt ? -h : h)})</sup> = ${B}<sup>−x ${sg(hh)}</sup>. Careful: the sign in front of x also changes the sign of the shift.<br>3) ${k > 0 ? 'Add' : 'Subtract'} ${Math.abs(k)}.<br><b>${ex('−', hh, k, 0)}</b>.`, 'Practice test (Exponential) · Q2') });
add(9, () => { const A = ri(2, 12) * 10, B = ri(1, 9) * 10, k = pk([0.1, 0.2, 0.5]);
  return mc(`The following function represents the cost of a product over time: f(x) = ${A}e<sup>−${k}x</sup> + ${B}. Indicate which statement is correct.`, `The initial cost is ${A + B} and it tends to ${B} as x increases.`, [`The initial cost is ${A} and it tends to 0 as x increases.`, `The initial cost is ${B} and it tends to ${A} as x increases.`, `The initial cost is 0 and it tends to ${A + B} as x increases.`, `The initial cost is ${A + B} and it tends to 0 as x increases.`],
    `Initial cost: f(0) = ${A}·e<sup>0</sup> + ${B} = ${A + B}.<br>As x increases, e<sup>−${k}x</sup> → 0, so f(x) → ${B} (horizontal asymptote y = ${B}).<br><b>The initial cost is ${A + B} and it tends to ${B}.</b>`, 'Practice test (Exponential) · Q1, Q4') });
add(9, () => { const a = pk([2, 3, 5]), m = pk([2, 3]), p = pk([2, 3, 4, 5].filter(v => v !== m)), x0 = nz(-4, 6), r = nz(-4, 4), q = m * (x0 + r) - p * x0;
  return num(`Solve the exponential equation ${a}<sup>${p}x ${sg(q)}</sup> = ${a ** m}<sup>x ${sg(r)}</sup>.`, x0, 2, '',
    `Write both sides with the same base: ${a ** m} = ${a}<sup>${m}</sup>, so the right-hand side is ${a}<sup>${m}(x ${sg(r)})</sup> = ${a}<sup>${m}x ${sg(m * r)}</sup>.<br>Equal bases → equal exponents: ${p}x ${sg(q)} = ${m}x ${sg(m * r)} → ${p - m}x = ${neg(m * r - q)} → <b>x = ${neg(x0)}</b>.`, 'Practice test (Exponential) · Q3') });

/* ---- Lecture 10: polynomials (practice test "Polynomials", Problem Set E) ---- */
add(10, () => { const a = pk([2, 3, -2, -3]), r = nz(-3, 3), s = nz(-4, 4); if (r === s) return null;
  const c = [a, -a * (s + 2 * r), a * (r * r + 2 * r * s), -a * r * r * s], ex = (aa, rr, ss, sw) => `f(x) = ${aa === 1 ? '' : neg(aa)}${sw ? `${fac(rr)}${fac(ss)}<sup>2</sup>` : `${fac(rr)}<sup>2</sup>${fac(ss)}`}`;
  return mc(`Choose the correct factorisation of the polynomial f(x) = ${P(c)}.`, ex(a, r, s, 0), [ex(1, r, s, 0), ex(a, r, s, 1), ex(1, r, s, 1), ex(a, -r, -s, 0)],
    `Take out the leading coefficient: f(x) = ${neg(a)}(${P(c.map(v => v / a))}).<br>Try the divisors of the constant term: x = ${neg(r)} is a root, and dividing leaves ${P([1, -(r + s), r * s])} = ${fac(r)}${fac(s)}.<br>So x = ${neg(r)} is a <b>double</b> root and x = ${neg(s)} a simple one: <b>${ex(a, r, s, 0)}</b>.<br>Quick check: the constant term must be ${neg(a)}·${par(-r)}<sup>2</sup>·${par(-s)} = ${neg(c[3])} ✓.`, 'Practice test (Polynomials) · Q1 · Problem Set E · E7') });
add(10, () => { const a = pk([1, 2, 3, -1, -2]), p = ri(-5, 2), w = pk([2, 4, 6, 8]), q = p + w, v = -a * w * w / 4;
  return num(`Find the height of the vertex of the parabola f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}${fac(p)}${fac(q)}.`, v, 2, '',
    `The roots are ${neg(p)} and ${neg(q)}; the vertex lies halfway between them: x = (${neg(p)} + ${par(q)})/2 = ${neg((p + q) / 2)}.<br>f(${neg((p + q) / 2)}) = ${neg(a)}·${par((p + q) / 2 - p)}·${par((p + q) / 2 - q)} = <b>${neg(v)}</b>.`, 'Practice test (Polynomials) · Q5') });
add(10, () => { const a = pk([-2, 2, 3, -3]), r1 = ri(-9, -3), r2 = ri(-2, 0), r3 = ri(1, 4), c = [a, -a * (r1 + r2 + r3), a * (r1 * r2 + r1 * r3 + r2 * r3), -a * r1 * r2 * r3], w = Math.random() < .5;
  return num(`Factor the polynomial p(x) = ${P(c)}. What is its <b>${w ? 'smallest' : 'largest'}</b> root?`, w ? r1 : r3, 2, '',
    `p(x) = ${neg(a)}(${P(c.map(v => v / a))}). Test the divisors of ${Math.abs(r1 * r2 * r3) || 'the constant term'}: ${r2 === 0 ? 'x = 0 is a root (no constant term)' : `x = ${neg(r3)} gives 0`}; dividing by that factor leaves a quadratic that we solve with the formula.<br>p(x) = ${neg(a)}${fac(r1)}${fac(r2)}${fac(r3)}: roots ${neg(r1)}, ${neg(r2)} and ${neg(r3)}.<br>The ${w ? 'smallest' : 'largest'} is <b>${neg(w ? r1 : r3)}</b>.`, 'Problem Set E · E7') });

/* ---- Lecture 11: logarithms (practice test "Logarithms", Problem Set F) ---- */
add(11, () => { const b = pk([2, 3]), q = ri(-3, 4), d = nz(-3, 3) * (b - 1), p = q + d, x = (p - b * q) / (b - 1), ok = p > q;
  if (p === 0 || q === 0) return null;
  const right = ok ? `x = ${neg(x)}` : 'It has no solution.';
  return mc(`Find the solution of the logarithmic equation log<sub>${b}</sub>(x ${sg(p)}) − log<sub>${b}</sub>(x ${sg(q)}) = 1.`, right, [`x = ${neg(x)}`, `x = ${neg(-x)}`, 'It has no solution.', `x = ${neg(x + 1)}`, `x = ${neg(x - 1)}`],
    `Domain: x ${sg(p)} &gt; 0 and x ${sg(q)} &gt; 0 → x &gt; ${neg(-Math.min(p, q))}.<br>Difference of logs = log of the quotient: (x ${sg(p)})/(x ${sg(q)}) = ${b} → x ${sg(p)} = ${b}x ${sg(b * q)} → x = ${neg(x)}.<br>${ok ? `Check: x = ${neg(x)} is in the domain (both arguments are positive), so <b>x = ${neg(x)}</b>.` : `But x = ${neg(x)} is <b>not</b> in the domain: the arguments would be ${neg(x + p)} and ${neg(x + q)}, and the logarithm of a negative number does not exist. <b>It has no solution.</b>`}`, 'Practice test (Logarithms) · Q4 · Midterm 2 (2025) · Q4') });
add(11, () => { const b = pk([2, 3, 5, 7, 10]), k = pk([1, 1, 2]), v = b ** k;
  return mc(`Find the solution of the logarithmic equation log<sub>${b}</sub>(${x2}) = ${2 * k}.`, `±${v}`, [`${v}`, `−${v}`, `±${b ** (2 * k)}`, 'None of the above.'],
    `${x2} = ${b}<sup>${2 * k}</sup> = ${b ** (2 * k)} → x = ±${v}.<br>Both are valid: the argument is ${x2}, which is positive for x = ${v} and for x = −${v}. (Writing 2·log<sub>${b}</sub>x = ${2 * k} would lose the negative solution.)<br><b>±${v}</b>.`, 'Practice test (Logarithms) · Q5 · Problem Set F · F3(e)') });
add(11, () => { const k = pk([1, 2, 3]), v = 10 ** k;
  return mc(`The equation log(−x) = ${k}:`, `Has x = −${F(v)} as its only solution.`, ['Has no solution.', 'Has infinitely many solutions.', `Has x = ${F(v)} as its only solution.`, 'Has x = 0 as its only solution.'],
    `log(−x) exists when −x &gt; 0, that is, for negative x: the equation is perfectly possible.<br>−x = 10<sup>${k}</sup> = ${F(v)} → <b>x = −${F(v)}</b>, which is negative, so it is in the domain.`, 'Practice test (Logarithms) · Q1') });
add(11, () => { const T = ['ln A + ln B = ln(AB)', 'ln(e<sup>9</sup> + e<sup>6</sup>) = 6 + ln(e<sup>3</sup> + 1)', '2 ln A − 3 ln B = ln(A<sup>2</sup> / B<sup>3</sup>)', 'log(A / B) = log A − log B', 'ln(√A) = ½ ln A', 'log(100x) = 2 + log x', 'n·log A + log B = log(A<sup>n</sup>·B)'];
  const Fa = pk([['ln(3x<sup>2</sup>) = 2x·ln 3', 'ln(3x<sup>2</sup>) = ln 3 + 2 ln x: the exponent 2 belongs to x only, and it comes down as a factor, not as 2x.'], ['ln(A + B) = ln A + ln B', 'there is no rule for the logarithm of a sum; ln A + ln B = ln(AB).'], ['ln(A·B) = ln A · ln B', 'the log of a product is the SUM of the logs.'], ['log(A<sup>2</sup>) = (log A)<sup>2</sup>', 'log(A<sup>2</sup>) = 2 log A, which is not the square of log A.'], ['log(nA) + log B = log(A<sup>n</sup>·B)', 'log(nA) = log n + log A; it would be n·log A that equals log(A<sup>n</sup>).']]);
  return mc('Determine which of the following equalities is <b>false</b>.', Fa[0], shuf(T),
    `<b>${Fa[0]}</b> is false: ${Fa[1]}<br>The other three follow from the properties: log of a product = sum, log of a quotient = difference, and an exponent comes down as a factor. (For ln(e<sup>9</sup> + e<sup>6</sup>): factor out e<sup>6</sup> first.)`, 'Practice test (Logarithms) · Q2–Q3') });
add(11, () => { const a = ri(1, 6), x = a * Math.E / (Math.E - 1);
  return num(`Solve the equation ln(x) − ln(x − ${a}) = 1 (3 decimals).`, x, 3, '',
    `Domain: x &gt; ${a}.<br>ln(x/(x − ${a})) = 1 → x/(x − ${a}) = e → x = e·x − ${a}e → x(e − 1) = ${a}e → x = ${a}e/(e − 1) = <b>${F(x, 3)}</b>, which is greater than ${a} ✓.`, 'Problem Set F · F5(b)') });
add(11, () => { const p = pk([2, 3, 5]), q = pk([3, 5, 7].filter(v => v !== p && v !== p * p)), x = Math.log(p * q) / (2 * Math.log(p) - Math.log(q));
  return num(`Solve the equation ${p}<sup>2x − 1</sup> = ${q}<sup>x + 1</sup> (3 decimals).`, x, 3, '',
    `The bases are different, so take logarithms: (2x − 1)·ln ${p} = (x + 1)·ln ${q}.<br>2x·ln ${p} − x·ln ${q} = ln ${q} + ln ${p} → x(2 ln ${p} − ln ${q}) = ln ${p * q}.<br>x = ln ${p * q} / (2 ln ${p} − ln ${q}) = <b>${F(x, 3)}</b>.`, 'Problem Set F · F5(c)') });
add(11, () => { const b = ri(1, 7), x = (b + Math.sqrt(b * b + 8)) / 2, w = Math.random() < .5, v = w ? x : b - x;
  return num(`Solve the equation log<sub>4</sub>(${x2} − ${b === 1 ? '' : b}x) = ½ and give its <b>${w ? 'positive' : 'negative'}</b> solution (3 decimals).`, v, 3, '',
    `${x2} − ${b}x = 4<sup>1/2</sup> = 2 → ${x2} − ${b}x − 2 = 0 → x = (${b} ± √(${b * b} + 8))/2 = (${b} ± ${F(Math.sqrt(b * b + 8), 4)})/2.<br>x = ${F(x, 3)} or x = ${F(b - x, 3)}. Both are valid, because in both cases the argument ${x2} − ${b}x equals 2 &gt; 0.<br>The ${w ? 'positive' : 'negative'} one is <b>${F(v, 3)}</b>.`, 'Problem Set F · F5(d)') });
add(11, () => { const b = ri(2, 7), a = ri(1, b * b - 1);
  return mc(`Solve the equation ln(${x2} − ${a}) = ln(${b}x − ${a}).`, `x = ${b}`, [`x = 0 and x = ${b}`, 'x = 0', 'It has no solution.', `x = ${a}`],
    `Equal logarithms → equal arguments: ${x2} − ${a} = ${b}x − ${a} → ${x2} = ${b}x → x = 0 or x = ${b}.<br>Check the domain: with x = 0 the argument is −${a} &lt; 0, so it is <b>not</b> valid. With x = ${b} the argument is ${b * b - a} &gt; 0 ✓.<br><b>x = ${b}</b>.`, 'Problem Set F · F5(e)') });
add(11, () => { const a = ri(2, 5), b = ri(2, 7), j = pk([1, 2]), s = a + b + .5, c = s * j, x = Math.exp(j);
  return num(`Solve the equation ln(x<sup>${a}</sup>) + ln(x<sup>${b}</sup>) + ln(√x) = ${F(c, 1)} (3 decimals).`, x, 3, '',
    `Bring the exponents down (√x = x<sup>1/2</sup>): ${a}·ln x + ${b}·ln x + ½·ln x = ${F(s, 1)}·ln x.<br>${F(s, 1)}·ln x = ${F(c, 1)} → ln x = ${j} → x = e<sup>${j}</sup> = <b>${F(x, 3)}</b> (positive, so it is in the domain).`, 'Problem Set F · F2(a)') });

/* ---- Lecture 13: derivatives (practice test "Derivatives", Problem Sets F–G, Midterm 2) ---- */
const SQ = u => `√(${u})`;
add(13, () => { const a = ri(1, 6), u = `x + ${a}`;
  return mc(`Compute the derivative of f(x) = ${x2}·${SQ(u)}.`, `f′(x) = (5${x2} + ${4 * a}x) / (2${SQ(u)})`, [`f′(x) = 2x·${SQ(u)} − ${x2} / (2${SQ(u)})`, `f′(x) = (2x(${u}) + ${x2}) / (2${SQ(u)})`, `f′(x) = x / ${SQ(u)}`, `f′(x) = (5${x2} + ${4 * a}x) / ${SQ(u)}`],
    `Product rule: f′ = 2x·${SQ(u)} + ${x2}·1/(2${SQ(u)}).<br>Common denominator 2${SQ(u)}: f′ = (2x·2(${u}) + ${x2}) / (2${SQ(u)}) = (4${x2} + ${4 * a}x + ${x2}) / (2${SQ(u)}).<br><b>f′(x) = (5${x2} + ${4 * a}x) / (2${SQ(u)})</b>.`, 'Practice test (Derivatives) · Q2') });
add(13, () => { const a = ri(1, 5), d = `(x + ${a})<sup>2</sup>`;
  return mc(`Compute the derivative of f(x) = ${x2}·ln(x) / (x + ${a}).`, `f′(x) = (${x2} ln x + ${2 * a}x ln x + ${x2} + ${a}x) / ${d}`, [`f′(x) = (2x ln x + x(x + ${a}) − ${x2} ln x) / ${d}`, `f′(x) = (2x + ${2 * a} − ${x2} ln x) / ${d}`, `f′(x) = (3${x2} ln x + ${2 * a}x ln x + ${x2} + ${a}x) / ${d}`, `f′(x) = (2x ln x + x) / ${d}`],
    `Quotient rule with u = ${x2} ln x and v = x + ${a}: u′ = 2x ln x + x (product rule), v′ = 1.<br>f′ = ((2x ln x + x)(x + ${a}) − ${x2} ln x) / ${d}.<br>Expand: 2${x2} ln x + ${2 * a}x ln x + ${x2} + ${a}x − ${x2} ln x.<br><b>f′(x) = (${x2} ln x + ${2 * a}x ln x + ${x2} + ${a}x) / ${d}</b>.`, 'Practice test (Derivatives) · Q3') });
add(13, () => { const a = ri(1, 4), b = ri(1, 4), g = `x(x − ${a})(x + ${b})`, n = P([3, 2 * (b - a), -a * b]);
  return mc(`Compute the derivative of f(x) = ${SQ(g)}.`, `f′(x) = (${n}) / (2${SQ(g)})`, [`f′(x) = (${n}) / ${SQ(g)}`, `f′(x) = 1 / (2${SQ(g)})`, `f′(x) = (${P([3, 2 * (a - b), -a * b])}) / (2${SQ(g)})`, `f′(x) = (${n})·${SQ(g)} / 2`],
    `Chain rule: (√g)′ = g′ / (2√g).<br>Expand g(x) = ${g} = ${P([1, b - a, -a * b, 0])}, so g′(x) = ${n}.<br><b>f′(x) = (${n}) / (2${SQ(g)})</b>.`, 'Midterm 2 (2024) · Q1(b) · Problem Set G · G3(d)') });
add(13, () => { const a = ri(1, 6);
  return mc(`Compute the derivative of f(x) = (x − ${a}) / e<sup>x</sup>.`, `f′(x) = (${a + 1} − x) / e<sup>x</sup>`, [`f′(x) = (x − ${a + 1}) / e<sup>x</sup>`, `f′(x) = 1 / e<sup>x</sup>`, `f′(x) = (${a - 1 || 2} − x) / e<sup>x</sup>`, `f′(x) = (${a + 1} − x) / e<sup>2x</sup>`],
    `Quotient rule: f′ = (1·e<sup>x</sup> − (x − ${a})·e<sup>x</sup>) / e<sup>2x</sup>.<br>Factor e<sup>x</sup> and simplify: (1 − x + ${a}) / e<sup>x</sup>.<br><b>f′(x) = (${a + 1} − x) / e<sup>x</sup></b>.`, 'Problem Set G · G1(a)') });
add(13, () => { const a = ri(1, 6), b = ri(2, 6), c = ri(1, 5), k = a * b + c, d = `(${b}x + ${c})<sup>2</sup>`;
  return mc(`Compute the derivative of f(x) = (${a} − x) / (${b}x + ${c}).`, `f′(x) = −${k} / ${d}`, [`f′(x) = ${k} / ${d}`, `f′(x) = −${Math.abs(a * b - c) || k + 1} / ${d}`, `f′(x) = −1 / ${b}`, `f′(x) = −${k} / (${b}x + ${c})`],
    `Quotient rule: f′ = ((−1)(${b}x + ${c}) − (${a} − x)·${b}) / ${d}.<br>Numerator: −${b}x − ${c} − ${a * b} + ${b}x = −${k} (the x terms cancel).<br><b>f′(x) = −${k} / ${d}</b>.`, 'Problem Set G · G1(c)') });
add(13, () => { const B = pk([2, 3, 5]), a = nz(-5, 5), e = `${x2} ${sg(a)}x`, d = lin(2, a);
  return mc(`Compute the derivative of f(x) = ${B}<sup>${e}</sup>.`, `f′(x) = ${B}<sup>${e}</sup> · ln ${B} · (${d})`, [`f′(x) = ${B}<sup>${e}</sup> · (${d})`, `f′(x) = (${e}) · ${B}<sup>${e} − 1</sup>`, `f′(x) = ${B}<sup>${e}</sup> · (${d}) / ln ${B}`, `f′(x) = ${B}<sup>${e}</sup> · ln ${B}`],
    `(b<sup>u</sup>)′ = b<sup>u</sup>·ln b·u′ (chain rule). Here u = ${e}, so u′ = ${d}.<br><b>f′(x) = ${B}<sup>${e}</sup> · ln ${B} · (${d})</b>.<br>(The rule n·x<sup>n−1</sup> is for powers of x, not for exponentials.)`, 'Problem Set G · G3(f)') });
add(13, () => { const a = ri(1, 9), n = ri(3, 6), u = `${a} − ${x2}`;
  return mc(`Compute the derivative of f(x) = (${u})<sup>${n}</sup>.`, `f′(x) = −${2 * n}x(${u})<sup>${n - 1}</sup>`, [`f′(x) = ${n}(${u})<sup>${n - 1}</sup>`, `f′(x) = ${2 * n}x(${u})<sup>${n - 1}</sup>`, `f′(x) = −2x(${u})<sup>${n}</sup>`, `f′(x) = −${2 * n}x(${u})<sup>${n}</sup>`],
    `Chain rule: f′ = ${n}(${u})<sup>${n - 1}</sup>·(${u})′ = ${n}(${u})<sup>${n - 1}</sup>·(−2x).<br><b>f′(x) = −${2 * n}x(${u})<sup>${n - 1}</sup></b>.`, 'Problem Set G · G3(b)') });
add(13, () => { const a = ri(2, 6), b = ri(1, 7), u = `${a}x + ${b}`;
  return mc(`Compute the derivative of f(x) = ln ${SQ(u)}.`, `f′(x) = ${a} / (2(${u}))`, [`f′(x) = 1 / (2${SQ(u)})`, `f′(x) = ${a} / (${u})`, `f′(x) = 1 / (2(${u}))`, `f′(x) = ${a} / (2${SQ(u)})`],
    `Simplify first: ln ${SQ(u)} = ½·ln(${u}).<br>f′ = ½ · ${a}/(${u}).<br><b>f′(x) = ${a} / (2(${u}))</b>.`, 'Problem Set G · G3(c)') });
add(13, () => { const n = pk([2, 3, 4]), c = [1, 0, 0, 0].slice(0, 1), k = ri(2, 6), x = pk([1, 2]), v = n * (n + 1) * k / x ** (n + 2) + 2 * k;   /* f = k/x^n + k x² */
  return num(`Given f(x) = ${k}/x<sup>${n}</sup> + ${k}${x2} + ${ri(1, 9)}, compute the second derivative f″(${x}) (3 decimals).`, v, 3, '',
    `Write ${k}/x<sup>${n}</sup> = ${k}x<sup>−${n}</sup>.<br>f′(x) = −${n * k}x<sup>−${n + 1}</sup> + ${2 * k}x.<br>f″(x) = ${n * (n + 1) * k}x<sup>−${n + 2}</sup> + ${2 * k} = ${n * (n + 1) * k}/x<sup>${n + 2}</sup> + ${2 * k}.<br>f″(${x}) = ${n * (n + 1) * k}/${x ** (n + 2)} + ${2 * k} = <b>${F(v, 3)}</b>.`, 'Problem Set G · G2(a)') });

/* ---- Lecture 14: rates of change and tangent lines ---- */
add(14, () => { const a = ri(1, 5), b = ri(1, 6), v = -1 / (a * (a + b));
  return mc(`Compute the average rate of change of f(x) = 1/(x + ${a}) on the interval [0, ${b}].`, `−${fr(1, a * (a + b))}`, [`${fr(1, a * (a + b))}`, `−${fr(1, a + b)}`, `−${fr(b, a * (a + b))}`, `−${fr(1, a * a)}`, `−${fr(1, b)}`],
    `ARC = (f(${b}) − f(0)) / (${b} − 0).<br>f(${b}) = 1/${a + b} and f(0) = 1/${a}, so f(${b}) − f(0) = (${a} − ${a + b})/${a * (a + b)} = −${b}/${a * (a + b)}.<br>Divide by ${b}: <b>−1/${a * (a + b)}</b> ≈ ${F(v, 4)}.`, 'Practice test (Derivatives) · Q1') });
add(14, () => { const h = pk([1, 2]), k = ri(-4, 6), x0 = pk([-2, -1, 3, 4].filter(v => v !== h)), m = 3 * x0 * x0 - 6 * h * x0, c = ri(-5, 5), f = x => x ** 3 - 3 * h * x * x + k, x1 = 2 * h - x0;
  const pt = (x, y) => `(${neg(x)}, ${neg(y)})`, right = pt(x0, f(x0)), D = [pt(x0, f(x0) + 2), pt(h, f(h)), pt(0, f(0)), pt(x0 + 1, f(x0 + 1)), pt(-x0, f(-x0))].filter(s => s !== pt(x1, f(x1)));
  return mc(`Find the point on the graph of f(x) = ${P([1, -3 * h, 0, k])} where its tangent line is parallel to the line y = ${lin(m, c)}.`, right, D,
    `Parallel lines have the same slope, so we need f′(x) = ${m}.<br>f′(x) = ${P([3, -6 * h, 0])} = ${m} → ${P([3, -6 * h, -m])} = 0 → x = ${neg(Math.min(x0, x1))} or x = ${neg(Math.max(x0, x1))}.<br>The points are ${pt(x0, f(x0))} and ${pt(x1, f(x1))}; among the options only <b>${right}</b> appears.`, 'Practice test (Derivatives) · Q5') });
add(14, () => { const k = nz(-4, 4), y = -1 / (k * Math.E);
  return num(`Determine the point where the tangent line to f(x) = x · e<sup>${k === 1 ? '' : k === -1 ? '−' : neg(k)}x</sup> is parallel to the x-axis, and write the equation of that tangent line as y = c. What is c? (4 decimals)`, y, 4, '',
    `f′(x) = e<sup>${neg(k)}x</sup>(1 ${sg(k)}x) = 0 → x = ${F(-1 / k, 4)}.<br>A horizontal tangent is y = f(x<sub>0</sub>): f(${F(-1 / k, 4)}) = ${F(-1 / k, 4)}·e<sup>−1</sup> = ${neg(-1)}/(${neg(k)}e) = <b>${F(y, 4)}</b>.`, 'Problem Set G · G7') });
add(14, () => { const a = nz(-4, 4), b = ri(-5, 6), x0 = nz(-2, 2), m = 3 * x0 * x0 + 2 * a * x0, y0 = x0 ** 3 + a * x0 * x0 + b, n = y0 - m * x0, xq = ri(3, 6), v = m * xq + n;
  return num(`Let t(x) be the tangent line to f(x) = ${P([1, a, 0, b])} at x = ${neg(x0)}. Compute t(${xq}).`, v, 2, '',
    `f(${neg(x0)}) = ${neg(y0)}; f′(x) = ${P([3, 2 * a, 0])} → f′(${neg(x0)}) = ${neg(m)}.<br>Tangent: t(x) = ${neg(y0)} ${sg(m)}(x ${sg(-x0)}) = ${lin(m, n)}.<br>t(${xq}) = <b>${neg(v)}</b>.`, 'Practice test (Derivatives) · Q4 · Problem Set G · G6') });

/* ---- Lecture 15: stationary points (practice test "Local and global optima", Problem Set H) ---- */
add(15, () => { const b = pk([1, 2, 3, 4, 5, 8, 12]), a = pk([1, 2, 3, 4]), x = Math.sqrt(b / a), mn = Math.random() < .6;
  return num(`Consider the function f(x) = ${a === 1 ? '' : a}x + ${b}/x. Determine the point x where the function has a local <b>${mn ? 'minimum' : 'maximum'}</b> (3 decimals).`, mn ? x : -x, 3, '',
    `f′(x) = ${a} − ${b}/${x2} = 0 → ${x2} = ${fr(b, a)} → x = ±${F(x, 3)}.<br>f″(x) = ${2 * b}/${x3}: positive at x = ${F(x, 3)} (local minimum) and negative at x = −${F(x, 3)} (local maximum).<br>Local ${mn ? 'minimum' : 'maximum'} at <b>x = ${F(mn ? x : -x, 3)}</b>.`, 'Practice test (Local and global optima) · Q2') });
add(15, () => { const c = nz(-5, 5), mx = Math.random() < .5;
  return num(`Find the stationary points of f(x) = x ${sg(c)} + 1/(x ${sg(c)}). At which x does f have a local <b>${mx ? 'maximum' : 'minimum'}</b>?`, mx ? -c - 1 : -c + 1, 2, '',
    `f′(x) = 1 − 1/(x ${sg(c)})<sup>2</sup> = 0 → (x ${sg(c)})<sup>2</sup> = 1 → x = ${neg(-c + 1)} or x = ${neg(-c - 1)}.<br>f″(x) = 2/(x ${sg(c)})<sup>3</sup>: at x = ${neg(-c + 1)} it is +2 (local minimum); at x = ${neg(-c - 1)} it is −2 (local maximum).<br>Local ${mx ? 'maximum' : 'minimum'} at <b>x = ${neg(mx ? -c - 1 : -c + 1)}</b>.`, 'Problem Set H · H1(b)') });
add(15, () => { const s = ri(1, 4), mx = Math.random() < .5;
  return num(`Find the stationary points of f(x) = x · e<sup>−${x2}/${2 * s * s}</sup>. At which x does f have a local <b>${mx ? 'maximum' : 'minimum'}</b>?`, mx ? s : -s, 2, '',
    `Product and chain rules: f′(x) = e<sup>−${x2}/${2 * s * s}</sup>·(1 − ${x2}/${s * s}).<br>The exponential is never zero, so ${x2} = ${s * s} → x = ±${s}.<br>f′ is negative for x &lt; −${s}, positive between −${s} and ${s}, and negative for x &gt; ${s}: local minimum at x = −${s}, local maximum at x = ${s}.<br>Answer: <b>x = ${neg(mx ? s : -s)}</b>.`, 'Problem Set H · H1(c)') });
add(15, () => { const b = ri(1, 5), k = ri(1, 4), mx = Math.random() < .5;
  return num(`Find the stationary points of f(x) = ${k === 1 ? '' : k}x / (${x2} + ${b * b}). At which x does f have a local <b>${mx ? 'maximum' : 'minimum'}</b>?`, mx ? b : -b, 2, '',
    `Quotient rule: f′(x) = ${k === 1 ? '' : k}(${x2} + ${b * b} − 2${x2}) / (${x2} + ${b * b})<sup>2</sup> = ${k === 1 ? '' : k}(${b * b} − ${x2}) / (${x2} + ${b * b})<sup>2</sup>.<br>f′ = 0 → x = ±${b}. The sign of f′ is the sign of ${b * b} − ${x2}: negative, positive, negative.<br>Local minimum at x = −${b} and local maximum at x = ${b}. Answer: <b>x = ${neg(mx ? b : -b)}</b>.`, 'Problem Set H · H1(d)') });
add(15, () => { const k = pk([6, 9, 12, 15, 21, 27]), r = k / 3, R = Number.isInteger(Math.sqrt(r)) ? String(Math.sqrt(r)) : '√' + r, inc = Math.random() < .6;
  const A = `(−∞, −${R}) ∪ (${R}, +∞)`, B = `(−${R}, ${R})`;
  return mc(`Let f(x) = ${x3} − ${k}x. Determine in which of the following intervals the function is <b>${inc ? 'increasing' : 'decreasing'}</b>.`, inc ? A : B, [inc ? B : A, '(−∞, 0)', `(0, ${R})`, `(−∞, −${R})`],
    `f′(x) = 3${x2} − ${k} = 0 → ${x2} = ${r} → x = ±${R}.<br>f′ &gt; 0 outside the roots and f′ &lt; 0 between them (it is a parabola opening upwards).<br>Increasing on ${A}; decreasing on ${B}.<br>Answer: <b>${inc ? A : B}</b>.`, 'Practice test (Local and global optima) · Q1') });
add(15, () => { const s = ri(1, 3), b = pk([10, 20, 30]), a = 3 * b * s * s, c = 2 * s;
  return mc(`A company has a profit function B(x) = ${a}x − ${b}${x3}, where x represents the number of units sold (in thousands). The company cannot sell more than ${c} thousand units. Indicate which statement is correct about the behaviour of B(x) and its optima.`, `B(x) has a local and global maximum at x = ${s}.`, [`B(x) increases over the entire interval [0, ${c}].`, 'B(x) has a global minimum at x = 0.', 'B(x) has no stationary points within the interval.', `B(x) has a local and global maximum at x = ${c}.`],
    `B′(x) = ${a} − ${3 * b}${x2} = 0 → ${x2} = ${s * s} → x = ${s} (inside [0, ${c}]).<br>B′ &gt; 0 before ${s} and B′ &lt; 0 after it: local maximum at x = ${s}.<br>Compare with the endpoints: B(0) = 0, B(${s}) = ${F(a * s - b * s ** 3)}, B(${c}) = ${F(a * c - b * c ** 3)}.<br>So the global maximum is at x = ${s} and the global minimum is at x = ${c} (not at 0). <b>B(x) has a local and global maximum at x = ${s}.</b>`, 'Practice test (Local and global optima) · Q5') });

/* ---- Lecture 16: global optima and optimisation problems ---- */
add(16, () => { const h = ri(1, 5), b = -2 * h, c = ri(-5, 8), p = h - ri(1, 3), q = h + ri(2, 4), f = x => x * x + b * x + c, mn = f(h), mx = Math.max(f(p), f(q));
  if (q - h === h - p) return null;
  const I = (a, z) => `R<sub>f</sub> = [${neg(a)}, ${neg(z)}]`, lo = Math.min(f(p), f(q));
  return mc(`Let f(x) = ${P([1, b, c])} on the closed interval [${neg(p)}, ${neg(q)}]. Apply the Extreme Value Theorem to determine its range R<sub>f</sub>.`, I(mn, mx), [I(lo, mx), I(mn + 1, mx), I(mn, lo), I(mn, mx - 1), I(mn - 1, mx)],
    `f is continuous on a closed interval, so it reaches a global minimum and a global maximum, at a stationary point or at an endpoint.<br>f′(x) = ${P([2, b])} = 0 → x = ${h}, which is inside the interval.<br>f(${neg(p)}) = ${neg(f(p))}, f(${h}) = ${neg(mn)}, f(${neg(q)}) = ${neg(f(q))}.<br>Minimum ${neg(mn)}, maximum ${neg(mx)}: <b>${I(mn, mx)}</b>.`, 'Practice test (Local and global optima) · Q3') });
add(16, () => { const B = pk([2, 4, 5]), p = ri(4, 15) * 5, A = 2 * B * p, top = Math.round(p * 1.6);
  return num(`A company sells a product at price p (in euros). Its revenue function is R(p) = p(${A} − ${B}p), p ∈ [0, ${top}]. Apply the Extreme Value Theorem to find the price p that maximises the revenue.`, p, 2, '€',
    `R(p) = ${A}p − ${B}p<sup>2</sup> → R′(p) = ${A} − ${2 * B}p = 0 → p = ${p}, inside [0, ${top}].<br>Compare: R(0) = 0, R(${p}) = ${F(p * (A - B * p))}, R(${top}) = ${F(top * (A - B * top))}.<br>The maximum is at <b>p = ${p}</b>.`, 'Practice test (Local and global optima) · Q4') });
const stream = () => { const d = pk([0.25, 0.5]), g = 1000, k = ri(10, 40), f0 = ri(30, 60), N0 = (f0 * g - 2 * d * g * k) / d; return (N0 > 20000 && Number.isInteger(N0)) ? { d, g, k, f0, N0 } : null };
add(16, () => { const S = stream(); if (!S) return null; const fee = S.f0 - S.d * S.k;
  return num(`A streaming platform has ${F(S.N0)} subscribers who pay a monthly fee of ${E(S.f0)}. A survey suggests that they would gain ${F(S.g)} additional subscribers for every ${E(S.d)} reduction in the fee. Calculate the fee that maximises the revenue.`, fee, 2, '€',
    `Let k be the number of ${E(S.d)} reductions. Fee = ${S.f0} − ${S.d}k; subscribers = ${F(S.N0)} + ${F(S.g)}k.<br>R(k) = (${S.f0} − ${S.d}k)(${F(S.N0)} + ${F(S.g)}k).<br>R′(k) = −${S.d}(${F(S.N0)} + ${F(S.g)}k) + ${F(S.g)}(${S.f0} − ${S.d}k) = ${F(S.g * S.f0 - S.d * S.N0)} − ${F(2 * S.d * S.g)}k = 0 → k = ${S.k}.<br>R″ &lt; 0, so it is a maximum. Optimal fee = ${S.f0} − ${S.d} × ${S.k} = <b>${E(fee)}</b>, with ${F(S.N0 + S.g * S.k)} subscribers.`, 'Problem Set H · H7(a)') });
add(16, () => { const S = stream(); if (!S) return null; const fee = S.f0 - S.d * S.k, R = fee * (S.N0 + S.g * S.k);
  return num(`A streaming platform has ${F(S.N0)} subscribers who pay a monthly fee of ${E(S.f0)}. A survey suggests that they would gain ${F(S.g)} additional subscribers for every ${E(S.d)} reduction in the fee. Determine the <b>maximum monthly revenue</b> that the platform could obtain.`, R, 0, '€',
    `With k reductions of ${E(S.d)}: R(k) = (${S.f0} − ${S.d}k)(${F(S.N0)} + ${F(S.g)}k).<br>R′(k) = ${F(S.g * S.f0 - S.d * S.N0)} − ${F(2 * S.d * S.g)}k = 0 → k = ${S.k}.<br>Fee = ${E(fee)} and subscribers = ${F(S.N0 + S.g * S.k)}.<br>Maximum revenue = ${F(fee, 2)} × ${F(S.N0 + S.g * S.k)} = <b>${E(R)}</b>.`, 'Problem Set H · H7(b)') });
add(16, () => { const s = ri(1, 3), a = 2 * s * s, L = pk([s, s + 1, 10].filter(v => v >= s)), f = x => x ** 4 - a * x * x, hi = Math.max(0, f(L));
  const I = (x, y) => `[${F(x)}, ${F(y)}]`.replace(/-/g, '−');
  return mc(`Find the global maximum and minimum of f(x) = x<sup>4</sup> − ${a}${x2} on the interval [0, ${L}] and determine its range on that interval.`, I(-(s ** 4), hi), [I(0, f(L) > 0 ? f(L) : s ** 4), I(-(s ** 4), hi + a), I(-a, hi), I(f(L) < 0 ? f(L) - 1 : -(s ** 4) - 1, hi), I(-(s ** 4), hi + 1)],
    `f′(x) = 4${x3} − ${2 * a}x = 4x(${x2} − ${s * s}) = 0 → x = 0, x = ±${s}. In [0, ${L}]: x = 0${L > s ? ` and x = ${s}` : ` and x = ${s} (an endpoint)`}.<br>Evaluate at the stationary points and the endpoints: f(0) = 0, f(${s}) = −${s ** 4}${L > s ? `, f(${L}) = ${F(f(L))}` : ''}.<br>Minimum −${s ** 4} (at x = ${s}), maximum ${F(hi)} (at x = ${hi === 0 ? 0 : L}). Range = <b>${I(-(s ** 4), hi)}</b>.`, 'Problem Set H · H3') });
add(16, () => { const s = ri(4, 9), a = pk([6, 8, 10, 12].filter(v => v < 2 * s)), c = 2 * s ** 3 - a * s * s, b = ri(4, 9) * 10, w = Math.random() < .5, mnv = s * s - a * s + b + c / s;
  if (c <= 0 || mnv <= 0) return null;
  return num(`A company manufactures a product with cost function C(x) = ${P([1, -a, b, c])}, where x represents hundreds of units produced. ${w ? 'Determine the production level x that minimises the average cost C(x)/x.' : 'What is the minimum average cost C(x)/x?'}`, w ? s : mnv, 2, w ? 'hundreds of units' : '',
    `Average cost: A(x) = C(x)/x = ${x2} − ${a}x + ${b} + ${c}/x.<br>A′(x) = 2x − ${a} − ${c}/${x2} = 0 → 2${x3} − ${a}${x2} − ${c} = 0. Trying whole values, x = ${s} works: ${2 * s ** 3} − ${a * s * s} − ${c} = 0.<br>A″(x) = 2 + ${2 * c}/${x3} &gt; 0 for x &gt; 0, so it is a minimum.<br>x = ${s} and A(${s}) = ${s * s} − ${a * s} + ${b} + ${F(c / s, 2)} = ${F(mnv, 2)}. Answer: <b>${w ? s : F(mnv, 2)}</b>.`, 'Problem Set H · H5') });
add(16, () => { const p = ri(2, 5), q = p + ri(2, 5), a = (p + q) / 2, b = p * q, T = q + ri(1, 2), Bf = t => t ** 3 / 3 - a * t * t + b * t, v = Math.max(Bf(p), Bf(T));
  return num(`The number of beneficiaries (in thousands) of a new surgical technique after t years follows B(t) = t<sup>3</sup>/3 − ${F(a, 1)}t<sup>2</sup> + ${b}t, 0 ≤ t ≤ ${T}. Determine the <b>maximum</b> number of beneficiaries reached in that period (2 decimals).`, v, 2, 'thousand',
    `B′(t) = t<sup>2</sup> − ${F(2 * a)}t + ${b} = (t − ${p})(t − ${q}): B increases on (0, ${p}), decreases on (${p}, ${q}) and increases again on (${q}, ${T}).<br>The maximum on a closed interval is at a stationary point or an endpoint. Candidates: B(${p}) = ${F(Bf(p), 2)} and B(${T}) = ${F(Bf(T), 2)} (B(0) = 0, and t = ${q} is a local minimum).<br>Maximum = <b>${F(v, 2)}</b> thousand, at t = ${Bf(p) >= Bf(T) ? p : T}.`, 'Problem Set H · H4(a)') });
add(16, () => { const k = pk([2, 3, 4, 5]), b = k + ri(2, 6), v = k / Math.E;
  return num(`Given the closed interval [0, ${b}], determine the global <b>maximum value</b> of f(x) = x · e<sup>−x/${k}</sup> (3 decimals).`, v, 3, '',
    `f′(x) = e<sup>−x/${k}</sup>(1 − x/${k}) = 0 → x = ${k}.<br>Candidates: f(0) = 0, f(${k}) = ${k}·e<sup>−1</sup> = ${F(v, 3)}, f(${b}) = ${F(b * Math.exp(-b / k), 3)}.<br>Global maximum = <b>${F(v, 3)}</b>, at x = ${k}.`, 'Midterm 2 (2025) · Q9') });

/* ===================== Midterm 2 (16 Nov 2026, Version K) — same questions, new numbers ===================== */
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const FR = (p, q) => { const g = gcd(p, q); p /= g; q /= g; return q === 1 ? `${p}` : `${p}/${q}` };
const MT = n => `Midterm 2 (Nov 2026) · Q${n}`;
add(12, () => { const a = ri(-4, 3), b = a + ri(1, 6), flip = Math.random() < .35;
  const A = `(−∞, ${neg(a)}) ∪ (${neg(b)}, +∞)`, B = `(${neg(a)}, ${neg(b)})`, C = `(−∞, ${neg(a)}] ∪ [${neg(b)}, +∞)`, D = `ℝ \\ {${neg(a)}, ${neg(b)}}`, Bc = `[${neg(a)}, ${neg(b)}]`;
  const inside = flip ? `${fac(a)}(${neg(b)} − x)` : `${fac(a)}${fac(b)}`;
  return mc(`Determine the domain of the function f(x) = 1 / √(${inside}).`, flip ? B : A, flip ? [A, Bc, D] : [B, C, D],
    `The square root needs a non-negative radicand, and it is in the denominator, so it cannot be 0: we need ${inside} <b>&gt; 0</b> (strictly).<br>Roots: x = ${neg(a)} and x = ${neg(b)}. ${flip ? `The product is positive between the roots.` : `The product is positive outside the roots.`}<br>Domain = <b>${flip ? B : A}</b> (open brackets because the denominator cannot be 0).`, MT(1)) });
add(7, () => { const a = ri(1, 4), b = a + ri(1, 4), right = FR(a + b, 2 * b), W = [FR(a, 2 * b), '1', FR(b + 1, b), '0', FR(a, 4 * b)];
  return mc(`Determine which of the following values <b>belongs</b> to the range of the function f(x) = (${x2} + ${a}) / (${x2} + ${b}).`, right, W,
    `Rewrite: f(x) = 1 − ${b - a}/(${x2} + ${b}).<br>Since ${x2} + ${b} ∈ [${b}, +∞), the fraction ${b - a}/(${x2} + ${b}) takes the values in (0, ${FR(b - a, b)}].<br>So f(x) ∈ [1 − ${FR(b - a, b)}, 1) = <b>[${FR(a, b)}, 1)</b>: the minimum ${FR(a, b)} is reached at x = 0, and 1 is never reached (horizontal asymptote).<br>The only option in that interval is <b>${right}</b>.`, MT(2)) });
add(9, () => { const k = pk([2, 3, 4, 5]), c = ri(1, 4), T = [`The function crosses the Y-axis at (0, ${1 + c}).`, 'The function is strictly decreasing.', `The function has a horizontal asymptote at y = ${c}.`, `The range of the function is (${c}, +∞).`],
    Fl = ['The function is strictly increasing.', 'The function has a horizontal asymptote at y = 0.', `The function crosses the X-axis at x = −${c}.`, `The function crosses the Y-axis at (0, ${c}).`, `The range of the function is (0, +∞).`, `The function crosses the X-axis at x = ${c}.`];
  return mc(`Consider the exponential function f(x) = ${k}<sup>−x</sup> + ${c}. Determine which of the following statements is <b>true</b>:`, pk(T), shuf(Fl),
    `${k}<sup>−x</sup> = (1/${k})<sup>x</sup>: the base is between 0 and 1, so it is strictly <b>decreasing</b>, and ${k}<sup>−x</sup> &gt; 0 always.<br>Adding ${c} shifts it up: horizontal asymptote y = ${c} (as x → +∞) and range (${c}, +∞), so it never crosses the X-axis.<br>Y-intercept: f(0) = ${k}<sup>0</sup> + ${c} = ${1 + c} → (0, ${1 + c}).`, MT(3)) });
add(11, () => { const k = pk([2, 3, 5, 7, 10]), a = ri(1, 9), b = ri(1, 6), L = `log<sub>${k}</sub>`;
  return mc(`Consider the logarithmic equation ${L}(x + ${a}) = 1 + ${L}(x − ${b}). Determine which of the following equations is equivalent to the original equation:`, `(x + ${a}) / (x − ${b}) = ${k}`,
    [`(x + ${a})(x − ${b}) = ${k}`, `(x + ${a}) / (x − ${b}) = 1/${k}`, `x + ${a} = x − ${b} ${sg(-k)}`, `x + ${a} = x − ${b} + ${k}`, `(x + ${a}) / (x − ${b}) = 1`],
    `Move the logs to the same side: ${L}(x + ${a}) − ${L}(x − ${b}) = 1.<br>Quotient rule: ${L}[(x + ${a})/(x − ${b})] = 1.<br>Definition of logarithm: <b>(x + ${a})/(x − ${b}) = ${k}<sup>1</sup> = ${k}</b>.<br>(A log of a difference is not a difference of logs, so the options that "cancel" the logs are wrong.)`, MT(4)) });
add(11, () => { const k = pk([2, 3, 4, 5, 10]), a = ri(1, 12), b = ri(1, 6), L = `log<sub>${k}</sub>`, x = (a + k * b) / (k - 1);
  return num(`Solve the equation ${L}(x + ${a}) = 1 + ${L}(x − ${b}) (2 decimals if needed).`, x, 2, '',
    `${L}(x + ${a}) − ${L}(x − ${b}) = 1 → (x + ${a})/(x − ${b}) = ${k}.<br>x + ${a} = ${k}x − ${k * b} → ${k - 1}x = ${a + k * b} → x = ${FR(a + k * b, k - 1)} = ${F(x, 2)}.<br>Check the domain: x − ${b} &gt; 0 ✓. Solution: <b>x = ${F(x, 2)}</b>.`, MT(4)) });
add(10, () => { const c = pk([1, 2, 3, -2]), p = nz(-3, 3), q = nz(-4, 4); if (p === q) return null;
  const co = [1, -(2 * p + q), p * p + 2 * p * q, -p * p * q].map(v => v * c), C = c === 1 ? '' : c === -1 ? '−' : String(c).replace('-', '−'), C2 = c === 1 ? '2' : String(2 * c).replace('-', '−');
  return mc(`Choose the correct factorisation of the polynomial f(x) = ${P(co)}:`, `f(x) = ${C}${fac(p)}<sup>2</sup>${fac(q)}`,
    [`f(x) = ${C}${fac(p)}${fac(q)}<sup>2</sup>`, `f(x) = ${c === 1 ? C2 : ''}${fac(p)}<sup>2</sup>${fac(q)}`, `f(x) = ${fac(p)}${fac(q)}<sup>2</sup>`, `f(x) = ${C}${fac(-p)}<sup>2</sup>${fac(-q)}`],
    `Take out the common factor ${c}: f(x) = ${c}(${P(co.map(v => v / c))}).<br>Look for integer roots among the divisors of the constant term: x = ${neg(p)} and x = ${neg(q)} make it 0.<br>Ruffini with x = ${neg(p)} twice and x = ${neg(q)} once leaves remainder 0, so x = ${neg(p)} is a <b>double</b> root.<br>Check: (x ${sg(-p)})<sup>2</sup>(x ${sg(-q)}) = ${P(co.map(v => v / c))} ✓ → <b>f(x) = ${C}${fac(p)}<sup>2</sup>${fac(q)}</b>.`, MT(5)) });
add(13, () => { const n = pk([2, 3, 4]), k = ri(2, 9), a = ri(1, 9), R = { 2: '√', 3: '∛', 4: '∜' }[n], d = `[${n}(${x2} + ${a})]`;
  return mc(`Compute the derivative of the function f(x) = ln( ${R}( ${k} / (${x2} + ${a}) ) ).`, `f′(x) = −2x / ${d}`, [`f′(x) = −x / ${d}`, `f′(x) = −2x / (${x2} + ${a})`, `f′(x) = 2x / ${d}`, `f′(x) = −${2 * n}x / (${x2} + ${a})`],
    `Simplify first with the log rules: f(x) = (1/${n})·ln(${k}/(${x2} + ${a})) = (1/${n})·[ln ${k} − ln(${x2} + ${a})].<br>ln ${k} is a constant (derivative 0), and (ln(${x2} + ${a}))′ = 2x/(${x2} + ${a}).<br>f′(x) = (1/${n})·(−2x/(${x2} + ${a})) = <b>−2x / ${d}</b>.`, MT(6)) });
add(14, () => { const b = nz(-6, 6), h = pk([1, 2, 3, 4]), r = P([2, h + b], 'a');
  return mc(`Determine the <b>average rate of change</b> of the function f(x) = ${P([1, b, 0])} on the interval [a, a + ${h}].`, r, [P([2, b - h], 'a'), P([2 * h, h * (h + b)], 'a'), P([1, h + b], 'a'), P([2, b], 'a'), P([2, h - b], 'a')],
    `Average rate of change = [f(a + ${h}) − f(a)] / ${h}.<br>f(a + ${h}) = (a + ${h})<sup>2</sup> ${sg(b)}(a + ${h}) = a<sup>2</sup> + ${2 * h}a + ${h * h} ${sg(b)}a ${sg(b * h)}.<br>f(a + ${h}) − f(a) = ${2 * h}a + ${h * h} ${sg(b * h)} = ${P([2 * h, h * (h + b)], 'a')}.<br>Divide by ${h}: <b>${r}</b>.`, MT(7)) });
add(14, () => { const a = pk([-1, 0, 1, 2, 3]), Ea = a === 0 ? '' : a === 1 ? 'e' : `e<sup>${neg(a)}</sup>`,
    T = c => c === 0 ? `y = ${Ea}x` : (a === 0 ? `y = ${P([1, c])}` : `y = ${Ea}(${P([1, c])})`), right = T(1 - a);
  return mc(`Determine the tangent line to the function f(x) = e<sup>x</sup> at x = ${neg(a)}.`, right, [T(-a), T(a + 1), `y = x + ${a === 0 ? 1 : Ea}`, T(1 + a === 1 - a ? 2 : 1 + a), T(-1 - a)],
    `Tangent line: y = f(a) + f′(a)(x − a). Here f(x) = f′(x) = e<sup>x</sup>, so f(${neg(a)}) = f′(${neg(a)}) = e<sup>${neg(a)}</sup>.<br>y = e<sup>${neg(a)}</sup> + e<sup>${neg(a)}</sup>(x ${sg(-a)}) = e<sup>${neg(a)}</sup>(x ${sg(1 - a)}).<br><b>${right}</b>.`, MT(8)) });
add(15, () => { const r1 = ri(-5, 0), r2 = r1 + ri(1, 3), r3 = r2 + ri(1, 3), d = `(x ${sg(-r1)})(x ${sg(-r2)})(x ${sg(-r3)})`.replace(/\(x \+ 0\)/g, 'x').replace(/\(x − 0\)/g, 'x');
  const T = [`f has a local minimum at x = ${neg(r1)}.`, `f has a local maximum at x = ${neg(r2)}.`, `f has a local minimum at x = ${neg(r3)}.`, `f is increasing on (${neg(r1)}, ${neg(r2)}).`, `f is decreasing on (${neg(r2)}, ${neg(r3)}).`, 'f is a polynomial of degree 4.'],
    Fl = ['f is a polynomial of degree 3.', `f has a local maximum at x = ${neg(r1)}.`, `f is decreasing on (${neg(r1)}, ${neg(r2)}).`, 'f has at most two stationary points.', `f has a local minimum at x = ${neg(r2)}.`, `f is increasing on (${neg(r2)}, ${neg(r3)}).`];
  return mc(`Let f be a function whose derivative is f′(x) = ${d}. Which of the following statements is correct?`, pk(T), shuf(Fl),
    `Stationary points: x = ${neg(r1)}, ${neg(r2)}, ${neg(r3)} (three of them). f′ is a degree-3 polynomial, so f has degree 4.<br>Sign of f′: (−∞, ${neg(r1)}) negative · (${neg(r1)}, ${neg(r2)}) positive · (${neg(r2)}, ${neg(r3)}) negative · (${neg(r3)}, +∞) positive.<br>So f decreases, increases, decreases, increases: <b>local minima at x = ${neg(r1)} and x = ${neg(r3)}</b>, <b>local maximum at x = ${neg(r2)}</b>.`, MT(9)) });
add(16, () => { const L = pk([3, 4, 5]), R = pk([-1, -1, 1]), f = x => x * x * Math.exp(x), C = [-L, -2, R].concat(R > 0 ? [0] : []).sort((p, q) => p - q),
    M = C.reduce((p, q) => f(q) > f(p) ? q : p), m = C.reduce((p, q) => f(q) < f(p) ? q : p), S = (u, v) => `Maximum at x = ${neg(u)} and minimum at x = ${neg(v)}.`, W = [S(m, M), `Maximum at x = ${neg(-L)} and no minimum.`];
  C.forEach(u => C.forEach(v => { if (u !== v && !(u === M && v === m)) W.push(S(u, v)) }));
  return mc(`Consider the function f(x) = ${x2}e<sup>x</sup> defined on the interval [${neg(-L)}, ${neg(R)}]. Where are the absolute extrema attained?`, S(M, m), shuf(W),
    `f′(x) = 2x·e<sup>x</sup> + ${x2}e<sup>x</sup> = x·e<sup>x</sup>(x + 2) = 0 → x = 0 or x = −2.${R < 0 ? ' Only x = −2 lies in the interval.' : ' Both lie in the interval.'}<br>A continuous function on a closed interval attains its extrema at stationary points or endpoints:<br>${C.map(u => `f(${neg(u)}) = ${F(f(u), 3)}`).join(' · ')}.<br><b>${S(M, m)}</b>`, MT(10)) });

/* ===================== Lectures 17–18 (Problem Set I) ===================== */
add(18, () => { const a = ri(1, 3), x = nz(-2, 2), y = nz(-2, 2), w = pk(['xx', 'xy', 'yy']), e = Math.exp(x * y), v = w === 'xx' ? y * y * e : w === 'yy' ? x * x * e : (1 + x * y) * e;
  return num(`Consider f(x, y) = e<sup>xy</sup>. Compute the entry ∂<sup>2</sup>f/∂${w[0]}∂${w[1]} of its Hessian matrix at the point (${neg(x)}, ${neg(y)}) (3 decimals).`, v, 3, '',
    `∂f/∂x = y·e<sup>xy</sup> and ∂f/∂y = x·e<sup>xy</sup>.<br>Second derivatives: ∂<sup>2</sup>f/∂x<sup>2</sup> = y<sup>2</sup>e<sup>xy</sup> · ∂<sup>2</sup>f/∂y<sup>2</sup> = x<sup>2</sup>e<sup>xy</sup> · ∂<sup>2</sup>f/∂x∂y = (1 + xy)e<sup>xy</sup> (product rule).<br>At (${neg(x)}, ${neg(y)}): e<sup>${neg(x * y)}</sup> = ${F(e, 4)} → <b>${F(v, 3)}</b>.`, 'Problem Set I · I4(c)') });
add(18, () => { const s = ri(1, 3), u = `y(${x2} − ${s * s})`;
  return mc(`Determine the stationary points of f(x, y) = e<sup>${u}</sup>.`, `(${s}, 0) and (−${s}, 0)`, [`(0, ${s}) and (0, −${s})`, `(${s}, 0) only`, '(0, 0)', 'It has no stationary points.'],
    `∂f/∂x = 2xy·e<sup>${u}</sup> and ∂f/∂y = (${x2} − ${s * s})·e<sup>${u}</sup>. The exponential is never 0.<br>∂f/∂y = 0 → x = ±${s}. Then ∂f/∂x = 0 → 2xy = 0 with x ≠ 0 → y = 0.<br>Stationary points: <b>(${s}, 0) and (−${s}, 0)</b>.`, 'Problem Set I · I5(c)') });
add(17, () => { const a = ri(1, 4), b = ri(1, 4), c = ri(-5, 5), k = pk([2, -1, 1, 3]), sx = Math.random() < .5;
  const right = sx ? `g(y) = ${P([b, 0, a * k * k + c], 'y')}` : `g(x) = ${P([a, 0, b * k * k + c])}`;
  return mc(`Consider f(x, y) = ${a === 1 ? '' : a}${x2} + ${b === 1 ? '' : b}y<sup>2</sup> ${sg(c)}. Determine the section ${sx ? 'x' : 'y'} = ${neg(k)}.`, right, sx ? [`g(y) = ${P([b, 0, a * k + c], 'y')}`, `g(x) = ${P([a, 0, b * k * k + c])}`, `g(y) = ${P([b, 0, c], 'y')}`, `g(y) = ${P([a * k * k + b, 0, c], 'y')}`] : [`g(x) = ${P([a, 0, b * k + c])}`, `g(y) = ${P([b, 0, a * k * k + c], 'y')}`, `g(x) = ${P([a, 0, c])}`, `g(x) = ${P([a + b * k * k, 0, c])}`],
    `A section fixes one variable and leaves a one-variable function of the other.<br>Substitute ${sx ? 'x' : 'y'} = ${neg(k)}: ${sx ? `${a}·${k * k} + ${b}y<sup>2</sup> ${sg(c)}` : `${a}${x2} + ${b}·${k * k} ${sg(c)}`}.<br><b>${right}</b> — a parabola.`, 'Problem Set I · I2') });

/* ===================== Lecture 19 · Linear programming (Problem Set J) ===================== */
MATES.NAMES[19] = 'Linear programming';
/* constraint [a, b, c] means a·x + b·y ≤ c */
const gcd2 = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const ineq = ([a, b, c], rel) => { const t = (k, v) => k === 0 ? '' : `${k === 1 ? '' : k === -1 ? '−' : neg(k)}${v}`, xs = t(a, 'x'), ys = t(b, 'y');
  const lhs = xs && ys ? `${xs} ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y` : xs || ys; return `${lhs} ${rel || '≤'} ${neg(c)}`; };
const nice = ([a, b, c]) => { const g = gcd2(gcd2(a, b), c), s = (a < 0 || (a === 0 && b < 0)) ? -1 : 1; return [s * a / g, s * b / g, s * c / g, s]; };
const show = k => { const [a, b, c, s] = nice(k); return ineq([a, b, c], s < 0 ? '≥' : '≤'); };
const vertices = C => { const V = [];
  for (let i = 0; i < C.length; i++) for (let j = i + 1; j < C.length; j++) { const [a1, b1, c1] = C[i], [a2, b2, c2] = C[j], d = a1 * b2 - a2 * b1; if (!d) continue;
    const x = (c1 * b2 - c2 * b1) / d + 0, y = (a1 * c2 - a2 * c1) / d + 0;
    if (C.every(([a, b, c]) => a * x + b * y <= c + 1e-9) && !V.some(v => Math.abs(v[0] - x) < 1e-9 && Math.abs(v[1] - y) < 1e-9)) V.push([x, y]); }
  return V; };
const pt = v => `(${F(v[0], 2)}, ${F(v[1], 2)})`;
const lineThrough = (P, Q, R) => { let a = Q[1] - P[1], b = P[0] - Q[0], c = a * P[0] + b * P[1]; if (a * R[0] + b * R[1] > c) { a = -a; b = -b; c = -c; } return [a, b, c]; };
const tri = () => { for (let i = 0; i < 50; i++) { const A = [ri(0, 4), ri(0, 4)], B = [ri(5, 11), ri(0, 5)], Cc = [ri(1, 9), ri(5, 10)], ar = (B[0] - A[0]) * (Cc[1] - A[1]) - (Cc[0] - A[0]) * (B[1] - A[1]);
  if (Math.abs(ar) >= 12) return [A, B, Cc]; } return null; };
add(19, () => { const T = tri(); if (!T) return null; const [A, B, Cc] = T, C = [lineThrough(A, B, Cc), lineThrough(B, Cc, A), lineThrough(Cc, A, B)];
  const a = nz(-6, 6), b = nz(-6, 6), mx = Math.random() < .5, Fv = v => a * v[0] + b * v[1] + 0, V = vertices(C), best = V.reduce((p, q) => (mx ? Fv(q) > Fv(p) : Fv(q) < Fv(p)) ? q : p);
  if (V.length !== 3 || V.filter(v => Fv(v) === Fv(best)).length > 1) return null;
  return num(`${mx ? 'Maximise' : 'Minimise'} F(x, y) = ${a === 1 ? "" : a === -1 ? "−" : neg(a)}x ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}y subject to: ${C.map(show).join('; ')}. What is the optimal value of F?`, Fv(best), 0, '',
    `The feasible region is the triangle whose vertices are the intersections of each pair of boundary lines: ${V.map(pt).join(', ')}.<br>The optimum of a linear function on a bounded region is attained at a vertex: ${V.map(v => `F${pt(v)} = ${F(Fv(v))}`).join(' · ')}.<br>${mx ? 'Maximum' : 'Minimum'} at ${pt(best)}: <b>F = ${F(Fv(best))}</b>.`, 'Problem Set J · J1–J2') });
add(19, () => { const T = tri(); if (!T) return null; const [A, B, Cc] = T, C = [lineThrough(A, B, Cc), lineThrough(B, Cc, A), lineThrough(Cc, A, B)];
  const right = C.map(show).join('; '), flip = k => k.map(z => -z), wrong = [0, 1, 2].map(i => C.map((k, j) => j === i ? show(flip(k)) : show(k)).join('; '));
  return mc(`Which inequalities define the closed triangle with vertices A${pt(A)}, B${pt(B)} and C${pt(Cc)}?`, right, wrong,
    `Each side lies on the line through two vertices; the inequality sign is chosen so that the third vertex satisfies it.<br>AB, checked with C: ${show(C[0])} · BC, checked with A: ${show(C[1])} · CA, checked with B: ${show(C[2])}.<br><b>${right}</b>`, 'Problem Set J · J3') });
add(19, () => { const T = tri(); if (!T) return null; const [A, B, Cc] = T, C = [lineThrough(A, B, Cc), lineThrough(B, Cc, A), lineThrough(Cc, A, B)], kind = pk(['in', 'bd', 'out']);
  let p; if (kind === 'in') p = [(A[0] + B[0] + Cc[0]) / 3, (A[1] + B[1] + Cc[1]) / 3]; else if (kind === 'bd') p = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]; else p = [B[0] + 2, B[1] + ri(-1, 1)];
  if (!Number.isInteger(p[0] * 2) || !Number.isInteger(p[1] * 2)) return null;
  const val = C.map(([a, b, c]) => [a * p[0] + b * p[1], c]), real = val.some(([l, c]) => l > c + 1e-9) ? 'out' : val.some(([l, c]) => Math.abs(l - c) < 1e-9) ? 'bd' : 'in', L = { in: 'An interior point', bd: 'A boundary point', out: 'Outside the region' };
  return mc(`The region R is defined by ${C.map(show).join('; ')}. The point P${pt(p)} is…`, L[real], [L.in, L.bd, L.out, 'A vertex of the region'],
    `Substitute P into each inequality: ${C.map((k, i) => { const [a, b, c, s] = nice(k), l = a * p[0] + b * p[1]; return `${show(k)} → ${F(l, 2)} ${s < 0 ? "≥" : "≤"} ${neg(c)}${Math.abs(val[i][0] - val[i][1]) < 1e-9 ? " (equality)" : val[i][0] > val[i][1] ? " ✘" : " ✔"}` }).join(" · ")}.<br>${real === 'out' ? 'One inequality fails → <b>outside</b>.' : real === 'bd' ? 'All hold and one is an equality → <b>boundary point</b>.' : 'All hold strictly → <b>interior point</b>.'}`, 'Problem Set J · J4') });
add(19, () => { const mx = ri(6, 12), my = ri(6, 12), h1 = ri(1, 2), h2 = ri(2, 4), H = ri(Math.max(mx * h1, my * h2) - 2, mx * h1 + my * h2 - 4), p1 = ri(3, 9), p2 = ri(8, 20);
  const C = [[1, 0, mx], [0, 1, my], [h1, h2, H], [-1, 0, 0], [0, -1, 0]], V = vertices(C), Fv = v => p1 * v[0] + p2 * v[1] + 0, best = V.reduce((p, q) => Fv(q) > Fv(p) ? q : p);
  if (!best.every(Number.isInteger) || V.filter(v => Fv(v) === Fv(best)).length > 1) return null;
  return num(`A craftsperson decorates jugs and vases each month: at most ${mx} jugs and at most ${my} vases. A jug takes ${h1} hour${h1 > 1 ? 's' : ''} and a vase ${h2} hours, with at most ${H} hours per month. The profit is €${p1} per jug and €${p2} per vase, and all production is sold. What is the maximum monthly profit?`, Fv(best), 0, '€',
    `x = jugs, y = vases. Maximise F = ${p1}x + ${p2}y subject to x ≤ ${mx}, y ≤ ${my}, ${h1 === 1 ? '' : h1}x + ${h2}y ≤ ${H}, x, y ≥ 0.<br>Vertices: ${V.map(pt).join(', ')}.<br>${V.map(v => `F${pt(v)} = ${F(Fv(v))}`).join(' · ')}.<br>Best: ${best[0]} jugs and ${best[1]} vases → <b>€${F(Fv(best))}</b>.`, 'Problem Set J · J5') });
add(19, () => { const s1 = pk([0.5, 1]), s2 = pk([1, 1.5, 2]), e1 = ri(6, 10), e2 = ri(4, 8), x0 = ri(3, 12), y0 = ri(2, 10), S = s1 * x0 + s2 * y0, Eg = e1 * x0 + e2 * y0, p1 = ri(6, 12), p2 = ri(8, 16);
  if (!Number.isInteger(S) || !(s1 / s2 < p1 / p2 && p1 / p2 < e1 / e2)) return null;
  if (s1 === s2 && e1 === e2) return null;
  const C = [[s1, s2, S], [e1, e2, Eg], [-1, 0, 0], [0, -1, 0]], V = vertices(C), Fv = v => p1 * v[0] + p2 * v[1] + 0, best = V.reduce((p, q) => Fv(q) > Fv(p) ? q : p);
  if (!best.every(Number.isInteger) || V.filter(v => Fv(v) === Fv(best)).length > 1 || best[0] === 0 || best[1] === 0) return null;
  return num(`A bakery makes two cakes. Cake A needs ${F(s1)} kg of sugar and ${e1} eggs and sells for €${p1}; cake B needs ${F(s2)} kg of sugar and ${e2} eggs and sells for €${p2}. There are ${S} kg of sugar and ${Eg} eggs in stock. What is the maximum revenue?`, Fv(best), 0, '€',
    `x = cakes A, y = cakes B. Maximise R = ${p1}x + ${p2}y subject to ${F(s1)}x + ${s2 === 1 ? "" : F(s2)}y ≤ ${S} (sugar), ${e1}x + ${e2}y ≤ ${Eg} (eggs), x, y ≥ 0.<br>Vertices: ${V.map(pt).join(', ')}.<br>${V.map(v => `R${pt(v)} = ${F(Fv(v))}`).join(' · ')}.<br>Best: ${best[0]} cakes A and ${best[1]} cakes B → <b>€${F(Fv(best))}</b>.`, 'Problem Set J · J6') });

/* ===================== remove the one-step warm-ups ===================== */
const EASY = [/Calculate the percentage change in the exchange rate\.$/, /Determine the percentage markup on the cost price/, /^Classify the sequence/, /is invested at <b>simple<\/b> interest/, /^Solve the equation log<sub>\d+<\/sub>\(x\) = \d+\.$/, /^Solve the equation ln\(e<sup>/, /^Solve the equation √\(x \+ \d+\) = \d+\.$/, /^Compute \d+<sup>/, /What is its y-intercept\?$/, /^Determine the range of f\(x\) = \(x [+−]/, /Compute the image of the point/, /have a horizontal tangent line\?$/, /^Find the <b>largest<\/b> root of f\(x\) = /, /compute f′\(−?\d+\)\.$/, /Determine the transport cost in month n = /, /Determine the number of units produced in month \d+ \(round/, /^Determine the domain of f\(x\) = (√|∛)\(x − \d+\)\.$/, /Calculate C\(\d+\) − C\(\d+\)/, /^Calculate the sum of all the terms of the arithmetic sequence/, /Calculate the salary after both changes/];
const easy = g => { for (let i = 0; i < 6; i++) { let q = null; try { q = g.fn() } catch (e) {} if (q) return EASY.some(re => re.test(q.q)) } return false };
MATES.removed = MATES.G.filter(easy).length;
const keep = MATES.G.filter(g => !easy(g)); MATES.G.length = 0; keep.forEach(g => MATES.G.push(g));
})();
