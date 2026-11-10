/* Temario añadido desde AulaESCI. Cada bloque se fusiona con el temario base al cargar la página.
   target: código de un tema existente (p. ej. 'T2') o 'new' para un tema nuevo (entonces topic = {n, t, d}).
   s: apartados {h, k:[[concepto, explicación]], tbl, f, ej, tr} · mc/fmc: [pregunta, [4 opciones], índice correcto, explicación]
   wr: [pregunta, [conceptos clave con sinónimos separados por |], respuesta modelo] */
window.AULA = [
{ gid: 'aula-bo-t2-valuechain', part: 0, createdAt: 1, title: 'Porter Value Chain and RBV', target: 'T2', topic: {},
  s: [
    { h: 'Porter’s Value Chain',
      k: [['Idea (Porter, 1985)', 'descompone la empresa en actividades; cada una añade valor o reduce coste'],
          ['Ventaja competitiva', 'se consigue por menor coste o por diferenciación'],
          ['Clave', 'la integración de todas las actividades mejora eficiencia y satisfacción del cliente']],
      tbl: [['Tipo', 'Actividad', 'Qué hace / ejemplo'],
            ['Primary', 'Inbound logistics', 'recibir y almacenar materias primas · Toyota JIT'],
            ['Primary', 'Operations', 'transformar inputs en producto · ensamblaje de Apple'],
            ['Primary', 'Outbound logistics', 'distribuir al cliente · almacenes automatizados de Amazon'],
            ['Primary', 'Marketing & sales', 'atraer y retener clientes · publicidad de Coca-Cola'],
            ['Primary', 'Service', 'posventa y atención · garantía de Samsung'],
            ['Support', 'Firm infrastructure', 'dirección, planificación, finanzas'],
            ['Support', 'Human resource management', 'selección, formación, retención'],
            ['Support', 'Technology development', 'I+D, automatización, innovación'],
            ['Support', 'Procurement', 'adquirir recursos e inputs con eficiencia']],
      tr: '5 primary + 4 support. Procurement (comprar) es SUPPORT; Inbound logistics (recibir y almacenar) es PRIMARY.' },
    { h: 'RBV: tipos de recursos y VRIO',
      k: [['RBV (Barney, 1991)', 'los recursos y capacidades de la empresa determinan su ventaja competitiva'],
          ['Tangible', 'edificios, maquinaria, capital financiero'],
          ['Intangible', 'marca, patentes, cultura, know-how'],
          ['Human', 'habilidades, creatividad y experiencia de los empleados']],
      tbl: [['VRIO', 'Significado', 'Ejemplo'],
            ['Valuable', 'aprovecha oportunidades o neutraliza amenazas', 'baterías de Tesla reducen el coste'],
            ['Rare', 'pocos competidores lo tienen', 'diseño y marca de Apple'],
            ['Inimitable', 'difícil de copiar', 'algoritmos y cultura de Google'],
            ['Organized', 'la empresa está organizada para capturar el valor del recurso', 'logística e integración de datos de Amazon']],
      tr: 'VRIO ≠ VRIN: la última letra cambia. VRIO = Organized (estar organizada para explotarlo); VRIN = Non-substitutable. Si cumple los 4 criterios → sustained competitive advantage.' },
    { h: 'Value Chain + RBV juntos',
      tbl: [['Aspecto', 'Value Chain', 'RBV'],
            ['Foco', 'actividades y procesos', 'recursos y capacidades'],
            ['Objetivo', 'optimizar operaciones para añadir valor', 'construir y proteger recursos únicos'],
            ['Fuente de ventaja', 'eficiencia y diferenciación', 'rareza e inimitabilidad'],
            ['Pregunta clave', '¿Dónde de la cadena añadimos valor?', '¿Qué recursos nos dan fuerza a largo plazo?']],
      k: [['Integración', 'Value Chain dice DÓNDE se crea el valor; RBV explica POR QUÉ se sostiene en el tiempo']],
      ej: 'Toyota: lean manufacturing y JIT (value chain) + Kaizen y cultura de aprendizaje (RBV) → ventaja en coste y calidad sostenida. Apple: diseño, marketing y servicio + marca y cultura de innovación → diferenciación y lealtad.' }
  ],
  mc: [
    ['In Porter’s Value Chain, which of these is a SUPPORT activity?', ['Inbound logistics', 'Procurement', 'Operations', 'Service'], 1, 'Support activities: firm infrastructure, HRM, technology development and procurement. The other three are primary.'],
    ['Receiving, storing and managing raw materials corresponds to…', ['Outbound logistics', 'Procurement', 'Inbound logistics', 'Operations'], 2, 'Inbound logistics is a primary activity (e.g. Toyota’s just-in-time system).'],
    ['How many primary and support activities does the Value Chain have?', ['4 primary and 5 support', '5 primary and 4 support', '5 primary and 5 support', '3 primary and 4 support'], 1, 'Primary: inbound logistics, operations, outbound logistics, marketing & sales, service. Support: infrastructure, HRM, technology, procurement.'],
    ['In the VRIO framework, the “O” stands for…', ['Original', 'Operational', 'Organized', 'Outsourced'], 2, 'Organized: the firm is structured to capture value from the resource. (VRIN ends with Non-substitutable instead.)'],
    ['Brand reputation, patents and know-how are examples of…', ['Tangible resources', 'Intangible resources', 'Human resources', 'Primary activities'], 1, 'Intangible resources. Tangible = buildings, machinery, financial capital.'],
    ['Which statement best contrasts the two frameworks?', ['The Value Chain looks at resources; RBV looks at activities', 'The Value Chain shows where value is created; RBV explains why it can be sustained', 'Both focus only on external competition', 'RBV is about cost reduction only'], 1, 'Value Chain = activities and processes (where). RBV = unique resources and capabilities (why it lasts).']
  ],
  wr: [
    ['Explain how Porter’s Value Chain and the Resource-Based View complement each other. Use one company as an example.',
     ['value chain|cadena de valor', 'activities|actividades', 'resources|recursos|capabilities|capacidades', 'sustain|sostener|long-term|largo plazo|inimitable|rare'],
     'The Value Chain identifies where value is created across primary and support activities, by cutting costs or differentiating. The RBV explains why some firms sustain that value: they own valuable, rare and hard-to-imitate resources and are organized to exploit them. Toyota combines lean, just-in-time operations with a Kaizen learning culture that rivals struggle to copy.']
  ], fmc: [] },

{ gid: 'aula-bo-t9-finance', part: 0, createdAt: 2, title: 'Reading: Time Value of Money', target: 'new',
  topic: { n: 'T9', t: 'Finance', d: 'Time value of money (lectura previa; aún sin PowerPoint en el aula)' },
  s: [
    { h: 'Time Value of Money (TVM)',
      k: [['Principio', 'una cantidad de dinero vale MÁS hoy que la misma cantidad en el futuro'],
          ['Opportunity cost', 'el dinero de hoy se puede invertir y generar intereses'],
          ['Inflation', 'en el futuro el mismo dinero puede comprar menos'],
          ['Uncertainty', 'hasta que no lo cobras, no es seguro']],
      ej: '¿1.000 $ hoy o 1.000 $ dentro de un año? → hoy.',
      tr: 'Si las cantidades son distintas (1.000 hoy vs 2.000 en un año) no basta la intuición: hay que calcular el present value.' },
    { h: 'Future value y present value',
      k: [['FV', 'valor futuro del dinero'], ['PV', 'valor actual del dinero'],
          ['i', 'interest rate (para FV) o discount rate (para PV)'],
          ['n', 'número de periodos de capitalización por año'], ['t', 'número de años'],
          ['Idea', 'el cálculo “traduce” todo el dinero futuro a valor presente para poder compararlo']],
      f: ['FV = PV × (1 + i/n)^(n·t)', 'PV = FV / (1 + i/n)^(n·t)'],
      tr: 'Para ir al futuro se MULTIPLICA (capitalizar); para traer al presente se DIVIDE (descontar).' },
    { h: 'Comparar proyectos con PV',
      tbl: [['Proyecto', 'Cobro', 'Cálculo (i = 4 %, n = 1)', 'PV'],
            ['A', '2 M$ en 1 año', '2.000.000 / 1,04', '1.923.076,92 $'],
            ['B', '2 M$ en 2 años', '2.000.000 / 1,04² = 2.000.000 / 1,0816', '1.849.112,43 $'],
            ['C', '3 M$ en 2 años', '3.000.000 / 1,0816', '2.773.668,64 $']],
      k: [['A vs B', 'misma cantidad → gana el que cobra antes (A)'],
          ['C vs A', 'C tarda más pero su PV es mayor → se elige C'],
          ['Excel', '=PV(rate, nper, pmt, FV, type)']],
      tr: 'Cobrar antes no siempre gana: gana el MAYOR present value.' },
    { h: 'Por qué importa el TVM',
      k: [['Empresa', 'comparar proyectos e iniciativas por el valor presente de sus retornos'],
          ['Inversores', 'valoran un negocio por el PV de sus retornos futuros'],
          ['Emprendedores', 'cuanto antes se devuelven retornos, mayor PV y más atractivo para el venture capital']] }
  ],
  mc: [
    ['The time value of money states that…', ['Money keeps the same value over time', 'A sum of money is worth more now than the same sum in the future', 'Future money is always worth more because of interest', 'Only inflation changes the value of money'], 1, 'Money today can be invested, is not eroded by inflation yet, and is certain.'],
    ['Which is NOT one of the three reasons behind the time value of money?', ['Opportunity cost', 'Inflation', 'Uncertainty', 'Economies of scale'], 3, 'The three reasons are opportunity cost, inflation and uncertainty.'],
    ['With a 4% annual discount rate, the present value of $2,000,000 received in one year is about…', ['$1,849,112', '$1,923,077', '$2,080,000', '$2,000,000'], 1, 'PV = 2,000,000 / 1.04 = $1,923,076.92.'],
    ['Project A pays $2M in one year; Project C pays $3M in two years. At a 4% discount rate you should choose…', ['A, because money received sooner is always better', 'C, because its present value ($2.77M) is higher than A’s ($1.92M)', 'Either, they are equivalent', 'A, because C’s present value is only $1.85M'], 1, 'PV(C) = 3,000,000 / 1.0816 = $2,773,668.64 > PV(A) = $1,923,076.92.'],
    ['In the TVM formula, “n” is…', ['The number of years', 'The interest rate', 'The number of compounding periods per year', 'The net present value'], 2, 'n = compounding periods per year; t = number of years; i = interest or discount rate.']
  ],
  fmc: [
    ['Which is the correct formula for present value?', ['PV = FV × (1 + i/n)^(n·t)', 'PV = FV / (1 + i/n)^(n·t)', 'PV = FV − i·t', 'PV = FV / (i·n·t)'], 1, 'Discounting divides the future value by (1 + i/n)^(n·t).'],
    ['Which is the correct formula for future value?', ['FV = PV / (1 + i/n)^(n·t)', 'FV = PV + i/n', 'FV = PV × (1 + i/n)^(n·t)', 'FV = PV × i × t'], 2, 'Compounding multiplies the present value by (1 + i/n)^(n·t).']
  ],
  wr: [
    ['Why is $1,000 today worth more than $1,000 received one year from now? Give the three reasons.',
     ['opportunity cost|coste de oportunidad|invest|invertir|interest|interes', 'inflation|inflacion', 'uncertainty|incertidumbre|risk|riesgo'],
     'Because of the time value of money. Money held today can be invested and earn interest (opportunity cost), inflation may reduce what it buys in the future, and a future payment is uncertain until it is actually received.']
  ] }
];
