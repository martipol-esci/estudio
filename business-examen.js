/* FINAL EXAM de Business Organization (instrucciones del profesor, nov 2026).
   business.html construye el tema «Final Exam» juntando TODA la teoría de T1–T9 (tal como está en cada tema)
   y le añade: cómo es el examen, qué entra y qué no, un puente antes de cada tema y las relaciones entre temas.
   Las preguntas de aquí salen en Exercises → «Final Exam» y siguen el formato del modelo de examen. */
window.EXAMEN = {
  /* Apartados de los temas que NO entran (instrucciones: T1 págs. 9 lagrangiano, 10 Slutsky, 15, 34 y 35) */
  excluir: ['Arrow–Pratt', 'Bayesian updating'],
  quitarFormula: [/slutsky/i, /lagrang|ℒ/i],

  intro: [
    { h: '📋 Cómo es el examen',
      tbl: [['Parte', 'Preguntas', 'Puntos por pregunta', 'Total'],
            ['Free response', '2', '2,5', '5'],
            ['Free response', '2', '2', '4'],
            ['Multiple choice', '5', '0,20', '1'],
            ['Total', '9', '', '10']],
      k: [['Duración', '2 horas · solo bolígrafo (también cálculos y gráficos) · si sales antes, entregas y no puedes volver'],
          ['Free response', 'respuesta propia con explicación, ejemplo, cálculo o gráfico según lo que pida · suelen tener apartados a), b), c) con su puntuación'],
          ['Test: puntuación', 'acierto +0,20 · fallo −0,0666… · en blanco 0 · respuesta CAMBIADA = 0 + penalización'],
          ['Estrategia en el test (expected value, T1)', 'adivinar entre 4 opciones da EV = 0,25·0,20 − 0,75·0,0667 = 0 → no ganas nada · si descartas UNA opción: EV = ⅓·0,20 − ⅔·0,0667 ≈ +0,02 → compensa contestar']],
      tr: 'En el test, marca una sola opción y NO la cambies nunca: una respuesta cambiada vale 0 y además penaliza.' },
    { h: '✅ Qué entra y qué no',
      k: [['Entra', 'Topics 1 a 9: todas las diapositivas y todas las lecturas asignadas'],
          ['T1 · NO entra', 'pág. 9: solo el lagrangiano ℒ = u(x,y) + λ[m − pₓx − pᵧy] (la condición MUₓ/pₓ = MUᵧ/pᵧ SÍ entra) · pág. 10: solo la ecuación de Slutsky (los efectos sustitución y renta SÍ entran) · pág. 15: Arrow–Pratt entero (ARA, RRA, CARA, CRRA) · págs. 34–35: Bayesian updating y la actividad de clase sobre estándares'],
          ['T9 · Finance', 'solo conceptos y comprensión teórica: NO habrá cálculos de finanzas'],
          ['Seminarios', 'NO entran: ni el contenido de los seminarios ni sus actividades ni las presentaciones de clase'],
          ['En este apartado', 'ya he quitado lo que no entra: Arrow–Pratt, Bayesian updating y la fórmula de Slutsky']],
      tr: 'Los cálculos de T1 (presupuesto, utilidad, MU, MRS, elasticidad, expected utility, CE, risk premium) SÍ pueden salir: el modelo de examen pone uno de utilidad y presupuesto.' },
    { h: '🧭 Mapa del curso: el hilo que une los 9 temas',
      k: [['1 · El individuo (T1)', 'las personas eligen según preferencias, creencias y restricciones; reaccionan a incentivos, sienten aversión al riesgo, descuentan el futuro y tienen racionalidad limitada'],
          ['2 · Mercado o empresa (T2)', 'esas personas intercambian en mercados coordinados por precios (Hayek), pero usar el mercado tiene costes de transacción (Coase): cuando son altos (asset specificity, hold-up) conviene organizar dentro de una empresa'],
          ['3 · Los conflictos dentro (T3)', 'dentro de la empresa los intereses chocan (principal–agent): hacen falta contratos e incentivos, limitados por la información asimétrica, el riesgo y los contratos incompletos'],
          ['4 · El diseño de la organización (T4)', 'para controlar esos conflictos se diseñan las tres patas: decision rights (unidos al conocimiento), performance evaluation y rewards'],
          ['5 · La ética (T5)', 'un mal diseño de incentivos y cultura crea “bad barrels”: la ética también se diseña en la arquitectura'],
          ['6–8 · Las funciones de la empresa (T6, T7, T8)', 'marketing crea y captura valor para el cliente (sube la WTP) · HR aplica incentivos, selección y pago a las personas · operations decide qué hacer dentro y qué comprar fuera (make or buy) y cómo mover el producto'],
          ['9 · El dinero y el tiempo (T9)', 'finanzas valora todo lo anterior con el valor temporal del dinero y el riesgo, y explica los activos, mercados e intermediarios financieros']],
      ej: 'Una sola idea lo conecta todo: la empresa existe para crear valor (WTP − WTS) cuando organizar internamente cuesta menos que usar el mercado, y su éxito depende de alinear los incentivos de personas con información e intereses distintos.' }
  ],

  /* Puente antes de cada tema: de dónde viene y adónde lleva */
  puente: {
    T1: { viene: 'es el punto de partida: el modelo de cómo decide una persona', k: [
      ['Lleva a T3, T4 y T7', 'si la gente responde a incentivos y restricciones, la empresa puede influir en su conducta con contratos, decision rights y pago'],
      ['Riesgo → T3 y T9', 'la aversión al riesgo explica el risk–incentive trade-off de los contratos (T3) y el risk premium / rentabilidad exigida en finanzas (T9)'],
      ['Tiempo → T9', 'el descuento intertemporal es la base del time value of money (PV y FV)'],
      ['Racionalidad limitada → T2 y T3', 'como no se puede preverlo todo, los contratos son incompletos y aparece el hold-up'],
      ['Preferencias sociales y crowding → T5 y T7', 'la justicia y la motivación intrínseca importan al diseñar el pago y la cultura ética'],
      ['Framing, reference point y loss aversion → T6', 'explican trucos de pricing y promoción'],
      ['Game theory → T3', 'coordinación y juegos repetidos explican los relational contracts y la reputación']] },
    T2: { viene: 'T1: personas racionales que intercambian; aquí se pregunta cómo se coordinan', k: [
      ['Viene de T1', 'property rights e intercambio voluntario: si los dos ganan, el intercambio crea valor'],
      ['Hayek → T4', 'el conocimiento está disperso y es específico: por eso hay que decidir quién tiene los decision rights (centralizar o descentralizar)'],
      ['Coase y costes de transacción → T3 y T8', 'asset specificity → hold-up → contratos incompletos (T3) → integración vertical o outsourcing (T8)'],
      ['Value stick (WTP − WTS) → T6, T7 y T8', 'marketing sube la WTP del cliente; HR y operations bajan la WTS de empleados y proveedores'],
      ['RBV / VRIN → T7 y T8', 'las personas (T7) y la logística (T8, Inditex) pueden ser recursos valiosos, raros y difíciles de imitar'],
      ['Externalities → T5', 'costes que la empresa impone a terceros: base de los dilemas éticos y de la regulación']] },
    T3: { viene: 'T1 (interés propio y aversión al riesgo) y T2 (la empresa como conjunto de contratos y el hold-up)', k: [
      ['Viene de T1', 'el agente actúa según sus propios intereses y es averso al riesgo: por eso pagar 100 % por resultados no es eficiente'],
      ['Viene de T2', 'nexus of contracts; el hold-up entre empresas aparece con inversiones específicas y contratos incompletos'],
      ['Lleva a T4', 'las soluciones al problema de agencia se convierten en las tres patas de la arquitectura organizativa'],
      ['Lleva a T7', 'adverse selection → herramientas de selección; moral hazard → evaluación y pago por desempeño'],
      ['Lleva a T5', 'incentivos mal diseñados (multitasking) empujan a conductas poco éticas'],
      ['Lleva a T8 y T9', 'hold-up → make or buy (T8) · conflicto accionistas–directivos y deuda vs equity (T9)']] },
    T4: { viene: 'T3 (cómo controlar los conflictos de agencia) y T2 (Hayek: conocimiento específico)', k: [
      ['Decision rights ↔ T2', 'se dan a quien tiene el conocimiento específico (difícil de transmitir)'],
      ['Performance evaluation ↔ T3', 'informativeness principle: medir lo que refleja el esfuerzo del agente'],
      ['Rewards ↔ T3', 'linear contracts y risk–incentive trade-off'],
      ['Regla de oro', 'las tres patas deben estar coordinadas: más decision rights exige más medición y recompensas alineadas (empowerment)'],
      ['Lleva a T5', 'la cultura y la arquitectura pueden fomentar o frenar la ética'],
      ['Lleva a T7 y T9', 'HR ejecuta evaluación y pago (T7); corporate governance conecta con accionistas y reguladores (T9)']] },
    T5: { viene: 'T3 y T4: los incentivos y la arquitectura condicionan la conducta; T1: racionalidad y preferencias sociales', k: [
      ['Viene de T3/T4', 'bad barrels: el problema suele ser el sistema (objetivos, incentivos, cultura), no solo personas malas'],
      ['Viene de T1', 'racionalizaciones y framing: cómo se justifica lo injustificable'],
      ['Lleva a T6', 'campañas que fallan por motivos éticos o culturales'],
      ['Lleva a T7', 'selección justa, sesgos de la IA, transparencia salarial'],
      ['Lleva a T8 y T9', 'sostenibilidad de la cadena de suministro (T8) · regulación y riesgo sistémico (T9)']] },
    T6: { viene: 'T2 (crear valor: subir la WTP; Five Forces; RBV) y T1 (cómo eligen los consumidores)', k: [
      ['Viene de T1', 'utilidad y elasticidad → pricing · reference point, framing y loss aversion → promociones'],
      ['Viene de T2', 'el marketing amplía el value stick por arriba (WTP) y depende del poder de mercado (Five Forces)'],
      ['Lleva a T8', 'Place (distribución) se apoya en la supply chain (Inditex)'],
      ['Lleva a T5', 'la ética y la cultura de las campañas']] },
    T7: { viene: 'T3 (agencia, información asimétrica), T4 (evaluación y rewards), T2 (make or buy, RBV) y T1 (motivación)', k: [
      ['Viene de T3', 'selection tools reducen la adverse selection; el pago por desempeño reduce el moral hazard'],
      ['Viene de T4', 'HR es quien aplica en la práctica la evaluación y las recompensas'],
      ['Viene de T2', 'make, buy or borrow talent es el make or buy aplicado a las personas; el capital humano como recurso VRIN'],
      ['Viene de T1', 'crowding out, justicia y preferencias sociales → total reward y pay transparency'],
      ['Lleva a T5', 'fairness en la selección y riesgos de sesgo de la IA']] },
    T8: { viene: 'T2 (Coase, TCE, asset specificity, GHM) y T3 (hold-up, contratos incompletos y relacionales)', k: [
      ['Viene de T2/T3', 'integrar verticalmente protege frente al hold-up cuando hay activos específicos, pero se pierden los incentivos y la eficiencia del mercado'],
      ['Conecta con T6', 'la logística hace posible la estrategia de Place (fast fashion de Inditex)'],
      ['Conecta con T7', 'outsourcing de procesos ↔ buy/borrow talent'],
      ['Lleva a T5', 'resiliencia y sostenibilidad de la cadena de suministro']] },
    T9: { viene: 'T1 (descuento y riesgo), T2 (mercados y derechos de propiedad) y T3 (agencia)', k: [
      ['Viene de T1', 'intertemporal choice → time value of money · aversión al riesgo → más riesgo exige más rentabilidad'],
      ['Viene de T2', 'un activo financiero es un derecho (claim) sobre ingresos futuros; los mercados fijan su precio'],
      ['Viene de T3', 'debt vs equity y los fees de los gestores son problemas de incentivos'],
      ['Viene de T5', 'regulación y riesgo sistémico'],
      ['Ojo', 'solo conceptos: no habrá cálculos de finanzas']] }
  },

  final: [
    { h: '🔗 Relaciones clave entre temas (cadenas de conceptos)',
      tbl: [['Cadena', 'Temas', 'Idea'],
            ['Asset specificity → hold-up → contratos incompletos → integración vertical o relational contracts', 'T2 → T3 → T8', 'cuanto más específica es la inversión, más riesgo de hold-up y más sentido tiene integrar o crear relaciones de confianza'],
            ['Risk aversion → risk–incentive trade-off → pay plans → risk premium', 'T1 → T3 → T7 → T9', 'el riesgo tiene un coste: limita el pago variable y exige más rentabilidad'],
            ['Specific knowledge (Hayek) → decentralization → decision rights → empowerment', 'T2 → T4', 'decide quien sabe, pero con medición y recompensas coordinadas'],
            ['Asymmetric information → adverse selection → selection tools / signalling', 'T3 → T7', 'antes del contrato: elegir bien a quién contratar'],
            ['Asymmetric information → moral hazard → monitoring y performance pay', 'T3 → T4 → T7', 'después del contrato: alinear el esfuerzo'],
            ['Incentivos → multitasking → bad barrels → ethics by design', 'T3 → T4 → T5', 'lo que se mide y se paga es lo que se hace, también lo malo'],
            ['Value stick (WTP − WTS)', 'T2 → T6, T7, T8', 'marketing sube la WTP; HR y operations bajan la WTS de empleados y proveedores'],
            ['Make or buy → make, buy or borrow talent → outsourcing', 'T2 → T7 → T8', 'la misma decisión de límites de la empresa en productos y en personas'],
            ['Discounting / present bias → time value of money → PV', 'T1 → T9', 'el futuro vale menos que el presente'],
            ['Framing / reference point / loss aversion → pricing y promotion', 'T1 → T6', 'cómo se presenta un precio cambia la decisión'],
            ['Social preferences / motivation crowding → total reward / pay transparency', 'T1 → T7', 'el dinero no es la única motivación y a veces la reduce'],
            ['RBV / VRIN → personas y logística como ventaja', 'T2 → T7, T8', 'la ventaja sostenible viene de recursos difíciles de imitar'],
            ['Game theory (juegos repetidos) → relational contracts y reputación', 'T1 → T3', 'la cooperación se sostiene si el futuro importa']],
      tr: 'En las preguntas largas suben nota las respuestas que CONECTAN temas: p. ej. hold-up (T3) → integración vertical (T8) → su desventaja (pérdida de incentivos de mercado).' }
  ],

  /* ---------- PREGUNTAS (en inglés, como el modelo de examen) ---------- */
  mc: [
    ['Which investment has the highest asset specificity?', ['Standard printer paper bought from many suppliers', 'A mould designed for one customer’s product that has little value elsewhere', 'A van that can deliver for any client', 'A popular spreadsheet licence'], 1, 'Asset specificity = the asset loses much of its value outside one particular relationship.'],
    ['A hold-up problem arises when…', ['Both parties can easily switch partners', 'One party has made a relationship-specific investment and the other renegotiates to capture its value', 'Prices are set by a competitive market', 'A firm buys standard inputs'], 1, 'After a specific investment, the other party can exploit the investor’s lack of alternatives.'],
    ['Which is a typical disadvantage of vertical integration?', ['It always reduces hold-up to zero', 'It weakens market incentives and can raise internal bureaucracy costs', 'It increases asset specificity', 'It eliminates the need for managers'], 1, 'Internal divisions lose the cost discipline of competition and need coordination.'],
    ['According to Coase, firms exist because…', ['Markets are always inefficient', 'Using the price mechanism has transaction costs', 'Governments require them', 'Workers prefer hierarchies'], 1, 'When market transaction costs exceed internal organisation costs, it pays to organise inside a firm.'],
    ['A consumer has m = €24, pₓ = €4 and pᵧ = €2. Which bundle is NOT affordable?', ['(2, 8)', '(3, 6)', '(4, 4)', '(4, 6)'], 3, '4·4 + 2·6 = 28 > 24.'],
    ['At an interior utility maximum, the consumer…', ['Spends everything on the cheaper good', 'Equalises marginal utility per euro: MUₓ/pₓ = MUᵧ/pᵧ', 'Equalises marginal utilities: MUₓ = MUᵧ', 'Buys equal quantities of both goods'], 1, 'The last euro spent on each good must give the same extra utility.'],
    ['A person prefers €20 for sure to a 50/50 lottery of €50 or €0. This shows…', ['Risk loving', 'Risk aversion', 'Loss aversion', 'Ambiguity aversion'], 1, 'The lottery has a higher expected value (€25) but the person prefers certainty: risk aversion (concave utility).'],
    ['Which concept explains why people prefer bets with known probabilities?', ['Certainty effect', 'Ambiguity aversion (Ellsberg)', 'Present bias', 'Satisficing'], 1, 'Ellsberg: aversion to unknown probabilities.'],
    ['In the principal–agent problem, moral hazard refers to…', ['Hidden information before the contract', 'Hidden action after the contract', 'A market with many buyers', 'Discrimination in hiring'], 1, 'Adverse selection = hidden information before; moral hazard = hidden action after.'],
    ['Why is it usually inefficient to pay a risk-averse employee 100% on output?', ['Because output is always easy to measure', 'Because the employee bears too much risk, which must be compensated with a higher expected pay', 'Because it eliminates incentives', 'Because it is illegal'], 1, 'Risk–incentive trade-off: stronger incentives transfer more risk to a risk-averse agent.'],
    ['The informativeness principle says a performance measure should…', ['Be as simple as possible', 'Include any variable that adds information about the agent’s effort', 'Ignore factors outside the agent’s control', 'Always be financial'], 1, 'Add indicators that help separate effort from noise.'],
    ['The multitasking problem appears when…', ['The agent has only one task', 'Strong incentives on measurable tasks lead the agent to neglect hard-to-measure tasks', 'Wages are fixed', 'There is no asymmetric information'], 1, 'People shift effort towards what is measured and rewarded.'],
    ['Which are the three “legs” of organisational architecture?', ['Price, product, place', 'Decision rights, performance evaluation and rewards', 'Strategy, structure and culture', 'Recruitment, selection and training'], 1, 'The three must be coordinated.'],
    ['Decision rights should be assigned to the people who have…', ['The highest salary', 'The relevant specific knowledge', 'The longest tenure', 'General knowledge only'], 1, 'Specific knowledge is costly to transfer, so decisions move to where it is (Hayek → T4).'],
    ['“Bad barrels” refers to…', ['Individuals with poor values', 'Organisational systems, incentives and cultures that push people to behave unethically', 'Defective products', 'Low-quality suppliers'], 1, 'The problem is the barrel (the system), not only the apples.'],
    ['In the value stick, a firm creates more value by…', ['Raising price only', 'Increasing customers’ willingness to pay or reducing suppliers’ willingness to sell', 'Reducing customers’ WTP', 'Increasing suppliers’ costs'], 1, 'Value created = WTP − WTS.'],
    ['Which resource best meets the VRIN conditions?', ['A standard office building', 'A unique, hard-to-copy logistics system built over decades', 'Cash in the bank', 'A widely available software tool'], 1, 'Valuable, rare, inimitable and non-substitutable.'],
    ['The 4Cs (Lauterborn) look at marketing from the point of view of…', ['The firm', 'The customer', 'The government', 'The supplier'], 1, 'Product → customer solution, price → cost, place → convenience, promotion → communication.'],
    ['Which selection tool helps most to reduce adverse selection in hiring?', ['Paying everyone the same', 'Valid structured interviews and work-sample tests', 'Annual bonuses', 'Longer holidays'], 1, 'Valid selection tools reveal hidden information about candidates.'],
    ['“Make, buy or borrow” talent is the HR version of…', ['The 4Ps', 'The make-or-buy decision about firm boundaries', 'The value chain', 'The Five Forces'], 1, 'Develop internally, hire from the market or use temporary/external talent.'],
    ['Which is the main reason to integrate vertically according to transaction cost economics?', ['High asset specificity and uncertainty that make contracts risky', 'Standard inputs with many suppliers', 'Low transaction costs', 'Perfect information'], 0, 'High specificity + uncertainty + frequency → internalise to avoid hold-up.'],
    ['The time value of money means that…', ['Money loses value only because of taxes', 'A euro today is worth more than a euro in the future', 'Future money is worth more', 'Interest rates are always zero'], 1, 'It can be invested, inflation erodes it and the future is uncertain (links with discounting in T1).'],
    ['An equity claim is…', ['A fixed payment that is paid first', 'A residual claim that depends on the firm’s earnings', 'Always a bank loan', 'A derivative'], 1, 'Debt = fixed payments; equity = what is left.'],
    ['A financial market that deals with short-term debt instruments is the…', ['Capital market', 'Money market', 'Primary market', 'Derivatives market'], 1, 'Money market = short term; capital market = long term.'],
    ['An option gives its holder…', ['An obligation to buy', 'The right, but not the obligation, to buy or sell', 'A fixed coupon', 'Ownership of the firm'], 1, 'Futures/forwards = obligation; options = right.'],
    ['A fine for picking up children late at a nursery made late pick-ups increase. This illustrates…', ['Price effect only', 'Motivation crowding: the fine turned a moral obligation into a price', 'Asset specificity', 'Adverse selection'], 1, 'The norm effect of incentives (T1) matters for HR pay design (T7).']
  ],

  wr: [
    ['(2 marks) Transaction costs and firm boundaries. a) Define asset specificity and explain how it can create a hold-up problem, with a business example. b) Explain how vertical integration could reduce this hold-up problem and give one disadvantage of producing internally instead of buying from an external supplier.',
     ['asset specificity|activo especifico|specific investment|inversion especifica', 'value outside the relationship|lose value|pierde valor|little value elsewhere', 'hold-up|renegotiate|renegociar|opportunism|oportunismo', 'vertical integration|integracion vertical|produce internally|own the supplier', 'disadvantage|desventaja|bureaucracy|burocracia|weaker incentives|less efficient|economies of scale'],
     'a) Asset specificity is the degree to which an investment loses value outside one particular relationship. After one party invests, the other can renegotiate the price because the investor has no good alternatives: that is hold-up. Example: a supplier builds a mould designed only for one car maker, which then demands a lower price. b) With vertical integration, both stages have the same owner, so there is nobody to renegotiate against and incentives to invest are protected. A disadvantage is that the internal unit loses the cost discipline of the market and adds bureaucracy, and it may not reach the economies of scale of a specialised supplier.'],
    ['(2.5 marks) Agency. a) Explain the principal–agent problem and distinguish adverse selection from moral hazard. b) Explain the risk–incentive trade-off in a linear contract (Pay = salary + b × output). c) Give one way the firm can reduce moral hazard.',
     ['different interests|intereses distintos|conflict|conflicto', 'asymmetric information|informacion asimetrica', 'adverse selection|before|antes|hidden information', 'moral hazard|after|despues|hidden action', 'risk averse|aversion al riesgo|risk|riesgo', 'monitoring|supervision|performance pay|pago por desempeno|incentive|bonus'],
     'a) A principal hires an agent whose interests differ and whose information or actions the principal cannot fully observe. Adverse selection is hidden information before the contract (e.g. not knowing a candidate’s ability); moral hazard is hidden action after it (e.g. shirking). b) A higher b strengthens incentives but makes pay depend on noisy output, so a risk-averse agent bears more risk and must be compensated; the optimal b is lower when risk aversion, noise or the cost of effort are high. c) Monitoring, better performance measures (informativeness principle), performance pay or relational contracts and reputation.'],
    ['(2 marks) Organisational architecture. a) Name the three legs of organisational architecture. b) Explain why decision rights should be linked to specific knowledge and what must change in the other two legs when a firm empowers employees.',
     ['decision rights|derechos de decision', 'performance evaluation|evaluacion|measurement|medicion', 'rewards|recompensas|compensation|pay', 'specific knowledge|conocimiento especifico|costly to transfer|dificil de transmitir', 'coordinated|coordinadas|align|alinear|consistent'],
     'a) Decision rights, performance evaluation and rewards. b) Specific knowledge is costly to transmit, so decisions are better made by those who have it (Hayek). But giving people more decision rights creates agency risk, so the firm must also measure their performance and reward them in line with the firm’s goals; the three legs must be coordinated.'],
    ['(2 marks) Ethics. a) Explain the difference between “bad apples” and “bad barrels”. b) Using concepts from incentives or organisational architecture, explain how a firm can design its organisation to encourage ethical behaviour.',
     ['bad apples|individuals|individuos', 'bad barrels|system|sistema|culture|cultura|incentives', 'incentives|incentivos|targets|objetivos|multitasking', 'whistleblowing|code|codigo|governance|leadership|liderazgo|measure ethics'],
     'a) Bad apples blames unethical behaviour on individuals with poor values; bad barrels blames the system: targets, incentives and culture that push ordinary people to behave badly. b) Avoid extreme targets on easy-to-measure outputs that cause multitasking problems, measure and reward how results are achieved, give decision rights with accountability, protect whistleblowers, and build a culture and leadership that make ethics part of the architecture.'],
    ['(2.5 marks) Strategy. a) Explain the value stick and how value created is split between customers, the firm and suppliers. b) Explain the RBV and the VRIN conditions. c) Give an example of how marketing and operations can each widen the value stick.',
     ['willingness to pay|wtp|disposicion a pagar', 'willingness to sell|wts|supplier cost', 'customer surplus|firm margin|supplier surplus|margen', 'rbv|resource|recurso', 'valuable|rare|inimitable|non-substitutable|vrin', 'marketing|brand|marca|operations|cost|logistics|logistica'],
     'a) Value created = WTP − WTS. The customer keeps WTP − price, the firm keeps price − cost and the supplier keeps cost − WTS. b) The resource-based view says sustainable advantage comes from resources that are valuable, rare, inimitable and non-substitutable. c) Marketing raises WTP (brand, product benefits, segmentation); operations lowers costs and suppliers’ WTS (efficient logistics, as in Inditex).'],
    ['(2 marks) Human resources. a) Explain “make, buy or borrow” talent and relate it to the make-or-buy decision. b) Explain how selection tools reduce adverse selection and why validity and fairness matter.',
     ['make|develop internally|desarrollar', 'buy|hire|contratar fuera|external', 'borrow|temporary|freelance|consultants|temporal', 'make or buy|firm boundaries|limites de la empresa', 'adverse selection|hidden information|informacion oculta', 'validity|validez|reliability|fiabilidad|fairness|justicia|bias|sesgo'],
     'a) Make = develop talent internally, buy = hire it from the labour market, borrow = use temporary staff, freelancers or consultants. It is the make-or-buy decision applied to people: it depends on how specific and strategic the skills are. b) Candidates know their ability better than the firm; valid tools (structured interviews, work samples, cognitive tests) reveal that hidden information. Reliability and validity make predictions accurate, and fairness avoids discrimination and bias, including in AI tools.'],
    ['(2 marks) Marketing. a) Explain STP. b) Explain how behavioural concepts from Topic 1 (reference point, framing or loss aversion) can be used in pricing or promotion.',
     ['segmentation|segmentacion', 'targeting|target', 'positioning|posicionamiento', 'reference point|punto de referencia|framing|loss aversion|aversion a las perdidas'],
     'a) Segmentation divides the market into groups with similar needs, targeting chooses which segments to serve and positioning defines how the brand wants to be perceived against competitors. b) Consumers judge prices against a reference point: showing the original price makes a discount look like a gain, and framing a fee as an avoidable loss (“avoid a €20 charge”) is more powerful because losses weigh more than equivalent gains.'],
    ['(2.5 marks) Risk and expected utility. a) Explain the difference between expected value and expected utility. b) Define the certainty equivalent and the risk premium. c) Explain how risk aversion is relevant in employee contracts (Topic 3) and in finance (Topic 9).',
     ['expected value|valor esperado|average money', 'expected utility|utilidad esperada', 'certainty equivalent|equivalente cierto|ce', 'risk premium|prima de riesgo|ev - ce|ev minus ce', 'contract|contrato|incentive|salary|salario', 'return|rentabilidad|risk premium|required rate'],
     'a) Expected value is the probability-weighted average of money; expected utility is the probability-weighted average of the utility of each outcome. With concave utility they can rank options differently. b) The certainty equivalent is the sure amount with the same utility as the lottery; the risk premium is EV − CE, what the person gives up to avoid risk. c) In contracts, risk-averse employees need a fixed salary component, which limits pay-for-performance; in finance, investors demand a higher expected return for riskier assets.'],
    ['(2 marks) Operations. a) Explain the four performance dimensions of operations or the SCOR model. b) Explain why a firm such as Inditex keeps part of its production close to its markets and how this connects with marketing.',
     ['cost|coste', 'quality|calidad', 'speed|time|rapidez|velocidad', 'flexibility|flexibilidad', 'plan|source|make|deliver|return', 'fast fashion|close|proximity|cercania|trends|tendencias'],
     'a) Operations compete on cost, quality, speed and flexibility (SCOR: plan, source, make, deliver, return). b) Producing near the market lets Inditex react quickly to trends and replenish stores in small batches, sacrificing some cost for speed and flexibility. This supports its marketing (always-new products, less discounting) and the Place element of the 4Ps.'],
    ['(2 marks) Finance concepts. a) Explain the time value of money and why it connects with intertemporal choice in Topic 1. b) Explain the difference between debt and equity and between the money market and the capital market.',
     ['today|hoy|worth more|vale mas', 'interest|invest|opportunity cost|coste de oportunidad|inflation|inflacion|uncertainty', 'discount|descuento|intertemporal|present bias', 'debt|deuda|fixed|fijo', 'equity|residual|earnings', 'money market|short|corto|capital market|long|largo'],
     'a) A euro today is worth more than a euro in the future because it can be invested, inflation reduces purchasing power and future payments are uncertain. This is the market version of discounting in Topic 1: people value future utility less than present utility. b) Debt pays fixed amounts and has priority; equity is a residual claim that depends on earnings. The money market trades short-term debt; the capital market trades long-term debt and equity.'],
    ['(2.5 marks) Behaviour. a) Explain bounded rationality and satisficing. b) Explain prospect theory (reference point, loss aversion, diminishing sensitivity). c) Explain why bounded rationality leads to incomplete contracts (Topics 2–3).',
     ['bounded rationality|racionalidad limitada|simon|limited attention|limited information', 'satisficing|good enough|minimo aceptable', 'reference point|punto de referencia', 'loss aversion|aversion a las perdidas|losses weigh more', 'diminishing sensitivity|sensibilidad decreciente', 'incomplete contracts|contratos incompletos|cannot foresee|no se puede prever'],
     'a) People have limited attention, information, time and computing ability (Simon), so they often satisfice: they choose the first option that meets an acceptable minimum. b) Outcomes are judged as gains or losses relative to a reference point; losses weigh about twice as much as equal gains, and sensitivity diminishes further from the reference point. c) Because people cannot foresee or write down every future contingency, contracts are incomplete, which leaves room for renegotiation and hold-up.'],
    ['(2 marks) Contracts. a) Explain what a relational contract is and why reputation can sustain it. b) Explain when a firm should rely on formal contracts and when on relational ones.',
     ['relational contract|contrato relacional|informal|trust|confianza', 'reputation|reputacion|repeated|repetido|future|futuro', 'formal contract|contrato formal|court|tribunal|verifiable|verificable', 'hard to verify|dificil de verificar|observable but not verifiable'],
     'a) A relational contract is an informal agreement based on outcomes that are observable but not verifiable in court. It is sustained because the relationship is repeated: breaking it gives a short-term gain but loses the future surplus, so it holds if the future matters enough. b) Formal contracts work when performance is verifiable and enforceable; relational contracts are better when quality is hard to verify or circumstances change often.']
  ]
};

