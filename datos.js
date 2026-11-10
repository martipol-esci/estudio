/* Datos leídos de AulaESCI. Son una foto del momento indicado en «actualizado»: se regeneran cada vez que Claude vuelve a leer el aula. */
window.DATOS = {
  actualizado: '2026-11-10T18:30',

  /* Nombres y colores de las asignaturas que aparecen en tareas y notas */
  asig: {
    business:      { nombre: 'Business Organization', emoji: '📊', color: 'var(--c-bus)' },
    communication: { nombre: 'Communication Techniques', emoji: '🗣️', color: 'var(--c-com)' },
    francais:      { nombre: 'Français', emoji: '🇫🇷', color: 'var(--c-fra)' },
    mates:         { nombre: 'Mathematics', emoji: '📐', color: 'var(--c-mat)' }
  },

  /* Tareas, ya ordenadas por prioridad (la primera es la más urgente). estado: 'pendiente' | 'entregada' */
  tareas: [
    { t: 'Seminar Activity 7', asig: 'business', donde: 'Seminarios (grupo 302)', vence: '2026-11-11T23:30', estado: 'pendiente',
      porque: 'Es la entrega más cercana y todavía no está subida.' },
    { t: 'Problem Set H', asig: 'mates', donde: 'Seminaris', vence: '2026-11-12T08:00', estado: 'pendiente',
      porque: 'Vence el jueves a primera hora: en la práctica hay que dejarlo hecho el miércoles.' },
    { t: 'Final Presentations', asig: 'communication', donde: 'Presentación final', vence: '2026-11-19T12:00', estado: 'pendiente',
      porque: 'Presentación final de la asignatura: además de subirla hay que ensayarla.' },
    { t: 'Final Project · documento (PDF/Word)', asig: 'business', donde: 'Final Project', vence: '2026-11-22T23:59', estado: 'pendiente',
      porque: 'Es el trabajo más largo de los que quedan: conviene avanzarlo esta semana.' },
    { t: 'Final Project · presentación (PPT)', asig: 'business', donde: 'Final Project', vence: '2026-11-22T23:59', estado: 'pendiente',
      porque: 'Va con el documento. Las exposiciones son del 23 al 25 de noviembre: 10 min + 5 de preguntas.' },
    { t: 'News article · presentación (PPT)', asig: 'business', donde: 'News article Presentation', vence: '2026-11-11T23:59', estado: 'entregada',
      porque: 'Enviada y pendiente de calificar.' }
  ],

  /* Fechas que no son entregas */
  fechas: [
    { t: 'Exposiciones del Final Project', asig: 'business', desde: '2026-11-23', hasta: '2026-11-25', nota: 'De 9:45 a 10:45, un grupo cada 15 minutos.' }
  ],

  /* Horario de clases: AulaESCI no lo publica. Se rellenará cuando esté disponible. */
  horario: null,

  /* Calificaciones. media: solo cuando el aula ya da una media calculada; si no, se calcula la media simple de lo calificado. */
  notas: [
    { asig: 'mates', media: 9.40, mediaTxt: 'Avaluació continuada, calculada por AulaESCI',
      items: [
        { n: 'Problem Set B', nota: 8.0 },
        { n: 'Problem Set F', nota: 9.0 },
        { n: 'Examen parcial 1', nota: 9.5, det: 'P1 3,5 + P2 3,0 + P3 3,0' }
      ],
      pend: ['Problem Sets A, C, D, E, G y H', 'Examen parcial 2', 'Examen final'] },
    { asig: 'francais',
      items: [ { n: 'Examen parcial 1', nota: 9.5, det: '10 % del trimestre 1' } ],
      pend: ['Examen parcial 2 (10 %)', 'Treball autònom (10 %)', 'Participació i tasques (10 %)', 'Examen trimestral (60 %)'] },
    { asig: 'business',
      items: [
        { n: 'Seminar 2', nota: 6.5 },
        { n: 'Individual Reflection activity 1', nota: 9.3 },
        { n: 'Seminar Activity 3', nota: 7.5 },
        { n: 'Seminar 4', nota: 8.0 }
      ],
      pend: ['Seminar Activity 6 y 7', 'News article Presentation', 'Final Project', 'Final Exam'] },
    { asig: 'communication',
      items: [
        { n: 'Activity 1: Internship letter', nota: 6.5 },
        { n: 'Activity 2: Communicator analyses', nota: 6.0 },
        { n: 'Activity 3: Andy Coles 1', nota: 8.2 }
      ],
      pend: ['Final Presentations', 'Final Exam (communication block)'] }
  ]
};
