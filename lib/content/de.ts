import type { ContentPage } from './pages';

const sleepSources = [
  {
    title: 'NHLBI · Schlafphasen und Schlafstadien',
    url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  },
  {
    title: 'NHLBI · Gesunde Schlafgewohnheiten',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits',
  },
  {
    title: 'CDC · Wissenswertes über Schlaf',
    url: 'https://www.cdc.gov/sleep/about/',
  },
];

const durationSource = {
  title: 'NHLBI · Wie viel Schlaf ist genug?',
  url: 'https://www.nhlbi.nih.gov/health/sleep/how-much-sleep',
};

const contactSource = {
  title: 'MaatWork · Öffentliche Website',
  url: 'https://maat.work',
};

export const dePages: ContentPage[] = [
  {
    path: '/de',
    locale: 'de',
    kind: 'tool',
    key: 'home',
    title: 'Schlafrechner: Plane deine Schlafenszeit',
    description: 'Wähle deine Aufstehzeit und vergleiche Bettzeiten. Passe Einschlafdauer und Zykluslänge an. Private, informative Planung, keine medizinische Beratung.',
    heading: 'Schlafrechner',
    intro: 'Gib an, wann du aufstehen musst, und wähle anhand der Schätzungen eine Schlafenszeit, die zu deinem Alltag passt.',
    mode: 'wake',
    sections: [
      {
        id: 'fixed-wake-time',
        heading: 'Beginne mit der Zeit, die feststeht',
        paragraphs: [
          'Eine feste Aufstehzeit gibt der Berechnung einen sinnvollen Ausgangspunkt. Das Tool rechnet von dieser Uhrzeit in ungefähren Schlafzyklen zurück und lässt einen kleinen Puffer zum Einschlafen. Du kannst das Ergebnis nutzen, um einen Arbeitstag, eine Reise oder einen Termin am Morgen zu planen.',
          'Wie lange hast du von 02:45 bis 07:33 Uhr geschlafen? Dazwischen liegen 4 Stunden und 48 Minuten. Wenn das deine Bettzeiten sind, ziehe die Wachzeit ab: Mit dem voreingestellten Einschlafpuffer von 15 Minuten und ohne nächtliches Erwachen bleiben geschätzte 4 Stunden und 33 Minuten Schlaf. Der Puffer ist eine Planungsannahme, keine Messung; der Rechner weiß nicht, wie lange du tatsächlich geschlafen hast.',
        ],
      },
      {
        id: 'seven-am-example',
        heading: 'Beispiel: Aufstehen um 07:00 Uhr',
        paragraphs: [
          'Das NHLBI empfiehlt Erwachsenen 7 bis 9 Stunden Schlaf pro Nacht. Plane zuerst genug Zeit zum Schlafen ein, bevor du versuchst, eine geschätzte Zyklusgrenze zu treffen.',
          'Diese Bettzeiten am Vorabend setzen 90-minütige Planungszyklen, einen Einschlafpuffer von 15 Minuten und eine Nacht ohne Zeitumstellung voraus. Diese Annahmen sind keine Messungen deiner Schlafstadien oder deiner Einschlafdauer.',
        ],
        table: {
          headers: ['Ins Bett gehen', 'Planungszyklen', 'Geschätzter Schlaf'],
          rows: [
            ['21:45', '6', '9 Stunden'],
            ['23:15', '5', '7 Stunden 30 Minuten'],
          ],
        },
      },
      {
        id: 'estimated-options',
        heading: 'Verstehe die Vorschläge als Spielraum',
        paragraphs: [
          'Schlafzyklen werden oft mit einer Dauer von etwa 90 Minuten beschrieben, doch die tatsächlichen Zyklen unterscheiden sich je nach Person und Nacht. Auch ein Ergebnis, das genau auf eine errechnete Zyklusgrenze fällt, kann sich von Nacht zu Nacht anders anfühlen. Die Vorschläge helfen dir, die verfügbare Zeit im Bett zu vergleichen; sie sagen nicht voraus, welche Schlafstadien du erleben wirst.',
          'Wähle vorrangig eine Möglichkeit, die genug Zeit zum Schlafen lässt und in dein Leben passt. Eine spätere Bettzeit kann an einem vollen Abend realistisch sein, während eine frühere mehr Spielraum schafft, wenn du früher zur Ruhe kommen kannst.',
        ],
        bullets: [
          'Nutze die früheren Vorschläge, wenn du dir eine längere Nacht freihalten kannst.',
          'Behalte möglichst dieselbe Aufstehzeit bei, damit deine Routine einen festen Anker hat.',
          'Wenn ein Vorschlag zu wenig Zeit zum Schlafen lässt, sieh ihn als Plan unter eingeschränkten Bedingungen und nicht als Ziel.',
        ],
      },
      {
        id: 'practical-use',
        heading: 'Mach aus einer Schätzung eine Routine',
        paragraphs: [
          'Wähle eine Schlafenszeit, die du regelmäßig einhalten kannst, und beginne schon vorher mit einem ruhigen Übergang. Dimme helles Licht, schließe anspruchsvolle Aufgaben ab und bereite den nächsten Morgen vor, damit sich der Vorschlag leichter umsetzen lässt. Ein Rechner kann die Uhrzeiten ordnen; entscheidend bleiben deine Routine und die Zeit, die dir zum Schlafen zur Verfügung steht.',
          'Diese Seite dient der allgemeinen Information und der Schlafplanung für dein Wohlbefinden. Schlaf ist unterschiedlich. Anhaltende Schlafprobleme, übermäßige Tagesschläfrigkeit, lautes Schnarchen, Luftschnappen oder Atempausen sind Gründe, mit einer qualifizierten medizinischen Fachperson zu sprechen.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/de/schlafenszeit', '/de/mittagsschlaf-rechner', '/de/schlafzyklen', '/de/wie-viel-schlaf'],
    updated: '2026-10-25',
  },
  {
    path: '/de/schlafenszeit',
    locale: 'de',
    kind: 'tool',
    key: 'bedtime',
    title: 'Schlafenszeit berechnen',
    description: 'Berechne mögliche Schlafenszeiten aus deiner gewünschten Aufstehzeit, mit einem ausdrücklich eingeplanten Puffer zum Einschlafen.',
    heading: 'Finde deine Schlafenszeit',
    intro: 'Wähle, wann du aufstehen musst, und vergleiche geschätzte Bettzeiten, die in deine Nacht passen.',
    mode: 'wake',
    sections: [
      {
        id: 'work-backward',
        heading: 'Rechne von deinem Morgen zurück',
        paragraphs: [
          'Wenn der Morgen feststeht, lässt sich die Schlafenszeit rückwärts planen. Dieser Rechner zieht mehrere ungefähre 90-Minuten-Zyklen ab und plant zusätzlich einen Puffer von 15 Minuten für die Zeit ein, die du zum Einschlafen brauchen könntest. Die angezeigte Uhrzeit meint den Zeitpunkt, zu dem du ins Bett gehst. Sie verspricht nicht, wann du tatsächlich einschläfst.',
          'Wenn du zum Beispiel um 07:00 Uhr aufstehst, ergeben fünf geschätzte Zyklen 7 Stunden und 30 Minuten Schlaf. Mit dem Planungspuffer liegt die vorgeschlagene Bettzeit bei etwa 23:15 Uhr. In einer anderen Nacht kann ein früherer Vorschlag sinnvoll sein, wenn du mehr Zeit im Bett brauchst.',
        ],
      },
      {
        id: 'choose-an-option',
        heading: 'Wähle eine Zeit, die du wirklich freihalten kannst',
        paragraphs: [
          'Das früheste Ergebnis ist nicht automatisch die richtige Wahl. Suche nach einer Uhrzeit, zu der du deine üblichen Abendaufgaben ohne Eile abschließen kannst und die dir trotzdem angemessen viel Zeit zum Schlafen lässt. Wenn deine Zeit ohnehin knapp ist, kann das Tool die Rechnung deutlich machen, aber aus einer kurzen Nacht keine volle machen.',
          'Schlafzyklen werden häufig mit etwa 90 Minuten beschrieben; das NHLBI weist darauf hin, dass ein neuer Zyklus alle 80 bis 100 Minuten beginnen kann. Wegen dieser Spannweite sind die Ergebnisse Schätzungen. Nutze die Uhrzeiten, um deinen Alltag zu organisieren, und achte dann darauf, wie dein Schlaf und deine Energie am Morgen darauf reagieren.',
        ],
        bullets: [
          'Wähle eher eine frühere Zeit, wenn sie passt, ohne deinen ruhigen Übergang vor dem Schlafen zu verkürzen.',
          'Behalte an den meisten Tagen dieselbe gewünschte Aufstehzeit bei, sofern dein Alltag das zulässt.',
          'Leg den Rechner beiseite, sobald du einen umsetzbaren Plan hast; ständiges Beobachten der Uhr kann Druck erzeugen.',
        ],
      },
      {
        id: 'before-bed',
        heading: 'Gestalte die letzte Stunde ruhiger',
        paragraphs: [
          'Nutze die Stunde vor dem Schlafengehen für weniger anregende Tätigkeiten: Packe eine Tasche, lege Kleidung bereit, dimme das Licht und verschiebe aufwendige Planungen auf morgen. Ein kühles, ruhiges und angenehmes Zimmer sowie weniger Unterbrechungen durch elektronische Geräte können den geplanten Übergang realistischer machen.',
          'Dieser Rechner ist eine Informationshilfe zur Schlafplanung und keine medizinische Beratung. Wenn Einschlafprobleme immer wieder auftreten oder dich Tagesschläfrigkeit, Schnarchen, Luftschnappen oder Atempausen beunruhigen, bitte eine qualifizierte medizinische Fachperson um Rat.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/de', '/de/mittagsschlaf-rechner', '/de/einschlafdauer', '/de/schlafrhythmus'],
    updated: '2026-10-22',
  },
  {
    path: '/de/mittagsschlaf-rechner',
    locale: 'de',
    kind: 'tool',
    key: 'nap',
    title: 'Mittagsschlaf-Rechner',
    description: 'Plane einen kurzen Mittagsschlaf oder einen geschätzten Schlafzyklus mit lokalen Berechnungen und klaren Hinweisen zu ihren Grenzen.',
    heading: 'Finde Zeit für einen Mittagsschlaf',
    intro: 'Wähle einen kurzen Mittagsschlaf oder einen geschätzten vollständigen Zyklus und behalte dabei auch deinen Nachmittag und Abend im Blick.',
    mode: 'nap',
    sections: [
      {
        id: 'two-nap-shapes',
        heading: 'Wähle die passende Form des Mittagsschlafs',
        paragraphs: [
          'Ein kurzer Mittagsschlaf bietet eine kleine Pause, ohne einen vollständigen Schlafzyklus einzuplanen. Die Variante für einen vollständigen Zyklus lässt mehr Zeit, braucht aber auch eine größere Lücke im Tagesablauf und kann dazu führen, dass du abends weniger bereit zum Schlafen bist. Der Rechner zeigt beide als Planungsmöglichkeiten und garantiert nicht, wie du dich nach dem Aufwachen fühlen wirst.',
          'Für Erwachsene nennt das NHLBI Nickerchen von höchstens 20 Minuten als eine Möglichkeit, wenn ein Mittagsschlaf hilfreich ist. Die kurze Option dieses Rechners umfasst 20 Minuten im Bett, nicht 20 Minuten gemessenen Schlaf. Wenn du dich für einen längeren Mittagsschlaf entscheidest, plane danach zusätzliche Zeit ein, um dich aufzusetzen, Wasser zu trinken und wieder in deine Aufgaben zu finden, bevor du Auto fährst oder etwas tust, das volle Aufmerksamkeit erfordert.',
        ],
      },
      {
        id: 'use-the-clock',
        heading: 'Rechne die Zeit rund um den Mittagsschlaf mit',
        paragraphs: [
          'Auch die Zeit zum Zur-Ruhe-Kommen zählt. Wenn du um 14:00 Uhr einen kurzen Mittagsschlaf mit 20 Minuten im Bett planst, halte insgesamt etwas mehr als diese 20 Minuten für den Übergang und das anschließende Wachwerden frei. Ein ruhiger, abgedunkelter und angenehmer Ort kann den Plan leichter umsetzbar machen; ein später Mittagsschlaf kann manchen Menschen das nächtliche Schlafen erschweren.',
          'Die Dauer ist nur ein Teil der Entscheidung. Überlege, wann du wieder aufmerksam sein musst, wie spät es schon ist und ob du mit Nickerchen ein Muster von zu wenig Nachtschlaf auszugleichen versuchst.',
        ],
        bullets: [
          'Wähle einen kurzen Mittagsschlaf, wenn du eine kleine Pause brauchst und abends deine übliche Schlafenszeit ansteht.',
          'Lass nach dem Aufwachen einen Puffer, bevor du Auto fährst, Sport treibst oder wichtige Entscheidungen triffst.',
          'Wenn Nickerchen wiederholt den Nachtschlaf ersetzen, überprüfe deinen Zeitplan und besprich anhaltende Probleme mit einer medizinischen Fachperson.',
        ],
      },
      {
        id: 'night-sleep-context',
        heading: 'Behalte den Nachtschlaf im Blick',
        paragraphs: [
          'Ein Mittagsschlaf kann in eine gesunde Routine passen, ersetzt aber nicht die regelmäßige Zeit zum Schlafen, die die meisten Erwachsenen brauchen. Laut CDC sollten Erwachsene von 18 bis 60 Jahren im Allgemeinen mindestens sieben Stunden pro Tag schlafen. Dein persönlicher Bedarf und deine Schlafqualität können davon abweichen; nutze das Ergebnis deshalb als einfache Hilfe für die Zeitplanung.',
          'Diese Seite dient ausschließlich der allgemeinen Information und der Schlafplanung für dein Wohlbefinden. Sie diagnostiziert und behandelt keine Schlafprobleme. Sprich mit einer qualifizierten medizinischen Fachperson, wenn du anhaltende Schlafschwierigkeiten, ungewöhnlich starke Tagesschläfrigkeit oder Atembeschwerden im Schlaf hast.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/de', '/de/schlafenszeit', '/de/schlafrhythmus', '/de/einschlafdauer'],
    updated: '2026-10-22',
  },
  {
    path: '/de/schlafzyklen',
    locale: 'de',
    kind: 'guide',
    key: 'cycles',
    title: 'Schlafzyklen: die 90-Minuten-Schätzung',
    description: 'Verstehe Schlafzyklen und die Grenzen der 90-Minuten-Schätzung, damit du deine Schlafenszeit planen kannst, ohne das Ergebnis als Versprechen zu sehen.',
    heading: 'Schlafzyklen folgen Mustern, keinem Timer',
    intro: 'Eine einfache Zyklusschätzung kann Schlafenszeit und Wecker ordnen, solange du normale Schwankungen berücksichtigst.',
    sections: [
      {
        id: 'cycle-basics',
        heading: 'Was ein Schlafzyklus beschreibt',
        paragraphs: [
          'Während einer Nacht durchlaufen Gehirn und Körper Non-REM- und REM-Phasen. Nach der Beschreibung des NHLBI beginnt der Zyklus ungefähr alle 80 bis 100 Minuten von vorn; vier bis sechs Zyklen pro Nacht sind häufig. Diese Zahlen beschreiben ein allgemeines Muster, das in Schlafstudien beobachtet wurde. Sie sind kein persönlicher Timer, der jede Nacht zur gleichen Minute klingelt.',
          'Das Verhältnis der Schlafstadien verändert sich im Laufe der Nacht. Tiefer Non-REM-Schlaf nimmt tendenziell am Anfang mehr Raum ein, während der REM-Anteil später meist größer wird. Das Aufwachen nahe einer geschätzten Zyklusgrenze kann sich anders anfühlen als mitten in einem Stadium. Eine Berechnung anhand der Uhr kann aber weder dein aktuelles Schlafstadium bestimmen noch ein bestimmtes Gefühl am Morgen garantieren.',
        ],
      },
      {
        id: 'stages-in-plain-language',
        heading: 'Die Schlafstadien einfach erklärt',
        paragraphs: [
          'Der Non-REM-Schlaf umfasst den Übergang in den Schlaf, ein Stadium, in dem du bereits schläfst, und den tieferen Schlaf mit langsamen Hirnwellen. Zum REM-Schlaf gehören eine hohe Gehirnaktivität, schnelle Augenbewegungen und eine vorübergehende Entspannung der Muskulatur. Die Stadien bilden eine wiederkehrende Abfolge, die sich jedoch zwischen Personen und von Nacht zu Nacht unterscheidet.',
        ],
        bullets: [
          'Stadium 1 ist der kurze Übergang vom Wachsein zum Schlafen.',
          'Stadium 2 ist ein stabiles Schlafstadium, das meist einen großen Teil der Nacht ausmacht.',
          'Stadium 3 ist der tiefere Schlaf mit langsamen Hirnwellen, der oft zu Beginn der Nacht häufiger vorkommt.',
          'REM ist eine eigene Phase, deren Anteil im späteren Verlauf der Nacht im Allgemeinen zunimmt.',
        ],
      },
      {
        id: 'ninety-minute-planning',
        heading: 'Warum Rechner 90 Minuten verwenden',
        paragraphs: [
          '90 Minuten sind ein gut handhabbarer Mittelwert für Berechnungen innerhalb der Spanne von 80 bis 100 Minuten. Diese Website nutzt ihn als praktischen Durchschnitt, damit das Ergebnis schnell verständlich ist. Verstehe ihn als Planungsintervall und nicht als Aussage über deinen genauen Schlafaufbau.',
          'Wenn du zum Beispiel um 07:00 Uhr aufstehen möchtest, ergibt das Abziehen von fünf 90-Minuten-Intervallen 23:30 Uhr als geschätzten Schlafbeginn. Ein zusätzlicher Puffer von 15 Minuten zum Einschlafen verschiebt die vorgeschlagene Bettzeit auf etwa 23:15 Uhr. Eine spätere Schlafenszeit kann sich in einer Nacht mit kürzeren oder längeren tatsächlichen Zyklen trotzdem anders auswirken.',
        ],
        table: {
          headers: ['Geschätzte Zyklen', 'Schlafdauer', 'Bei einer Aufstehzeit von 07:00 Uhr'],
          rows: [
            ['4', '6 Stunden', 'Um 00:45 Uhr ins Bett, mit 15 Minuten Puffer zum Einschlafen'],
            ['5', '7 Stunden 30 Minuten', 'Um 23:15 Uhr ins Bett, mit 15 Minuten Puffer zum Einschlafen'],
            ['6', '9 Stunden', 'Um 21:45 Uhr ins Bett, mit 15 Minuten Puffer zum Einschlafen'],
          ],
        },
      },
      {
        id: 'what-changes-the-estimate',
        heading: 'Was das Muster verändern kann',
        paragraphs: [
          'Der zeitliche Verlauf deines Schlafs hängt von mehr ab als einer berechneten Bettzeit. Dein Schlaf-Wach-Rhythmus, Licht, Stress, Krankheit, Alkohol, Koffein, Bewegung und Unterbrechungen können beeinflussen, wann du einschläfst und wie sich die Nacht anfühlt. Auch das Alter verändert die Zusammensetzung der Schlafstadien. Eine Zyklusschätzung kann nicht alle diese Faktoren berücksichtigen.',
          'Nutze die Zahl als unverbindliche Planungshilfe. Wenn das Ergebnis nicht zu der Zeit passt, die du brauchst, halte zuerst ausreichend Zeit zum Schlafen frei. Die Rechnung ist kein Grund, eine Nacht zu verkürzen, nur um ein glattes Vielfaches zu treffen.',
        ],
        bullets: [
          'Plane für deinen üblichen Schlafbedarf genug Zeit im Bett ein, einschließlich der Zeit zum Zur-Ruhe-Kommen.',
          'Beobachte über mehrere Tage, wie sich ein regelmäßiger Rhythmus anfühlt, statt einen einzelnen Weckzeitpunkt zu beurteilen.',
          'Sieh eine schwierige Nacht als Hinweis auf deine Routine und nicht als gescheiterte Berechnung.',
        ],
      },
      {
        id: 'use-the-guide',
        heading: 'So nutzt du diesen Ratgeber im Alltag',
        paragraphs: [
          'Beginne mit einer Aufstehzeit, die du beibehalten kannst, wähle eine geschätzte Bettzeit mit genügend Raum zum Schlafen und bereite dich mit einem ruhigen Übergang darauf vor. Höre dann auf zu rechnen und lass die Nacht ihren Lauf nehmen. Wenn du regelmäßig nicht schlafen kannst, tagsüber sehr schläfrig bist oder lautes Schnarchen, Luftschnappen oder Atempausen bemerkst, sprich mit einer qualifizierten medizinischen Fachperson. Dieser Ratgeber dient der allgemeinen Information und ist keine medizinische Beratung.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/de', '/de/schlafenszeit', '/de/wie-viel-schlaf', '/de/einschlafdauer'],
    updated: '2026-10-22',
  },
  {
    path: '/de/wie-viel-schlaf',
    locale: 'de',
    kind: 'guide',
    key: 'duration',
    title: 'Wie viel Schlaf brauchen Erwachsene?',
    description: 'Ein praktischer Ratgeber zu Schlafdauer und Schlafqualität bei Erwachsenen und zu einem Rhythmus, der genug Zeit zum Ausruhen lässt.',
    heading: 'Wie viel Schlaf solltest du als erwachsene Person einplanen?',
    intro: 'Plane zunächst genug Zeit zum Schlafen ein und passe den Plan dann anhand deiner Energie, deines Alltags und deiner Schlafqualität an.',
    sections: [
      {
        id: 'adult-range',
        heading: 'Nutze die Empfehlung als Ausgangspunkt',
        paragraphs: [
          'Laut CDC sollten Erwachsene von 18 bis 60 Jahren im Allgemeinen mindestens 7 Stunden pro Tag schlafen. Das NHLBI nennt häufig 7 bis 9 Stunden als Spanne für Erwachsene. Diese Zahlen sind Empfehlungen für die Bevölkerung und kein Wert, den du jede Nacht genau treffen musst. Persönlicher Bedarf, Gesundheit, Alter, Alltag und Schlafqualität unterscheiden sich.',
          'Die hilfreiche Frage lautet nicht nur: „Wann sollte ich ins Bett gehen?“, sondern auch: „Wie viel Zeit kann ich zum Schlafen freihalten, bevor mein Tag beginnt?“ Wenn du um 06:30 Uhr aufstehst und acht Stunden schlafen möchtest, ist ein Schlafbeginn um 22:30 Uhr der rechnerische Ausgangspunkt. Wenn du normalerweise 15 Minuten zum Einschlafen brauchst, lässt eine Bettzeit gegen 22:15 Uhr etwas Spielraum.',
        ],
        table: {
          headers: ['Altersgruppe', 'Allgemeiner Richtwert', 'Hinweis zur Planung'],
          rows: [
            ['18–60 Jahre', 'Mindestens 7 Stunden', 'Halte regelmäßig Zeit zum Schlafen frei und achte darauf, wie du im Alltag zurechtkommst.'],
            ['61–64 Jahre', '7–9 Stunden', 'Eine Spanne kann helfen, wenn sich Bedürfnisse und Routinen mit dem Alter ändern.'],
            ['Ab 65 Jahren', '7–8 Stunden', 'Nutze die Spanne zur Orientierung und nicht als persönliche Diagnose.'],
          ],
        },
      },
      {
        id: 'duration-and-quality',
        heading: 'Die Stunden zählen, die Qualität aber auch',
        paragraphs: [
          'Sieben Stunden im Bett sind nicht immer sieben Stunden Schlaf. Wiederholtes Aufwachen, eine lange Einschlafdauer oder nicht erholtes Aufwachen können die nutzbare Erholung in der Nacht verringern. Die CDC beschreibt guten Schlaf als ununterbrochen und erholsam. Neben einem Ziel für die Schlafdauer ist deshalb auch wichtig, wie die Nacht tatsächlich verlaufen ist.',
          'Ein Rechner kann ein Zeitfenster anzeigen, aber keine Schlafqualität messen. Achte über mehrere Tage auf Muster: Bettzeit, Aufstehzeit, nächtliches Aufwachen, Nickerchen, Koffein, Alkohol, Bewegung und darauf, wie wach du dich fühlst. Eine kurze Notiz kann zeigen, ob zu wenig verfügbare Schlafzeit, ein unregelmäßiger Rhythmus oder ein wiederkehrendes Schlafproblem dahintersteckt, das fachliche Aufmerksamkeit verdient.',
        ],
        bullets: [
          'Halte zuerst eine regelmäßige Aufstehzeit ein, bevor du ein paar Minuten der berechneten Bettzeit optimierst.',
          'Gestalte dein Schlafzimmer ruhig, angenehm und kühl genug, damit du zur Ruhe kommen kannst.',
          'Reduziere helle Bildschirme und anspruchsvolle Aufgaben im letzten Teil des Abends.',
        ],
      },
      {
        id: 'example-week',
        heading: 'Übertrage die Rechnung auf eine echte Woche',
        paragraphs: [
          'Angenommen, dein Wecker klingelt unter der Woche um 06:45 Uhr. Bei geplanten 7 Stunden und 30 Minuten Schlaf liegt der geschätzte Schlafbeginn bei 23:15 Uhr. Wenn du etwa 15 Minuten zum Einschlafen brauchst, beginne gegen 23:00 Uhr mit der Vorbereitung auf den Schlaf. Nach einem späten Abend kannst du an manchen Nächten eine frühere Bettzeit wählen; halte den morgendlichen Anker dabei realistisch.',
          'Am Wochenende liegt es nahe, den ganzen Rhythmus zu verschieben. Eine kleine Änderung lässt sich möglicherweise leichter auffangen als ein großer Sprung. Sowohl NHLBI als auch CDC betonen regelmäßige Zeiten als hilfreiche Schlafgewohnheit. Nutze die Tabelle zum Abgleich mit deinem Kalender und nicht als Regel, die über Arbeit, Sorgeaufgaben, Reisen oder deinem Befinden steht.',
        ],
        table: {
          headers: ['Ziel', 'Beispielzeit', 'Wozu es dient'],
          rows: [
            ['Aufstehen', '06:45 Uhr', 'Gibt dem Morgen einen festen Anker und erleichtert die Berechnung der Bettzeit.'],
            ['Ins Bett gehen', '23:00 Uhr', 'Lässt einen kurzen Puffer zum Einschlafen vor dem geplanten Schlafbeginn.'],
            ['Verfügbare Zeit zum Schlafen', '7 Stunden 45 Minuten', 'Schließt den 15-Minuten-Puffer ein, statt ihn als Schlaf zu zählen.'],
          ],
        },
      },
      {
        id: 'when-to-ask',
        heading: 'Erkenne, wann ein Rechner nicht ausreicht',
        paragraphs: [
          'Anhaltende Einschlafprobleme, wiederholtes Aufwachen, starke Tagesschläfrigkeit, lautes Schnarchen, Luftschnappen oder Atempausen sollten von einer qualifizierten medizinischen Fachperson beurteilt werden. Ein Schlaftagebuch kann dir helfen, das Muster zu beschreiben: Notiere, wann du ins Bett gehst und aufstehst, Nickerchen, Bewegung, Koffein oder Alkohol, Medikamente und wie ausgeruht du dich fühlst.',
          'Dieser Ratgeber enthält allgemeine Informationen zu Schlaf und Wohlbefinden. Er diagnostiziert oder behandelt keine Erkrankung, und mehr Stunden sind nicht für jede Person automatisch besser. Nutze die Empfehlungen für Erwachsene als Ausgangspunkt, entwickle eine umsetzbare Routine und hole dir individuelle Unterstützung, wenn das Muster deinen Alltag weiterhin beeinträchtigt.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/de', '/de/schlafzyklen', '/de/schlafrhythmus', '/de/einschlafdauer'],
    updated: '2026-10-22',
  },
  {
    path: '/de/einschlafdauer',
    locale: 'de',
    kind: 'guide',
    key: 'latency',
    title: 'Wie lange dauert das Einschlafen?',
    description: 'Verstehe die Einschlafdauer, plane einen einfachen Zeitpuffer ein und erkenne, wann wiederholte Schwierigkeiten fachliche Hilfe verdienen.',
    heading: 'Plane die Zeit zwischen Bett und Schlaf ein',
    intro: 'Das Einschlafen gehört zur Nacht. Plane diesen Übergang mit ein, statt die Bettzeit wie einen sofortigen Schalter zu behandeln.',
    sections: [
      {
        id: 'latency-definition',
        heading: 'Die Einschlafdauer beschreibt einen normalen Übergang',
        paragraphs: [
          'Die Einschlafdauer, auch Schlaflatenz genannt, ist die Zeit zwischen dem Versuch zu schlafen und dem tatsächlichen Einschlafen. Sie verändert sich von Nacht zu Nacht. Nach einem anstrengenden Tag schläfst du vielleicht schnell ein, mit vielen Gedanken im Kopf brauchst du länger, oder du liegst länger wach, wenn dein Rhythmus durcheinandergeraten ist. Eine einzelne Schätzung kann dir nicht sagen, ob etwas nicht stimmt.',
          'Für die Planung verwendet dieser Rechner standardmäßig einen Puffer von 15 Minuten. Diese Zahl hält die Rechnung einfach und gibt dem Vorschlag für die Bettzeit etwas Spielraum. Sie ist weder Ziel noch Versprechen noch Messung aus einer Schlafstudie. Wenn dein persönliches Muster anders aussieht, nimm das Ergebnis als Erinnerung, früher mit deiner Routine zu beginnen oder mehr Zeit im Bett einzuplanen.',
        ],
      },
      {
        id: 'simple-arithmetic',
        heading: 'Sieh, was der Puffer verändert',
        paragraphs: [
          'Angenommen, du möchtest gegen 23:00 Uhr eingeschlafen sein. Wenn du häufig 15 Minuten zum Einschlafen brauchst, gibt eine Bettzeit um 22:45 Uhr der Rechnung einen angemessenen Puffer. Bei einer geplanten Schlafdauer von 7 Stunden 30 Minuten und einer Aufstehzeit um 07:00 Uhr ergibt dieselbe Rechnung für fünf geschätzte Zyklen eine Bettzeit um 23:15 Uhr: 07:00 Uhr minus 7 Stunden 30 Minuten minus 15 Minuten.',
          'Das Ergebnis hilft, zwei Fragen auseinanderzuhalten: wie lange du schlafen möchtest und wie viel Zeit du für den Übergang in den Schlaf brauchst. Diese Trennung kann den Druck verringern, sofort einschlafen zu müssen, sobald dein Kopf das Kissen berührt.',
        ],
        table: {
          headers: ['Geplanter Schlafbeginn', 'Puffer', 'Ins Bett gehen'],
          rows: [
            ['22:30 Uhr', '15 Minuten', '22:15 Uhr'],
            ['23:00 Uhr', '30 Minuten', '22:30 Uhr'],
            ['23:15 Uhr', '15 Minuten', '23:00 Uhr'],
          ],
        },
      },
      {
        id: 'reduce-friction',
        heading: 'Mach den Übergang weniger anstrengend',
        paragraphs: [
          'Vereinfache den letzten Teil des Abends: Erledige praktische Aufgaben, dimme helles Licht, lege das Handy weg, wenn es dich wach hält, und halte das Zimmer ruhig und angenehm. Eine wiederholbare Reihenfolge ist wichtiger als eine komplizierte Routine. Versuche, aus der Uhr keinen Test zu machen, den du bestehen oder nicht bestehen kannst.',
          'Koffein, Nikotin, Alkohol, späte schwere Mahlzeiten, intensiver Sport kurz vor dem Schlafengehen, Stress und ein unregelmäßiger Rhythmus können beeinflussen, wie sich der Übergang anfühlt. Du musst nicht alles auf einmal ändern. Wähle eine kleine Anpassung, wiederhole sie mehrere Nächte lang und beobachte das Muster, statt ein einzelnes Ergebnis zu beurteilen.',
        ],
        bullets: [
          'Beginne vor der berechneten Bettzeit damit, zur Ruhe zu kommen.',
          'Notiere Bettzeit, Aufstehzeit, Nickerchen und alles, was den Abend verändert haben könnte.',
          'Wenn du wach liegst und zunehmend frustriert bist, beschäftige dich ruhig, bis du wieder schläfrig wirst.',
        ],
      },
      {
        id: 'persistent-difficulty',
        heading: 'Wenn wiederholte Schwierigkeiten ein Gespräch erfordern',
        paragraphs: [
          'Wenn Einschlafprobleme anhalten, dich tagsüber beeinträchtigen oder mit wiederholtem Aufwachen, übermäßiger Schläfrigkeit, lautem Schnarchen, Luftschnappen oder Atempausen einhergehen, bitte eine qualifizierte medizinische Fachperson um eine Einschätzung. Ein Schlaftagebuch kann diesem Gespräch nützliche Einzelheiten geben, ohne dass du einen Tracker oder ein Mikrofon brauchst.',
          'Dieser Ratgeber enthält allgemeine Informationen zu Schlaf und Wohlbefinden und ist keine medizinische Beratung. Der Rechner kann Zeit für den Übergang einplanen, aber keine Schlafstörung diagnostizieren oder eine individuelle Betreuung ersetzen. Dein Ziel ist dauerhaft ausreichend Gelegenheit zum Schlafen und keine perfekt getroffene Zahl.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/de/schlafenszeit', '/de', '/de/schlafrhythmus', '/de/wie-viel-schlaf'],
    updated: '2026-10-22',
  },
  {
    path: '/de/schlafrhythmus',
    locale: 'de',
    kind: 'guide',
    key: 'schedule',
    title: 'Einen regelmäßigen Schlafrhythmus finden',
    description: 'Entwickle einen alltagstauglichen Schlafrhythmus mit fester Aufstehzeit, ausreichend Zeit zum Schlafen und Spielraum für das echte Leben.',
    heading: 'Finde einen Schlafrhythmus, den du beibehalten kannst',
    intro: 'Ein fester Anker und ausreichend Zeit zum Schlafen sind ein tragfähigerer Anfang als eine perfekt berechnete Bettzeit.',
    sections: [
      {
        id: 'choose-anchor',
        heading: 'Lege zuerst den morgendlichen Anker fest',
        paragraphs: [
          'Beginne mit der Zeit, zu der du an den meisten Tagen aufstehen musst. Rechne von dort zurück, um mindestens die für dein Alter und deine Umstände empfohlene Schlafdauer freizuhalten. Für Erwachsene von 18 bis 60 Jahren empfiehlt die CDC mindestens 7 Stunden pro Tag. Auch das NHLBI betont, dass es hilfreich ist, jeden Tag zur gleichen Zeit ins Bett zu gehen und aufzustehen.',
          'Eine feste Aufstehzeit macht den restlichen Plan sichtbar. Wenn dein Wecker um 06:30 Uhr klingelt und du 8 Stunden schlafen möchtest, plane den Schlafbeginn gegen 22:30 Uhr. Wenn du normalerweise 15 Minuten zum Einschlafen brauchst, geh gegen 22:15 Uhr ins Bett. Dieser zusätzliche Übergang gehört in den Zeitplan, auch wenn er nicht als Schlaf zählt.',
        ],
      },
      {
        id: 'weekly-example',
        heading: 'Mach die Woche konkret',
        paragraphs: [
          'Schreibe deinen Plan neben die Verpflichtungen, die deinen Abend bestimmen. Es geht darum zu erkennen, ob die vorgeschlagene Bettzeit realistisch ist, und nicht darum, einen weiteren Grund für das Gefühl zu schaffen, hinterherzuhinken. Wenn ein später Termin oder eine Sorgeaufgabe eine Nacht verändert, kehre zum festen Anker zurück, sobald es möglich ist, und passe den nächsten Abend an, ohne mit komplizierten Rechnungen einen Ausgleich erzwingen zu wollen.',
          'Kleine Unterschiede zwischen Werktagen und Wochenende lassen sich möglicherweise leichter handhaben als eine große Verschiebung. Das NHLBI empfiehlt, den Unterschied möglichst auf etwa eine Stunde zu begrenzen. Arbeit, Familie, Reisen und Gesundheit können ein anderes Muster erfordern; nutze die Tabelle als Planungsbeispiel und nicht als starren Zeitplan.',
        ],
        table: {
          headers: ['Tag', 'Geplante Aufstehzeit', 'Ins Bett gehen', 'Verfügbare Zeit zum Schlafen'],
          rows: [
            ['Montag–Donnerstag', '06:30 Uhr', '22:15 Uhr', '8 Stunden 15 Minuten einschließlich Einschlafpuffer'],
            ['Freitag', '06:30 Uhr', '22:30 Uhr', '8 Stunden'],
            ['Samstag', '07:15 Uhr', '23:00 Uhr', '8 Stunden'],
            ['Sonntag', '06:30 Uhr', '22:15 Uhr', '8 Stunden 15 Minuten einschließlich Einschlafpuffer'],
          ],
        },
      },
      {
        id: 'support-the-evening',
        heading: 'Mach den Rhythmus leichter umsetzbar',
        paragraphs: [
          'Nutze die letzte Stunde für vertraute, weniger anregende Aufgaben. Lege Kleidung oder Essen bereit, reduziere helles Licht und halte das Schlafzimmer ruhig, kühl und angenehm. Die CDC empfiehlt außerdem, vor dem Schlafengehen auf große Mahlzeiten und Alkohol zu verzichten und Koffein am Nachmittag oder Abend zu begrenzen. Wähle Veränderungen, die in dein Leben passen, statt eine lange Liste zu übernehmen, die du wieder aufgibst.',
          'Ein Rhythmus lässt sich leichter einhalten, wenn auch der Morgen dazu passt. Bewege dich tagsüber regelmäßig und verbringe nach Möglichkeit Zeit draußen. Halte die Aufstehzeit in deinem Kalender sichtbar und nutze einen Wecker oder eine Erinnerung, für die du kein Konto brauchst. Die Berechnung kann eine Richtung vorgeben; durch Wiederholung wird daraus eine Routine.',
        ],
        bullets: [
          'Halte zuerst ausreichend Zeit zum Schlafen frei, bevor du den Plan kürzt, um mehr Aufgaben unterzubringen.',
          'Behalte an den meisten Abenden eine kurze Abfolge zum Zur-Ruhe-Kommen in derselben Reihenfolge bei.',
          'Betrachte das Muster nach mehreren Tagen, statt es nach einer einzigen schwierigen Nacht zu ändern.',
        ],
      },
      {
        id: 'adapt-without-chasing',
        heading: 'Passe dich an, ohne einer perfekten Zahl nachzujagen',
        paragraphs: [
          'Reisen, Zeitumstellungen, Schichtarbeit, Krankheit, Stress und Verabredungen können den Rhythmus verschieben. Nutze auch dann dieselben Grundsätze: Halte ausreichend Zeit zum Schlafen frei, behalte möglichst einen festen Anker und gönne dir einen ruhigen Übergang. Eine Schätzung mit 90-Minuten-Zyklen kann beim Vergleichen helfen. Tatsächliche Zyklen variieren jedoch und sollten nicht wichtiger sein als ausreichend verfügbare Schlafzeit.',
          'Wenn du regelmäßig keinen Rhythmus einhalten kannst, weil du nicht einschläfst, oder wenn du übermäßige Tagesschläfrigkeit, lautes Schnarchen, Luftschnappen oder Atempausen hast, sprich mit einer qualifizierten medizinischen Fachperson. Dieser Ratgeber enthält allgemeine Informationen zu Schlaf und Wohlbefinden und ist keine medizinische Beratung.',
        ],
      },
      {
        id: 'night-shift',
        heading: 'Nachtschichten und wechselnde Schichten',
        paragraphs: [
          'Wenn du nachts oder in wechselnden Schichten arbeitest, ist der oben gezeigte Tagesablauf keine persönliche Vorgabe. Die NIOSH-Schulung für Pflegekräfte empfiehlt, nach der Heimkehr Zeit zum Schlafen freizuhalten, statt Hausarbeit zu erledigen, und das Schlafzimmer dunkel, ruhig und frei von Störungen zu halten. Bitte die Menschen, mit denen du zusammenlebst, diese Ruhezeit zu respektieren.',
          'Der Rechner vergleicht nur Uhrzeiten: Er kann weder deinen zirkadianen Rhythmus anpassen noch Wachheit garantieren. Fahre nicht, wenn du schläfrig bist. Wenn Schläfrigkeit deine Sicherheit bei der Arbeit oder am Steuer beeinträchtigt, lass dich ärztlich und betriebsärztlich zu deiner Situation beraten. Diese Informationen dienen der Aufklärung und sind keine individuelle medizinische Beratung.',
        ],
      },
    ],
    sources: [...sleepSources, {
      title: 'CDC/NIOSH · Schlaf nach Nachtschichten (Archiv; abgerufen am 22.10.2026)',
      url: 'https://archive.cdc.gov/www_cdc_gov/niosh/work-hour-training-for-nurses/longhours/mod9/05.html',
    }],
    related: ['/de', '/de/schlafenszeit', '/de/wie-viel-schlaf', '/de/einschlafdauer'],
    updated: '2026-10-22',
  },
  {
    path: '/de/ueber-uns',
    locale: 'de',
    kind: 'legal',
    key: 'about',
    title: 'Über SleepLike',
    description: 'Erfahre, wer SleepLike veröffentlicht, wofür der Schlafrechner gedacht ist und wie die Informationsinhalte gepflegt werden.',
    heading: 'Über SleepLike / Maat Work',
    intro: 'SleepLike ist ein kleines Informationsprojekt zu Schlaf und Wohlbefinden des Redaktionsteams SleepLike / Maat Work.',
    sections: [
      {
        id: 'purpose',
        heading: 'Ein einfaches Planungstool',
        paragraphs: [
          'SleepLike hilft Erwachsenen, mit einfachen lokalen Berechnungen eine Bettzeit, eine Aufstehzeit, einen Mittagsschlaf oder ein verfügbares Schlaffenster zu planen. Ein Konto oder Mikrofon ist dafür nicht nötig. Die Kernberechnung ist so angelegt, dass sie im Browser funktioniert, ohne Schlafzeiten an einen Server zu senden.',
          'Die Schätzungen beruhen auf gängigen Annahmen zur Schlafplanung und erläutern deren Grenzen. Schlaf unterscheidet sich je nach Person und Nacht. Das Tool dient deshalb der allgemeinen Information und der Planung für dein Wohlbefinden; es ist weder medizinische Beratung noch ein Medizinprodukt oder eine Möglichkeit, eine Schlafstörung zu diagnostizieren.',
        ],
        bullets: [
          'SleepLike / Maat Work ist die institutionelle Bezeichnung der Redaktion dieses Projekts.',
          'Der Rechner misst keine Schlafstadien und sagt nicht voraus, was während einer Nacht geschieht.',
          'Fragen zu Symptomen oder zur persönlichen Versorgung gehören zu einer qualifizierten medizinischen Fachperson.',
        ],
      },
      {
        id: 'editorial-approach',
        heading: 'So werden die Inhalte gepflegt',
        paragraphs: [
          'Das Redaktionsteam erstellt praktische Erläuterungen auf Grundlage öffentlicher primärer Gesundheitsquellen, nennt die Annahmen des Rechners und vermerkt auf jeder Seite ein Aktualisierungsdatum. Die Seiten richten sich an Erwachsene und dienen der allgemeinen Information. Das Team stellt sich nicht als medizinisches Fachpersonal dar und behauptet keine medizinische Prüfung der Inhalte.',
          'Das Projekt kann sich verändern, wenn sich das Produkt, die Quellen oder die Datenschutzeinstellungen ändern. Die Methodikseite erläutert die Rechnung und die Grenzen der Schätzungen, damit du entscheiden kannst, ob ein Ergebnis für deine Situation hilfreich ist.',
        ],
      },
      {
        id: 'contact',
        heading: 'Kontaktiere das Team',
        paragraphs: [
          'Bei Fragen zum Produkt, zur Barrierefreiheit, zum Datenschutz oder zu den Inhalten besuche die öffentliche MaatWork-Kontaktseite unter https://maat.work. Bitte sende keine ausführliche Krankengeschichte über ein allgemeines Produktkontaktformular. Wenn du eine Frage zu deinem Schlaf hast, wende dich an eine qualifizierte medizinische Fachperson.',
        ],
      },
    ],
    sources: [contactSource, sleepSources[0]],
    related: ['/de/kontakt', '/de/datenschutz', '/de/nutzungsbedingungen', '/de/methodik'],
    updated: '2026-10-22',
  },
  {
    path: '/de/kontakt',
    locale: 'de',
    kind: 'legal',
    key: 'contact',
    title: 'SleepLike kontaktieren',
    description: 'Hier findest du den öffentlichen MaatWork-Kontakt für Fragen zu SleepLike, Datenschutz, Barrierefreiheit und Inhalten.',
    heading: 'SleepLike kontaktieren',
    intro: 'Nutze den öffentlichen MaatWork-Kontakt für Fragen zum Produkt, zum Datenschutz, zur Barrierefreiheit oder zu den Inhalten.',
    sections: [
      {
        id: 'public-contact',
        heading: 'So erreichst du uns',
        paragraphs: [
          'Die öffentliche Kontaktmöglichkeit findest du unter https://maat.work. Die MaatWork-Website veröffentlicht die geschäftliche E-Mail-Adresse maatwork.comercial@gmail.com für allgemeine Anfragen. Wähle den Weg, der für dich am einfachsten ist, und erwähne SleepLike, damit wir deine Frage zuordnen können.',
          'SleepLike ist ein Informationstool zur Schlafplanung und zum Wohlbefinden. Das Team nimmt Fragen zur Website, zu Inhalten, Barrierefreiheit und Datenschutzeinstellungen entgegen, bietet aber keine individuelle medizinische Beratung und deutet keine Symptome.',
        ],
      },
      {
        id: 'useful-context',
        heading: 'Was uns bei der Untersuchung hilft',
        paragraphs: [
          'Nenne bei einer Produktfrage den Seitenpfad, den Browser, die Sprache und beschreibe kurz, was du erwartet hast. Sende über einen allgemeinen Kontaktkanal keine Schlaftagebücher, Krankenakten oder andere Angaben zu deiner Krankengeschichte. Eine qualifizierte medizinische Fachperson ist die richtige Anlaufstelle für persönliche Beratung zu deinem Schlaf.',
          'Beschreibe bei einer Datenschutzfrage, um welche Einstellung oder Einwilligungsentscheidung es geht. Die Datenschutzseite erklärt, was das lokale Tool speichert und wie optionale Dienste Dritter beschrieben werden, wenn sie aktiviert sind.',
        ],
      },
      {
        id: 'response-scope',
        heading: 'Wofür dieser Kontakt gedacht ist',
        paragraphs: [
          'Dieser Kanal ist für Fragen zum Angebot und seinen Inhalten gedacht. Er ist kein Notfalldienst. Wende dich bei dringenden Gesundheits- oder Sicherheitsproblemen an den zuständigen örtlichen Notfall- oder Gesundheitsdienst.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/de/ueber-uns', '/de/datenschutz', '/de/nutzungsbedingungen', '/de/methodik'],
    updated: '2026-10-22',
  },
  {
    path: '/de/datenschutz',
    locale: 'de',
    kind: 'legal',
    key: 'privacy',
    title: 'Datenschutz bei SleepLike',
    description: 'So geht SleepLike mit lokalen Berechnungen, Browsereinstellungen, optionaler Analyse, Einwilligungen und vorbereiteten Werbeintegrationen um.',
    heading: 'Datenschutz bei SleepLike',
    intro: 'Der Rechner ist auf lokale Nutzung, wenige Browsereinstellungen und klare Entscheidungen über optionale Dienste ausgelegt.',
    sections: [
      {
        id: 'local-calculator',
        heading: 'Der Rechner läuft lokal',
        paragraphs: [
          'Die Kernberechnung ist für die Ausführung in deinem Browser ausgelegt. Sie erfordert weder ein Konto noch ein Mikrofon und ist nicht dafür vorgesehen, eine Krankengeschichte, ein Schlaftagebuch, einen Verlauf von Bett- oder Aufstehzeiten oder Berechnungseingaben auf einem SleepLike-Server zu speichern. Das Ergebnis wird aus deinen Eingaben und den für die Berechnung nötigen lokalen Zeitinformationen erzeugt.',
          'Ein Browser kann wenige Einstellungen speichern, etwa die Sprache, das Zeitformat oder eine Einwilligungsentscheidung. Dieser Browserspeicher dient ausschließlich den Einstellungen und der Verwaltung von Einwilligungen. Er wird nicht genutzt, um einen persönlichen Verlauf von Schlaf- oder Gesundheitsinformationen aufzubewahren.',
        ],
      },
      {
        id: 'prepared-services',
        heading: 'Vorbereitete Integrationen und ihr Betrieb',
        paragraphs: [
          'Die Integration eines Drittanbieters kann im Code vorbereitet sein, ohne in jeder bereitgestellten Version aktiviert zu sein. Vercel Analytics ist erst verfügbar, nachdem du über die Datenschutzeinstellungen in der Fußzeile eingewilligt hast. Wenn der Dienst aktiviert ist, wird er in zusammengefasster Form zur Erfassung der Aktivität auf Seitenpfaden genutzt. Er ist nicht dafür vorgesehen, genaue Bettzeiten, genaue Aufstehzeiten, Mittagsschlafzeiten oder die im Rechner eingegebenen Werte zu erhalten.',
          'Verfügbarkeit und Konfiguration optionaler Dienste können je nach bereitgestellter Version variieren. Wenn ein Dienst hier als vorbereitet genannt wird, ist das kein Beleg dafür, dass er bei deinem Besuch aktiv ist. Die Einwilligungsoberfläche und das Netzwerkverhalten des Browsers sind die praktischen Anhaltspunkte für diese Sitzung.',
        ],
      },
      {
        id: 'advertising-choice',
        heading: 'Werbung unter bestimmten Voraussetzungen',
        paragraphs: [
          'Wenn Werbung aktiviert wird, wird sie erst geladen, nachdem die entsprechenden Integrationen von Google CMP und AdSense aktiviert und genehmigt sind. Bis diese Voraussetzungen erfüllt sind, bleibt Werbung ausgeschaltet. Die Einwilligungsoberfläche soll es dir ermöglichen, zuzustimmen, abzulehnen, zu widersprechen oder deine Entscheidung zu ändern. SleepLike fordert erst nach deiner Einwilligung nicht personalisierte Werbung an. Auch diese Werbung kann Cookies verwenden und Informationen wie deine IP-Adresse oder Gerätedaten verarbeiten. Wenn du nicht einwilligst, bleibt der Rechner ohne Werbung verfügbar.',
          'Werbung ist ein optionaler Bestandteil der Produktkonfiguration und für die lokale Berechnung nicht erforderlich. Auf dieser rechtlichen Informationsseite ist keine Werbung vorgesehen. Der Text beschreibt eine mögliche Konfiguration und sagt nicht aus, dass beim Lesen dieser Seite Werbung aktiv ist.',
        ],
      },
      {
        id: 'choices-and-questions',
        heading: 'Deine Einstellungen und Fragen',
        paragraphs: [
          'Nutze die Datenschutzeinstellungen in der Fußzeile, um eine Nutzung abzulehnen oder eine frühere Entscheidung zu widerrufen. Dein Browser kann die Einstellung speichern, die nötig ist, um sich diese Entscheidung zu merken. Wenn du Websitedaten löschst, kann diese Einstellung verloren gehen und eine erneute Entscheidung erforderlich werden. Die Website nutzt diesen Speicher nicht für eine Krankengeschichte.',
          'Besuche bei Datenschutzfragen https://maat.work oder nutze den auf der Kontaktseite angegebenen öffentlichen Geschäftskontakt. Diese Seite enthält allgemeine Produktinformationen und ist kein Versprechen über einen Dienst, der in der von dir genutzten Version deaktiviert ist.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/de/ueber-uns', '/de/kontakt', '/de/nutzungsbedingungen', '/de/methodik'],
    updated: '2026-10-22',
  },
  {
    path: '/de/nutzungsbedingungen',
    locale: 'de',
    kind: 'legal',
    key: 'terms',
    title: 'Nutzungsbedingungen von SleepLike',
    description: 'Allgemeine Bedingungen für die Nutzung von SleepLike als Informationstool zur Schlafplanung.',
    heading: 'Bedingungen für die Nutzung von SleepLike',
    intro: 'Diese allgemeinen Bedingungen beschreiben den vorgesehenen Einsatz und die Grenzen der SleepLike-Website und ihres Rechners.',
    sections: [
      {
        id: 'educational-service',
        heading: 'Was das Angebot bereitstellt',
        paragraphs: [
          'SleepLike bietet statische Informationsseiten und einen lokalen Rechner zur Planung ungefährer Schlaf- und Aufstehzeiten. Das Angebot richtet sich an Erwachsene, die allgemeine Informationen zu ihrem Wohlbefinden suchen. Es bietet weder medizinische Beratung, Diagnose, Behandlung oder Notfallhilfe noch eine Messung von Schlafstadien.',
          'Die Berechnungen verwenden ausdrücklich genannte Annahmen, darunter eine ungefähre Zyklusdauer und einen Puffer zum Einschlafen. Die Ergebnisse sind Schätzungen für die Planung. Schlaf unterscheidet sich je nach Person und Nacht; du entscheidest deshalb selbstverantwortlich, ob eine vorgeschlagene Zeit zu deinen Umständen passt.',
        ],
      },
      {
        id: 'use-and-changes',
        heading: 'Die Seiten nutzen',
        paragraphs: [
          'Nutze die Seiten zu rechtmäßigen, persönlichen Informationszwecken und behandle eine Schätzung nicht als Garantie. Verwende den Rechner nicht als alleinige Grundlage für eine sicherheitskritische Entscheidung, besonders wenn du sehr schläfrig bist oder Auto fahren, Geräte bedienen oder andere Aufgaben ausführen musst, die Aufmerksamkeit erfordern.',
          'Inhalte, Berechnungen, Links und optionale Integrationen können im Laufe der Projektentwicklung aktualisiert, entfernt oder geändert werden. Das Aktualisierungsdatum einer Seite hilft dir, die gelesene Version der Informationstexte einzuordnen. Externe Websites haben eigene Inhalte und Vorgehensweisen.',
        ],
      },
      {
        id: 'health-and-contact',
        heading: 'Gesundheitsfragen und Kontakt',
        paragraphs: [
          'Sprich mit einer qualifizierten medizinischen Fachperson, wenn du anhaltende Schlafprobleme, übermäßige Tagesschläfrigkeit, lautes Schnarchen, Luftschnappen, Atempausen oder andere gesundheitliche Anliegen hast. Nutze https://maat.work für Fragen zum Produkt, zum Datenschutz, zur Barrierefreiheit oder zu den Inhalten. Sende keine sensiblen Angaben zu deiner Krankengeschichte über einen allgemeinen Produktkontakt.',
          'Diese Bedingungen beschreiben das Angebot in verständlicher Sprache. Sie enthalten kein zusätzliches Versprechen, dass der Rechner für eine bestimmte Person, einen Zeitplan, einen Gesundheitszustand oder ein gewünschtes Ergebnis geeignet ist.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/de/ueber-uns', '/de/kontakt', '/de/datenschutz', '/de/methodik'],
    updated: '2026-10-22',
  },
  {
    path: '/de/methodik',
    locale: 'de',
    kind: 'legal',
    key: 'methodology',
    title: 'Methodik von SleepLike',
    description: 'Erfahre, wie die vier Rechnermodi, Rechenannahmen, Ortszeiten und Datumswechsel funktionieren und wo die Grenzen der Schätzungen liegen.',
    heading: 'So funktionieren die Schätzungen von SleepLike',
    intro: 'SleepLike nutzt nachvollziehbare Zeitberechnungen für vier Planungsmodi und sagt keine Schlafstadien voraus.',
    sections: [
      {
        id: 'four-modes',
        heading: 'Die vier Planungsmodi',
        paragraphs: [
          'Jeder Modus beantwortet eine andere Frage zur Zeitplanung. Das Tool verwendet das im Browser verfügbare lokale Datum und die Ortszeit und liefert eine kleine Auswahl verständlicher Schätzungen. Das Ergebnis ist eine Planungshilfe und keine Sensormessung oder klinische Beurteilung.',
        ],
        table: {
          headers: ['Modus', 'Ausgangspunkt', 'Berechnung'],
          rows: [
            ['Aufstehen', 'Eine gewünschte Aufstehzeit', 'Geschätzte Schlafdauer und Puffer zum Einschlafen abziehen.'],
            ['Jetzt schlafen', 'Eine Momentaufnahme der aktuellen Ortszeit', 'Den Puffer und ein oder mehrere ungefähre Zyklusintervalle addieren.'],
            ['Mittagsschlaf', 'Eine Startzeit für den Mittagsschlaf', 'Eine kurze Option mit 20 Minuten im Bett oder eine längere Option mit ungefähr 90 Minuten pro geschätztem Zyklus addieren.'],
            ['Zeitfenster', 'Ein festes verfügbares Zeitintervall', 'Vergleichen, wie viele ungefähre Schlafzyklen in die verfügbare Zeit passen.'],
          ],
        },
      },
      {
        id: 'arithmetic-assumptions',
        heading: 'Die Annahmen hinter der Rechnung',
        paragraphs: [
          'Die voreingestellte Zyklusdauer beträgt 90 Minuten. Das NHLBI beschreibt, dass Schlafzyklen ungefähr alle 80 bis 100 Minuten neu beginnen. Daher werden 90 Minuten als praktischer Mittelwert und nicht als genaue biologische Dauer verwendet. Der voreingestellte Puffer zum Einschlafen beträgt 15 Minuten. Das ist ein praktischer Planungswert und keine Messung deiner Einschlafdauer.',
          'Zur Einordnung für Erwachsene: Laut CDC sollten Erwachsene von 18 bis 60 Jahren im Allgemeinen mindestens 7 Stunden pro Tag schlafen. Der Rechner zwingt nicht jedes Ergebnis in einen bestimmten persönlichen Schlafbedarf. Er zeigt die Rechnung, damit du eine Möglichkeit bevorzugen kannst, die genug Zeit für deine eigene Erholung lässt.',
        ],
      },
      {
        id: 'dates-and-daylight',
        heading: 'Datum, Mitternacht und Zeitumstellung',
        paragraphs: [
          'Wenn die Rückrechnung über Mitternacht hinausgeht, ändert sich auch das Datum. Ein Ergebnis nach 00:00 Uhr gehört zum nächsten Kalenderdatum; beim Zurückrechnen von einer morgendlichen Zielzeit liegt ein Ergebnis vor Mitternacht auf dem vorherigen Datum. Die angezeigte Uhrzeit verwendet den lokalen Zeitkontext des Browsers.',
          'Bei einer Umstellung zwischen Sommer- und Winterzeit richtet sich die lokale Zeitberechnung nach den Datums- und Zeitregeln des Browsers. Ein Intervall auf der Uhr kann bei einer Zeitumstellung kürzer oder länger erscheinen. SleepLike erfindet keine Zeitzone, rechnet das Ergebnis nicht stillschweigend auf einen anderen Ort um und sagt keine zukünftigen Schlafstadien voraus.',
        ],
      },
      {
        id: 'limits',
        heading: 'Was das Tool nicht leistet',
        paragraphs: [
          'Der Rechner verwendet weder Mikrofon noch Wearable, Konto oder Schlafsensor. Er erkennt keinen REM-Schlaf, Tiefschlaf, nächtliches Aufwachen oder eine Erkrankung und verspricht nicht, dass sich das Aufwachen zu einer angezeigten Zeit auf eine bestimmte Weise anfühlt. Stress, Licht, Krankheit, Substanzen, Änderungen des Tagesablaufs und normale Schwankungen von Nacht zu Nacht können verändern, was du tatsächlich erlebst.',
          'Sprich mit einer qualifizierten medizinischen Fachperson, wenn Schlafprobleme anhalten oder du übermäßige Tagesschläfrigkeit, lautes Schnarchen, Luftschnappen oder Atempausen hast. Diese Methodik erläutert eine einfache Berechnung zur allgemeinen Information und ist keine medizinische Beratung.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/de/ueber-uns', '/de/datenschutz', '/de/nutzungsbedingungen', '/de/schlafzyklen'],
    updated: '2026-10-22',
  },
];