/* Cálculos tipo examen (pregunta 2 del modelo: utility and budget constraint). Usan rnd, pk y f de business.html. */
window.EXAMEN_CALC = [
  () => { const px = pk([2, 3, 4, 5]), py = pk([1, 2]), k = pk([2, 3]), m = 2 * px * py * k;
    const xs = [], X = m / px; for (let x = 1; x < X; x++) { const y = (m - px * x) / py; if (Number.isInteger(y) && y > 0) xs.push([x, y]); }
    const on = shuf(xs).slice(0, 3), xo = m / (2 * px), yo = m / (2 * py);
    const over = [xo + 1, yo + 1]; const B = shuf(on.concat([over])), L = 'ABCD';
    const rows = B.map((b, i) => { const c = px * b[0] + py * b[1], u = b[0] * b[1]; return { n: L[i], b, c, u, ok: c <= m }; });
    const best = rows.filter(r => r.ok).sort((a, b) => b.u - a.u)[0];
    return { t: window.EXIDX, q: `Budget m = €${m}, pₓ = €${px}, pᵧ = €${py}, u(x, y) = x·y. Bundles (x, y): ${rows.map(r => `${r.n} = (${r.b[0]}, ${r.b[1]})`).join(', ')}. Which utility does the consumer get with the best AFFORDABLE bundle?`, ans: best.u, d: 0,
      sol: `Budget constraint: ${px}x + ${py}y ≤ ${m}. ${rows.map(r => `${r.n}: cost ${px}·${r.b[0]} + ${py}·${r.b[1]} = €${r.c} ${r.ok ? '✔ affordable' : '✘ NOT affordable'}, u = ${r.u}`).join(' · ')}. Best affordable: ${best.n} with u = ${best.u}.` }; },
  () => { const px = pk([2, 3, 4, 5, 6]), py = pk([1, 2, 3]), x = rnd(1, 8), y = rnd(1, 10);
    return { t: window.EXIDX, q: `pₓ = €${px}, pᵧ = €${py}. What is the total cost of the bundle (x, y) = (${x}, ${y})?`, ans: px * x + py * y, d: 0, sol: `Cost = pₓx + pᵧy = ${px}·${x} + ${py}·${y} = €${px * x + py * y}` }; },
  () => { const px = pk([2, 4, 5, 6]), py = pk([1, 2, 3]), m = 2 * px * py * pk([2, 3, 4]);
    return { t: window.EXIDX, q: `u(x, y) = x·y, m = €${m}, pₓ = €${px}, pᵧ = €${py}. What is the maximum utility the consumer can reach?`, ans: (m / (2 * px)) * (m / (2 * py)), d: 0,
      sol: `MUₓ/pₓ = MUᵧ/pᵧ → y/${px} = x/${py} → ${px}x = ${py}y: half the budget on each good. x* = ${m}/(2·${px}) = ${m / (2 * px)}, y* = ${m}/(2·${py}) = ${m / (2 * py)} → u = ${(m / (2 * px)) * (m / (2 * py))}` }; },
  () => { const p = pk([0.25, 0.5, 0.75]), a = pk([36, 64, 100, 144]), b = pk([0, 4, 16]), eu = p * Math.sqrt(a) + (1 - p) * Math.sqrt(b), ce = eu * eu, ev = p * a + (1 - p) * b;
    return { t: window.EXIDX, q: `Lottery: ${p * 100}% chance of €${a}, ${100 - p * 100}% chance of €${b}; u(x) = √x. Compute the risk premium (EV − CE) in €.`, ans: ev - ce, d: 2, rel: .02,
      sol: `EV = €${f(ev)}. EU = ${p}·√${a} + ${f(1 - p)}·√${b} = ${f(eu, 3)} → CE = ${f(eu, 3)}² = €${f(ce)} → RP = €${f(ev - ce)}` }; }
];
