import type { ContentPage } from './pages';

const sleepSources = [
  {
    title: 'NHLBI · Fasi e stadi del sonno',
    url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  },
  {
    title: 'NHLBI · Abitudini per un sonno sano',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits',
  },
  {
    title: 'CDC · Informazioni sul sonno',
    url: 'https://www.cdc.gov/sleep/about/',
  },
];

const durationSource = {
  title: 'NHLBI · Quanto sonno è sufficiente?',
  url: 'https://www.nhlbi.nih.gov/health/sleep/how-much-sleep',
};

const contactSource = {
  title: 'MaatWork · Sito pubblico',
  url: 'https://maat.work',
};

export const itPages: ContentPage[] = [
  {
    path: '/it',
    locale: 'it',
    kind: 'tool',
    key: 'home',
    title: 'Calcolatore del sonno',
    description: 'Organizza l’ora di andare a letto in base alla sveglia con un calcolatore dei cicli del sonno educativo e rispettoso della privacy.',
    heading: 'Calcolatore del sonno',
    intro: 'Inserisci l’ora in cui devi svegliarti e usa le stime per scegliere un orario realistico per andare a letto.',
    mode: 'wake',
    sections: [
      {
        id: 'fixed-wake-time',
        heading: 'Parti dall’orario che non puoi spostare',
        paragraphs: [
          'Un orario fisso per la sveglia offre al calcolo un utile punto di riferimento. Lo strumento conta a ritroso da quell’ora in cicli del sonno approssimativi, lasciando un piccolo margine per addormentarti. Puoi usare il risultato per organizzare una giornata lavorativa, un viaggio o un appuntamento al mattino.',
          'Il margine predefinito è di 15 minuti. È una convenzione pratica per organizzarti, non una misurazione della tua latenza del sonno. Se di solito ti serve più o meno tempo, considera le opzioni mostrate come un punto di partenza e adatta di conseguenza la routine con cui ti prepari a dormire.',
        ],
      },
      {
        id: 'estimated-options',
        heading: 'Leggi le opzioni come un intervallo di possibilità',
        paragraphs: [
          'I cicli del sonno vengono spesso descritti come intervalli di circa 90 minuti, ma i cicli reali variano da persona a persona e da una notte all’altra. Anche un risultato che coincide esattamente con la fine stimata di un ciclo può dare sensazioni diverse in notti diverse. Le opzioni ti aiutano a confrontare il tempo disponibile a letto; non prevedono le fasi del sonno che attraverserai.',
          'Dai priorità a un’opzione che lasci abbastanza tempo per dormire e si adatti alla tua vita. Un orario più tardo può essere realistico in una serata piena di impegni, mentre uno più anticipato offre più margine quando puoi iniziare prima a rallentare.',
        ],
        bullets: [
          'Usa i suggerimenti più anticipati quando puoi riservare più tempo alla notte.',
          'Mantieni lo stesso orario della sveglia quando possibile, per dare alla tua routine un riferimento stabile.',
          'Se un’opzione ti lascerebbe troppo poco tempo per dormire, considerala un piano condizionato dagli impegni, non un obiettivo.',
        ],
      },
      {
        id: 'practical-use',
        heading: 'Trasforma una stima in una routine',
        paragraphs: [
          'Scegli un orario per andare a letto che puoi ripetere e comincia prima una transizione tranquilla. Attenua le luci intense, termina le attività impegnative e prepara il necessario per il mattino, così sarà più facile seguire l’orario stimato. Un calcolatore può organizzare gli orari; sono comunque la tua routine e il tempo che dedichi al sonno a fare la differenza.',
          'Questa pagina serve a organizzare il riposo con finalità educative nell’ambito del benessere. Il sonno varia, e difficoltà persistenti a dormire, eccessiva sonnolenza diurna, forte russamento, risvegli con affanno o pause nella respirazione sono motivi per rivolgerti a un professionista sanitario qualificato.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/it/ora-di-andare-a-letto', '/it/calcolatore-pisolino', '/it/cicli-del-sonno', '/it/quante-ore-dormire'],
    updated: '2026-10-22',
  },
  {
    path: '/it/ora-di-andare-a-letto',
    locale: 'it',
    kind: 'tool',
    key: 'bedtime',
    title: 'A che ora andare a letto?',
    description: 'Trova orari stimati per andare a letto a partire dalla sveglia, con un margine esplicito per il tempo necessario ad addormentarti.',
    heading: 'Trova l’ora di andare a letto',
    intro: 'Scegli l’ora in cui devi alzarti, poi confronta gli orari stimati per andare a letto che si adattano alla tua notte.',
    mode: 'wake',
    sections: [
      {
        id: 'work-backward',
        heading: 'Conta a ritroso dal mattino',
        paragraphs: [
          'Quando l’orario del mattino è fisso, puoi organizzare l’ora di andare a letto contando a ritroso. Questo calcolatore sottrae diversi cicli approssimativi di 90 minuti e considera poi un margine di 15 minuti per il tempo che potresti impiegare ad addormentarti. L’orario mostrato indica quando metterti a letto, non promette il momento in cui prenderai sonno.',
          'Per esempio, una sveglia alle 07:00 con cinque cicli stimati prevede 7 ore e 30 minuti di sonno. Con il margine per addormentarti, l’ora suggerita per metterti a letto è intorno alle 23:15. In una notte diversa potresti aver bisogno di un’opzione più anticipata, se ti serve più tempo a letto.',
        ],
      },
      {
        id: 'choose-an-option',
        heading: 'Scegli l’opzione per cui puoi davvero riservare tempo',
        paragraphs: [
          'Il risultato più anticipato non è automaticamente la scelta giusta. Cerca un orario che ti permetta di finire le normali attività serali senza fretta e lasci comunque un tempo ragionevole per dormire. Se il tempo è già poco, lo strumento può mostrarti chiaramente i conti, ma non può trasformare una notte breve in una notte intera.',
          'I cicli del sonno vengono comunemente descritti come intervalli di circa 90 minuti, mentre l’NHLBI indica che possono ricominciare ogni 80–100 minuti. È per questa variabilità che i risultati sono stime. Usa gli orari per organizzarti, poi osserva come rispondono il tuo sonno e la tua energia al mattino.',
        ],
        bullets: [
          'Preferisci un’opzione più anticipata quando è compatibile con il tempo che ti serve per rallentare.',
          'Mantieni lo stesso orario della sveglia nella maggior parte dei giorni, quando i tuoi impegni lo consentono.',
          'Una volta trovato un piano praticabile, lascia da parte il calcolatore: controllare l’orologio può aggiungere pressione.',
        ],
      },
      {
        id: 'before-bed',
        heading: 'Rendi più semplice l’ultima ora',
        paragraphs: [
          'Dedica l’ora prima di andare a letto ad attività meno stimolanti: prepara una borsa, scegli i vestiti, abbassa le luci e rimanda a domani i programmi più impegnativi. Una stanza fresca, silenziosa e confortevole e meno interruzioni dai dispositivi possono rendere più realistica la transizione che hai previsto.',
          'Questo calcolatore è un supporto educativo per il benessere, non un consiglio medico. Se la difficoltà ad addormentarti continua a ripresentarsi, o se ti preoccupano sonnolenza diurna, russamento, risvegli con affanno o pause nella respirazione, chiedi indicazioni a un professionista sanitario qualificato.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/it', '/it/calcolatore-pisolino', '/it/tempo-per-addormentarsi', '/it/orari-del-sonno'],
    updated: '2026-10-22',
  },
  {
    path: '/it/calcolatore-pisolino',
    locale: 'it',
    kind: 'tool',
    key: 'nap',
    title: 'Calcolatore del pisolino',
    description: 'Organizza un pisolino breve o di un ciclo completo con semplici stime locali e indicazioni chiare sui limiti dei cicli del sonno.',
    heading: 'Trova il tempo per un pisolino',
    intro: 'Scegli un pisolino breve o di un ciclo completo, poi usa la stima tenendo conto anche del pomeriggio e della sera.',
    mode: 'nap',
    sections: [
      {
        id: 'two-nap-shapes',
        heading: 'Scegli il tipo di pisolino',
        paragraphs: [
          'Un pisolino breve ti offre una piccola pausa senza prevedere un intero ciclo del sonno. L’opzione di un ciclo completo concede più tempo, ma richiede anche uno spazio maggiore nella giornata e può farti sentire meno pronto a dormire la sera. Il calcolatore presenta entrambe come scelte per organizzarti, non come garanzie di come ti sentirai al risveglio.',
          'Per gli adulti, l’NHLBI indica i pisolini di non più di 20 minuti come una possibilità quando un pisolino è utile. Se scegli un pisolino più lungo, lascia del tempo in più dopo il risveglio per metterti a sedere, bere acqua e riprendere le tue attività prima di guidare o fare qualcosa che richieda piena attenzione.',
        ],
      },
      {
        id: 'use-the-clock',
        heading: 'Conta anche il tempo prima e dopo il pisolino',
        paragraphs: [
          'Anche il tempo che impieghi a sistemarti conta. Se programmi un pisolino breve con 20 minuti a letto alle 14:00, riserva un po’ più di 20 minuti in totale per la transizione e il risveglio. Un posto silenzioso, poco illuminato e confortevole può rendere più facile seguire il piano, mentre un pisolino tardivo può rendere più difficile dormire la notte per alcune persone.',
          'La durata del pisolino è solo una parte della decisione. Considera quando dovrai tornare a essere vigile, quanto è tardi e se stai usando i pisolini per compensare un’abitudine a dormire troppo poco di notte.',
        ],
        bullets: [
          'Scegli un pisolino breve quando ti serve una piccola pausa e prevedi di andare a letto al solito orario.',
          'Lascia un margine dopo il risveglio prima di guidare, fare esercizio o prendere decisioni importanti.',
          'Se i pisolini sostituiscono ripetutamente il sonno notturno, rivedi i tuoi orari e parla dei problemi persistenti con un professionista sanitario.',
        ],
      },
      {
        id: 'night-sleep-context',
        heading: 'Non perdere di vista la notte',
        paragraphs: [
          'Un pisolino può rientrare in una routine sana, ma non sostituisce il tempo da dedicare regolarmente al sonno di cui ha bisogno la maggior parte degli adulti. Le indicazioni dei CDC dicono che gli adulti tra 18 e 60 anni dovrebbero generalmente dormire almeno sette ore al giorno. Le tue esigenze e la qualità del tuo sonno possono essere diverse, quindi usa il risultato come un semplice modo per organizzare gli orari.',
          'Questa pagina serve solo a organizzare il riposo con finalità educative nell’ambito del benessere. Non diagnostica né tratta problemi del sonno. Rivolgiti a un professionista sanitario qualificato se hai difficoltà persistenti a dormire, una sonnolenza diurna insolitamente intensa o sintomi respiratori durante il sonno.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/it', '/it/ora-di-andare-a-letto', '/it/orari-del-sonno', '/it/tempo-per-addormentarsi'],
    updated: '2026-10-22',
  },
  {
    path: '/it/cicli-del-sonno',
    locale: 'it',
    kind: 'guide',
    key: 'cycles',
    title: 'Cicli del sonno: la stima di 90 minuti',
    description: 'Scopri come funzionano i cicli del sonno, perché 90 minuti sono solo una stima e come organizzarti senza considerarli una promessa.',
    heading: 'I cicli del sonno sono schemi, non timer',
    intro: 'Una semplice stima dei cicli può aiutarti a organizzare l’ora di andare a letto o la sveglia, purché lasci spazio alla normale variabilità.',
    sections: [
      {
        id: 'cycle-basics',
        heading: 'Che cosa descrive un ciclo del sonno',
        paragraphs: [
          'Durante una notte di sonno, il cervello e il corpo attraversano fasi non-REM e REM. L’NHLBI descrive il ciclo come una sequenza che ricomincia all’incirca ogni 80–100 minuti, con quattro-sei cicli comuni in una notte. Questi numeri descrivono uno schema generale osservato negli studi sul sonno; non sono un timer personale che suona allo stesso minuto ogni notte.',
          'La proporzione delle fasi cambia nel corso della notte. Il sonno profondo non-REM tende a occupare una parte maggiore all’inizio, mentre il sonno REM tende ad aumentare più tardi. Svegliarti vicino alla fine stimata di un ciclo può dare sensazioni diverse rispetto al risveglio nel mezzo di una fase, ma un calcolo dell’orario non può sapere in quale fase ti trovi né garantire una determinata sensazione al mattino.',
        ],
      },
      {
        id: 'stages-in-plain-language',
        heading: 'Le fasi spiegate in modo semplice',
        paragraphs: [
          'Il sonno non-REM comprende il passaggio al sonno, uno stadio in cui stai già dormendo e il sonno più profondo a onde lente. Il sonno REM comprende un’intensa attività cerebrale, movimenti rapidi degli occhi e un temporaneo rilassamento muscolare. Le fasi formano una sequenza che si ripete, ma non è identica da una persona all’altra o da una notte all’altra.',
        ],
        bullets: [
          'Lo stadio 1 è il breve passaggio dalla veglia al sonno.',
          'Lo stadio 2 è uno stadio di sonno stabile che di solito occupa gran parte della notte.',
          'Lo stadio 3 è il sonno più profondo a onde lente, spesso più frequente all’inizio della notte.',
          'Il sonno REM è una fase distinta che generalmente diventa più frequente nella parte finale della notte.',
        ],
      },
      {
        id: 'ninety-minute-planning',
        heading: 'Perché i calcolatori usano 90 minuti',
        paragraphs: [
          'Novanta minuti sono un punto intermedio comodo per i calcoli nell’intervallo più ampio di 80–100 minuti. Questo sito li usa come media pratica per rendere il risultato rapido da capire. È meglio considerarli un intervallo per organizzarti, non un’affermazione sull’esatta architettura del tuo sonno.',
          'Per esempio, se vuoi svegliarti alle 07:00, sottrarre cinque intervalli di 90 minuti porta alle 23:30 come inizio stimato del sonno. Aggiungendo un margine di 15 minuti per addormentarti, l’ora suggerita per metterti a letto si anticipa alle 23:15 circa. Un orario più tardo può comunque dare risultati diversi in una notte in cui i tuoi cicli reali sono più brevi o più lunghi.',
        ],
        table: {
          headers: ['Cicli stimati', 'Tempo di sonno', 'Con sveglia alle 07:00'],
          rows: [
            ['4', '6 ore', 'A letto alle 00:45, con 15 minuti per addormentarti'],
            ['5', '7 ore e 30 minuti', 'A letto alle 23:15, con 15 minuti per addormentarti'],
            ['6', '9 ore', 'A letto alle 21:45, con 15 minuti per addormentarti'],
          ],
        },
      },
      {
        id: 'what-changes-the-estimate',
        heading: 'Che cosa può cambiare lo schema',
        paragraphs: [
          'Gli orari del sonno dipendono da molto più di un calcolo dell’ora di andare a letto. Gli orari in cui dormi e ti svegli, l’esposizione alla luce, lo stress, una malattia, l’alcol, la caffeina, l’esercizio fisico e le interruzioni possono tutti influenzare quando ti addormenti e come trascorre la notte. Anche l’età cambia la proporzione delle fasi. Una stima dei cicli non può tenere conto di ciascuno di questi fattori.',
          'Usa il numero come un aiuto per organizzarti senza pressione. Se il risultato contrasta con la quantità di tempo di cui hai bisogno, dai prima la precedenza a un tempo più ampio per dormire. I conti non sono un motivo per accorciare la notte solo per farla coincidere con un multiplo esatto.',
        ],
        bullets: [
          'Lascia abbastanza tempo a letto per il tuo abituale bisogno di sonno, compreso il tempo per prepararti ad addormentarti.',
          'Confronta come ti senti con orari regolari per diversi giorni, invece di giudicare un singolo risveglio.',
          'Considera una notte difficile come un’informazione sulla tua routine, non come un calcolo fallito.',
        ],
      },
      {
        id: 'use-the-guide',
        heading: 'Un modo pratico per usare questa guida',
        paragraphs: [
          'Parti da un orario della sveglia che puoi mantenere, scegli un’ora stimata per andare a letto che ti lasci abbastanza tempo per dormire e preparati con una transizione tranquilla. Poi smetti di calcolare e lascia che la notte faccia il suo corso. Se spesso non riesci a dormire, hai molta sonnolenza durante il giorno o noti forte russamento, risvegli con affanno o pause nella respirazione, rivolgiti a un professionista sanitario qualificato. Questa guida educativa non è un consiglio medico.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/it', '/it/ora-di-andare-a-letto', '/it/quante-ore-dormire', '/it/tempo-per-addormentarsi'],
    updated: '2026-10-22',
  },
  {
    path: '/it/quante-ore-dormire',
    locale: 'it',
    kind: 'guide',
    key: 'duration',
    title: 'Quante ore deve dormire un adulto?',
    description: 'Una guida pratica alla durata e alla qualità del sonno negli adulti e alla scelta di orari che lascino abbastanza tempo per riposare.',
    heading: 'Quanto tempo dovrebbe dedicare al sonno un adulto?',
    intro: 'Parti da un tempo sufficiente per dormire, poi perfeziona il piano in base alla tua energia, ai tuoi impegni e alla qualità del sonno.',
    sections: [
      {
        id: 'adult-range',
        heading: 'Usa le raccomandazioni come punto di partenza',
        paragraphs: [
          'Le indicazioni dei CDC dicono che gli adulti tra 18 e 60 anni dovrebbero generalmente dormire 7 o più ore al giorno. L’NHLBI presenta comunemente un intervallo di 7–9 ore per gli adulti. Questi numeri sono indicazioni per la popolazione, non un punteggio da raggiungere alla perfezione ogni notte. Le esigenze individuali, la salute, l’età, gli impegni e la qualità del sonno variano.',
          'La domanda utile non è solo «A che ora dovrei andare a letto?», ma anche «Quanto tempo posso riservare al sonno prima di dover iniziare la giornata?». Se ti svegli alle 06:30 e vuoi dormire otto ore, le 22:30 sono il punto di partenza del calcolo per l’inizio del sonno. Se di solito ti servono 15 minuti per addormentarti, metterti a letto intorno alle 22:15 lascia un po’ di margine al piano.',
        ],
        table: {
          headers: ['Fascia d’età adulta', 'Riferimento generale', 'Nota per organizzarti'],
          rows: [
            ['18–60 anni', '7 o più ore', 'Riserva regolarmente tempo al sonno e osserva come affronti la giornata.'],
            ['61–64 anni', '7–9 ore', 'Un intervallo può essere utile quando esigenze e abitudini cambiano con l’età.'],
            ['65 anni e oltre', '7–8 ore', 'Usa l’intervallo come riferimento, non come diagnosi personale.'],
          ],
        },
      },
      {
        id: 'duration-and-quality',
        heading: 'Le ore contano, e anche la qualità',
        paragraphs: [
          'Sette ore a letto non equivalgono sempre a sette ore di sonno. Risvegli ripetuti, molto tempo per addormentarti o la sensazione di non aver riposato al risveglio possono ridurre il riposo utile durante la notte. I CDC descrivono il sonno di qualità come ininterrotto e ristoratore, quindi un obiettivo di durata dovrebbe affiancarsi a domande su come è andata davvero la notte.',
          'Un calcolatore può mostrare un intervallo di tempo, ma non può misurare la qualità del sonno. Osserva gli schemi per diversi giorni: ora di andare a letto, sveglia, risvegli, pisolini, caffeina, alcol, esercizio fisico e quanto ti senti vigile. Una breve nota può aiutarti a capire se il problema è il poco tempo disponibile, un orario irregolare o una difficoltà ricorrente del sonno che merita attenzione professionale.',
        ],
        bullets: [
          'Mantieni un orario regolare per svegliarti prima di ottimizzare pochi minuti nel calcolo dell’ora di andare a letto.',
          'Rendi la camera silenziosa, confortevole e abbastanza fresca da permetterti di rilassarti.',
          'Riduci gli schermi luminosi e le attività impegnative nell’ultima parte della serata.',
        ],
      },
      {
        id: 'example-week',
        heading: 'Inserisci il calcolo in una settimana reale',
        paragraphs: [
          'Immagina che la tua sveglia nei giorni feriali sia alle 06:45. Un piano per 7 ore e 30 minuti di sonno indica un inizio stimato del sonno alle 23:15. Se per addormentarti impieghi circa 15 minuti, comincia a prepararti intorno alle 23:00. Potresti scegliere di metterti a letto prima nelle notti in cui recuperi dopo una serata finita tardi, ma mantieni realistico il riferimento del mattino.',
          'Il fine settimana può invogliarti a spostare l’intero programma. Un piccolo cambiamento può essere più facile da assorbire di uno spostamento ampio. Sia l’NHLBI sia i CDC sottolineano che orari regolari sono un’abitudine utile per il sonno. Usa la tabella per ragionare con il calendario, non come una regola che prevale sul lavoro, sulla cura di altre persone, sui viaggi o su come ti senti.',
        ],
        table: {
          headers: ['Obiettivo', 'Orario di esempio', 'Perché è utile'],
          rows: [
            ['Sveglia', '06:45', 'Dà un riferimento al mattino e rende più facile calcolare l’ora di andare a letto.'],
            ['A letto', '23:00', 'Lascia un breve margine per addormentarti prima dell’inizio del sonno previsto.'],
            ['Tempo a disposizione per dormire', '7 ore e 45 minuti', 'Include il margine di 15 minuti invece di considerarlo sonno.'],
          ],
        },
      },
      {
        id: 'when-to-ask',
        heading: 'Riconosci quando un calcolatore non basta',
        paragraphs: [
          'Difficoltà persistenti ad addormentarti, risvegli ripetuti, forte sonnolenza diurna, forte russamento, risvegli con affanno o pause nella respirazione richiedono la valutazione di un professionista sanitario qualificato. Un diario del sonno può aiutarti a descrivere lo schema: annota quando vai a letto, quando ti svegli, i pisolini, l’esercizio fisico, caffeina o alcol, i farmaci e quanto senti di aver riposato.',
          'Questa guida offre contenuti educativi sul benessere. Non diagnostica né tratta una condizione, e dormire più ore non è automaticamente meglio per ogni persona. Usa le raccomandazioni per gli adulti come punto di partenza, costruisci una routine praticabile e chiedi indicazioni individuali quando il problema continua a interferire con la vita quotidiana.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/it', '/it/cicli-del-sonno', '/it/orari-del-sonno', '/it/tempo-per-addormentarsi'],
    updated: '2026-10-22',
  },
  {
    path: '/it/tempo-per-addormentarsi',
    locale: 'it',
    kind: 'guide',
    key: 'latency',
    title: 'Quanto tempo serve per addormentarsi?',
    description: 'Scopri cos’è la latenza del sonno, usa un semplice margine per organizzarti e riconosci quando le difficoltà richiedono un professionista.',
    heading: 'Prevedi il tempo tra il letto e il sonno',
    intro: 'Addormentarti fa parte della notte: includi questa transizione invece di trattare l’ora di andare a letto come un interruttore istantaneo.',
    sections: [
      {
        id: 'latency-definition',
        heading: 'La latenza del sonno è una transizione normale',
        paragraphs: [
          'La latenza del sonno è il tempo tra il tentativo di dormire e il momento in cui ti addormenti davvero. Cambia da una notte all’altra. Potresti addormentarti rapidamente dopo una giornata impegnativa, aver bisogno di più tempo quando hai la mente occupata o restare sveglio più a lungo quando i tuoi orari sono sregolati. Una singola stima non può dirti se c’è qualcosa che non va.',
          'Per organizzare gli orari, questo calcolatore usa un margine predefinito di 15 minuti. Quel numero mantiene semplici i conti e dà un po’ di respiro all’orario suggerito per andare a letto. Non è un obiettivo, una promessa o una misurazione ricavata da uno studio del sonno. Se le tue abitudini sono diverse, usa il risultato come promemoria per iniziare prima la tua routine o lasciare più tempo a letto.',
        ],
      },
      {
        id: 'simple-arithmetic',
        heading: 'Scopri che cosa cambia con il margine',
        paragraphs: [
          'Immagina di voler prendere sonno intorno alle 23:00. Se spesso ti servono 15 minuti per addormentarti, metterti a letto alle 22:45 aggiunge un margine ragionevole al calcolo. Se la durata del sonno prevista è di 7 ore e 30 minuti e la sveglia è alle 07:00, lo stesso calcolo colloca l’ora di metterti a letto alle 23:15 per una stima di cinque cicli: 07:00 meno 7 ore e 30 minuti meno 15 minuti.',
          'Il risultato aiuta a separare due domande: quanto tempo vuoi dormire e quanto tempo ti serve per prepararti al sonno. Tenerle separate può ridurre la pressione di doverti addormentare nell’istante in cui appoggi la testa sul cuscino.',
        ],
        table: {
          headers: ['Inizio del sonno previsto', 'Margine', 'A letto'],
          rows: [
            ['22:30', '15 minuti', '22:15'],
            ['23:00', '30 minuti', '22:30'],
            ['23:15', '15 minuti', '23:00'],
          ],
        },
      },
      {
        id: 'reduce-friction',
        heading: 'Rendi meno impegnativa la transizione',
        paragraphs: [
          'Usa l’ultima parte della serata per semplificare le cose: termina le attività pratiche, attenua le luci intense, metti via il telefono se ti tiene sveglio e mantieni la stanza silenziosa e confortevole. Un ordine ripetibile conta più di una routine complicata. Cerca di non trasformare l’orologio in un esame da superare o fallire.',
          'Caffeina, nicotina, alcol, pasti abbondanti a tarda ora, esercizio intenso poco prima di andare a letto, stress e orari irregolari possono tutti influenzare questa transizione. Non devi cambiare tutto insieme. Scegli un piccolo aggiustamento, ripetilo per diverse notti e osserva lo schema invece di giudicare un singolo risultato.',
        ],
        bullets: [
          'Comincia a rallentare prima dell’orario calcolato per metterti a letto.',
          'Annota l’ora di andare a letto, la sveglia, i pisolini e tutto ciò che potrebbe aver cambiato la serata.',
          'Se resti sveglio e la frustrazione aumenta, dedicati a un’attività tranquilla finché non senti di nuovo sonno.',
        ],
      },
      {
        id: 'persistent-difficulty',
        heading: 'Quando le difficoltà ricorrenti richiedono un confronto',
        paragraphs: [
          'Se la difficoltà ad addormentarti persiste, influisce sulle attività diurne o si accompagna a risvegli ripetuti, sonnolenza eccessiva, forte russamento, risvegli con affanno o pause nella respirazione, chiedi una valutazione a un professionista sanitario qualificato. Un diario del sonno può fornire dettagli utili per quel confronto senza richiedere un dispositivo di monitoraggio o un microfono.',
          'Questa guida offre contenuti educativi sul benessere e non costituisce un consiglio medico. Il calcolatore può riservare del tempo alla transizione, ma non può diagnosticare un disturbo del sonno né sostituire un’assistenza personalizzata. Il tuo obiettivo è avere tempo per dormire in modo sostenibile, non ottenere un numero cronometrato alla perfezione.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/it/ora-di-andare-a-letto', '/it', '/it/orari-del-sonno', '/it/quante-ore-dormire'],
    updated: '2026-10-22',
  },
  {
    path: '/it/orari-del-sonno',
    locale: 'it',
    kind: 'guide',
    key: 'schedule',
    title: 'Come creare orari del sonno regolari',
    description: 'Crea orari del sonno praticabili con una sveglia stabile, abbastanza tempo per dormire e spazio per gli impegni della vita reale.',
    heading: 'Crea orari del sonno che puoi mantenere',
    intro: 'Un riferimento costante e abbastanza tempo per dormire sono un punto di partenza più solido di un calcolo perfetto dell’ora di andare a letto.',
    sections: [
      {
        id: 'choose-anchor',
        heading: 'Scegli prima il riferimento del mattino',
        paragraphs: [
          'Parti dall’ora in cui devi alzarti nella maggior parte dei giorni. Conta a ritroso per riservare almeno la quantità di sonno raccomandata per la tua età e le tue circostanze. Per gli adulti tra 18 e 60 anni, i CDC indicano 7 o più ore al giorno. Anche l’NHLBI sottolinea che andare a letto e svegliarsi alla stessa ora ogni giorno è un’abitudine utile.',
          'Un orario di riferimento per la sveglia rende visibile il resto del piano. Se la sveglia è alle 06:30 e vuoi dormire 8 ore, punta a prendere sonno intorno alle 22:30. Se di solito ti servono 15 minuti per addormentarti, mettiti a letto verso le 22:15. Anche questa transizione va inserita nel programma, pur non essendo tempo di sonno.',
        ],
      },
      {
        id: 'weekly-example',
        heading: 'Rendi concreta la settimana',
        paragraphs: [
          'Scrivi il piano accanto agli impegni che scandiscono la tua serata. Lo scopo è vedere se l’ora proposta per andare a letto è realistica, non creare un altro motivo per sentirti in ritardo. Se una riunione serale o il compito di prenderti cura di qualcuno cambia una notte, torna al tuo riferimento quando puoi e adatta la sera successiva senza cercare di compensare con calcoli complicati.',
          'Piccole differenze tra i giorni feriali e il fine settimana possono essere più facili da gestire di un grande spostamento. L’NHLBI suggerisce di contenere la differenza a circa un’ora, quando possibile. Lavoro, famiglia, viaggi e salute possono richiedere uno schema diverso; usa la tabella come esempio per organizzarti, non come un programma rigido.',
        ],
        table: {
          headers: ['Giorno', 'Sveglia prevista', 'A letto', 'Tempo a disposizione per dormire'],
          rows: [
            ['Lunedì–giovedì', '06:30', '22:15', '8 ore e 15 minuti, compreso il tempo per addormentarti'],
            ['Venerdì', '06:30', '22:30', '8 ore'],
            ['Sabato', '07:15', '23:00', '8 ore'],
            ['Domenica', '06:30', '22:15', '8 ore e 15 minuti, compreso il tempo per addormentarti'],
          ],
        },
      },
      {
        id: 'support-the-evening',
        heading: 'Rendi gli orari più facili da seguire',
        paragraphs: [
          'Dedica l’ultima ora ad attività prevedibili e meno stimolanti. Prepara vestiti o cibo, riduci la luce intensa e mantieni la camera silenziosa, fresca e confortevole. I CDC raccomandano anche di evitare pasti abbondanti e alcol prima di andare a letto e di limitare la caffeina nel pomeriggio o alla sera. Scegli i cambiamenti adatti alla tua vita invece di copiare una lunga lista che poi abbandonerai.',
          'Un programma funziona meglio quando anche il mattino lo sostiene. Fai regolarmente attività durante il giorno e trascorri del tempo all’aperto quando possibile. Tieni visibile nel calendario l’orario della sveglia e usa una sveglia o un promemoria che non richieda un account. Il calcolo può indicare una direzione; la ripetizione le dà significato.',
        ],
        bullets: [
          'Dai priorità al tempo per dormire prima di accorciarlo per inserire altre attività.',
          'Mantieni una breve sequenza per rallentare, nello stesso ordine quasi tutte le sere.',
          'Rivedi lo schema dopo diversi giorni, invece di cambiarlo dopo una sola notte difficile.',
        ],
      },
      {
        id: 'adapt-without-chasing',
        heading: 'Adatta il piano senza inseguire un numero perfetto',
        paragraphs: [
          'Viaggi, cambi dell’ora, lavoro a turni, malattie, stress e impegni sociali possono spostare gli orari. In quei giorni usa gli stessi principi: riserva abbastanza tempo al sonno, mantieni un riferimento quando possibile e concediti una transizione tranquilla. Una stima di cicli da 90 minuti può aiutarti a confrontare le opzioni, ma i cicli reali variano e non dovrebbero togliere spazio al tempo complessivo per dormire.',
          'Se spesso non riesci a mantenere degli orari perché il sonno non arriva, o se hai eccessiva sonnolenza diurna, forte russamento, risvegli con affanno o pause nella respirazione, rivolgiti a un professionista sanitario qualificato. Questa guida offre contenuti educativi sul benessere, non consigli medici.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/it', '/it/ora-di-andare-a-letto', '/it/quante-ore-dormire', '/it/tempo-per-addormentarsi'],
    updated: '2026-10-22',
  },
  {
    path: '/it/chi-siamo',
    locale: 'it',
    kind: 'legal',
    key: 'about',
    title: 'Chi siamo: SleepLike',
    description: 'Scopri chi pubblica SleepLike, a che cosa serve il calcolatore e come vengono curati i contenuti educativi.',
    heading: 'Chi siamo: SleepLike / Maat Work',
    intro: 'SleepLike è un piccolo progetto educativo sul benessere del team editoriale SleepLike / Maat Work.',
    sections: [
      {
        id: 'purpose',
        heading: 'Uno strumento semplice per organizzarti',
        paragraphs: [
          'SleepLike aiuta gli adulti a organizzare l’ora di andare a letto, la sveglia, un pisolino o il tempo disponibile per dormire con semplici calcoli eseguiti localmente. Non richiede un account né un microfono, e il calcolo principale è progettato per funzionare nel browser senza inviare gli orari del sonno a un server.',
          'Le stime usano convenzioni comuni per organizzare il sonno e ne spiegano i limiti. Il sonno varia da persona a persona e da una notte all’altra, quindi lo strumento serve a organizzare il riposo con finalità educative nell’ambito del benessere e non è un consiglio medico, un dispositivo medico o un modo per diagnosticare una condizione del sonno.',
        ],
        bullets: [
          'SleepLike / Maat Work è il nome editoriale istituzionale di questo progetto.',
          'Il calcolatore non misura le fasi del sonno e non prevede che cosa accadrà durante la notte.',
          'Le domande sui sintomi o sulle cure personali vanno rivolte a un professionista sanitario qualificato.',
        ],
      },
      {
        id: 'editorial-approach',
        heading: 'Come vengono curati i contenuti',
        paragraphs: [
          'Il team editoriale scrive spiegazioni pratiche a partire da fonti sanitarie primarie pubbliche, dichiara le ipotesi usate dal calcolatore e riporta una data di aggiornamento su ogni pagina. Le pagine sono scritte per l’educazione generale degli adulti: il team non si presenta come un gruppo di medici e non dichiara una revisione medica dei contenuti.',
          'Il progetto può cambiare quando cambiano il prodotto, le fonti o la configurazione della privacy. La pagina sulla metodologia spiega i calcoli e i limiti delle stime, così puoi decidere se un risultato è utile per la tua situazione.',
        ],
      },
      {
        id: 'contact',
        heading: 'Contatta il team',
        paragraphs: [
          'Per domande sul prodotto, sull’accessibilità, sulla privacy o sui contenuti, visita la pagina pubblica di contatto di MaatWork su https://maat.work. Non inviare una storia clinica dettagliata tramite un modulo di contatto generale del prodotto. Se hai un dubbio sul tuo sonno, rivolgiti a un professionista sanitario qualificato.',
        ],
      },
    ],
    sources: [contactSource, sleepSources[0]],
    related: ['/it/contatti', '/it/privacy', '/it/condizioni', '/it/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/it/contatti',
    locale: 'it',
    kind: 'legal',
    key: 'contact',
    title: 'Contatta SleepLike',
    description: 'Trova il canale pubblico di contatto di MaatWork per domande su SleepLike, privacy, accessibilità o contenuti.',
    heading: 'Contatta SleepLike',
    intro: 'Usa il canale pubblico di contatto di MaatWork per domande sul prodotto, sulla privacy, sull’accessibilità o sui contenuti.',
    sections: [
      {
        id: 'public-contact',
        heading: 'Dove scrivere',
        paragraphs: [
          'Il canale pubblico di contatto è https://maat.work. Il sito di MaatWork pubblica l’indirizzo email commerciale maatwork.comercial@gmail.com per le richieste generali. Usa il canale che preferisci e cita SleepLike per dare contesto alla domanda.',
          'SleepLike è uno strumento educativo per il benessere. Il team può ricevere domande sul sito, sui contenuti, sull’accessibilità o sulla configurazione della privacy, ma non fornisce consigli medici personalizzati né interpreta sintomi.',
        ],
      },
      {
        id: 'useful-context',
        heading: 'Che cosa ci aiuta a capire il problema',
        paragraphs: [
          'Per una domanda sul prodotto, includi il percorso della pagina, il browser, la lingua e una breve descrizione di ciò che ti aspettavi accadesse. Evita di inviare diari del sonno, cartelle cliniche o altre informazioni sulla tua storia sanitaria tramite un canale di contatto generale; per indicazioni personali sul sonno, rivolgiti a un professionista sanitario qualificato.',
          'Per una domanda sulla privacy, descrivi l’impostazione o la scelta di consenso a cui ti riferisci. La pagina sulla privacy spiega che cosa memorizza lo strumento locale e come vengono descritte le integrazioni facoltative di terze parti quando sono attive.',
        ],
      },
      {
        id: 'response-scope',
        heading: 'A che cosa serve questo canale',
        paragraphs: [
          'Questo canale serve per le domande sul servizio e sui suoi contenuti. Non è un servizio di emergenza. Se hai un problema urgente di salute o sicurezza, contatta il servizio sanitario o di emergenza locale appropriato.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/it/chi-siamo', '/it/privacy', '/it/condizioni', '/it/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/it/privacy',
    locale: 'it',
    kind: 'legal',
    key: 'privacy',
    title: 'Privacy di SleepLike',
    description: 'Scopri come SleepLike gestisce calcoli locali, preferenze del browser, statistiche facoltative, consenso e integrazioni pubblicitarie predisposte.',
    heading: 'La privacy su SleepLike',
    intro: 'Il calcolatore è progettato per l’uso locale, con preferenze limitate nel browser e scelte chiare sui servizi facoltativi.',
    sections: [
      {
        id: 'local-calculator',
        heading: 'Il calcolatore funziona localmente',
        paragraphs: [
          'Il calcolatore principale è progettato per funzionare nel tuo browser. Non richiede un account né un microfono e non è progettato per conservare su un server SleepLike una storia sanitaria, un diario del sonno, uno storico degli orari di andare a letto o dei risvegli, né i dati inseriti per il calcolo. Il risultato viene prodotto dai valori che inserisci e dalle informazioni dell’orologio locale necessarie al calcolo.',
          'Un browser può memorizzare preferenze limitate, come la lingua, il formato dell’ora o una scelta di consenso. Questa memoria del browser serve solo alle preferenze e alla gestione del consenso; non viene usata per conservare uno storico personale del sonno o informazioni sulla salute.',
        ],
      },
      {
        id: 'prepared-services',
        heading: 'Integrazioni predisposte e funzionamento',
        paragraphs: [
          'Un’integrazione di terze parti può essere predisposta nel codice senza essere attiva in ogni versione pubblicata del sito. Vercel Analytics è disponibile solo dopo il tuo consenso tramite il controllo Preferenze sulla privacy nel piè di pagina; quando è attivo, viene usato in forma aggregata per misurare l’attività in base ai percorsi delle pagine. Non è destinato a ricevere orari esatti di andare a letto, di sveglia o dei pisolini, né i valori inseriti nel calcolatore.',
          'La disponibilità e la configurazione dei servizi facoltativi possono cambiare da una versione pubblicata all’altra. Un servizio indicato qui come predisposto non va considerato una prova che sia attivo durante la tua visita; l’interfaccia del consenso e il comportamento di rete del browser sono gli indicatori pratici per quella sessione.',
        ],
      },
      {
        id: 'advertising-choice',
        heading: 'Pubblicità attiva solo a determinate condizioni',
        paragraphs: [
          'Se la pubblicità viene attivata, verrà caricata solo dopo che le relative integrazioni Google CMP e AdSense saranno attive e approvate. Gli annunci restano disattivati finché queste condizioni non sono soddisfatte. L’interfaccia del consenso è pensata per permetterti di accettare, rifiutare, revocare il consenso o cambiare la tua scelta. SleepLike richiede annunci non personalizzati solo dopo il tuo consenso. Questi annunci possono comunque usare cookie e trattare informazioni come il tuo indirizzo IP o i dettagli del dispositivo. Se rifiuti il consenso, il calcolatore rimane disponibile senza annunci.',
          'La pubblicità è facoltativa nella configurazione del prodotto e non è necessaria per il calcolo locale. Non è prevista la visualizzazione di annunci in questa pagina legale. Il testo descrive una possibile configurazione; non afferma che la pubblicità sia attiva nel momento in cui lo leggi.',
        ],
      },
      {
        id: 'choices-and-questions',
        heading: 'I tuoi controlli e le tue domande',
        paragraphs: [
          'Usa il controllo Preferenze sulla privacy nel piè di pagina per rifiutare o revocare una scelta precedente. Il browser può conservare la preferenza necessaria per ricordare quella decisione. Cancellare i dati del sito può rimuovere la preferenza e richiederti di scegliere di nuovo. Il sito non usa quella memoria per conservare una storia sanitaria.',
          'Per domande sulla privacy, visita https://maat.work oppure usa il contatto commerciale pubblico indicato nella pagina dei contatti. Questa pagina offre informazioni generali sul prodotto e non costituisce una promessa riguardo a un servizio disattivato nella versione del sito che stai usando.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/it/chi-siamo', '/it/contatti', '/it/condizioni', '/it/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/it/condizioni',
    locale: 'it',
    kind: 'legal',
    key: 'terms',
    title: 'Condizioni d’uso di SleepLike',
    description: 'Condizioni generali per usare SleepLike come strumento educativo per organizzare gli orari del sonno.',
    heading: 'Condizioni d’uso di SleepLike',
    intro: 'Queste condizioni generali descrivono l’uso previsto e i limiti del sito e del calcolatore SleepLike.',
    sections: [
      {
        id: 'educational-service',
        heading: 'Che cosa offre il servizio',
        paragraphs: [
          'SleepLike offre pagine educative statiche e un calcolatore locale per organizzare orari approssimativi del sonno e della sveglia. È destinato ad adulti che cercano informazioni generali sul benessere. Il servizio non fornisce consigli medici, diagnosi, trattamenti, assistenza di emergenza né una misurazione delle fasi del sonno.',
          'I calcoli usano ipotesi dichiarate, tra cui un intervallo approssimativo dei cicli e un margine per addormentarti. I risultati sono stime per organizzarti. Il sonno varia da persona a persona e da una notte all’altra, quindi resta tua la responsabilità di decidere se un orario suggerito si adatta alle tue circostanze.',
        ],
      },
      {
        id: 'use-and-changes',
        heading: 'Uso delle pagine',
        paragraphs: [
          'Usa le pagine per scopi informativi personali e leciti e non considerare una stima come una garanzia. Non usare il calcolatore come unica base per una decisione da cui dipende la sicurezza, soprattutto quando hai molta sonnolenza o devi guidare, usare macchinari o svolgere un’altra attività che richiede attenzione.',
          'Contenuti, calcoli, link e integrazioni facoltative possono essere aggiornati, rimossi o modificati con l’evoluzione del progetto. La data di aggiornamento di una pagina aiuta a identificare la versione dei contenuti educativi che leggi. I siti esterni hanno contenuti e pratiche propri.',
        ],
      },
      {
        id: 'health-and-contact',
        heading: 'Domande sulla salute e contatti',
        paragraphs: [
          'Se hai difficoltà persistenti a dormire, eccessiva sonnolenza diurna, forte russamento, risvegli con affanno, pause nella respirazione o un altro problema di salute, rivolgiti a un professionista sanitario qualificato. Per domande sul prodotto, sulla privacy, sull’accessibilità o sui contenuti, usa https://maat.work. Non inviare informazioni sanitarie sensibili tramite un canale di contatto generale del prodotto.',
          'Queste condizioni descrivono il servizio con un linguaggio semplice. Non aggiungono alcuna promessa che il calcolatore sia adatto a una determinata persona, a specifici orari, a una condizione di salute o a un risultato particolare.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/it/chi-siamo', '/it/contatti', '/it/privacy', '/it/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/it/metodologia',
    locale: 'it',
    kind: 'legal',
    key: 'methodology',
    title: 'Metodologia di SleepLike',
    description: 'Scopri le quattro modalità del calcolatore, le ipotesi, l’uso dell’ora locale, la gestione delle date e i limiti delle stime di SleepLike.',
    heading: 'Come funzionano le stime di SleepLike',
    intro: 'SleepLike usa calcoli trasparenti sugli orari per offrire quattro modalità di pianificazione; non prevede le fasi del sonno.',
    sections: [
      {
        id: 'four-modes',
        heading: 'Le quattro modalità di pianificazione',
        paragraphs: [
          'Ogni modalità risponde a una domanda diversa sugli orari. Lo strumento usa la data e l’ora locali disponibili nel browser e restituisce un piccolo insieme di stime facili da leggere. Il risultato è un aiuto per organizzarti, non una misurazione di un sensore né una valutazione clinica.',
        ],
        table: {
          headers: ['Modalità', 'Punto di partenza', 'Calcolo'],
          rows: [
            ['Sveglia', 'L’orario in cui vuoi svegliarti', 'Sottrae una durata stimata del sonno e il margine per addormentarti.'],
            ['Dormire ora', 'L’ora locale rilevata al momento del calcolo', 'Aggiunge il margine e uno o più intervalli approssimativi dei cicli.'],
            ['Pisolino', 'L’orario di inizio del pisolino', 'Aggiunge un’opzione breve di circa 20 minuti a letto oppure un’opzione più lunga di circa 90 minuti.'],
            ['Tempo disponibile', 'Un intervallo di tempo fisso a disposizione', 'Confronta il numero approssimativo di cicli che rientrano nel tempo disponibile.'],
          ],
        },
      },
      {
        id: 'arithmetic-assumptions',
        heading: 'Le ipotesi alla base dei calcoli',
        paragraphs: [
          'L’intervallo predefinito dei cicli è di 90 minuti. L’NHLBI descrive i cicli del sonno come sequenze che ricominciano all’incirca ogni 80–100 minuti, quindi 90 viene usato come comodo punto intermedio, non come durata biologica esatta. Il margine predefinito per addormentarti è di 15 minuti: un dato pratico per organizzarti che non rappresenta la tua latenza misurata.',
          'Come riferimento per gli adulti, le indicazioni dei CDC dicono che le persone tra 18 e 60 anni dovrebbero generalmente dormire almeno 7 ore al giorno. Il calcolatore non impone che ogni risultato corrisponda a un unico bisogno personale di sonno; mostra i conti per permetterti di preferire un’opzione che lasci abbastanza tempo per il tuo riposo.',
        ],
      },
      {
        id: 'dates-and-daylight',
        heading: 'Date, mezzanotte e cambi dell’ora',
        paragraphs: [
          'Quando una sottrazione attraversa la mezzanotte, cambia anche la data. Un risultato dopo le 00:00 appartiene al giorno di calendario successivo, mentre un risultato prima di mezzanotte appartiene al giorno precedente quando conti a ritroso da un obiettivo del mattino. L’orario mostrato usa il contesto dell’ora locale del browser.',
          'In prossimità del passaggio tra ora solare e ora legale, i calcoli sugli orari locali seguono le regole di data e ora fornite dal browser. Un intervallo misurato sull’orologio può apparire più breve o più lungo quando cambia l’ora. SleepLike non inventa un fuso orario, non converte silenziosamente il risultato in un altro luogo e non prevede le future fasi del sonno.',
        ],
      },
      {
        id: 'limits',
        heading: 'Che cosa non fa lo strumento',
        paragraphs: [
          'Il calcolatore non usa un microfono, un dispositivo indossabile, un account o un sensore del sonno. Non identifica sonno REM, sonno profondo, risvegli o disturbi e non promette che svegliarti a un orario mostrato ti farà sentire in un determinato modo. Stress, luce, malattie, sostanze, cambi di orario e la normale variabilità da una notte all’altra possono cambiare la tua esperienza.',
          'Se i problemi del sonno persistono o hai eccessiva sonnolenza diurna, forte russamento, risvegli con affanno o pause nella respirazione, rivolgiti a un professionista sanitario qualificato. Questa metodologia spiega un semplice calcolo educativo e non costituisce un consiglio medico.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/it/chi-siamo', '/it/privacy', '/it/condizioni', '/it/cicli-del-sonno'],
    updated: '2026-10-22',
  },
];
