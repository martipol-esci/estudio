/* Modelos de examen · Mathematics. El aula no publica el formato del examen final: se estima combinando los dos midterms
   (Midterm 1: 3 preguntas abiertas; Midterm 2: 10 tipo test de 4 opciones, +1 / −0,33). Examen final: 50 % de la nota, mínimo 4.
   Entran las lecciones 1–20 (también funciones de dos variables, conjuntos en R² y programación lineal). */
(window.EXAMENES = window.EXAMENES || {}).mates = {
  nombre: 'Mathematics', emoji: '📐', color: 'var(--c-mat)', lang: 'en',
  fecha: 'Viernes 11 de diciembre · 9:00–11:00', grado: 'Degree in International Business and Marketing', curso: 'Mathematics · Group 3 · 2026–27',
  titulo: 'Mathematics · Final Exam',
  formato: ['Parte A: 10 preguntas tipo test de 4 opciones (0,4; fallo −0,13)', 'Parte B: 3 problemas abiertos de 2 puntos', 'Lecciones 1–20, todo el curso', 'Vale el 50 % (mínimo un 4) · calculadora no programable'],
  estimado: 'Formato estimado: el aula no publica el del examen final',
  instrucciones: [
    '<b>Duration:</b> 2 hours. Non-programmable calculators only (no graphing, memory or AI calculators).',
    '<b>Part A</b> (4 points): 10 multiple-choice questions, 0.4 points each; a wrong answer deducts 0.13 points; unanswered questions score 0.',
    '<b>Part B</b> (6 points): 3 problems, 2 points each. Show all your reasoning and calculations.'
  ],
  modelos: [
    /* ---------------- MODEL 1 ---------------- */
    { secciones: [
      { h: 'Part A · Multiple choice (10 × 0.4 points)', qs: [
        { n: 'A1', p: 0.4, q: 'A price rises by 20 % and then falls by 20 %. The overall change is:', o: ['0 %', '−4 %', '+4 %', '−2 %'], a: 1, s: '1.20 × 0.80 = 0.96 → −4 %.' },
        { n: 'A2', p: 0.4, q: 'A geometric sequence has a₀ = 5 and ratio r = 2. Then a₄ equals:', o: ['40', '80', '160', '32'], a: 1, s: 'a₄ = 5 · 2⁴ = 80.' },
        { n: 'A3', p: 0.4, q: 'A nominal annual rate of 6 % compounded monthly gives an EAR of approximately:', o: ['6.00 %', '6.17 %', '6.25 %', '0.50 %'], a: 1, s: 'EAR = (1 + 0.06/12)¹² − 1 = 1.005¹² − 1 ≈ 6.17 %.' },
        { n: 'A4', p: 0.4, q: 'The domain of f(x) = √(x − 3) / (x − 5) is:', o: ['[3, ∞)', '(3, 5)', '[3, 5) ∪ (5, ∞)', 'ℝ ∖ {5}'], a: 2, s: 'x − 3 ≥ 0 and x ≠ 5.' },
        { n: 'A5', p: 0.4, q: 'The derivative of f(x) = ln(x² + 1) is:', o: ['1/(x² + 1)', '2x/(x² + 1)', '2x · ln(x² + 1)', '(x² + 1)/2x'], a: 1, s: 'Chain rule: (1/(x²+1)) · 2x.' },
        { n: 'A6', p: 0.4, q: 'The tangent line to f(x) = x² at x = 3 is:', o: ['y = 6x − 9', 'y = 6x + 9', 'y = 3x', 'y = 9x − 18'], a: 0, s: 'f(3) = 9, f′(3) = 6 → y − 9 = 6(x − 3) → y = 6x − 9.' },
        { n: 'A7', p: 0.4, q: 'For f(x) = x³ − 3x:', o: ['It has a local maximum at x = 1', 'It has a local maximum at x = −1', 'It has no local extrema', 'It has a local minimum at x = −1'], a: 1, s: 'f′ = 3x² − 3 = 0 → x = ±1; f″ = 6x: f″(−1) = −6 < 0 → max at −1, min at 1.' },
        { n: 'A8', p: 0.4, q: 'The range of f(x) = eˣ + 2 is:', o: ['ℝ', '[2, ∞)', '(2, ∞)', '(0, ∞)'], a: 2, s: 'eˣ > 0 → eˣ + 2 > 2.' },
        { n: 'A9', p: 0.4, q: 'For f(x, y) = x²y + 3y, ∂f/∂x equals:', o: ['2xy', 'x² + 3', '2x + 3', '2xy + 3y'], a: 0, s: 'Treat y as a constant.' },
        { n: 'A10', p: 0.4, q: 'A feasible region has vertices (0, 0), (6, 0), (4, 3) and (0, 5). The maximum of F = 2x + 3y is:', o: ['12', '15', '17', '18'], a: 2, s: 'F = 0, 12, 17, 15 → maximum 17 at (4, 3).' }
      ]},
      { h: 'Part B · Problems (3 × 2 points)', qs: [
        { n: 'B1 · Mortgage', p: 2, q: 'A family takes a €150,000 mortgage over 25 years at a nominal annual rate of 3.6 %, with monthly payments.<br>a) Calculate the monthly payment. (1 point)<br>b) Calculate the total amount paid and the total interest. (0.5 points)<br>c) Calculate the effective annual rate (EAR). (0.5 points)', l: 12,
          s: 'a) i = 0.036/12 = 0.003, n = 300. Payment = 150,000 · 0.003 / (1 − 1.003⁻³⁰⁰) = 450 / (1 − 0.40712) ≈ <b>€759.00</b>.<br>b) Total ≈ 759.00 · 300 = €227,700; interest ≈ 227,700 − 150,000 = <b>€77,700</b>.<br>c) EAR = 1.003¹² − 1 ≈ <b>3.66 %</b>.' },
        { n: 'B2 · Optimisation in one variable', p: 2, q: 'Let f(x) = x³ − 6x² + 9x + 1.<br>a) Find the stationary points and classify them. (0.75 points)<br>b) Find the absolute maximum and minimum of f on [0, 5]. (0.75 points)<br>c) Study the concavity and find the inflection point. (0.5 points)', l: 12,
          s: 'a) f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3) = 0 → x = 1, x = 3. f″(x) = 6x − 12: f″(1) = −6 < 0 → local max (1, 5); f″(3) = 6 > 0 → local min (3, 1).<br>b) f(0) = 1, f(1) = 5, f(3) = 1, f(5) = 125 − 150 + 45 + 1 = 21. Absolute max <b>21 at x = 5</b>; absolute min <b>1 at x = 0 and x = 3</b>.<br>c) f″ = 0 at x = 2: concave on (−∞, 2), convex on (2, ∞); inflection point (2, 3).' },
        { n: 'B3 · Functions of two variables', p: 2, q: 'a) Find and sketch the domain of g(x, y) = √(4 − x² − y²). (0.5 points)<br>b) Find the stationary point of f(x, y) = x² + y² − 4x + 6y + 2. (0.75 points)<br>c) Classify it using the Hessian matrix and give the value of f there. (0.75 points)', l: 12,
          s: 'a) 4 − x² − y² ≥ 0 → x² + y² ≤ 4: the closed disc of radius 2 centred at the origin.<br>b) fₓ = 2x − 4 = 0 → x = 2; fᵧ = 2y + 6 = 0 → y = −3. Stationary point (2, −3).<br>c) H = [[2, 0], [0, 2]], det H = 4 > 0 and fₓₓ = 2 > 0 → <b>local (global) minimum</b>; f(2, −3) = 4 + 9 − 8 − 18 + 2 = <b>−11</b>.' }
      ]}
    ]},
    /* ---------------- MODEL 2 ---------------- */
    { secciones: [
      { h: 'Part A · Multiple choice (10 × 0.4 points)', qs: [
        { n: 'A1', p: 0.4, q: 'After a 20 % discount a product costs €80. Its original price was:', o: ['€96', '€100', '€64', '€120'], a: 1, s: '80 / 0.8 = 100.' },
        { n: 'A2', p: 0.4, q: 'An arithmetic sequence has a₁ = 7 and d = 4. The sum of its first 10 terms is:', o: ['250', '230', '270', '430'], a: 0, s: 'a₁₀ = 7 + 9·4 = 43; S = 10 · (7 + 43)/2 = 250.' },
        { n: 'A3', p: 0.4, q: '€2,000 is invested at 5 % compound annual interest for 3 years. The final amount is:', o: ['€2,300.00', '€2,315.25', '€2,310.00', '€2,205.00'], a: 1, s: '2,000 · 1.05³ = 2,315.25.' },
        { n: 'A4', p: 0.4, q: 'The range of f(x) = (x + 1)/(x − 2) is:', o: ['ℝ ∖ {2}', 'ℝ ∖ {1}', 'ℝ ∖ {−1}', 'ℝ'], a: 1, s: 'Horizontal asymptote y = 1 is never reached.' },
        { n: 'A5', p: 0.4, q: 'The solution of log₂(x) + log₂(x − 2) = 3 is:', o: ['x = 4', 'x = −2', 'x = 4 and x = −2', 'x = 8'], a: 0, s: 'x(x − 2) = 8 → x² − 2x − 8 = 0 → x = 4 or −2; x = −2 is outside the domain.' },
        { n: 'A6', p: 0.4, q: 'The derivative of f(x) = x·eˣ is:', o: ['eˣ', 'x·eˣ', 'eˣ(1 + x)', 'eˣ(x − 1)'], a: 2, s: 'Product rule.' },
        { n: 'A7', p: 0.4, q: 'The graph of g(x) = (x − 3)² + 1 is the graph of y = x² shifted:', o: ['3 left and 1 up', '3 right and 1 up', '3 right and 1 down', '1 right and 3 up'], a: 1, s: 'Vertex at (3, 1).' },
        { n: 'A8', p: 0.4, q: 'The maximum value of f(x) = −x² + 8x − 5 is:', o: ['11', '4', '27', '−5'], a: 0, s: 'f′ = −2x + 8 = 0 → x = 4; f(4) = 11.' },
        { n: 'A9', p: 0.4, q: 'The stationary points of f(x, y) = x³ + y² − 3x are:', o: ['(1, 0) only', '(1, 0) and (−1, 0)', '(0, 1) and (0, −1)', '(0, 0)'], a: 1, s: '3x² − 3 = 0 → x = ±1; 2y = 0 → y = 0.' },
        { n: 'A10', p: 0.4, q: 'Which point satisfies x + y ≤ 6, 2x + y ≥ 4, x, y ≥ 0?', o: ['(1, 1)', '(2, 3)', '(5, 3)', '(0, 2)'], a: 1, s: '(2, 3): 5 ≤ 6 and 7 ≥ 4.' }
      ]},
      { h: 'Part B · Problems (3 × 2 points)', qs: [
        { n: 'B1 · Sequences', p: 2, q: 'A company’s sales were €200,000 in 2026 and grow by 5 % per year.<br>a) What will sales be in 2031? (0.5 points)<br>b) What are the cumulative sales from 2026 to 2031, both included? (0.75 points)<br>c) In which year will annual sales exceed €300,000 for the first time? (0.75 points)', l: 12,
          s: 'a) a₅ = 200,000 · 1.05⁵ ≈ <b>€255,256.31</b>.<br>b) 6 terms: S = 200,000 · (1.05⁶ − 1)/0.05 ≈ <b>€1,360,382.56</b>.<br>c) 1.05ⁿ > 1.5 → n > ln 1.5 / ln 1.05 ≈ 8.31 → n = 9 → <b>2035</b>.' },
        { n: 'B2 · Average cost', p: 2, q: 'The cost of producing q units is C(q) = 2q² + 50q + 800.<br>a) Write the average cost AC(q) and find the output that minimises it. (1 point)<br>b) Check that it is a minimum and give the minimum average cost. (0.5 points)<br>c) Show that marginal cost equals average cost at that output. (0.5 points)', l: 12,
          s: 'a) AC(q) = 2q + 50 + 800/q; AC′(q) = 2 − 800/q² = 0 → q² = 400 → <b>q = 20</b>.<br>b) AC″(q) = 1600/q³ > 0 → minimum. AC(20) = 40 + 50 + 40 = <b>130</b>.<br>c) C′(q) = 4q + 50 → C′(20) = 130 = AC(20).' },
        { n: 'B3 · Linear programming', p: 2, q: 'A workshop makes tables (x) and chairs (y). A table needs 2 machine hours and 1 finishing hour; a chair needs 1 machine hour and 1 finishing hour. There are 16 machine hours and 10 finishing hours. Profit is €30 per table and €20 per chair.<br>a) Formulate the problem. (0.5 points)<br>b) Find the vertices of the feasible region. (0.75 points)<br>c) Find the optimal production and the maximum profit. (0.75 points)', l: 12,
          s: 'a) Maximise F = 30x + 20y subject to 2x + y ≤ 16, x + y ≤ 10, x, y ≥ 0.<br>b) (0, 0), (8, 0), (6, 4) [from 2x + y = 16 and x + y = 10], (0, 10).<br>c) F = 0, 240, 260, 200 → <b>6 tables and 4 chairs, €260</b>.' }
      ]}
    ]},
    /* ---------------- MODEL 3 ---------------- */
    { secciones: [
      { h: 'Part A · Multiple choice (10 × 0.4 points)', qs: [
        { n: 'A1', p: 0.4, q: 'A salary rises by 3 % while prices rise by 5 %. The change in real salary is approximately:', o: ['−2.00 %', '−1.90 %', '+2.00 %', '−8.00 %'], a: 1, s: '1.03/1.05 − 1 ≈ −1.90 %.' },
        { n: 'A2', p: 0.4, q: 'The infinite sum 6 + 3 + 1.5 + … equals:', o: ['10.5', '12', '9', 'It diverges'], a: 1, s: 'a₀/(1 − r) = 6/0.5 = 12.' },
        { n: 'A3', p: 0.4, q: 'The present value of €5,000 received in 4 years at 4 % compound annual interest is approximately:', o: ['€4,200.00', '€4,274.02', '€4,800.00', '€5,849.29'], a: 1, s: '5,000 / 1.04⁴ ≈ 4,274.02.' },
        { n: 'A4', p: 0.4, q: 'The domain of f(x) = ln(9 − x²) is:', o: ['(−3, 3)', '[−3, 3]', 'ℝ ∖ {±3}', '(3, ∞)'], a: 0, s: '9 − x² > 0.' },
        { n: 'A5', p: 0.4, q: 'For f(x) = 3·2ˣ, which statement is true?', o: ['f(0) = 0', 'It is decreasing', 'Its graph passes through (0, 3) and is increasing', 'Its range is ℝ'], a: 2, s: 'f(0) = 3; base 2 > 1 → increasing; range (0, ∞).' },
        { n: 'A6', p: 0.4, q: 'The derivative of f(x) = (2x + 1)⁵ is:', o: ['5(2x + 1)⁴', '10(2x + 1)⁴', '(2x + 1)⁴', '10x(2x + 1)⁴'], a: 1, s: 'Chain rule: 5(2x + 1)⁴ · 2.' },
        { n: 'A7', p: 0.4, q: 'The average rate of change of f(x) = x² + 1 on [1, 3] is:', o: ['2', '4', '8', '10'], a: 1, s: '(f(3) − f(1))/2 = (10 − 2)/2 = 4.' },
        { n: 'A8', p: 0.4, q: 'For f(x) = x⁴ − 4x³:', o: ['x = 0 is a local maximum', 'x = 3 is a local minimum and x = 0 is not an extremum', 'x = 3 is a local maximum', 'There are no stationary points'], a: 1, s: 'f′ = 4x²(x − 3): sign changes only at x = 3 (− to +).' },
        { n: 'A9', p: 0.4, q: 'The level curve f(x, y) = 9 of f(x, y) = x² + y² is:', o: ['A line', 'A circle of radius 9', 'A circle of radius 3', 'A parabola'], a: 2, s: 'x² + y² = 9.' },
        { n: 'A10', p: 0.4, q: 'The Hessian matrix of f(x, y) = x²y is:', o: ['[[2y, 2x], [2x, 0]]', '[[2x, 2y], [2y, 0]]', '[[2y, 0], [0, 2x]]', '[[2, 2x], [2x, 0]]'], a: 0, s: 'fₓₓ = 2y, fₓᵧ = 2x, fᵧᵧ = 0.' }
      ]},
      { h: 'Part B · Problems (3 × 2 points)', qs: [
        { n: 'B1 · Loan repayment', p: 2, q: 'A €20,000 loan is repaid in 5 equal annual payments at 6 % compound annual interest.<br>a) Calculate the annual payment. (1 point)<br>b) How much interest and how much principal are paid in the first year? What is the outstanding balance after it? (0.5 points)<br>c) Calculate the total interest paid. (0.5 points)', l: 12,
          s: 'a) Payment = 20,000 · 0.06 / (1 − 1.06⁻⁵) = 1,200 / 0.252742 ≈ <b>€4,747.93</b>.<br>b) Interest = 20,000 · 0.06 = €1,200; principal = 4,747.93 − 1,200 = €3,547.93; balance = <b>€16,452.07</b>.<br>c) 5 · 4,747.93 − 20,000 ≈ <b>€3,739.64</b>.' },
        { n: 'B2 · Exponential model', p: 2, q: 'The number of users of an app is U(t) = 500·e^(0.08t), with t in months.<br>a) How many users are there at t = 0 and at t = 10? (0.5 points)<br>b) When will the number of users double? (0.75 points)<br>c) Calculate U′(t) and interpret U′(10). (0.75 points)', l: 12,
          s: 'a) U(0) = 500; U(10) = 500·e^0.8 ≈ <b>1,112.77</b>.<br>b) e^(0.08t) = 2 → t = ln 2 / 0.08 ≈ <b>8.66 months</b>.<br>c) U′(t) = 40·e^(0.08t); U′(10) = 40·e^0.8 ≈ 89.02: at month 10 users grow at about <b>89 users per month</b>.' },
        { n: 'B3 · Optimisation in two variables', p: 2, q: 'Let f(x, y) = x³ − 3x + y² − 4y.<br>a) Find the stationary points. (0.75 points)<br>b) Classify them with the Hessian matrix. (1 point)<br>c) Give the value of f at the local minimum. (0.25 points)', l: 12,
          s: 'a) fₓ = 3x² − 3 = 0 → x = ±1; fᵧ = 2y − 4 = 0 → y = 2 → (1, 2) and (−1, 2).<br>b) H = [[6x, 0], [0, 2]]. At (1, 2): det = 12 > 0, fₓₓ = 6 > 0 → <b>local minimum</b>. At (−1, 2): det = −12 < 0 → <b>saddle point</b>.<br>c) f(1, 2) = 1 − 3 + 4 − 8 = <b>−6</b>.' }
      ]}
    ]},
    /* ---------------- MODEL 4 ---------------- */
    { secciones: [
      { h: 'Part A · Multiple choice (10 × 0.4 points)', qs: [
        { n: 'A1', p: 0.4, q: 'A share price goes from €50 to €65. The percentage change is:', o: ['+15 %', '+23.1 %', '+30 %', '+65 %'], a: 2, s: '(65 − 50)/50 = 30 %.' },
        { n: 'A2', p: 0.4, q: 'For aₙ = 3n + 2, which statement is true?', o: ['It is geometric with r = 3', 'It is arithmetic with d = 3 and a₂₀ = 62', 'It is arithmetic with d = 2', 'a₂₀ = 60'], a: 1, s: 'aₙ₊₁ − aₙ = 3; a₂₀ = 62.' },
        { n: 'A3', p: 0.4, q: 'Which deposit is better: 4.8 % nominal compounded monthly or 4.9 % compounded annually?', o: ['4.9 % annually', '4.8 % monthly (EAR ≈ 4.91 %)', 'They are exactly equal', 'It cannot be compared'], a: 1, s: 'EAR = 1.004¹² − 1 ≈ 4.907 % > 4.9 %.' },
        { n: 'A4', p: 0.4, q: 'The solution of e^(2x) = 7 is approximately:', o: ['0.973', '1.946', '3.5', '0.845'], a: 0, s: 'x = ln 7 / 2 ≈ 0.973.' },
        { n: 'A5', p: 0.4, q: 'The domain of f(x) = 1/√(x² − 4) is:', o: ['[−2, 2]', '(−∞, −2) ∪ (2, ∞)', 'ℝ ∖ {±2}', '(2, ∞)'], a: 1, s: 'x² − 4 > 0 (strict: it is in the denominator).' },
        { n: 'A6', p: 0.4, q: 'The derivative of f(x) = √(x² + 5) is:', o: ['1/(2√(x² + 5))', 'x/√(x² + 5)', '2x·√(x² + 5)', 'x/(x² + 5)'], a: 1, s: '(1/(2√(x²+5)))·2x.' },
        { n: 'A7', p: 0.4, q: 'The maximum of f(x) = x/(x² + 1) is:', o: ['1 at x = 1', '1/2 at x = 1', '1/2 at x = −1', 'It has no maximum'], a: 1, s: 'f′ = (1 − x²)/(x² + 1)² → x = ±1; f(1) = 1/2.' },
        { n: 'A8', p: 0.4, q: 'The roots of f(x) = x³ − x² − 6x are:', o: ['0, 2, −3', '0, 3, −2', '1, 6', '3, −2'], a: 1, s: 'x(x − 3)(x + 2).' },
        { n: 'A9', p: 0.4, q: 'For f(x, y) = e^(xy), ∂f/∂y is:', o: ['e^(xy)', 'y·e^(xy)', 'x·e^(xy)', 'xy·e^(xy)'], a: 2, s: 'Chain rule with respect to y.' },
        { n: 'A10', p: 0.4, q: 'A feasible region has vertices (0, 4), (2, 1) and (5, 0). The minimum of F = x + 2y is:', o: ['4 at (2, 1)', '5 at (5, 0)', '8 at (0, 4)', '0'], a: 0, s: 'F = 8, 4, 5.' }
      ]},
      { h: 'Part B · Problems (3 × 2 points)', qs: [
        { n: 'B1 · Compound interest', p: 2, q: '€3,000 is deposited at a nominal annual rate of 4 % compounded quarterly.<br>a) Calculate the balance after 6 years. (0.75 points)<br>b) Calculate the EAR. (0.5 points)<br>c) How long does it take for the money to double? (0.75 points)', l: 12,
          s: 'a) 3,000 · 1.01²⁴ ≈ <b>€3,809.20</b>.<br>b) EAR = 1.01⁴ − 1 ≈ <b>4.06 %</b>.<br>c) 1.01ᵏ = 2 → k = ln 2 / ln 1.01 ≈ 69.66 quarters → 70 quarters = <b>17.5 years</b>.' },
        { n: 'B2 · Revenue maximisation', p: 2, q: 'Demand for a product is q = 200 − 4p, where p is the price in euros.<br>a) Write revenue R(p) and find the price that maximises it. (1 point)<br>b) How many units are sold and what is the maximum revenue? (0.5 points)<br>c) For which prices is revenue increasing? (0.5 points)', l: 12,
          s: 'a) R(p) = p(200 − 4p) = 200p − 4p²; R′(p) = 200 − 8p = 0 → <b>p = €25</b> (R″ = −8 < 0, maximum).<br>b) q = 200 − 100 = <b>100 units</b>; R = 25 · 100 = <b>€2,500</b>.<br>c) R′(p) > 0 → <b>0 < p < 25</b>.' },
        { n: 'B3 · Sets in ℝ² and linear programming', p: 2, q: 'Consider the triangle with vertices (0, 0), (4, 0) and (0, 2).<br>a) Write the inequalities that define the closed triangle. (0.75 points)<br>b) Is the point (1, 1) interior, on the boundary or outside? Justify. (0.5 points)<br>c) Find the maximum of F = 3x + 5y on the triangle. (0.75 points)', l: 12,
          s: 'a) x ≥ 0, y ≥ 0, x + 2y ≤ 4 (line through (4, 0) and (0, 2)).<br>b) 1 > 0, 1 > 0 and 1 + 2 = 3 < 4: all strict → <b>interior point</b>.<br>c) F(0, 0) = 0, F(4, 0) = 12, F(0, 2) = 10 → <b>maximum 12 at (4, 0)</b>.' }
      ]}
    ]},
    /* ---------------- MODEL 5 ---------------- */
    { secciones: [
      { h: 'Part A · Multiple choice (10 × 0.4 points)', qs: [
        { n: 'A1', p: 0.4, q: 'A price falls by 25 %. To return to the original price it must rise by:', o: ['25 %', '30 %', '33.33 %', '20 %'], a: 2, s: '1/0.75 − 1 = 33.33 %.' },
        { n: 'A2', p: 0.4, q: 'A geometric sequence has a₀ = 1,000 and r = 0.9. Then a₃ is:', o: ['729', '810', '700', '900'], a: 0, s: '1,000 · 0.9³ = 729.' },
        { n: 'A3', p: 0.4, q: 'A mortgage has a nominal annual rate of 4.2 % with monthly payments. The monthly rate is:', o: ['4.2 %', '0.42 %', '0.35 %', '0.0035 %'], a: 2, s: '4.2 %/12 = 0.35 %.' },
        { n: 'A4', p: 0.4, q: 'The range of f(x) = x² − 6x + 10 is:', o: ['ℝ', '[1, ∞)', '[3, ∞)', '[10, ∞)'], a: 1, s: 'Vertex (3, 1), parabola opening upwards.' },
        { n: 'A5', p: 0.4, q: 'The solution of 10^(x − 1) = 100 is:', o: ['x = 2', 'x = 3', 'x = 10', 'x = 1'], a: 1, s: 'x − 1 = 2.' },
        { n: 'A6', p: 0.4, q: 'The derivative of f(x) = x²·ln x is:', o: ['2x/x', '2x·ln x + x', '2x·ln x', 'x + ln x'], a: 1, s: 'Product rule: 2x·ln x + x²·(1/x).' },
        { n: 'A7', p: 0.4, q: 'The slope of the tangent to f(x) = e^(2x) at x = 0 is:', o: ['1', '2', 'e²', '0'], a: 1, s: 'f′(x) = 2e^(2x) → f′(0) = 2.' },
        { n: 'A8', p: 0.4, q: 'The absolute maximum of f(x) = 2x³ − 3x² − 12x on [−2, 3] is:', o: ['7 at x = −1', '−4 at x = −2', '−9 at x = 3', '20 at x = 2'], a: 0, s: 'f′ = 6(x − 2)(x + 1); f(−2) = −4, f(−1) = 7, f(2) = −20, f(3) = −9.' },
        { n: 'A9', p: 0.4, q: 'The domain of f(x, y) = ln(y − x²) is:', o: ['The points below the parabola y = x²', 'The points strictly above the parabola y = x²', 'The parabola y = x²', 'ℝ²'], a: 1, s: 'y − x² > 0.' },
        { n: 'A10', p: 0.4, q: 'In a linear programming problem with a bounded feasible region, the optimum is reached:', o: ['At the centre of the region', 'At a vertex of the region', 'Only at the origin', 'Outside the region'], a: 1, s: 'Evaluate F at the vertices.' }
      ]},
      { h: 'Part B · Problems (3 × 2 points)', qs: [
        { n: 'B1 · Salary growth', p: 2, q: 'An employee earns €30,000 in 2026 and the salary rises by €1,200 every year.<br>a) What will the salary be in 2036? (0.5 points)<br>b) How much will the employee earn in total from 2026 to 2036, both included? (0.75 points)<br>c) An alternative offer increases the salary by 3.5 % per year from €30,000. Which offer gives the higher salary in 2036? (0.75 points)', l: 12,
          s: 'a) a₁₀ = 30,000 + 10 · 1,200 = <b>€42,000</b>.<br>b) 11 terms: S = 11 · (30,000 + 42,000)/2 = <b>€396,000</b>.<br>c) 30,000 · 1.035¹⁰ ≈ €42,317.97 > €42,000 → the <b>3.5 % offer</b> is higher in 2036.' },
        { n: 'B2 · Rational function', p: 2, q: 'Let f(x) = (x + 2)/(x − 1).<br>a) Find the domain and the range. (0.5 points)<br>b) Calculate f′(x) and study the monotonicity. (0.75 points)<br>c) Find the tangent line at x = 2. (0.75 points)', l: 12,
          s: 'a) Domain ℝ ∖ {1}; range ℝ ∖ {1} (horizontal asymptote y = 1).<br>b) f′(x) = [(x − 1) − (x + 2)]/(x − 1)² = −3/(x − 1)² < 0 → decreasing on (−∞, 1) and on (1, ∞).<br>c) f(2) = 4, f′(2) = −3 → <b>y = −3x + 10</b>.' },
        { n: 'B3 · Optimisation in two variables', p: 2, q: 'Let f(x, y) = xy − x² − y² + 3y.<br>a) Find the stationary point. (0.75 points)<br>b) Classify it with the Hessian matrix. (0.75 points)<br>c) Give the value of f at that point. (0.5 points)', l: 12,
          s: 'a) fₓ = y − 2x = 0, fᵧ = x − 2y + 3 = 0 → y = 2x → x − 4x + 3 = 0 → <b>(1, 2)</b>.<br>b) H = [[−2, 1], [1, −2]], det = 4 − 1 = 3 > 0 and fₓₓ = −2 < 0 → <b>local maximum</b>.<br>c) f(1, 2) = 2 − 1 − 4 + 6 = <b>3</b>.' }
      ]}
    ]}
  ]
};
