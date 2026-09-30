export type Locale = 'en' | 'es';
export type PageKind = 'tool' | 'guide' | 'legal';

export interface ContentSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface ContentSource {
  title: string;
  url: string;
}

export interface ContentPage {
  path: string;
  locale: Locale;
  kind: PageKind;
  pairPath: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  mode?: 'wake' | 'sleepNow' | 'nap' | 'window';
  sections: ContentSection[];
  sources: ContentSource[];
  related: string[];
  updated: string;
}

const sleepSources: ContentSource[] = [
  {
    title: 'NHLBI · Sleep Phases and Stages',
    url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  },
  {
    title: 'NHLBI · Healthy Sleep Habits',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits',
  },
  {
    title: 'CDC · About Sleep',
    url: 'https://www.cdc.gov/sleep/about/',
  },
];

const durationSource: ContentSource = {
  title: 'NHLBI · How Much Sleep Is Enough?',
  url: 'https://www.nhlbi.nih.gov/health/sleep/how-much-sleep',
};

const contactSource: ContentSource = {
  title: 'MaatWork · sitio público',
  url: 'https://maat.work',
};

export const pages: ContentPage[] = [
  {
    path: '/',
    locale: 'en',
    kind: 'tool',
    pairPath: '/calculadora-de-sueno',
    title: 'Sleep Cycle Calculator',
    description: 'Plan a practical bedtime around your wake-up time with a private, educational sleep cycle calculator.',
    heading: 'Sleep calculator',
    intro: 'Enter when you need to wake up and use the estimates to choose a practical bedtime.',
    mode: 'wake',
    sections: [
      {
        id: 'fixed-wake-time',
        heading: 'Start with the time you cannot move',
        paragraphs: [
          'A fixed wake-up time gives the calculation a useful anchor. The tool works backward from that time in approximate sleep cycles, leaving a small allowance for falling asleep. You can use the result when you are planning a workday, a trip, or a morning appointment.',
          'The default allowance is 15 minutes. It is a practical convention for planning, not a measurement of your sleep latency. If you usually need more or less time, treat the displayed options as a starting point and adjust your wind-down routine accordingly.',
        ],
      },
      {
        id: 'estimated-options',
        heading: 'Read the options as a range',
        paragraphs: [
          'Sleep cycles are often described as lasting about 90 minutes, but real cycles vary by person and night. A result that lands neatly on a cycle boundary can still feel different from one night to the next. The options help you compare available time in bed; they do not predict the stages you will experience.',
          'Give priority to an option that leaves enough time for sleep and fits your life. A later option may be realistic on a busy evening, while an earlier option creates more room when you can start winding down sooner.',
        ],
        bullets: [
          'Use the earlier suggestions when you can protect a longer night.',
          'Keep the same wake-up time when possible so your routine has a stable anchor.',
          'If an option would leave you too little time to sleep, treat it as a constrained plan rather than a target.',
        ],
      },
      {
        id: 'practical-use',
        heading: 'Turn one estimate into a routine',
        paragraphs: [
          'Pick one bedtime that you can repeat, then begin a quiet transition before it. Dim bright light, finish demanding tasks, and prepare the next morning so the estimate is easier to follow. A calculator can organize the clock; your routine and sleep opportunity still do the work.',
          'This page is for educational wellness planning. Sleep varies, and persistent trouble sleeping, excessive daytime sleepiness, loud snoring, gasping, or breathing pauses are reasons to speak with a qualified health professional.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/bedtime-calculator', '/nap-calculator', '/sleep-cycles', '/how-much-sleep'],
    updated: '2026-09-10',
  },
  {
    path: '/bedtime-calculator',
    locale: 'en',
    kind: 'tool',
    pairPath: '/hora-de-dormir',
    title: 'Bedtime Calculator',
    description: 'Find estimated bedtimes from a wake-up target, with an explicit allowance for falling asleep.',
    heading: 'Find your bedtime',
    intro: 'Choose the time you need to get up, then compare estimated bedtimes that fit your night.',
    mode: 'wake',
    sections: [
      {
        id: 'work-backward',
        heading: 'Work backward from your morning',
        paragraphs: [
          'When the morning is fixed, bedtime is a reverse-planning problem. This calculator subtracts several approximate 90-minute cycles and then adds a 15-minute allowance for the time it may take to fall asleep. The displayed clock time is when to get into bed, not a promise about the moment you will be asleep.',
          'For example, a 7:00 a.m. wake-up with five estimated cycles gives 7 hours and 30 minutes of sleep time. With the planning allowance, the suggested in-bed time is around 11:15 p.m. A different night may call for an earlier option if you need more time in bed.',
        ],
      },
      {
        id: 'choose-an-option',
        heading: 'Choose the option you can actually protect',
        paragraphs: [
          'The earliest result is not automatically the right choice. Look for a time that lets you finish normal evening tasks without rushing and still leaves a reasonable sleep opportunity. If you are already short on time, the tool can show the arithmetic clearly, but it cannot turn a short night into a full one.',
          'Sleep cycles are commonly described around 90 minutes, while NHLBI notes that cycles can restart every 80 to 100 minutes. That range is why these results are estimates. Use the times to organize your schedule, then pay attention to how your own sleep and morning energy respond.',
        ],
        bullets: [
          'Prefer an earlier option when it fits without cutting into your wind-down time.',
          'Use the same wake-up target on most days when your schedule allows it.',
          'Move on from the calculator once you have a workable plan; watching the clock can add pressure.',
        ],
      },
      {
        id: 'before-bed',
        heading: 'Make the last hour easier',
        paragraphs: [
          'Use the hour before bed for lower-stimulation tasks: pack a bag, set out clothes, lower the lights, and leave heavy planning for tomorrow. A cool, quiet, comfortable room and fewer electronic interruptions can make the planned transition more realistic.',
          'This calculator is an educational wellness aid, not medical advice. If difficulty falling asleep keeps happening, or if daytime sleepiness, snoring, gasping, or breathing pauses concern you, ask a qualified clinician for guidance.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/', '/nap-calculator', '/sleep-latency', '/sleep-schedule'],
    updated: '2026-09-10',
  },
  {
    path: '/nap-calculator',
    locale: 'en',
    kind: 'tool',
    pairPath: '/siesta',
    title: 'Nap Calculator',
    description: 'Plan a short or full-cycle nap with simple local estimates and clear sleep-cycle caveats.',
    heading: 'Find time for a nap',
    intro: 'Choose a short or full-cycle nap, then use the estimate to protect your afternoon and evening.',
    mode: 'nap',
    sections: [
      {
        id: 'two-nap-shapes',
        heading: 'Choose the shape of your nap',
        paragraphs: [
          'A short nap gives you a small break without planning a full sleep cycle. A full-cycle option gives you more time, but it also needs a larger gap in your day and may leave you less ready for bedtime. The calculator presents both as planning choices rather than guarantees about how you will feel when you wake.',
          'For adults, NHLBI describes naps of no more than 20 minutes as one option when a nap is useful. If you choose a longer nap, leave extra time afterward to sit up, drink water, and return to your tasks before driving or doing anything that needs full attention.',
        ],
      },
      {
        id: 'use-the-clock',
        heading: 'Count the time around the nap',
        paragraphs: [
          'The time you spend getting settled matters. If you plan a 20-minute nap at 2:00 p.m., set aside a little more than 20 minutes for the transition and waking up. A quiet, dim, comfortable place can make the plan easier to follow, while a late nap may make nighttime sleep harder for some people.',
          'Nap length is only one part of the decision. Consider when you need to be alert again, how late it is, and whether you are using naps to compensate for a pattern of too little night sleep.',
        ],
        bullets: [
          'Pick a short nap when you need a brief pause and have a normal bedtime ahead.',
          'Leave a buffer after waking before driving, exercising, or making important decisions.',
          'If naps repeatedly replace night sleep, review your schedule and discuss ongoing problems with a professional.',
        ],
      },
      {
        id: 'night-sleep-context',
        heading: 'Keep the night in view',
        paragraphs: [
          'A nap can fit inside a healthy routine, but it does not replace the regular sleep opportunity most adults need. CDC guidance says adults ages 18 to 60 should generally get at least seven hours per day. Your own needs and the quality of your sleep can differ, so use the result as a simple way to plan the clock.',
          'This page is for educational wellness planning only. It does not diagnose or treat sleep problems. Talk with a qualified health professional if you have persistent sleep difficulty, unusually strong daytime sleepiness, or breathing symptoms during sleep.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/', '/bedtime-calculator', '/sleep-schedule', '/sleep-latency'],
    updated: '2026-09-10',
  },
  {
    path: '/sleep-cycles',
    locale: 'en',
    kind: 'guide',
    pairPath: '/ciclos-de-sueno',
    title: 'Sleep Cycles: What the 90-Minute Estimate Means',
    description: 'Learn how sleep cycles work, why 90 minutes is only an estimate, and how to plan without treating it as a promise.',
    heading: 'Sleep cycles are patterns, not timers',
    intro: 'A simple cycle estimate can organize a bedtime or alarm, as long as you leave room for normal variation.',
    sections: [
      {
        id: 'cycle-basics',
        heading: 'What a sleep cycle describes',
        paragraphs: [
          'During a night of sleep, the brain and body move through non-REM and REM phases. NHLBI describes the cycle as starting over roughly every 80 to 100 minutes, with four to six cycles common in a night. Those figures describe a broad pattern observed in sleep studies; they are not a personal timer that rings at the same minute every night.',
          'The balance of stages changes across the night. Deep non-REM sleep tends to occupy more of the earlier part, while REM sleep tends to take a larger share later. Waking near an estimated boundary may feel different from waking in the middle of a stage, but a clock calculation cannot tell which stage you are in or guarantee a particular feeling in the morning.',
        ],
      },
      {
        id: 'stages-in-plain-language',
        heading: 'The stages in plain language',
        paragraphs: [
          'Non-REM sleep includes the transition into sleep, a stage in which you are asleep, and deeper slow-wave sleep. REM sleep includes active brain activity, rapid eye movements, and temporary muscle relaxation. The stages form a repeating sequence, but the sequence is not identical from one person or night to the next.',
        ],
        bullets: [
          'Stage 1 is the short transition from wakefulness into sleep.',
          'Stage 2 is a stable sleep stage that usually takes a large part of the night.',
          'Stage 3 is deeper slow-wave sleep, often more common earlier in the night.',
          'REM is a distinct phase that generally becomes more common later in the night.',
        ],
      },
      {
        id: 'ninety-minute-planning',
        heading: 'Why calculators use 90 minutes',
        paragraphs: [
          'Ninety minutes is a convenient midpoint for arithmetic inside the wider 80–100-minute range. This site uses it as a practical average so the result is quick to understand. It is better read as a planning interval than as a claim about your exact sleep architecture.',
          'For example, if you want to wake at 7:00 a.m., subtracting five 90-minute intervals gives 11:30 p.m. as the estimated start of sleep. Adding a 15-minute allowance for settling in moves the suggested in-bed time to about 11:15 p.m. A later bedtime may still work differently on a night when your actual cycles are shorter or longer.',
        ],
        table: {
          headers: ['Estimated cycles', 'Sleep time', 'If waking at 7:00 a.m.'],
          rows: [
            ['4', '6 hours', '12:45 a.m. in bed with 15 minutes to fall asleep'],
            ['5', '7 hours 30 minutes', '11:15 p.m. in bed with 15 minutes to fall asleep'],
            ['6', '9 hours', '9:45 p.m. in bed with 15 minutes to fall asleep'],
          ],
        },
      },
      {
        id: 'what-changes-the-estimate',
        heading: 'What can change the pattern',
        paragraphs: [
          'Sleep timing responds to more than a bedtime calculation. Your sleep and wake schedule, light exposure, stress, illness, alcohol, caffeine, exercise, and interruptions can all affect when you fall asleep and how the night feels. Age also changes the mix of stages. A cycle estimate cannot adjust for every one of these factors.',
          'Use the number as a gentle planning aid. If the result conflicts with the amount of time you need, protect the larger sleep opportunity first. The arithmetic is not a reason to cut a night short just to match a neat multiple.',
        ],
        bullets: [
          'Leave enough time in bed for your usual sleep need, including time to settle down.',
          'Compare how a consistent schedule feels over several days instead of judging one alarm.',
          'Treat a difficult night as information about your routine, not as a failed calculation.',
        ],
      },
      {
        id: 'use-the-guide',
        heading: 'A practical way to use this guide',
        paragraphs: [
          'Start with a wake-up time you can keep, choose an estimated bedtime that gives you enough opportunity for sleep, and prepare for it with a calm transition. Then stop calculating and let the night unfold. If you regularly cannot sleep, feel very sleepy during the day, or notice loud snoring, gasping, or breathing pauses, speak with a qualified health professional. This educational guide is not medical advice.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/', '/bedtime-calculator', '/how-much-sleep', '/sleep-latency'],
    updated: '2026-09-30',
  },
  {
    path: '/calculadora-de-sueno',
    locale: 'es',
    kind: 'tool',
    pairPath: '/',
    title: 'Calculadora de ciclos de sueño',
    description: 'Planifica una hora práctica para dormir según tu hora de despertar con una calculadora privada y educativa.',
    heading: 'Calculadora de sueño',
    intro: 'Indica a qué hora necesitas levantarte y compara horarios estimados para acostarte.',
    mode: 'wake',
    sections: [
      {
        id: 'hora-fija',
        heading: 'Comienza por la hora que sí puedes fijar',
        paragraphs: [
          'Una hora de despertar estable sirve como punto de partida. La herramienta cuenta hacia atrás ciclos de sueño aproximados y deja un margen breve para conciliar el sueño. Puedes usar el resultado para organizar una jornada laboral, un viaje o una cita temprano por la mañana.',
          'El margen predeterminado es de 15 minutos. Es una convención práctica para hacer la cuenta, no una medición de tu latencia personal. Si normalmente tardas más o menos, toma los horarios como una referencia y ajusta tu rutina de preparación.',
        ],
      },
      {
        id: 'opciones-estimadas',
        heading: 'Lee las opciones como un rango',
        paragraphs: [
          'A menudo se habla de ciclos de unos 90 minutos, pero los ciclos reales cambian según la persona y la noche. Despertarte cerca de un límite estimado puede sentirse distinto, aunque una cuenta con el reloj no puede saber en qué etapa estarás ni asegurar cómo te sentirás al levantarte.',
          'Elige una opción que deje suficiente tiempo para dormir y que sea posible en tu vida. Un horario más temprano puede darte margen en una noche tranquila; uno más tarde puede ser una alternativa realista cuando tienes compromisos. La constancia suele ser más útil que perseguir unos minutos exactos.',
        ],
        bullets: [
          'Usa las opciones más tempranas cuando puedas proteger una noche más larga.',
          'Conserva una hora de despertar parecida cuando tu rutina lo permita.',
          'Si una opción deja muy poco tiempo para dormir, considérala un límite del día, no una meta.',
        ],
      },
      {
        id: 'uso-practico',
        heading: 'Convierte una estimación en una rutina',
        paragraphs: [
          'Elige un horario que puedas repetir y empieza a bajar el ritmo antes de acostarte. Reduce la luz intensa, termina las tareas más exigentes y deja preparado lo necesario para la mañana. La calculadora organiza el reloj; tu oportunidad de dormir y tus hábitos sostienen el descanso.',
          'Esta página es una guía educativa de bienestar. El sueño cambia de una noche a otra y no es consejo médico. Si tienes dificultad persistente para dormir, somnolencia intensa durante el día, ronquidos fuertes, jadeos o pausas al respirar, consulta con un profesional de la salud calificado.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/hora-de-dormir', '/siesta', '/ciclos-de-sueno', '/cuantas-horas-dormir'],
    updated: '2026-09-10',
  },
  {
    path: '/hora-de-dormir',
    locale: 'es',
    kind: 'tool',
    pairPath: '/bedtime-calculator',
    title: 'Calculadora de hora de dormir',
    description: 'Calcula horarios estimados para acostarte a partir de una hora de despertar y un margen para dormirte.',
    heading: 'Encuentra tu hora de dormir',
    intro: 'Elige cuándo necesitas levantarte y compara horarios estimados que puedan encajar en tu noche.',
    mode: 'wake',
    sections: [
      {
        id: 'cuenta-hacia-atras',
        heading: 'Cuenta hacia atrás desde la mañana',
        paragraphs: [
          'Cuando la mañana está definida, la hora de dormir se puede planificar hacia atrás. Esta calculadora resta varios ciclos aproximados de 90 minutos y luego agrega 15 minutos para el tiempo que podrías tardar en dormirte. La hora que aparece es para entrar en la cama; no promete el momento exacto en que te quedarás dormido.',
          'Por ejemplo, para levantarte a las 7:00 y estimar cinco ciclos, la cuenta reserva 7 horas y 30 minutos de sueño. Con 15 minutos para acomodarte, la hora sugerida para acostarte es cerca de las 11:15 p. m. Una noche con más cansancio o una rutina distinta puede necesitar otra opción.',
        ],
      },
      {
        id: 'elige-lo-posible',
        heading: 'Elige el horario que puedas proteger',
        paragraphs: [
          'El resultado más temprano no siempre es el más útil. Busca una hora que te permita terminar tus tareas normales sin correr y que mantenga una oportunidad razonable de dormir. Si tienes poco tiempo, la herramienta muestra la cuenta con claridad, pero no puede convertir una noche corta en una noche completa.',
          'NHLBI señala que los ciclos pueden reiniciarse cada 80 a 100 minutos. Por eso usamos 90 como un promedio práctico y no como una medida exacta. Observa cómo responde tu propio descanso durante varios días y combina el cálculo con un horario regular.',
        ],
        bullets: [
          'Prefiere una opción más temprana cuando no reduzca tu tiempo de preparación.',
          'Mantén una hora de despertar semejante la mayoría de los días si puedes hacerlo.',
          'Cuando ya tengas un plan posible, deja de revisar el reloj y permite que la noche avance.',
        ],
      },
      {
        id: 'ultima-hora',
        heading: 'Haz más fácil la última hora',
        paragraphs: [
          'Reserva la última hora para actividades tranquilas: prepara la ropa, organiza la mañana, baja las luces y deja para después las decisiones complejas. Un dormitorio cómodo, silencioso y fresco puede ayudar a que la transición sea más sencilla, junto con menos interrupciones de dispositivos.',
          'Esta calculadora es una herramienta educativa de bienestar, no consejo médico. Si la dificultad para dormir se repite, o si notas somnolencia durante el día, ronquidos fuertes, jadeos o pausas al respirar, pide orientación a un profesional de la salud calificado.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/calculadora-de-sueno', '/siesta', '/cuanto-tardo-en-dormirme', '/horario-de-sueno'],
    updated: '2026-09-10',
  },
  {
    path: '/siesta',
    locale: 'es',
    kind: 'tool',
    pairPath: '/nap-calculator',
    title: 'Calculadora de siesta',
    description: 'Planifica una siesta corta o de ciclo completo con estimaciones simples y advertencias claras sobre la variación del sueño.',
    heading: 'Haz tiempo para una siesta',
    intro: 'Elige una siesta corta o de ciclo completo y considera también cómo afectará tu noche.',
    mode: 'nap',
    sections: [
      {
        id: 'dos-opciones',
        heading: 'Elige la forma de tu siesta',
        paragraphs: [
          'Una siesta corta ofrece una pausa breve sin planificar un ciclo completo. Una opción más larga necesita más espacio en el día y puede dejarte menos preparado para dormir por la noche. La calculadora presenta ambas como alternativas de horario; no asegura cómo te sentirás al despertar.',
          'Para adultos, NHLBI menciona las siestas de no más de 20 minutos como una posibilidad cuando resultan útiles. Si eliges una siesta más larga, reserva tiempo para sentarte, hidratarte y volver a tus actividades antes de conducir o hacer algo que requiera atención completa.',
        ],
      },
      {
        id: 'cuenta-el-margen',
        heading: 'Cuenta el tiempo alrededor de la siesta',
        paragraphs: [
          'El tiempo para acomodarte y despertar también cuenta. Si empiezas una siesta de 20 minutos a las 2:00 p. m., reserva algo más que esos 20 minutos para la transición. Un lugar silencioso, cómodo y con poca luz puede facilitar el plan; una siesta muy tarde puede complicar el sueño nocturno en algunas personas.',
          'La duración es solo una parte de la decisión. Considera a qué hora necesitas volver a estar alerta, cuánto falta para acostarte y si las siestas están compensando de forma repetida un descanso nocturno insuficiente.',
        ],
        bullets: [
          'Elige una siesta corta cuando necesites una pausa y tengas una noche normal por delante.',
          'Deja un margen después de despertar antes de conducir o tomar decisiones importantes.',
          'Si las siestas reemplazan con frecuencia el sueño nocturno, revisa tu horario y busca orientación profesional.',
        ],
      },
      {
        id: 'contexto-nocturno',
        heading: 'Mantén presente el descanso nocturno',
        paragraphs: [
          'Una siesta puede formar parte de una rutina, pero no sustituye la oportunidad de sueño que la mayoría de los adultos necesita. El CDC indica que, en general, los adultos de 18 a 60 años deberían dormir al menos siete horas al día. Tus necesidades y la calidad de tu sueño pueden ser distintas, así que usa el resultado para ordenar el horario.',
          'Esta página es una guía educativa de bienestar. No diagnostica ni trata problemas de sueño. Si tienes dificultad persistente, somnolencia diurna inusual o síntomas respiratorios durante el sueño, habla con un profesional de la salud calificado.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/calculadora-de-sueno', '/hora-de-dormir', '/horario-de-sueno', '/cuanto-tardo-en-dormirme'],
    updated: '2026-09-10',
  },
  {
    path: '/ciclos-de-sueno',
    locale: 'es',
    kind: 'guide',
    pairPath: '/sleep-cycles',
    title: 'Ciclos de sueño: qué significa el promedio de 90 minutos',
    description: 'Aprende cómo funcionan los ciclos de sueño, por qué 90 minutos es solo una aproximación y cómo planificar sin tomarla como promesa.',
    heading: 'Los ciclos de sueño son patrones, no cronómetros',
    intro: 'Una estimación sencilla puede ordenar una hora de dormir o despertar si dejas espacio para la variación normal.',
    sections: [
      {
        id: 'base-del-ciclo',
        heading: 'Qué describe un ciclo de sueño',
        paragraphs: [
          'Durante la noche, el cerebro y el cuerpo pasan por fases no REM y REM. El NHLBI explica que el ciclo vuelve a comenzar aproximadamente cada 80 a 100 minutos y que una noche suele incluir entre cuatro y seis ciclos. Son descripciones amplias observadas en estudios del sueño; no son un cronómetro personal que marque el mismo minuto todas las noches.',
          'La proporción de etapas también cambia a lo largo de la noche. El sueño profundo no REM suele ocupar más espacio al principio, mientras que el sueño REM tiende a aumentar después. Despertar cerca de un límite estimado puede sentirse diferente, pero una cuenta con el reloj no puede saber en qué etapa estarás ni garantizar cómo te sentirás por la mañana.',
        ],
      },
      {
        id: 'etapas-en-simple',
        heading: 'Las etapas explicadas de forma simple',
        paragraphs: [
          'El sueño no REM incluye la transición desde la vigilia, una etapa en la que ya estás dormido y el sueño profundo de ondas lentas. El sueño REM combina actividad cerebral intensa, movimientos rápidos de los ojos y una relajación temporal de los músculos. La secuencia se repite, aunque no es idéntica para todas las personas ni todas las noches.',
        ],
        bullets: [
          'La etapa 1 es la transición breve entre estar despierto y dormir.',
          'La etapa 2 es un sueño estable que suele ocupar una parte amplia de la noche.',
          'La etapa 3 es el sueño profundo de ondas lentas y suele ser más frecuente al principio.',
          'La fase REM suele ocupar más espacio hacia el final de la noche.',
        ],
      },
      {
        id: 'planificar-con-90',
        heading: 'Por qué las calculadoras usan 90 minutos',
        paragraphs: [
          'Noventa minutos es un punto medio cómodo para hacer cuentas dentro del rango de 80 a 100 minutos. Esta herramienta lo usa como promedio práctico para que el resultado sea fácil de entender. Conviene leerlo como un intervalo para planificar, no como una afirmación sobre la arquitectura exacta de tu sueño.',
          'Por ejemplo, si quieres despertar a las 7:00 a. m., restar cinco intervalos de 90 minutos da las 11:30 p. m. como inicio estimado del sueño. Al sumar 15 minutos para acomodarte, la hora sugerida para acostarte queda cerca de las 11:15 p. m. Otra noche puede funcionar de otra manera si tus ciclos reales son más cortos o más largos.',
        ],
        table: {
          headers: ['Ciclos estimados', 'Tiempo de sueño', 'Si despiertas a las 7:00 a. m.'],
          rows: [
            ['4', '6 horas', '12:45 a. m. en cama con 15 minutos para dormirte'],
            ['5', '7 horas 30 minutos', '11:15 p. m. en cama con 15 minutos para dormirte'],
            ['6', '9 horas', '9:45 p. m. en cama con 15 minutos para dormirte'],
          ],
        },
      },
      {
        id: 'que-cambia-el-patron',
        heading: 'Qué puede cambiar el patrón',
        paragraphs: [
          'El horario del sueño responde a más cosas que una cuenta de hora. La luz, el estrés, una enfermedad, el alcohol, la cafeína, el ejercicio, las interrupciones y la regularidad de tu rutina pueden cambiar cuándo te duermes y cómo transcurre la noche. La edad también modifica la combinación de etapas. Una estimación no puede corregir todos esos factores.',
          'Usa el número como una ayuda tranquila para organizarte. Si el resultado choca con el tiempo que necesitas, protege primero una oportunidad suficiente para dormir. La cuenta no es motivo para acortar la noche solo para encajar en un múltiplo exacto.',
        ],
        bullets: [
          'Deja tiempo en cama para tu necesidad habitual y para la transición antes de dormir.',
          'Compara una rutina constante durante varios días en lugar de juzgar una sola alarma.',
          'Toma una noche difícil como información sobre tu rutina, no como un cálculo fallido.',
        ],
      },
      {
        id: 'usar-la-guia',
        heading: 'Una forma práctica de usar esta guía',
        paragraphs: [
          'Comienza con una hora de despertar que puedas mantener, elige una hora de dormir estimada que te dé suficiente oportunidad de descanso y prepara una transición tranquila. Después deja de calcular y permite que la noche ocurra. Si con frecuencia no puedes dormir, tienes mucha somnolencia durante el día o notas ronquidos fuertes, jadeos o pausas al respirar, habla con un profesional de la salud calificado. Esta guía es educativa y no es consejo médico.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/calculadora-de-sueno', '/hora-de-dormir', '/cuantas-horas-dormir', '/cuanto-tardo-en-dormirme'],
    updated: '2026-09-30',
  },
  {
    path: '/about',
    locale: 'en',
    kind: 'legal',
    pairPath: '/acerca-de',
    title: 'About SleepLike',
    description: 'Learn who publishes SleepLike, what the calculator is for, and how the educational content is maintained.',
    heading: 'About SleepLike / Maat Work',
    intro: 'SleepLike is a small educational wellness project from the SleepLike / Maat Work editorial team.',
    sections: [
      {
        id: 'purpose',
        heading: 'A simple planning tool',
        paragraphs: [
          'SleepLike helps adults organize a bedtime, wake-up time, nap, or available sleep window with simple local arithmetic. It does not require an account or microphone, and the core calculation is designed to work in the browser without sending sleep times to a server.',
          'The estimates use common sleep-planning conventions and explain their limits. Sleep varies by person and night, so the tool is for educational wellness planning and is not medical advice, a medical device, or a way to diagnose a sleep condition.',
        ],
        bullets: [
          'SleepLike / Maat Work is the institutional editorial name for this project.',
          'The calculator does not measure sleep stages or predict what will happen during a night.',
          'Questions about symptoms or personal care belong with a qualified health professional.',
        ],
      },
      {
        id: 'editorial-approach',
        heading: 'How the content is maintained',
        paragraphs: [
          'The editorial team writes practical explanations from public primary health sources, states the assumptions used by the calculator, and records an update date on each page. The pages are written for general adult education and do not present the team as clinicians or claim medical review.',
          'The project can change as the product, sources, or privacy configuration changes. The methodology page explains the arithmetic and the boundaries of the estimates so you can decide whether a result is useful for your situation.',
        ],
      },
      {
        id: 'contact',
        heading: 'Contact the team',
        paragraphs: [
          'For product, accessibility, privacy, or content questions, visit the public MaatWork contact page at https://maat.work. Please do not send a detailed medical history through a general product contact form. If you have a sleep concern, ask a qualified health professional.',
        ],
      },
    ],
    sources: [contactSource, sleepSources[0]],
    related: ['/contact', '/privacy', '/terms', '/methodology'],
    updated: '2026-09-10',
  },
  {
    path: '/contact',
    locale: 'en',
    kind: 'legal',
    pairPath: '/contacto',
    title: 'Contact SleepLike',
    description: 'Find the public MaatWork contact route for questions about SleepLike, privacy, accessibility, or content.',
    heading: 'Contact SleepLike',
    intro: 'Use the public MaatWork contact route for product, privacy, accessibility, or content questions.',
    sections: [
      {
        id: 'public-contact',
        heading: 'Where to write',
        paragraphs: [
          'The public contact route is https://maat.work. The MaatWork site publishes the business email maatwork.comercial@gmail.com for general inquiries. Use the route that is most convenient and mention SleepLike so the question has context.',
          'SleepLike is an educational wellness tool. The team can receive questions about the website, content, accessibility, or privacy configuration, but it does not provide individualized medical advice or interpret symptoms.',
        ],
      },
      {
        id: 'useful-context',
        heading: 'What helps us investigate',
        paragraphs: [
          'For a product question, include the page path, browser, language, and a short description of what you expected to happen. Avoid sending sleep diaries, medical records, or other health history through a general contact channel; a qualified health professional is the right place for personal sleep guidance.',
          'For a privacy question, describe the setting or consent choice you are asking about. The privacy page explains what the local tool stores and how optional third-party integrations are described when they are enabled.',
        ],
      },
      {
        id: 'response-scope',
        heading: 'What this channel is for',
        paragraphs: [
          'This channel is for questions about the service and its content. It is not an emergency service. If you have an urgent health or safety concern, contact the appropriate local emergency or health service.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/about', '/privacy', '/terms', '/methodology'],
    updated: '2026-09-10',
  },
  {
    path: '/privacy',
    locale: 'en',
    kind: 'legal',
    pairPath: '/privacidad',
    title: 'SleepLike Privacy',
    description: 'Read how SleepLike handles local calculator use, browser preferences, optional analytics, consent choices, and prepared advertising integrations.',
    heading: 'Privacy at SleepLike',
    intro: 'The calculator is designed around local use, limited browser preferences, and clear choices about optional services.',
    sections: [
      {
        id: 'local-calculator',
        heading: 'The calculator runs locally',
        paragraphs: [
          'The core calculator is designed to run in your browser. It does not require an account or microphone, and it is not designed to retain a health history, sleep diary, bedtime history, wake-up history, or calculation inputs on a SleepLike server. The result is produced from the values you enter and the local clock information needed for the calculation.',
          'A browser may store limited preferences, such as language, time format, or a consent choice. This browser storage is for preferences and consent control only; it is not used to retain a personal history of sleep or health information.',
        ],
      },
      {
        id: 'prepared-services',
        heading: 'Prepared integrations and operation',
        paragraphs: [
          'A third-party integration can be prepared in the code without being enabled on every deployment. Vercel Analytics is available only after you opt in through the Privacy preferences control in the footer; when enabled, it is used in an aggregated form to measure page-path activity. It is not intended to receive exact bedtime times, exact wake-up times, nap times, or the values entered into the calculator.',
          'The availability and configuration of optional services can change by deployment. A service named here as prepared should not be read as proof that it is operating in your visit; the consent interface and the browser network behavior are the practical indicators for that session.',
        ],
      },
      {
        id: 'advertising-choice',
        heading: 'Conditional advertising',
        paragraphs: [
          'If advertising is enabled, it will be loaded only after the relevant Google CMP and AdSense integrations are enabled and approved. Ads remain off until those conditions are met. The consent interface is intended to let you accept, refuse, opt out, or change your choice. SleepLike requests non-personalized ads only after your consent. These ads may still use cookies and process information such as your IP address or device details. Refusing consent keeps the calculator available without ads.',
          'Advertising is optional to the product configuration and is not required for the local calculation. No advertising is intended to appear on this legal page. The wording here describes a possible configuration; it does not state that advertising is operating at the time you read it.',
        ],
      },
      {
        id: 'choices-and-questions',
        heading: 'Your controls and questions',
        paragraphs: [
          'Use the Privacy preferences control in the footer to opt out or revoke a previous choice. Your browser may retain the preference needed to remember that decision. Clearing site data can remove that preference and may require you to choose again. The site does not use that storage to retain health history.',
          'For privacy questions, visit https://maat.work or use the public business contact listed on the contact page. This page is general product information and is not a promise about a service that is disabled for your deployment.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/about', '/contact', '/terms', '/methodology'],
    updated: '2026-09-10',
  },
  {
    path: '/terms',
    locale: 'en',
    kind: 'legal',
    pairPath: '/terminos',
    title: 'SleepLike Terms',
    description: 'General terms for using SleepLike as an educational sleep-planning tool.',
    heading: 'Terms for using SleepLike',
    intro: 'These general terms describe the intended use and limits of the SleepLike website and calculator.',
    sections: [
      {
        id: 'educational-service',
        heading: 'What the service provides',
        paragraphs: [
          'SleepLike provides static educational pages and a local calculator for planning approximate sleep and wake times. It is intended for adults seeking general wellness information. The service does not provide medical advice, diagnosis, treatment, emergency support, or a measurement of sleep stages.',
          'The calculations use stated assumptions, including an approximate cycle interval and a falling-asleep allowance. Results are estimates for planning. Sleep varies by person and night, so you remain responsible for deciding whether a suggested time fits your circumstances.',
        ],
      },
      {
        id: 'use-and-changes',
        heading: 'Using the pages',
        paragraphs: [
          'Use the pages for lawful, personal informational purposes and do not treat an estimate as a guarantee. Do not use the calculator as the sole basis for a safety-critical decision, especially when you are very sleepy or need to drive, operate equipment, or perform another task requiring alertness.',
          'Content, calculations, links, and optional integrations may be updated, removed, or changed as the project develops. The update date on a page helps identify the version of the educational copy you read. External websites have their own content and practices.',
        ],
      },
      {
        id: 'health-and-contact',
        heading: 'Health questions and contact',
        paragraphs: [
          'If you have persistent trouble sleeping, excessive daytime sleepiness, loud snoring, gasping, breathing pauses, or another health concern, speak with a qualified health professional. For product, privacy, accessibility, or content questions, use https://maat.work. Do not send sensitive health history through a general product contact route.',
          'These terms describe the service in plain language. They do not add a promise that the calculator is suitable for a particular person, schedule, health condition, or outcome.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/about', '/contact', '/privacy', '/methodology'],
    updated: '2026-09-10',
  },
  {
    path: '/methodology',
    locale: 'en',
    kind: 'legal',
    pairPath: '/metodologia',
    title: 'SleepLike Methodology',
    description: 'See the four calculator modes, arithmetic assumptions, local-time behavior, date handling, and limits of SleepLike estimates.',
    heading: 'How the SleepLike estimates work',
    intro: 'SleepLike uses transparent clock arithmetic to organize four planning modes; it does not forecast sleep stages.',
    sections: [
      {
        id: 'four-modes',
        heading: 'The four planning modes',
        paragraphs: [
          'Each mode answers a different clock question. The tool uses the local date and time available in the browser and returns a small set of readable estimates. The result is a planning aid, not a measurement from a sensor or a clinical assessment.',
        ],
        table: {
          headers: ['Mode', 'Starting point', 'Arithmetic'],
          rows: [
            ['Wake', 'A target wake-up time', 'Subtract an estimated sleep duration and the falling-asleep allowance.'],
            ['Sleep now', 'A snapshot of the local time now', 'Add the allowance and one or more approximate cycle intervals.'],
            ['Nap', 'A nap start time', 'Add a short option around 20 minutes or a longer option around 90 minutes.'],
            ['Window', 'A fixed available interval', 'Compare approximate cycle counts that fit inside the available time.'],
          ],
        },
      },
      {
        id: 'arithmetic-assumptions',
        heading: 'The assumptions behind the arithmetic',
        paragraphs: [
          'The default cycle interval is 90 minutes. NHLBI describes sleep cycles as restarting roughly every 80 to 100 minutes, so 90 is used as a convenient midpoint rather than an exact biological duration. The default falling-asleep allowance is 15 minutes, a practical input for planning that does not represent your measured latency.',
          'For adult context, CDC guidance says adults ages 18 to 60 should generally get at least 7 hours per day. The calculator does not force every result to match one personal sleep need; it shows the arithmetic so you can favor an option that leaves enough time for your own rest.',
        ],
      },
      {
        id: 'dates-and-daylight',
        heading: 'Dates, midnight, and daylight changes',
        paragraphs: [
          'When subtraction crosses midnight, the date moves with it. A result after 12:00 a.m. belongs to the next calendar date, and a result before midnight belongs to the preceding date when counting backward from a morning target. The displayed clock uses the browser’s local time context.',
          'Around a daylight-saving transition, local clock arithmetic follows the date-time rules supplied by the browser. A wall-clock interval can appear shorter or longer when the clock changes. SleepLike does not invent a timezone, silently convert the result to another location, and does not forecast future sleep stages.',
        ],
      },
      {
        id: 'limits',
        heading: 'What the tool does not do',
        paragraphs: [
          'The calculator does not use a microphone, wearable, account, or sleep sensor. It does not identify REM, deep sleep, awakenings, or a disorder, and it does not promise that waking at a displayed time will feel a particular way. Stress, light, illness, substances, schedule changes, and ordinary night-to-night variation can change the result you experience.',
          'If sleep problems persist or you have excessive daytime sleepiness, loud snoring, gasping, or breathing pauses, speak with a qualified health professional. This methodology explains a simple educational calculation and is not medical advice.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/about', '/privacy', '/terms', '/sleep-cycles'],
    updated: '2026-09-10',
  },
  {
    path: '/acerca-de',
    locale: 'es',
    kind: 'legal',
    pairPath: '/about',
    title: 'Acerca de SleepLike',
    description: 'Conoce quién publica SleepLike, para qué sirve la calculadora y cómo se mantiene el contenido educativo.',
    heading: 'Acerca de SleepLike / Maat Work',
    intro: 'SleepLike es un proyecto pequeño de bienestar educativo del equipo editorial SleepLike / Maat Work.',
    sections: [
      {
        id: 'proposito',
        heading: 'Una herramienta sencilla para planificar',
        paragraphs: [
          'SleepLike ayuda a organizar una hora de dormir, despertar, siesta o ventana disponible mediante aritmética local sencilla. No requiere una cuenta ni micrófono, y la calculadora principal está diseñada para funcionar en el navegador sin enviar tus horarios de sueño a un servidor.',
          'Las estimaciones usan convenciones habituales de planificación y explican sus límites. El sueño cambia según la persona y la noche, por lo que la herramienta es para planificación educativa de bienestar y no es consejo médico, dispositivo médico ni una forma de diagnosticar un problema del sueño.',
        ],
        bullets: [
          'SleepLike / Maat Work es el nombre editorial institucional de este proyecto.',
          'La calculadora no mide etapas del sueño ni predice lo que ocurrirá durante una noche.',
          'Las preguntas sobre síntomas o atención personal corresponden a un profesional de la salud calificado.',
        ],
      },
      {
        id: 'enfoque-editorial',
        heading: 'Cómo se mantiene el contenido',
        paragraphs: [
          'El equipo editorial redacta explicaciones prácticas a partir de fuentes primarias públicas de salud, declara las suposiciones de la calculadora y registra una fecha de actualización en cada página. El contenido está escrito para educación general de adultos; el equipo no se presenta como clínico ni afirma que las páginas tengan revisión médica.',
          'El proyecto puede cambiar cuando cambien el producto, las fuentes o la configuración de privacidad. La página de metodología explica la aritmética y los límites de las estimaciones para que puedas decidir si un resultado sirve para tu situación.',
        ],
      },
      {
        id: 'contacto',
        heading: 'Contacta al equipo',
        paragraphs: [
          'Para preguntas sobre el producto, accesibilidad, privacidad o contenido, visita la página pública de contacto de MaatWork en https://maat.work. Evita enviar una historia médica detallada mediante un formulario general del producto. Si tienes una preocupación sobre tu sueño, consulta a un profesional de la salud calificado.',
        ],
      },
    ],
    sources: [contactSource, sleepSources[0]],
    related: ['/contacto', '/privacidad', '/terminos', '/metodologia'],
    updated: '2026-09-10',
  },
  {
    path: '/contacto',
    locale: 'es',
    kind: 'legal',
    pairPath: '/contact',
    title: 'Contacto de SleepLike',
    description: 'Encuentra el canal público de MaatWork para preguntas sobre SleepLike, privacidad, accesibilidad o contenido.',
    heading: 'Contacta a SleepLike',
    intro: 'Usa el canal público de MaatWork para preguntas sobre el producto, privacidad, accesibilidad o contenido.',
    sections: [
      {
        id: 'contacto-publico',
        heading: 'Dónde escribir',
        paragraphs: [
          'El canal público de contacto es https://maat.work. El sitio de MaatWork publica el correo comercial maatwork.comercial@gmail.com para consultas generales. Elige el canal más cómodo e indica que tu pregunta se refiere a SleepLike.',
          'SleepLike es una herramienta educativa de bienestar. El equipo puede recibir preguntas sobre el sitio, el contenido, la accesibilidad o la configuración de privacidad, pero no ofrece consejo médico individual ni interpreta síntomas.',
        ],
      },
      {
        id: 'contexto-util',
        heading: 'Qué información ayuda',
        paragraphs: [
          'Para una pregunta sobre el producto, incluye la ruta de la página, el navegador, el idioma y una descripción breve de lo que esperabas que ocurriera. Evita enviar diarios de sueño, historias clínicas u otros datos de salud a través de un canal general; para orientación personal sobre el sueño, consulta a un profesional de la salud calificado.',
          'Para una pregunta de privacidad, describe el ajuste o la elección de consentimiento que quieres revisar. La página de privacidad explica qué preferencias puede guardar el navegador y cómo se describen las integraciones opcionales cuando están habilitadas.',
        ],
      },
      {
        id: 'alcance-del-canal',
        heading: 'Para qué sirve este canal',
        paragraphs: [
          'Este canal sirve para preguntas sobre el servicio y su contenido. No es un servicio de emergencias. Si tienes una preocupación urgente de salud o seguridad, contacta al servicio local de emergencias o de salud que corresponda.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/acerca-de', '/privacidad', '/terminos', '/metodologia'],
    updated: '2026-09-10',
  },
  {
    path: '/privacidad',
    locale: 'es',
    kind: 'legal',
    pairPath: '/privacy',
    title: 'Privacidad de SleepLike',
    description: 'Conoce cómo SleepLike gestiona el uso local de la calculadora, las preferencias del navegador, la analítica opcional y el consentimiento.',
    heading: 'Privacidad en SleepLike',
    intro: 'La calculadora está pensada para uso local, preferencias limitadas del navegador y decisiones claras sobre servicios opcionales.',
    sections: [
      {
        id: 'calculadora-local',
        heading: 'La calculadora funciona localmente',
        paragraphs: [
          'La calculadora principal está diseñada para funcionar en tu navegador. No requiere una cuenta ni micrófono y no está diseñada para conservar en un servidor de SleepLike un historial de salud, diario de sueño, historial de horas de dormir, historial de despertares ni los datos que ingresas. El resultado se produce con tus valores y la información del reloj local que necesita la cuenta.',
          'El navegador puede guardar preferencias limitadas, como idioma, formato de hora o una elección de consentimiento. Ese almacenamiento sirve solo para preferencias y control del consentimiento; no se usa para conservar un historial personal de sueño ni información de salud.',
        ],
      },
      {
        id: 'integraciones-preparadas',
        heading: 'Integraciones preparadas y operación',
        paragraphs: [
          'Una integración de terceros puede estar preparada en el código sin estar habilitada en todos los despliegues. Vercel Analytics está disponible solo después de que aceptas mediante el control Preferencias de privacidad del pie de página; cuando está habilitado, se usa de forma agregada para medir actividad por ruta de página. No está destinado a recibir horas exactas de dormir, despertar o siesta ni los valores ingresados en la calculadora.',
          'La disponibilidad y configuración de los servicios opcionales puede cambiar según el despliegue. Que un servicio aparezca descrito como preparado no significa que esté operando durante tu visita; la interfaz de consentimiento y el comportamiento de red del navegador son las señales prácticas de esa sesión.',
        ],
      },
      {
        id: 'publicidad-condicional',
        heading: 'Publicidad condicional',
        paragraphs: [
          'Si se habilita publicidad, se cargará únicamente cuando las integraciones correspondientes de Google CMP y AdSense estén habilitadas y aprobadas. Los anuncios permanecen apagados hasta que se cumplen esas condiciones. La interfaz de consentimiento está pensada para permitirte aceptar, rechazar, excluirte o cambiar tu elección. SleepLike solicita anuncios no personalizados únicamente después de tu consentimiento. Estos anuncios pueden usar cookies y procesar información como tu dirección IP o datos del dispositivo. Si rechazas el consentimiento, la calculadora sigue disponible sin anuncios.',
          'La publicidad es opcional dentro de la configuración del producto y no es necesaria para la calculadora local. No se prevé publicidad en esta página legal. Este texto describe una configuración posible; no afirma que la publicidad esté operando cuando lo lees.',
        ],
      },
      {
        id: 'controles-y-preguntas',
        heading: 'Tus controles y preguntas',
        paragraphs: [
          'Usa el control Preferencias de privacidad del pie de página para excluirte o revocar una elección anterior. El navegador puede conservar la preferencia necesaria para recordar esa decisión. Si eliminas los datos del sitio, esa preferencia puede desaparecer y tendrás que elegir nuevamente. Ese almacenamiento no se usa para conservar un historial de salud.',
          'Para preguntas de privacidad, visita https://maat.work o utiliza el contacto comercial público indicado en la página de contacto. Esta página brinda información general del producto y no promete que esté activo un servicio que se encuentre deshabilitado en tu despliegue.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/acerca-de', '/contacto', '/terminos', '/metodologia'],
    updated: '2026-09-10',
  },
  {
    path: '/terminos',
    locale: 'es',
    kind: 'legal',
    pairPath: '/terms',
    title: 'Términos de SleepLike',
    description: 'Términos generales para usar SleepLike como herramienta educativa de planificación del sueño.',
    heading: 'Términos para usar SleepLike',
    intro: 'Estos términos generales describen el uso previsto y los límites del sitio y la calculadora SleepLike.',
    sections: [
      {
        id: 'servicio-educativo',
        heading: 'Qué ofrece el servicio',
        paragraphs: [
          'SleepLike ofrece páginas educativas estáticas y una calculadora local para planificar horarios aproximados de sueño y despertar. Está pensada para adultos que buscan información general de bienestar. El servicio no ofrece consejo médico, diagnóstico, tratamiento, asistencia de emergencia ni medición de etapas del sueño.',
          'Los cálculos usan suposiciones declaradas, como un intervalo aproximado de ciclo y un margen para conciliar el sueño. Los resultados son estimaciones para planificar. El sueño cambia según la persona y la noche, así que tú decides si un horario sugerido encaja con tus circunstancias.',
        ],
      },
      {
        id: 'uso-y-cambios',
        heading: 'Uso de las páginas',
        paragraphs: [
          'Usa las páginas con fines informativos personales y no tomes una estimación como garantía. No uses la calculadora como única base para una decisión de seguridad, en especial si tienes mucha somnolencia o necesitas conducir, operar maquinaria o realizar otra tarea que requiera atención.',
          'El contenido, los cálculos, los enlaces y las integraciones opcionales pueden actualizarse, quitarse o cambiar a medida que avance el proyecto. La fecha de actualización de una página ayuda a identificar la versión del contenido educativo que leíste. Los sitios externos tienen su propio contenido y sus propias prácticas.',
        ],
      },
      {
        id: 'salud-y-contacto',
        heading: 'Preguntas de salud y contacto',
        paragraphs: [
          'Si tienes dificultad persistente para dormir, somnolencia excesiva durante el día, ronquidos fuertes, jadeos, pausas al respirar u otra preocupación de salud, habla con un profesional de la salud calificado. Para preguntas sobre el producto, privacidad, accesibilidad o contenido, usa https://maat.work. No envíes una historia de salud sensible por un canal general del producto.',
          'Estos términos describen el servicio en lenguaje claro. No agregan una promesa de que la calculadora sea adecuada para una persona, horario, condición de salud o resultado particular.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/acerca-de', '/contacto', '/privacidad', '/metodologia'],
    updated: '2026-09-10',
  },
  {
    path: '/metodologia',
    locale: 'es',
    kind: 'legal',
    pairPath: '/methodology',
    title: 'Metodología de SleepLike',
    description: 'Consulta los cuatro modos, las suposiciones aritméticas, el uso de la hora local, el manejo de fechas y los límites de las estimaciones.',
    heading: 'Cómo funcionan las estimaciones de SleepLike',
    intro: 'SleepLike usa aritmética transparente del reloj para cuatro modos de planificación; no pronostica etapas del sueño.',
    sections: [
      {
        id: 'cuatro-modos',
        heading: 'Los cuatro modos de planificación',
        paragraphs: [
          'Cada modo responde una pregunta distinta sobre el reloj. La herramienta usa la fecha y hora local disponibles en el navegador y devuelve un conjunto breve de estimaciones fáciles de leer. El resultado sirve para planificar; no es una medición de sensores ni una evaluación clínica.',
        ],
        table: {
          headers: ['Modo', 'Punto de partida', 'Aritmética'],
          rows: [
            ['Wake', 'Una hora objetivo para despertar', 'Resta una duración estimada de sueño y el margen para dormirte.'],
            ['Sleep now', 'Una captura de la hora local actual', 'Suma el margen y uno o más intervalos de ciclo aproximados.'],
            ['Nap', 'Una hora de inicio de siesta', 'Suma una opción corta de unos 20 minutos o una más larga de unos 90.'],
            ['Window', 'Un intervalo disponible fijo', 'Compara cuántos ciclos aproximados caben en el tiempo disponible.'],
          ],
        },
      },
      {
        id: 'suposiciones-aritmeticas',
        heading: 'Las suposiciones de la cuenta',
        paragraphs: [
          'El intervalo predeterminado de ciclo es de 90 minutos. El NHLBI describe ciclos que vuelven a comenzar aproximadamente cada 80 a 100 minutos, por lo que usamos 90 como un punto medio cómodo y no como una duración biológica exacta. El margen predeterminado para conciliar el sueño es de 15 minutos: sirve para planificar, pero no representa tu latencia medida.',
          'Como referencia adulta, el CDC indica que, en general, los adultos de 18 a 60 años deberían dormir al menos 7 horas al día. La calculadora no obliga a que cada resultado coincida con una necesidad personal; muestra la cuenta para que puedas elegir una opción que deje suficiente tiempo para tu descanso.',
        ],
      },
      {
        id: 'fechas-y-cambios-de-luz',
        heading: 'Fechas, medianoche y cambios de hora',
        paragraphs: [
          'Cuando una resta cruza la medianoche, la fecha cambia con ella. Un resultado después de las 12:00 a. m. pertenece al día calendario siguiente, y un resultado antes de medianoche puede pertenecer al día anterior al contar hacia atrás desde una hora de la mañana. El reloj mostrado usa el contexto horario local del navegador.',
          'Cerca de un cambio de horario de verano, la aritmética local sigue las reglas de fecha y hora que proporciona el navegador. Un intervalo del reloj puede parecer más corto o más largo cuando cambia la hora. SleepLike no inventa una zona horaria, no convierte el resultado en silencio a otro lugar y no pronostica etapas futuras del sueño.',
        ],
      },
      {
        id: 'limites',
        heading: 'Lo que la herramienta no hace',
        paragraphs: [
          'La calculadora no usa micrófono, dispositivo portátil, cuenta ni sensor de sueño. No identifica REM, sueño profundo, despertares ni un trastorno, y no promete que despertar a una hora mostrada se sienta de una manera concreta. El estrés, la luz, una enfermedad, sustancias, cambios de horario y la variación normal entre noches pueden cambiar la experiencia.',
          'Si los problemas de sueño persisten o tienes somnolencia excesiva durante el día, ronquidos fuertes, jadeos o pausas al respirar, habla con un profesional de la salud calificado. Esta metodología explica un cálculo educativo sencillo y no es consejo médico.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/acerca-de', '/privacidad', '/terminos', '/ciclos-de-sueno'],
    updated: '2026-09-10',
  },
  {
    path: '/cuantas-horas-dormir',
    locale: 'es',
    kind: 'guide',
    pairPath: '/how-much-sleep',
    title: '¿Cuántas horas de sueño necesita un adulto?',
    description: 'Una guía práctica sobre duración del sueño adulto, calidad del descanso y cómo elegir un horario con suficiente oportunidad para dormir.',
    heading: '¿Cuánto sueño conviene planificar?',
    intro: 'Comienza por reservar suficiente tiempo para dormir y luego observa tu energía, tu horario y la calidad de tus noches.',
    sections: [
      {
        id: 'rango-adulto',
        heading: 'Usa la recomendación como punto de partida',
        paragraphs: [
          'El CDC indica que, en general, los adultos de 18 a 60 años deberían dormir al menos 7 horas al día. El NHLBI suele presentar un rango adulto de 7 a 9 horas. Estas cifras sirven como orientación para una población, no como una calificación que debas alcanzar de forma perfecta todas las noches. Las necesidades individuales, la edad, la salud, el horario y la calidad del sueño cambian.',
          'La pregunta útil no es solo «¿a qué hora debo acostarme?», sino «¿cuánto tiempo puedo proteger para dormir antes de empezar el día?». Si despiertas a las 6:30 a. m. y quieres dormir ocho horas, el inicio matemático del sueño sería a las 10:30 p. m. Si normalmente tardas 15 minutos en dormirte, entrar en la cama cerca de las 10:15 p. m. deja espacio para esa transición.',
        ],
        table: {
          headers: ['Grupo adulto', 'Referencia general', 'Nota para planificar'],
          rows: [
            ['18–60 años', '7 horas o más', 'Reserva una oportunidad estable y observa cómo funcionas.'],
            ['61–64 años', '7–9 horas', 'Un rango permite ajustar el plan cuando cambian las necesidades.'],
            ['65 años o más', '7–8 horas', 'Usa el rango como contexto, no como diagnóstico personal.'],
          ],
        },
      },
      {
        id: 'duracion-y-calidad',
        heading: 'Las horas importan, y la calidad también',
        paragraphs: [
          'Pasar siete horas en la cama no siempre equivale a dormir siete horas. Despertarse varias veces, tardar mucho en conciliar el sueño o levantarse sin sensación de descanso puede reducir el tiempo de sueño útil. El CDC describe el sueño de calidad como ininterrumpido y reparador, de modo que una meta de duración debe acompañarse de preguntas sobre cómo fue realmente la noche.',
          'Una calculadora puede mostrar una ventana, pero no puede medir la calidad del sueño. Observa patrones durante varios días: hora de acostarte, hora de despertar, despertares, siestas, cafeína, alcohol, ejercicio y nivel de alerta. Una nota breve puede mostrar si falta oportunidad para dormir, si el horario es irregular o si hay un problema repetido que conviene conversar con un profesional.',
        ],
        bullets: [
          'Protege una hora de despertar constante antes de ajustar unos minutos de aritmética.',
          'Mantén el dormitorio silencioso, cómodo y suficientemente fresco para relajarte.',
          'Reduce las pantallas brillantes y las tareas exigentes durante la parte final de la tarde o noche.',
        ],
      },
      {
        id: 'ejemplo-semanal',
        heading: 'Lleva el cálculo a una semana real',
        paragraphs: [
          'Imagina que tu alarma entre semana suena a las 6:45 a. m. Un plan de 7 horas y 30 minutos de sueño apunta a comenzar a dormir cerca de las 11:15 p. m. Si tardas unos 15 minutos en conciliarlo, empieza a prepararte alrededor de las 11:00 p. m. En las noches posteriores a una jornada larga puedes acostarte antes, pero conserva una mañana razonable.',
          'El fin de semana puede tentarte a mover todo el horario. Un cambio pequeño suele ser más sencillo de manejar que un salto grande. El NHLBI y el CDC destacan la regularidad como un hábito útil. Usa la tabla para conversar con tu calendario, no como una regla que ignore el trabajo, los cuidados, los viajes o cómo te sientes.',
        ],
        table: {
          headers: ['Objetivo', 'Ejemplo', 'Para qué sirve'],
          rows: [
            ['Despertar', '6:45 a. m.', 'Ancla la mañana y facilita calcular la hora de dormir.'],
            ['Entrar en la cama', '11:00 p. m.', 'Deja un margen antes del inicio estimado del sueño.'],
            ['Oportunidad de sueño', '7 horas 45 minutos', 'Incluye 15 minutos de transición sin contarlos como sueño.'],
          ],
        },
      },
      {
        id: 'cuando-consultar',
        heading: 'Reconoce cuándo una calculadora no alcanza',
        paragraphs: [
          'La dificultad persistente para dormir, los despertares repetidos, la somnolencia intensa durante el día, los ronquidos fuertes, los jadeos o las pausas al respirar son motivos para pedir una evaluación a un profesional de la salud calificado. Un diario de sueño puede ayudarte a describir el patrón: anota cuándo te acuestas y despiertas, siestas, ejercicio, cafeína o alcohol, medicamentos y qué tan descansado te sientes.',
          'Esta guía es contenido educativo de bienestar. No diagnostica ni trata una condición, y dormir más no es automáticamente mejor para todas las personas. Usa las recomendaciones adultas como punto de partida, construye una rutina posible y busca orientación individual si el patrón sigue interfiriendo con tu vida diaria.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/calculadora-de-sueno', '/ciclos-de-sueno', '/horario-de-sueno', '/cuanto-tardo-en-dormirme'],
    updated: '2026-09-30',
  },
  {
    path: '/cuanto-tardo-en-dormirme',
    locale: 'es',
    kind: 'guide',
    pairPath: '/sleep-latency',
    title: '¿Cuánto tardo en dormirme?',
    description: 'Entiende la latencia del sueño, usa un margen sencillo para planificar y reconoce cuándo la dificultad repetida requiere ayuda profesional.',
    heading: 'Planifica el tiempo entre acostarte y dormirte',
    intro: 'Dormirte forma parte de la noche: incluye esa transición en vez de tratar la hora de acostarte como un interruptor instantáneo.',
    sections: [
      {
        id: 'definir-latencia',
        heading: 'La latencia es una transición normal',
        paragraphs: [
          'La latencia del sueño es el tiempo entre intentar dormirte y quedarte dormido. Cambia de una noche a otra. Puedes dormirte rápido después de un día exigente, tardar más cuando tienes la mente ocupada o permanecer despierto si tu horario está desordenado. Una sola estimación no permite saber si existe un problema.',
          'Para planificar, esta calculadora usa por defecto un margen de 15 minutos. El número mantiene sencilla la cuenta y da un poco de espacio al horario para acostarte. No es una meta, una promesa ni una medición obtenida en un estudio. Si tu patrón suele ser distinto, usa el resultado como señal para comenzar antes o reservar más tiempo en cama.',
        ],
      },
      {
        id: 'aritmetica-simple',
        heading: 'Mira qué cambia con el margen',
        paragraphs: [
          'Supón que quieres estar dormido cerca de las 11:00 p. m. Si normalmente tardas 15 minutos en acomodarte, entrar en la cama a las 10:45 p. m. deja un margen razonable. Si planeas 7 horas y 30 minutos de sueño y debes despertar a las 7:00 a. m., la misma cuenta ubica la hora en cama a las 11:15 p. m. para cinco ciclos estimados: 7:00 menos 7:30 menos 0:15.',
          'El resultado separa dos preguntas: cuánto quieres dormir y cuánto tiempo necesitas para prepararte para dormir. Mantenerlas separadas puede reducir la presión de quedarte dormido en cuanto apoyas la cabeza.',
        ],
        table: {
          headers: ['Inicio previsto del sueño', 'Margen', 'Hora de entrar en la cama'],
          rows: [
            ['10:30 p. m.', '15 minutos', '10:15 p. m.'],
            ['11:00 p. m.', '30 minutos', '10:30 p. m.'],
            ['11:15 p. m.', '15 minutos', '11:00 p. m.'],
          ],
        },
      },
      {
        id: 'reducir-friccion',
        heading: 'Haz menos exigente la transición',
        paragraphs: [
          'Usa el último tramo de la noche para reducir obstáculos: termina las tareas prácticas, baja la luz intensa, aparta el teléfono si te mantiene alerta y conserva un dormitorio silencioso y cómodo. El orden repetible importa más que una rutina complicada. Intenta no convertir el reloj en un examen que puedas aprobar o reprobar.',
          'La cafeína, la nicotina, el alcohol, las comidas abundantes tarde, el ejercicio intenso cerca de la hora de dormir, el estrés y un horario irregular pueden cambiar cómo se siente la transición. No necesitas cambiar todo de una vez. Elige un ajuste pequeño, repítelo varias noches y observa el patrón en lugar de juzgar un solo resultado.',
        ],
        bullets: [
          'Comienza a bajar el ritmo antes de la hora calculada para entrar en la cama.',
          'Anota la hora de acostarte, despertar, las siestas y cualquier cambio importante de la tarde.',
          'Si sigues despierto y cada vez más frustrado, prueba una actividad tranquila hasta sentir sueño nuevamente.',
        ],
      },
      {
        id: 'dificultad-persistente',
        heading: 'Cuándo conviene tener otra conversación',
        paragraphs: [
          'Si la dificultad para dormir persiste, afecta tus actividades diurnas o aparece junto con despertares repetidos, somnolencia excesiva, ronquidos fuertes, jadeos o pausas al respirar, consulta a un profesional de la salud calificado. Un diario de sueño puede aportar detalles útiles sin necesitar un rastreador ni un micrófono.',
          'Esta guía es contenido educativo de bienestar y no es consejo médico. La calculadora puede reservar tiempo para la transición, pero no puede diagnosticar un trastorno del sueño ni reemplazar una atención individual. El objetivo es una oportunidad sostenible para dormir, no un número perfectamente cronometrado.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/hora-de-dormir', '/calculadora-de-sueno', '/horario-de-sueno', '/cuantas-horas-dormir'],
    updated: '2026-09-30',
  },
  {
    path: '/horario-de-sueno',
    locale: 'es',
    kind: 'guide',
    pairPath: '/sleep-schedule',
    title: 'Cómo construir un horario de sueño',
    description: 'Crea un horario de sueño adulto posible con una hora estable para despertar, suficiente oportunidad de descanso y espacio para la vida real.',
    heading: 'Construye un horario que puedas repetir',
    intro: 'Un ancla constante y suficiente tiempo para dormir son un mejor comienzo que perseguir una hora perfecta.',
    sections: [
      {
        id: 'elegir-ancla',
        heading: 'Elige primero la hora de la mañana',
        paragraphs: [
          'Comienza por la hora a la que necesitas levantarte la mayoría de los días. Cuenta hacia atrás para proteger al menos el tiempo de sueño recomendado para tu edad y circunstancias. Para adultos de 18 a 60 años, el CDC indica 7 horas o más al día. El NHLBI también destaca acostarse y levantarse a horas parecidas como un hábito útil.',
          'Una hora de despertar ancla hace visible el resto del plan. Si tu alarma es a las 6:30 a. m. y quieres dormir ocho horas, el inicio del sueño sería cerca de las 10:30 p. m. Si normalmente tardas 15 minutos en dormirte, entra en la cama alrededor de las 10:15 p. m. Esa transición pertenece al horario aunque no sea tiempo de sueño.',
        ],
      },
      {
        id: 'ejemplo-semanal',
        heading: 'Haz concreta la semana',
        paragraphs: [
          'Escribe el plan junto a las obligaciones que dan forma a tus tardes y noches. La idea es comprobar si la hora propuesta es posible, no crear otra razón para sentirte atrasado. Si una reunión tarde o una tarea de cuidado cambia una noche, vuelve al ancla cuando puedas y ajusta la siguiente sin compensar con cuentas complicadas.',
          'Diferencias pequeñas entre los días laborales y el fin de semana suelen ser más fáciles de manejar que un cambio grande. El NHLBI sugiere limitar la diferencia a aproximadamente una hora cuando sea posible. El trabajo, la familia, los viajes y la salud pueden requerir otro patrón; usa la tabla como ejemplo, no como horario rígido.',
        ],
        table: {
          headers: ['Día', 'Hora de despertar', 'Entrar en la cama', 'Oportunidad de sueño'],
          rows: [
            ['Lunes a jueves', '6:30 a. m.', '10:15 p. m.', '8 horas 15 minutos con transición incluida'],
            ['Viernes', '6:30 a. m.', '10:30 p. m.', '8 horas'],
            ['Sábado', '7:15 a. m.', '11:00 p. m.', '8 horas'],
            ['Domingo', '6:30 a. m.', '10:15 p. m.', '8 horas 15 minutos con transición incluida'],
          ],
        },
      },
      {
        id: 'apoyar-la-noche',
        heading: 'Haz que el horario sea más fácil de seguir',
        paragraphs: [
          'Usa la última hora para tareas previsibles y de menor intensidad. Prepara la ropa o la comida, reduce la luz brillante y conserva el dormitorio silencioso, fresco y cómodo. El CDC también recomienda evitar comidas abundantes y alcohol antes de dormir y limitar la cafeína por la tarde o la noche. Elige cambios que encajen contigo en vez de copiar una lista que abandonarás.',
          'La mañana también puede ayudar al horario. Mantén actividad física durante el día y pasa tiempo al aire libre cuando sea posible. Deja visible la hora de despertar en tu calendario y usa una alarma o recordatorio que no requiera una cuenta. El cálculo marca una dirección; la repetición la vuelve útil.',
        ],
        bullets: [
          'Protege la oportunidad de dormir antes de recortar el plan para agregar tareas.',
          'Conserva una secuencia breve para bajar el ritmo y repítela en el mismo orden.',
          'Revisa el patrón después de varios días en lugar de cambiarlo por una sola noche difícil.',
        ],
      },
      {
        id: 'adaptar-sin-perseguir',
        heading: 'Adáptalo sin perseguir un número perfecto',
        paragraphs: [
          'Los viajes, los cambios de luz, el trabajo por turnos, una enfermedad, el estrés y los planes sociales pueden mover el horario. En esos días conserva los mismos principios: reserva suficiente tiempo para dormir, mantén un ancla si puedes y date una transición tranquila. Una estimación de 90 minutos permite comparar opciones, pero los ciclos reales cambian y no deben desplazar la oportunidad de descanso.',
          'Si con frecuencia no puedes seguir un horario porque el sueño no llega, o si tienes somnolencia excesiva durante el día, ronquidos fuertes, jadeos o pausas al respirar, habla con un profesional de la salud calificado. Esta guía es educativa y no es consejo médico.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/calculadora-de-sueno', '/hora-de-dormir', '/cuantas-horas-dormir', '/cuanto-tardo-en-dormirme'],
    updated: '2026-09-30',
  },
  {
    path: '/how-much-sleep',
    locale: 'en',
    kind: 'guide',
    pairPath: '/cuantas-horas-dormir',
    title: 'How Much Sleep Do Adults Need?',
    description: 'A practical guide to adult sleep duration, sleep quality, and choosing a schedule that gives you enough opportunity to rest.',
    heading: 'How much sleep should an adult plan for?',
    intro: 'Start with enough time for sleep, then use your energy, schedule, and sleep quality to refine the plan.',
    sections: [
      {
        id: 'adult-range',
        heading: 'Use the recommendation as a starting point',
        paragraphs: [
          'CDC guidance says adults ages 18 to 60 should generally get 7 or more hours of sleep per day. NHLBI commonly presents 7 to 9 hours as an adult range. These numbers describe population guidance, not a score you have to hit perfectly every night. Individual needs, health, age, schedule, and sleep quality vary.',
          'The useful question is not only “What time should I go to bed?” It is “How much time can I protect for sleep before I need to start the day?” If you wake at 6:30 a.m. and want eight hours of sleep, a 10:30 p.m. sleep start is the arithmetic starting point. If you usually need 15 minutes to settle, getting into bed around 10:15 p.m. gives the plan some room.',
        ],
        table: {
          headers: ['Adult group', 'General reference', 'Planning note'],
          rows: [
            ['Ages 18–60', '7 or more hours', 'Give yourself a stable opportunity and watch how you function.'],
            ['Ages 61–64', '7–9 hours', 'A range can be useful when needs and routines change with age.'],
            ['Ages 65+', '7–8 hours', 'Use the range as context, not as a personal diagnosis.'],
          ],
        },
      },
      {
        id: 'duration-and-quality',
        heading: 'Hours matter, and quality matters too',
        paragraphs: [
          'Seven hours in bed does not always equal seven hours asleep. Repeated waking, a long time to fall asleep, or waking unrefreshed can reduce the useful rest in the night. CDC describes quality sleep as uninterrupted and refreshing, so a duration target should sit beside questions about how the night actually went.',
          'A calculator can show a window, but it cannot measure sleep quality. Notice patterns across several days: your bedtime, wake-up time, awakenings, naps, caffeine, alcohol, exercise, and how alert you feel. A short note can reveal whether the issue is too little opportunity, an irregular schedule, or a recurring sleep problem that deserves professional attention.',
        ],
        bullets: [
          'Protect a consistent wake-up time before optimizing a few minutes of bedtime arithmetic.',
          'Make the bedroom quiet, comfortable, and cool enough for you to settle.',
          'Reduce bright screens and demanding tasks during the last part of the evening.',
        ],
      },
      {
        id: 'example-week',
        heading: 'Build the calculation into a real week',
        paragraphs: [
          'Suppose your weekday alarm is 6:45 a.m. A plan for 7 hours 30 minutes of sleep points to an estimated sleep start at 11:15 p.m. If falling asleep takes about 15 minutes, start getting ready around 11:00 p.m. You might choose an earlier in-bed time on nights when you are recovering from a late evening, but keep the morning anchor realistic.',
          'Weekends can tempt you to move the entire schedule. A small change may be easier to absorb than a large swing. NHLBI and CDC both emphasize regular timing as a useful sleep habit. Use the table as a conversation with your calendar, not as a rule that overrides work, caregiving, travel, or how you feel.',
        ],
        table: {
          headers: ['Target', 'Example time', 'Why it helps'],
          rows: [
            ['Wake up', '6:45 a.m.', 'Anchors the morning and makes bedtime easier to calculate.'],
            ['Get into bed', '11:00 p.m.', 'Leaves a short settling allowance before the planned sleep start.'],
            ['Sleep opportunity', '7 hours 45 minutes', 'Includes the 15-minute allowance instead of treating it as sleep.'],
          ],
        },
      },
      {
        id: 'when-to-ask',
        heading: 'Know when a calculator is not enough',
        paragraphs: [
          'Persistent trouble falling asleep, repeated waking, strong daytime sleepiness, loud snoring, gasping, or breathing pauses call for a qualified health professional’s assessment. A sleep diary can help you describe the pattern: record when you go to bed, when you wake, naps, exercise, caffeine or alcohol, medications, and how rested you feel.',
          'This guide is educational wellness content. It does not diagnose or treat a condition, and more hours are not automatically better for every person. Use the adult recommendations as a starting point, make a workable routine, and ask for individual guidance when the pattern keeps interfering with daily life.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/', '/sleep-cycles', '/sleep-schedule', '/sleep-latency'],
    updated: '2026-09-30',
  },
  {
    path: '/sleep-latency',
    locale: 'en',
    kind: 'guide',
    pairPath: '/cuanto-tardo-en-dormirme',
    title: 'How Long Does It Take to Fall Asleep?',
    description: 'Understand sleep latency, use a simple planning allowance, and recognize when repeated difficulty deserves professional help.',
    heading: 'Plan for the time between bed and sleep',
    intro: 'Falling asleep is part of the night, so include that transition instead of treating bedtime as an instant switch.',
    sections: [
      {
        id: 'latency-definition',
        heading: 'Sleep latency is a normal transition',
        paragraphs: [
          'Sleep latency is the time between trying to sleep and actually falling asleep. It changes from night to night. You may fall asleep quickly after a demanding day, need longer when your mind is busy, or spend more time awake when your schedule is out of rhythm. A single estimate cannot tell you whether anything is wrong.',
          'For planning, this calculator uses a 15-minute allowance by default. That number keeps the arithmetic simple and gives the bedtime result some breathing room. It is not a target, a promise, or a measurement from a sleep study. If your personal pattern is different, use the result as a reminder to start your routine earlier or allow more time in bed.',
        ],
      },
      {
        id: 'simple-arithmetic',
        heading: 'See what the allowance changes',
        paragraphs: [
          'Suppose you need to be asleep around 11:00 p.m. If you often take 15 minutes to settle, getting into bed at 10:45 p.m. gives the calculation a reasonable buffer. If the planned sleep duration is 7 hours 30 minutes and the wake-up time is 7:00 a.m., the same arithmetic places the in-bed time at 11:15 p.m. for a five-cycle estimate: 7:00 minus 7:30 minus 0:15.',
          'The result helps separate two questions: how much time you want to sleep, and how much time you need to get ready for sleep. Keeping them separate can reduce the pressure to fall asleep the instant your head touches the pillow.',
        ],
        table: {
          headers: ['Planned sleep start', 'Allowance', 'Get into bed'],
          rows: [
            ['10:30 p.m.', '15 minutes', '10:15 p.m.'],
            ['11:00 p.m.', '30 minutes', '10:30 p.m.'],
            ['11:15 p.m.', '15 minutes', '11:00 p.m.'],
          ],
        },
      },
      {
        id: 'reduce-friction',
        heading: 'Make the transition less demanding',
        paragraphs: [
          'Use the final part of the evening to lower friction: finish practical tasks, dim bright light, put the phone away if it keeps you alert, and keep the room quiet and comfortable. A repeatable order matters more than a complicated routine. Try not to turn the clock into a test that you can pass or fail.',
          'Caffeine, nicotine, alcohol, late heavy meals, intense exercise close to bedtime, stress, and an inconsistent schedule can all affect how the transition feels. You do not need to change everything at once. Choose one small adjustment, repeat it for several nights, and notice the pattern rather than judging one result.',
        ],
        bullets: [
          'Start winding down before the calculated in-bed time.',
          'Keep a note of bedtime, wake time, naps, and anything that may have changed the evening.',
          'If you are awake and increasingly frustrated, use a quiet activity until you feel sleepy again.',
        ],
      },
      {
        id: 'persistent-difficulty',
        heading: 'When repeated difficulty needs another conversation',
        paragraphs: [
          'If trouble falling asleep persists, affects your daytime function, or comes with repeated waking, excessive sleepiness, loud snoring, gasping, or breathing pauses, ask a qualified health professional for an assessment. A sleep diary can give that conversation useful detail without requiring a tracker or microphone.',
          'This guide is educational wellness content and not medical advice. The calculator can reserve time for a transition, but it cannot diagnose a sleep disorder or replace individualized care. Your goal is a sustainable opportunity for sleep, not a perfectly timed number.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/bedtime-calculator', '/', '/sleep-schedule', '/how-much-sleep'],
    updated: '2026-09-30',
  },
  {
    path: '/sleep-schedule',
    locale: 'en',
    kind: 'guide',
    pairPath: '/horario-de-sueno',
    title: 'How to Build a Sleep Schedule',
    description: 'Create a workable adult sleep schedule with a stable wake time, enough sleep opportunity, and room for real life.',
    heading: 'Build a sleep schedule you can repeat',
    intro: 'A consistent anchor and enough time for sleep make a stronger starting point than a perfect bedtime calculation.',
    sections: [
      {
        id: 'choose-anchor',
        heading: 'Choose the morning anchor first',
        paragraphs: [
          'Start with the time you need to get up most days. Work backward to protect at least the amount of sleep recommended for your age and circumstances. For adults ages 18 to 60, CDC guidance is 7 or more hours per day. NHLBI also emphasizes going to bed and waking up at the same time every day as a helpful habit.',
          'A wake-up anchor makes the rest of the plan visible. If your alarm is 6:30 a.m. and you want 8 hours of sleep, aim for a sleep start around 10:30 p.m. If you usually take 15 minutes to fall asleep, get into bed near 10:15 p.m. That extra transition belongs in the schedule even though it is not sleep time.',
        ],
      },
      {
        id: 'weekly-example',
        heading: 'Make the week concrete',
        paragraphs: [
          'Write the plan beside the obligations that shape your evening. The point is to see whether the proposed bedtime is realistic, not to create another reason to feel behind. If a late meeting or caregiving task changes one night, return to the anchor when you can and adjust the next evening without trying to compensate with complicated arithmetic.',
          'Small differences between weekdays and weekends may be easier to manage than a large shift. NHLBI suggests keeping the difference to about an hour when possible. Your work, family, travel, and health may require a different pattern; use the table as a planning example rather than a rigid schedule.',
        ],
        table: {
          headers: ['Day', 'Wake target', 'Get into bed', 'Sleep opportunity'],
          rows: [
            ['Monday–Thursday', '6:30 a.m.', '10:15 p.m.', '8 hours 15 minutes including settling time'],
            ['Friday', '6:30 a.m.', '10:30 p.m.', '8 hours'],
            ['Saturday', '7:15 a.m.', '11:00 p.m.', '8 hours'],
            ['Sunday', '6:30 a.m.', '10:15 p.m.', '8 hours 15 minutes including settling time'],
          ],
        },
      },
      {
        id: 'support-the-evening',
        heading: 'Make the schedule easier to follow',
        paragraphs: [
          'Use the last hour for predictable, lower-stimulation tasks. Prepare clothes or food, reduce bright light, and keep the bedroom quiet, cool, and comfortable. CDC also recommends avoiding large meals and alcohol before bed and limiting caffeine in the afternoon or evening. Choose the changes that fit your life instead of copying a long list that you will abandon.',
          'A schedule works better when the morning supports it too. Get regular daytime activity and spend time outside when possible. Keep the wake-up time visible in your calendar, and use an alarm or reminder that does not require an account. The calculation can set a direction; repetition gives the direction meaning.',
        ],
        bullets: [
          'Protect the sleep opportunity before trimming the plan to fit more tasks.',
          'Keep a short wind-down sequence in the same order most nights.',
          'Review the pattern after several days rather than changing it after one difficult night.',
        ],
      },
      {
        id: 'adapt-without-chasing',
        heading: 'Adapt without chasing a perfect number',
        paragraphs: [
          'Travel, daylight changes, shift work, illness, stress, and social plans can move a schedule. On those days, use the same principles: protect enough time for sleep, keep one anchor when possible, and give yourself a calm transition. A 90-minute cycle estimate can help compare options, but real cycles vary and should not override the larger sleep opportunity.',
          'If you regularly cannot keep a schedule because sleep will not come, or if you have excessive daytime sleepiness, loud snoring, gasping, or breathing pauses, speak with a qualified health professional. This guide is educational wellness content, not medical advice.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/', '/bedtime-calculator', '/how-much-sleep', '/sleep-latency'],
    updated: '2026-09-30',
  },
];

export function getPage(path: string): ContentPage | undefined {
  return pages.find((page) => page.path === path);
}
