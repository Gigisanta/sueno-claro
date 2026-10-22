import type { ContentPage } from './pages';

const sleepSources = [
  {
    title: 'NHLBI · Phases et stades du sommeil',
    url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  },
  {
    title: 'NHLBI · De bonnes habitudes de sommeil',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits',
  },
  {
    title: 'CDC · Comprendre le sommeil',
    url: 'https://www.cdc.gov/sleep/about/',
  },
];

const durationSource = {
  title: 'NHLBI · Quelle durée de sommeil est suffisante ?',
  url: 'https://www.nhlbi.nih.gov/health/sleep/how-much-sleep',
};

const contactSource = {
  title: 'MaatWork · Site public',
  url: 'https://maat.work',
};

export const frPages: ContentPage[] = [
  {
    path: '/fr',
    locale: 'fr',
    kind: 'tool',
    key: 'home',
    title: 'Calculateur de sommeil : planifie ton coucher',
    description: 'Choisis ton réveil et compare les heures de coucher. Ajuste le temps d’endormissement et les cycles. Outil privé et éducatif, sans conseil médical.',
    heading: 'Calculateur de cycles de sommeil',
    intro: 'Indique l’heure à laquelle tu dois te réveiller et utilise les estimations pour choisir une heure de coucher réaliste.',
    mode: 'wake',
    sections: [
      {
        id: 'fixed-wake-time',
        heading: 'Commence par l’heure que tu ne peux pas déplacer',
        paragraphs: [
          'Une heure de réveil fixe donne un point de repère utile au calcul. L’outil remonte le temps à partir de cette heure par cycles de sommeil approximatifs, en laissant une petite marge pour t’endormir. Tu peux utiliser le résultat pour préparer une journée de travail, un voyage ou un rendez-vous matinal.',
          'Combien as-tu dormi entre 02:45 et 07:33 ? L’intervalle est de 4 heures 48 minutes. S’il s’agit de ton temps au lit, retire le temps passé éveillé : avec la marge par défaut de 15 minutes pour t’endormir et sans réveil nocturne, cela donne environ 4 heures 33 minutes de sommeil. Cette marge est une convention de calcul, pas une mesure ; le calculateur ne sait pas combien tu as réellement dormi.',
        ],
      },
      {
        id: 'estimated-options',
        heading: 'Considère les options comme une plage de possibilités',
        paragraphs: [
          'On décrit souvent les cycles du sommeil comme durant environ 90 minutes, mais les cycles réels varient selon la personne et la nuit. Même un résultat qui tombe exactement sur une fin de cycle estimée peut donner une sensation différente d’une nuit à l’autre. Les options t’aident à comparer le temps disponible au lit ; elles ne prédisent pas les stades de sommeil que tu traverseras.',
          'Privilégie une option qui te laisse suffisamment de temps pour dormir et qui convient à ton quotidien. Un coucher plus tardif peut être réaliste lors d’une soirée chargée, tandis qu’un coucher plus tôt laisse davantage de marge quand tu peux commencer à ralentir plus tôt.',
        ],
        bullets: [
          'Quand tu peux préserver une nuit plus longue, privilégie les options qui prévoient un coucher plus tôt.',
          'Garde la même heure de réveil quand c’est possible pour donner un repère stable à ta routine.',
          'Si une option te laisse trop peu de temps pour dormir, considère-la comme une solution sous contrainte plutôt que comme un objectif.',
        ],
      },
      {
        id: 'practical-use',
        heading: 'Transforme une estimation en routine',
        paragraphs: [
          'Choisis une heure du coucher que tu peux garder, puis prévois une transition calme avant celle-ci. Réduis la lumière vive, termine les tâches exigeantes et prépare le lendemain matin pour rendre l’estimation plus facile à suivre. Un calculateur peut organiser les horaires ; ta routine et le temps que tu réserves au sommeil restent essentiels.',
          'Cette page sert à organiser ton repos dans un but éducatif de bien-être. Le sommeil varie, et des difficultés persistantes pour dormir, une somnolence excessive en journée, de forts ronflements, des reprises de souffle ou des pauses respiratoires justifient d’en parler à un professionnel de santé qualifié.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/fr/heure-du-coucher', '/fr/calculateur-de-sieste', '/fr/cycles-du-sommeil', '/fr/combien-d-heures-dormir'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/heure-du-coucher',
    locale: 'fr',
    kind: 'tool',
    key: 'bedtime',
    title: 'Calculer son heure du coucher',
    description: 'Estime ton heure du coucher à partir de l’heure de réveil souhaitée, avec une marge clairement prévue pour t’endormir.',
    heading: 'Trouve ton heure du coucher',
    intro: 'Choisis l’heure à laquelle tu dois te lever, puis compare les heures du coucher estimées qui conviennent à ta nuit.',
    mode: 'wake',
    sections: [
      {
        id: 'work-backward',
        heading: 'Remonte le temps à partir de ton réveil',
        paragraphs: [
          'Quand l’heure du matin est fixée, tu peux déterminer le coucher en remontant le temps. Ce calculateur retranche plusieurs cycles approximatifs de 90 minutes et prévoit aussi une marge de 15 minutes pour le temps que tu pourrais mettre à t’endormir. L’heure affichée indique quand te mettre au lit ; elle ne promet pas l’instant auquel tu dormiras.',
          'Par exemple, avec un réveil à 07:00, cinq cycles estimés représentent 7 heures 30 minutes de sommeil. En tenant compte de la marge prévue, l’heure de mise au lit proposée est vers 23:15. Une autre nuit peut justifier une option plus tôt si tu as besoin de davantage de temps au lit.',
        ],
      },
      {
        id: 'choose-an-option',
        heading: 'Choisis l’horaire que tu peux vraiment préserver',
        paragraphs: [
          'Le résultat le plus tôt n’est pas automatiquement le bon choix. Cherche un horaire qui te permette de terminer les tâches habituelles du soir sans te presser et qui laisse encore une durée raisonnable pour dormir. Si tu manques déjà de temps, l’outil peut rendre le calcul plus clair, mais il ne peut pas transformer une nuit courte en nuit complète.',
          'On parle couramment de cycles du sommeil d’environ 90 minutes, tandis que le NHLBI indique que les cycles peuvent recommencer toutes les 80 à 100 minutes. C’est cette plage qui explique le caractère estimatif des résultats. Utilise les horaires pour t’organiser, puis observe comment ton sommeil et ton énergie du matin évoluent.',
        ],
        bullets: [
          'Privilégie une option plus tôt si elle convient sans empiéter sur ton temps de détente.',
          'Garde la même heure de réveil la plupart des jours si ton emploi du temps le permet.',
          'Une fois que tu as un programme réaliste, laisse le calculateur de côté ; surveiller l’heure peut ajouter de la pression.',
        ],
      },
      {
        id: 'before-bed',
        heading: 'Allège la dernière heure de la soirée',
        paragraphs: [
          'Consacre l’heure avant le coucher à des tâches moins stimulantes : prépare un sac, sors tes vêtements, baisse la lumière et remets les grandes décisions au lendemain. Une chambre fraîche, calme et confortable, avec moins d’interruptions des appareils électroniques, peut rendre la transition prévue plus réaliste.',
          'Ce calculateur est un outil éducatif de bien-être, pas un avis médical. Si les difficultés d’endormissement se répètent, ou si une somnolence en journée, des ronflements, des reprises de souffle ou des pauses respiratoires t’inquiètent, demande conseil à un professionnel de santé qualifié.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/fr', '/fr/calculateur-de-sieste', '/fr/temps-d-endormissement', '/fr/horaires-de-sommeil'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/calculateur-de-sieste',
    locale: 'fr',
    kind: 'tool',
    key: 'nap',
    title: 'Calculateur de sieste',
    description: 'Prévois une sieste courte ou d’un cycle complet avec des estimations locales simples et des précautions claires sur les cycles du sommeil.',
    heading: 'Fais une place à la sieste',
    intro: 'Choisis une sieste courte ou d’un cycle complet, puis utilise l’estimation pour préserver ton après-midi et ta soirée.',
    mode: 'nap',
    sections: [
      {
        id: 'two-nap-shapes',
        heading: 'Choisis le type de sieste',
        paragraphs: [
          'Une sieste courte offre une petite pause sans prévoir un cycle de sommeil complet. L’option d’un cycle complet laisse davantage de temps, mais elle demande aussi un créneau plus large dans ta journée et peut réduire ton envie de dormir à l’heure du coucher. Le calculateur présente ces deux possibilités comme des choix d’horaires, sans garantir comment tu te sentiras au réveil. L’option courte correspond à 20 minutes au lit, pas à 20 minutes de sommeil mesurées.',
          'Pour les adultes, le NHLBI présente les siestes de 20 minutes maximum comme une possibilité lorsqu’une sieste est utile. Si tu choisis une sieste plus longue, laisse ensuite du temps pour te redresser, boire de l’eau et reprendre tes activités avant de conduire ou de faire quelque chose qui demande toute ton attention.',
        ],
      },
      {
        id: 'use-the-clock',
        heading: 'Compte aussi le temps autour de la sieste',
        paragraphs: [
          'Le temps nécessaire pour t’installer compte aussi. Si tu prévois une sieste courte de 20 minutes au lit à 14:00, réserve un peu plus de 20 minutes au total pour la préparation et le réveil. Un endroit calme, peu éclairé et confortable peut rendre ce programme plus facile à suivre, tandis qu’une sieste tardive peut compliquer le sommeil nocturne chez certaines personnes.',
          'La durée de la sieste n’est qu’un élément de la décision. Pense à l’heure à laquelle tu devras de nouveau être alerte, au moment de la journée et au fait que tu utilises peut-être les siestes pour compenser des nuits régulièrement trop courtes.',
        ],
        bullets: [
          'Choisis une sieste courte quand tu as besoin d’une brève pause et que tu prévois de te coucher à ton heure habituelle.',
          'Laisse une marge après le réveil avant de conduire, de faire de l’exercice ou de prendre des décisions importantes.',
          'Si les siestes remplacent régulièrement le sommeil nocturne, revois tes horaires et parle des difficultés persistantes à un professionnel.',
        ],
      },
      {
        id: 'night-sleep-context',
        heading: 'Garde le sommeil nocturne en tête',
        paragraphs: [
          'Une sieste peut s’intégrer à une routine saine, mais elle ne remplace pas le temps de sommeil régulier dont la plupart des adultes ont besoin. Les recommandations du CDC indiquent que les adultes de 18 à 60 ans devraient généralement dormir au moins sept heures par jour. Tes besoins et la qualité de ton sommeil peuvent différer ; utilise donc le résultat comme un moyen simple d’organiser tes horaires.',
          'Cette page sert uniquement à organiser ton repos dans un but éducatif de bien-être. Elle ne permet ni de diagnostiquer ni de traiter un trouble du sommeil. Consulte un professionnel de santé qualifié en cas de difficultés persistantes pour dormir, de somnolence inhabituellement forte en journée ou de symptômes respiratoires pendant le sommeil.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/fr', '/fr/heure-du-coucher', '/fr/horaires-de-sommeil', '/fr/temps-d-endormissement'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/cycles-du-sommeil',
    locale: 'fr',
    kind: 'guide',
    key: 'cycles',
    title: 'Cycles du sommeil : pourquoi 90 minutes ?',
    description: 'Comprends les cycles du sommeil, pourquoi 90 minutes reste une estimation et comment organiser tes horaires sans en faire une promesse.',
    heading: 'Les cycles du sommeil ne sont pas des minuteries',
    intro: 'Une estimation simple des cycles peut aider à organiser un coucher ou un réveil, à condition de tenir compte des variations normales.',
    sections: [
      {
        id: 'cycle-basics',
        heading: 'Ce que décrit un cycle de sommeil',
        paragraphs: [
          'Pendant une nuit de sommeil, le cerveau et le corps passent par des phases de sommeil non paradoxal et paradoxal, aussi appelées non-REM et REM. Le NHLBI décrit un cycle qui recommence environ toutes les 80 à 100 minutes, avec généralement quatre à six cycles par nuit. Ces chiffres décrivent une tendance générale observée dans les études du sommeil ; ce ne sont pas les réglages d’une minuterie personnelle qui sonnerait à la même minute chaque nuit.',
          'La répartition des stades évolue au cours de la nuit. Le sommeil profond non paradoxal tend à occuper davantage la première partie, tandis que le sommeil paradoxal prend généralement une place plus importante ensuite. Se réveiller près d’une fin de cycle estimée peut donner une sensation différente d’un réveil au milieu d’un stade, mais un calcul horaire ne peut ni déterminer le stade où tu te trouves ni garantir une sensation particulière au matin.',
        ],
      },
      {
        id: 'stages-in-plain-language',
        heading: 'Les stades expliqués simplement',
        paragraphs: [
          'Le sommeil non paradoxal comprend la transition vers le sommeil, un stade où tu dors déjà et le sommeil profond à ondes lentes. Le sommeil paradoxal associe une activité cérébrale intense, des mouvements oculaires rapides et un relâchement musculaire temporaire. Ces stades forment une séquence qui se répète, mais elle n’est pas identique d’une personne ou d’une nuit à l’autre.',
        ],
        bullets: [
          'Le stade 1 est la courte transition entre l’éveil et le sommeil.',
          'Le stade 2 est un stade de sommeil stable qui occupe habituellement une grande partie de la nuit.',
          'Le stade 3 est le sommeil profond à ondes lentes, souvent plus présent en début de nuit.',
          'Le sommeil paradoxal, ou REM, est une phase distincte généralement plus présente en fin de nuit.',
        ],
      },
      {
        id: 'ninety-minute-planning',
        heading: 'Pourquoi les calculateurs utilisent 90 minutes',
        paragraphs: [
          'Quatre-vingt-dix minutes est un point médian pratique pour effectuer les calculs dans la plage plus large de 80 à 100 minutes. Ce site l’utilise comme une moyenne pratique afin de rendre les résultats rapides à comprendre. Il vaut mieux y voir un intervalle pour organiser tes horaires qu’une affirmation sur l’architecture exacte de ton sommeil.',
          'Par exemple, si tu souhaites te réveiller à 07:00, retrancher cinq intervalles de 90 minutes donne 23:30 comme début de sommeil estimé. Prévoir une marge de 15 minutes pour t’installer avance l’heure de mise au lit proposée à environ 23:15. Un coucher plus tardif peut tout de même donner un résultat différent lors d’une nuit où tes cycles réels sont plus courts ou plus longs.',
        ],
        table: {
          headers: ['Cycles estimés', 'Durée de sommeil', 'Pour un réveil à 07:00'],
          rows: [
            ['4', '6 heures', 'Au lit à 00:45 avec une marge de 15 minutes pour s’endormir'],
            ['5', '7 heures 30 minutes', 'Au lit à 23:15 avec une marge de 15 minutes pour s’endormir'],
            ['6', '9 heures', 'Au lit à 21:45 avec une marge de 15 minutes pour s’endormir'],
          ],
        },
      },
      {
        id: 'what-changes-the-estimate',
        heading: 'Ce qui peut modifier le déroulement de la nuit',
        paragraphs: [
          'Les horaires du sommeil dépendent de bien plus qu’un calcul de coucher. Tes heures de coucher et de réveil, l’exposition à la lumière, le stress, la maladie, l’alcool, la caféine, l’exercice et les interruptions peuvent tous influencer ton endormissement et la manière dont se passe ta nuit. L’âge modifie aussi la répartition des stades. Une estimation des cycles ne peut pas tenir compte de chacun de ces facteurs.',
          'Utilise ce chiffre comme un repère souple. Si le résultat ne laisse pas la durée dont tu as besoin, préserve d’abord un créneau de sommeil plus long. Le calcul ne justifie pas de raccourcir une nuit pour obtenir un multiple bien rond.',
        ],
        bullets: [
          'Réserve assez de temps au lit pour ton besoin habituel de sommeil, en incluant le temps nécessaire pour te détendre.',
          'Observe l’effet d’horaires réguliers sur plusieurs jours plutôt que de juger un seul réveil.',
          'Considère une nuit difficile comme une information sur ta routine, pas comme un calcul raté.',
        ],
      },
      {
        id: 'use-the-guide',
        heading: 'Une façon pratique d’utiliser ce guide',
        paragraphs: [
          'Pars d’une heure de réveil que tu peux garder, choisis une heure du coucher estimée qui te laisse assez de temps pour dormir et prépare-la avec une transition calme. Ensuite, arrête de calculer et laisse la nuit se dérouler. Si tu n’arrives régulièrement pas à dormir, si tu ressens une forte somnolence en journée ou si tu remarques de forts ronflements, des reprises de souffle ou des pauses respiratoires, consulte un professionnel de santé qualifié. Ce guide éducatif ne constitue pas un avis médical.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/fr', '/fr/heure-du-coucher', '/fr/combien-d-heures-dormir', '/fr/temps-d-endormissement'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/combien-d-heures-dormir',
    locale: 'fr',
    kind: 'guide',
    key: 'duration',
    title: 'Combien d’heures de sommeil pour un adulte ?',
    description: 'Un guide pratique sur la durée du sommeil adulte, sa qualité et le choix d’horaires qui te laissent suffisamment de temps pour te reposer.',
    heading: 'Combien d’heures de sommeil prévoir à l’âge adulte ?',
    intro: 'Commence par réserver assez de temps pour dormir, puis affine ton programme selon ton énergie, tes contraintes et la qualité de ton sommeil.',
    sections: [
      {
        id: 'adult-range',
        heading: 'Prends les recommandations comme point de départ',
        paragraphs: [
          'Les recommandations du CDC indiquent que les adultes de 18 à 60 ans devraient généralement dormir 7 heures ou plus par jour. Le NHLBI présente couramment une plage de 7 à 9 heures pour les adultes. Ces chiffres sont des repères pour la population, pas un score à atteindre parfaitement chaque nuit. Les besoins individuels, la santé, l’âge, les horaires et la qualité du sommeil varient.',
          'La question utile n’est pas seulement « À quelle heure dois-je me coucher ? », mais aussi « Combien de temps puis-je réserver au sommeil avant de commencer ma journée ? ». Si tu te réveilles à 06:30 et souhaites dormir huit heures, le point de départ du calcul est un début de sommeil à 22:30. Si tu as habituellement besoin de 15 minutes pour t’endormir, te mettre au lit vers 22:15 laisse un peu de marge.',
        ],
        table: {
          headers: ['Groupe d’adultes', 'Repère général', 'À retenir pour tes horaires'],
          rows: [
            ['18–60 ans', '7 heures ou plus', 'Réserve régulièrement du temps pour dormir et observe comment tu te sens dans la journée.'],
            ['61–64 ans', '7–9 heures', 'Une plage peut être utile lorsque les besoins et les habitudes évoluent avec l’âge.'],
            ['65 ans et plus', '7–8 heures', 'Utilise cette plage comme un repère, pas comme un diagnostic personnel.'],
          ],
        },
      },
      {
        id: 'duration-and-quality',
        heading: 'La durée compte, et la qualité aussi',
        paragraphs: [
          'Sept heures au lit ne correspondent pas toujours à sept heures de sommeil. Des réveils répétés, un endormissement long ou un réveil sans sensation de repos peuvent réduire le repos utile de la nuit. Le CDC décrit un sommeil de qualité comme ininterrompu et réparateur ; un objectif de durée doit donc s’accompagner de questions sur le déroulement réel de la nuit.',
          'Un calculateur peut montrer un créneau, mais il ne peut pas mesurer la qualité du sommeil. Observe les tendances sur plusieurs jours : heure du coucher, heure de réveil, réveils nocturnes, siestes, caféine, alcool, exercice et niveau de vigilance ressenti. Quelques notes peuvent faire apparaître un manque de temps pour dormir, des horaires irréguliers ou un problème récurrent qui mérite un avis professionnel.',
        ],
        bullets: [
          'Préserve une heure de réveil régulière avant de chercher à gagner quelques minutes dans le calcul du coucher.',
          'Garde une chambre calme, confortable et assez fraîche pour te détendre.',
          'Réduis les écrans lumineux et les tâches exigeantes en fin de soirée.',
        ],
      },
      {
        id: 'example-week',
        heading: 'Intègre le calcul à une vraie semaine',
        paragraphs: [
          'Imaginons que ton réveil sonne à 06:45 en semaine. Prévoir 7 heures 30 minutes de sommeil donne un début de sommeil estimé à 23:15. Si tu mets environ 15 minutes à t’endormir, commence à te préparer vers 23:00. Tu peux choisir de te mettre au lit plus tôt les soirs où tu récupères d’une soirée tardive, tout en gardant un repère matinal réaliste.',
          'Le week-end peut donner envie de décaler tous les horaires. Un petit changement peut être plus facile à absorber qu’un grand décalage. Le NHLBI et le CDC soulignent tous deux l’intérêt d’horaires réguliers comme habitude de sommeil. Utilise le tableau pour réfléchir avec ton calendrier, pas comme une règle qui l’emporte sur ton travail, l’aide à un proche, les voyages ou ton ressenti.',
        ],
        table: {
          headers: ['Objectif', 'Horaire d’exemple', 'Son intérêt'],
          rows: [
            ['Réveil', '06:45', 'Donne un repère au matin et facilite le calcul du coucher.'],
            ['Mise au lit', '23:00', 'Laisse une courte marge d’endormissement avant le début de sommeil prévu.'],
            ['Temps réservé au sommeil', '7 heures 45 minutes', 'Comprend la marge de 15 minutes au lieu de la compter comme du sommeil.'],
          ],
        },
      },
      {
        id: 'when-to-ask',
        heading: 'Reconnais les limites d’un calculateur',
        paragraphs: [
          'Des difficultés persistantes d’endormissement, des réveils répétés, une forte somnolence en journée, de forts ronflements, des reprises de souffle ou des pauses respiratoires nécessitent une évaluation par un professionnel de santé qualifié. Un agenda du sommeil peut t’aider à décrire ce qui se répète : note tes heures de coucher et de réveil, les siestes, l’exercice, la caféine ou l’alcool, les médicaments et ton niveau de repos ressenti.',
          'Ce guide propose des informations éducatives de bien-être. Il ne permet ni de diagnostiquer ni de traiter un problème de santé, et davantage d’heures n’est pas automatiquement mieux pour tout le monde. Prends les recommandations pour adultes comme point de départ, construis une routine réaliste et demande des conseils individuels si les difficultés continuent à perturber ton quotidien.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/fr', '/fr/cycles-du-sommeil', '/fr/horaires-de-sommeil', '/fr/temps-d-endormissement'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/temps-d-endormissement',
    locale: 'fr',
    kind: 'guide',
    key: 'latency',
    title: 'Combien de temps pour s’endormir ?',
    description: 'Comprends le temps d’endormissement, prévois une marge simple et reconnais quand des difficultés répétées méritent un avis professionnel.',
    heading: 'Prévois le temps entre le coucher et le sommeil',
    intro: 'L’endormissement fait partie de la nuit : inclus cette transition au lieu de considérer le coucher comme un interrupteur instantané.',
    sections: [
      {
        id: 'latency-definition',
        heading: 'Le temps d’endormissement est une transition normale',
        paragraphs: [
          'Le temps d’endormissement, ou latence d’endormissement, est le délai entre le moment où tu essaies de dormir et celui où tu t’endors réellement. Il varie d’une nuit à l’autre. Tu peux t’endormir vite après une journée exigeante, avoir besoin de plus de temps quand ton esprit est occupé ou rester éveillé plus longtemps lorsque tes horaires sont décalés. Une seule estimation ne permet pas de savoir s’il y a un problème.',
          'Pour organiser tes horaires, ce calculateur utilise une marge de 15 minutes par défaut. Ce chiffre simplifie le calcul et laisse un peu de souplesse à l’heure du coucher proposée. Ce n’est ni un objectif, ni une promesse, ni une mesure issue d’une étude de ton sommeil. Si tes habitudes sont différentes, utilise le résultat comme un rappel pour commencer ta routine plus tôt ou réserver davantage de temps au lit.',
        ],
      },
      {
        id: 'simple-arithmetic',
        heading: 'Regarde ce que la marge change',
        paragraphs: [
          'Supposons que tu aies besoin de dormir vers 23:00. Si tu mets souvent 15 minutes à t’installer et à t’endormir, te mettre au lit à 22:45 donne une marge raisonnable au calcul. Si la durée de sommeil prévue est de 7 heures 30 minutes et le réveil à 07:00, le même calcul situe la mise au lit à 23:15 pour une estimation de cinq cycles : 07:00 moins 7 heures 30 minutes, puis moins 15 minutes.',
          'Le résultat aide à séparer deux questions : combien de temps tu souhaites dormir et combien de temps il te faut pour te préparer au sommeil. Les distinguer peut réduire la pression de devoir t’endormir dès que ta tête touche l’oreiller.',
        ],
        table: {
          headers: ['Début de sommeil prévu', 'Marge', 'Mise au lit'],
          rows: [
            ['22:30', '15 minutes', '22:15'],
            ['23:00', '30 minutes', '22:30'],
            ['23:15', '15 minutes', '23:00'],
          ],
        },
      },
      {
        id: 'reduce-friction',
        heading: 'Rends la transition moins exigeante',
        paragraphs: [
          'Utilise la fin de soirée pour réduire les obstacles : termine les tâches pratiques, atténue la lumière vive, éloigne le téléphone s’il te maintient en éveil et garde la chambre calme et confortable. Un enchaînement que tu peux répéter compte plus qu’une routine compliquée. Essaie de ne pas transformer l’heure en un examen que tu pourrais réussir ou rater.',
          'La caféine, la nicotine, l’alcool, les repas lourds pris tard, l’exercice intense près du coucher, le stress et des horaires irréguliers peuvent tous influencer cette transition. Tu n’as pas besoin de tout changer à la fois. Choisis un petit ajustement, répète-le plusieurs soirs et observe la tendance plutôt que de juger un seul résultat.',
        ],
        bullets: [
          'Commence à ralentir avant l’heure de mise au lit calculée.',
          'Note tes heures de coucher et de réveil, les siestes et ce qui a pu modifier ta soirée.',
          'Si tu restes éveillé et que la frustration augmente, fais une activité calme jusqu’à ressentir de nouveau l’envie de dormir.',
        ],
      },
      {
        id: 'persistent-difficulty',
        heading: 'Quand des difficultés répétées méritent un échange',
        paragraphs: [
          'Si les difficultés d’endormissement persistent, affectent tes activités en journée ou s’accompagnent de réveils répétés, de somnolence excessive, de forts ronflements, de reprises de souffle ou de pauses respiratoires, demande une évaluation à un professionnel de santé qualifié. Un agenda du sommeil peut apporter des détails utiles à cet échange sans nécessiter de capteur d’activité ni de microphone.',
          'Ce guide fournit des informations éducatives de bien-être, pas un avis médical. Le calculateur peut réserver du temps pour une transition, mais il ne peut ni diagnostiquer un trouble du sommeil ni remplacer une prise en charge individuelle. Ton objectif est de préserver durablement du temps pour dormir, pas d’obtenir un horaire parfaitement calculé.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/fr/heure-du-coucher', '/fr', '/fr/horaires-de-sommeil', '/fr/combien-d-heures-dormir'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/horaires-de-sommeil',
    locale: 'fr',
    kind: 'guide',
    key: 'schedule',
    title: 'Construire ses horaires de sommeil',
    description: 'Construis des horaires de sommeil réalistes avec un réveil régulier, assez de temps pour dormir et de la souplesse pour le quotidien.',
    heading: 'Construis des horaires de sommeil durables',
    intro: 'Un repère régulier et assez de temps pour dormir sont une meilleure base qu’un calcul parfait de l’heure du coucher.',
    sections: [
      {
        id: 'choose-anchor',
        heading: 'Choisis d’abord le repère du matin',
        paragraphs: [
          'Commence par l’heure à laquelle tu dois te lever la plupart des jours. Remonte le temps pour préserver au moins la durée de sommeil recommandée pour ton âge et ta situation. Pour les adultes de 18 à 60 ans, le CDC recommande 7 heures ou plus par jour. Le NHLBI souligne aussi l’intérêt de se coucher et de se réveiller à la même heure chaque jour.',
          'Une heure de réveil de référence rend le reste du programme plus lisible. Si ton réveil sonne à 06:30 et que tu souhaites dormir 8 heures, vise un début de sommeil vers 22:30. Si tu mets habituellement 15 minutes à t’endormir, mets-toi au lit vers 22:15. Cette transition supplémentaire a sa place dans tes horaires, même si elle ne constitue pas du temps de sommeil.',
        ],
      },
      {
        id: 'weekly-example',
        heading: 'Rends la semaine concrète',
        paragraphs: [
          'Note ton programme à côté des obligations qui organisent ta soirée. L’idée est de voir si l’heure du coucher proposée est réaliste, pas de te donner une raison supplémentaire de te sentir en retard. Si une réunion tardive ou l’aide à un proche modifie une nuit, retrouve ton repère dès que possible et adapte la soirée suivante sans chercher à compenser par des calculs compliqués.',
          'De petites différences entre la semaine et le week-end peuvent être plus faciles à gérer qu’un grand décalage. Le NHLBI suggère de limiter cet écart à environ une heure quand c’est possible. Ton travail, ta famille, tes voyages et ta santé peuvent demander un autre rythme ; utilise le tableau comme un exemple pour t’organiser plutôt que comme un emploi du temps rigide.',
        ],
        table: {
          headers: ['Jour', 'Réveil visé', 'Mise au lit', 'Temps réservé au sommeil'],
          rows: [
            ['Du lundi au jeudi', '06:30', '22:15', '8 heures 15 minutes, temps d’endormissement compris'],
            ['Vendredi', '06:30', '22:30', '8 heures'],
            ['Samedi', '07:15', '23:00', '8 heures'],
            ['Dimanche', '06:30', '22:15', '8 heures 15 minutes, temps d’endormissement compris'],
          ],
        },
      },
      {
        id: 'support-the-evening',
        heading: 'Rends tes horaires plus faciles à suivre',
        paragraphs: [
          'Consacre la dernière heure à des tâches prévisibles et moins stimulantes. Prépare tes vêtements ou tes repas, réduis la lumière vive et garde la chambre calme, fraîche et confortable. Le CDC recommande aussi d’éviter les repas copieux et l’alcool avant le coucher, et de limiter la caféine l’après-midi ou le soir. Choisis les changements adaptés à ton quotidien plutôt que de copier une longue liste que tu abandonneras.',
          'Les horaires sont plus faciles à garder si le matin y contribue aussi. Aie une activité régulière en journée et passe du temps dehors quand c’est possible. Fais apparaître l’heure de réveil dans ton calendrier et utilise un réveil ou un rappel qui ne demande pas de compte. Le calcul donne une direction ; la répétition lui donne du sens.',
        ],
        bullets: [
          'Préserve le temps réservé au sommeil avant de raccourcir ton programme pour y ajouter des tâches.',
          'Garde une courte séquence de détente, dans le même ordre la plupart des soirs.',
          'Fais le point après plusieurs jours plutôt que de tout modifier après une nuit difficile.',
        ],
      },
      {
        id: 'adapt-without-chasing',
        heading: 'Adapte-toi sans courir après un chiffre parfait',
        paragraphs: [
          'Les voyages, les changements d’heure, le travail posté, la maladie, le stress et les sorties peuvent décaler les horaires. Ces jours-là, garde les mêmes principes : préserve assez de temps pour dormir, conserve un repère quand c’est possible et accorde-toi une transition calme. Une estimation par cycles de 90 minutes peut aider à comparer des options, mais les cycles réels varient et ne doivent pas passer avant une durée suffisante pour dormir.',
          'Si tu n’arrives régulièrement pas à garder tes horaires parce que le sommeil ne vient pas, ou si tu présentes une somnolence excessive en journée, de forts ronflements, des reprises de souffle ou des pauses respiratoires, consulte un professionnel de santé qualifié. Ce guide propose des informations éducatives de bien-être, pas un avis médical.',
        ],
      },
      {
        id: 'night-shift',
        heading: 'Travail de nuit et horaires alternants',
        paragraphs: [
          'Si tu travailles de nuit ou en horaires alternants, l’exemple de rythme diurne ci-dessus n’est pas une prescription personnelle. La formation du NIOSH destinée au personnel infirmier recommande de préserver le sommeil au retour à la maison plutôt que de consacrer ce temps aux tâches quotidiennes, et de garder la chambre sombre, calme et sans interruptions. Demande aux personnes qui vivent avec toi de respecter ce temps de repos.',
          'Le calculateur compare seulement des horaires : il ne peut ni adapter tes rythmes circadiens ni garantir ta vigilance. Ne conduis pas si tu somnoles. Si la somnolence compromet ta sécurité au travail ou au volant, consulte un professionnel de santé qualifié et le service de santé au travail pour évaluer ta situation. Ces informations sont éducatives, pas un avis médical individuel.',
        ],
      },
    ],
    sources: [...sleepSources, {
      title: 'CDC/NIOSH · Dormir après le travail de nuit (archives ; consulté le 22/10/2026)',
      url: 'https://archive.cdc.gov/www_cdc_gov/niosh/work-hour-training-for-nurses/longhours/mod9/05.html',
    }],
    related: ['/fr', '/fr/heure-du-coucher', '/fr/combien-d-heures-dormir', '/fr/temps-d-endormissement'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/a-propos',
    locale: 'fr',
    kind: 'legal',
    key: 'about',
    title: 'À propos de SleepLike',
    description: 'Découvre qui publie SleepLike, à quoi sert le calculateur et comment les informations éducatives sont tenues à jour.',
    heading: 'À propos de SleepLike / Maat Work',
    intro: 'SleepLike est un petit projet éducatif de bien-être porté par l’équipe éditoriale SleepLike / Maat Work.',
    sections: [
      {
        id: 'purpose',
        heading: 'Un outil simple pour organiser ton repos',
        paragraphs: [
          'SleepLike aide les adultes à organiser une heure du coucher, un réveil, une sieste ou un créneau disponible pour dormir grâce à des calculs simples effectués localement. Il ne demande ni compte ni microphone, et le calcul principal est conçu pour fonctionner dans le navigateur sans envoyer les horaires de sommeil à un serveur.',
          'Les estimations reposent sur des conventions courantes pour organiser le sommeil et en expliquent les limites. Le sommeil varie selon la personne et la nuit : cet outil sert donc à préparer ton repos dans un but éducatif de bien-être. Ce n’est ni un avis médical, ni un dispositif médical, ni un moyen de diagnostiquer un problème de sommeil.',
        ],
        bullets: [
          'SleepLike / Maat Work est le nom éditorial institutionnel de ce projet.',
          'Le calculateur ne mesure pas les stades du sommeil et ne prédit pas le déroulement d’une nuit.',
          'Les questions sur des symptômes ou une prise en charge personnelle relèvent d’un professionnel de santé qualifié.',
        ],
      },
      {
        id: 'editorial-approach',
        heading: 'Comment le contenu est tenu à jour',
        paragraphs: [
          'L’équipe éditoriale rédige des explications pratiques à partir de sources de santé primaires et publiques, précise les hypothèses utilisées par le calculateur et indique une date de mise à jour sur chaque page. Les pages sont destinées à l’information générale des adultes ; l’équipe ne se présente pas comme composée de cliniciens et ne revendique pas de révision médicale.',
          'Le projet peut évoluer avec le produit, les sources ou la configuration de confidentialité. La page de méthodologie explique les calculs et les limites des estimations pour que tu puisses déterminer si un résultat est utile dans ta situation.',
        ],
      },
      {
        id: 'contact',
        heading: 'Contacter l’équipe',
        paragraphs: [
          'Pour toute question sur le produit, l’accessibilité, la confidentialité ou le contenu, consulte la page publique de contact de MaatWork à l’adresse https://maat.work. N’envoie pas d’antécédents médicaux détaillés dans un formulaire général de contact du produit. Si ton sommeil t’inquiète, demande conseil à un professionnel de santé qualifié.',
        ],
      },
    ],
    sources: [contactSource, sleepSources[0]],
    related: ['/fr/contact', '/fr/confidentialite', '/fr/conditions', '/fr/methodologie'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/contact',
    locale: 'fr',
    kind: 'legal',
    key: 'contact',
    title: 'Contacter SleepLike',
    description: 'Retrouve le contact public de MaatWork pour tes questions sur SleepLike, la confidentialité, l’accessibilité ou le contenu.',
    heading: 'Contacter SleepLike',
    intro: 'Utilise le contact public de MaatWork pour tes questions sur le produit, la confidentialité, l’accessibilité ou le contenu.',
    sections: [
      {
        id: 'public-contact',
        heading: 'Où écrire',
        paragraphs: [
          'Le point de contact public est https://maat.work. Le site de MaatWork publie l’adresse professionnelle maatwork.comercial@gmail.com pour les demandes générales. Choisis le moyen qui te convient le mieux et mentionne SleepLike pour donner du contexte à ta question.',
          'SleepLike est un outil éducatif de bien-être. L’équipe peut recevoir des questions sur le site, le contenu, l’accessibilité ou la configuration de confidentialité, mais elle ne fournit pas de conseils médicaux individuels et n’interprète pas les symptômes.',
        ],
      },
      {
        id: 'useful-context',
        heading: 'Les informations utiles pour comprendre le problème',
        paragraphs: [
          'Pour une question sur le produit, indique le chemin de la page, le navigateur, la langue et une brève description de ce que tu pensais voir se produire. Évite d’envoyer un agenda du sommeil, des dossiers médicaux ou d’autres antécédents de santé par un canal de contact général ; adresse-toi à un professionnel de santé qualifié pour des conseils personnels sur ton sommeil.',
          'Pour une question de confidentialité, décris le paramètre ou le choix de consentement concerné. La page de confidentialité explique ce que l’outil local conserve et comment les intégrations facultatives de tiers sont décrites lorsqu’elles sont activées.',
        ],
      },
      {
        id: 'response-scope',
        heading: 'À quoi sert ce canal',
        paragraphs: [
          'Ce canal sert aux questions sur le service et son contenu. Ce n’est pas un service d’urgence. En cas de problème urgent de santé ou de sécurité, contacte le service local d’urgence ou de santé approprié.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/fr/a-propos', '/fr/confidentialite', '/fr/conditions', '/fr/methodologie'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/confidentialite',
    locale: 'fr',
    kind: 'legal',
    key: 'privacy',
    title: 'Confidentialité sur SleepLike',
    description: 'Découvre le calcul local, les préférences du navigateur, les statistiques facultatives, le consentement et les intégrations publicitaires prévues.',
    heading: 'La confidentialité sur SleepLike',
    intro: 'Le calculateur est conçu pour un usage local, des préférences limitées dans le navigateur et des choix clairs concernant les services facultatifs.',
    sections: [
      {
        id: 'local-calculator',
        heading: 'Le calculateur fonctionne localement',
        paragraphs: [
          'Le calculateur principal est conçu pour fonctionner dans ton navigateur. Il ne demande ni compte ni microphone et n’est pas conçu pour conserver sur un serveur SleepLike des antécédents de santé, un agenda du sommeil, un historique des heures de coucher ou de réveil, ni les données saisies pour le calcul. Le résultat est produit à partir des valeurs que tu indiques et des informations de l’horloge locale nécessaires au calcul.',
          'Un navigateur peut enregistrer des préférences limitées, comme la langue, le format de l’heure ou un choix de consentement. Ce stockage dans le navigateur sert uniquement aux préférences et à la gestion du consentement ; il n’est pas utilisé pour conserver un historique personnel de sommeil ou de santé.',
        ],
      },
      {
        id: 'prepared-services',
        heading: 'Intégrations prévues et fonctionnement',
        paragraphs: [
          'Une intégration tierce peut être prévue dans le code sans être activée sur chaque déploiement. Vercel Analytics n’est disponible qu’après ton accord via la commande Préférences de confidentialité du pied de page ; lorsqu’il est activé, il sert à mesurer de manière agrégée l’activité par chemin de page. Il n’est pas destiné à recevoir les heures exactes de coucher, de réveil ou de sieste, ni les valeurs saisies dans le calculateur.',
          'La disponibilité et la configuration des services facultatifs peuvent varier selon le déploiement. Le fait qu’un service soit mentionné ici comme prévu ne prouve pas qu’il fonctionne pendant ta visite ; l’interface de consentement et l’activité réseau du navigateur sont les indicateurs concrets pour cette session.',
        ],
      },
      {
        id: 'advertising-choice',
        heading: 'Une publicité soumise à conditions',
        paragraphs: [
          'Si la publicité est activée, elle ne sera chargée qu’une fois les intégrations Google CMP et AdSense correspondantes activées et approuvées. Les annonces restent désactivées tant que ces conditions ne sont pas remplies. L’interface de consentement est conçue pour te permettre d’accepter, de refuser, de retirer ton accord ou de modifier ton choix. SleepLike ne demande des annonces non personnalisées qu’après ton consentement. Ces annonces peuvent néanmoins utiliser des cookies et traiter des informations comme ton adresse IP ou des détails sur ton appareil. Si tu refuses ton consentement, le calculateur reste disponible sans publicité.',
          'La publicité est un élément facultatif de la configuration du produit et n’est pas nécessaire au calcul local. Aucune publicité n’est prévue sur cette page juridique. Le texte décrit ici une configuration possible ; il n’affirme pas que la publicité fonctionne au moment où tu le lis.',
        ],
      },
      {
        id: 'choices-and-questions',
        heading: 'Tes réglages et tes questions',
        paragraphs: [
          'Utilise la commande Préférences de confidentialité dans le pied de page pour refuser ou retirer un accord précédent. Ton navigateur peut conserver la préférence nécessaire pour mémoriser cette décision. Effacer les données du site peut supprimer cette préférence et t’obliger à choisir de nouveau. Le site n’utilise pas ce stockage pour conserver des antécédents de santé.',
          'Pour toute question de confidentialité, consulte https://maat.work ou utilise le contact professionnel public indiqué sur la page de contact. Cette page fournit des informations générales sur le produit ; elle ne constitue pas une promesse concernant un service désactivé sur le déploiement que tu utilises.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/fr/a-propos', '/fr/contact', '/fr/conditions', '/fr/methodologie'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/conditions',
    locale: 'fr',
    kind: 'legal',
    key: 'terms',
    title: 'Conditions d’utilisation de SleepLike',
    description: 'Conditions générales d’utilisation de SleepLike comme outil éducatif pour organiser les horaires de sommeil.',
    heading: 'Conditions d’utilisation de SleepLike',
    intro: 'Ces conditions générales décrivent l’usage prévu et les limites du site et du calculateur SleepLike.',
    sections: [
      {
        id: 'educational-service',
        heading: 'Ce que propose le service',
        paragraphs: [
          'SleepLike propose des pages éducatives statiques et un calculateur local pour prévoir des heures approximatives de sommeil et de réveil. Le service s’adresse aux adultes qui recherchent des informations générales de bien-être. Il ne fournit ni avis médical, ni diagnostic, ni traitement, ni assistance d’urgence, ni mesure des stades du sommeil.',
          'Les calculs utilisent des hypothèses explicites, notamment un intervalle approximatif de cycle et une marge d’endormissement. Les résultats sont des estimations pour organiser tes horaires. Le sommeil varie selon la personne et la nuit ; il te revient donc de déterminer si un horaire proposé convient à ta situation.',
        ],
      },
      {
        id: 'use-and-changes',
        heading: 'Utilisation des pages',
        paragraphs: [
          'Utilise les pages à des fins personnelles d’information, dans le respect de la loi, et ne considère pas une estimation comme une garantie. Ne fais pas du calculateur le seul fondement d’une décision importante pour la sécurité, notamment en cas de forte somnolence ou si tu dois conduire, utiliser des machines ou accomplir une autre tâche nécessitant de la vigilance.',
          'Le contenu, les calculs, les liens et les intégrations facultatives peuvent être mis à jour, supprimés ou modifiés avec l’évolution du projet. La date de mise à jour d’une page aide à identifier la version du texte éducatif que tu consultes. Les sites externes ont leurs propres contenus et pratiques.',
        ],
      },
      {
        id: 'health-and-contact',
        heading: 'Questions de santé et contact',
        paragraphs: [
          'Si tu présentes des difficultés persistantes pour dormir, une somnolence excessive en journée, de forts ronflements, des reprises de souffle, des pauses respiratoires ou une autre préoccupation de santé, consulte un professionnel de santé qualifié. Pour les questions sur le produit, la confidentialité, l’accessibilité ou le contenu, utilise https://maat.work. N’envoie pas d’antécédents de santé sensibles par un canal général de contact du produit.',
          'Ces conditions décrivent le service dans un langage simple. Elles n’ajoutent aucune promesse selon laquelle le calculateur conviendrait à une personne, à des horaires, à un état de santé ou à un résultat particulier.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/fr/a-propos', '/fr/contact', '/fr/confidentialite', '/fr/methodologie'],
    updated: '2026-10-22',
  },
  {
    path: '/fr/methodologie',
    locale: 'fr',
    kind: 'legal',
    key: 'methodology',
    title: 'Méthodologie de SleepLike',
    description: 'Découvre les quatre modes du calculateur, les hypothèses de calcul, l’heure locale, la gestion des dates et les limites des estimations.',
    heading: 'Comment fonctionnent les estimations SleepLike',
    intro: 'SleepLike utilise des calculs horaires transparents pour proposer quatre modes de préparation du repos ; il ne prédit pas les stades du sommeil.',
    sections: [
      {
        id: 'four-modes',
        heading: 'Les quatre modes de calcul',
        paragraphs: [
          'Chaque mode répond à une question différente sur les horaires. L’outil utilise la date et l’heure locales disponibles dans le navigateur et renvoie un petit ensemble d’estimations faciles à lire. Le résultat est une aide à l’organisation, pas une mesure provenant d’un capteur ni une évaluation clinique.',
        ],
        table: {
          headers: ['Mode', 'Point de départ', 'Calcul'],
          rows: [
            ['Se réveiller', 'Une heure de réveil souhaitée', 'Retranche une durée de sommeil estimée et la marge d’endormissement.'],
            ['Dormir maintenant', 'L’heure locale relevée au moment du calcul', 'Ajoute la marge et un ou plusieurs intervalles de cycle approximatifs.'],
            ['Sieste', 'Une heure de début de sieste', 'Ajoute une option courte de 20 minutes au lit ou une option plus longue d’environ 90 minutes.'],
            ['Créneau disponible', 'Un intervalle disponible fixe', 'Compare les nombres approximatifs de cycles qui tiennent dans le temps disponible.'],
          ],
        },
      },
      {
        id: 'arithmetic-assumptions',
        heading: 'Les hypothèses derrière le calcul',
        paragraphs: [
          'L’intervalle de cycle par défaut est de 90 minutes. Le NHLBI décrit des cycles du sommeil qui recommencent environ toutes les 80 à 100 minutes : 90 minutes sert donc de point médian pratique, pas de durée biologique exacte. La marge d’endormissement par défaut est de 15 minutes, une donnée pratique pour organiser tes horaires qui ne représente pas ton temps d’endormissement mesuré.',
          'Pour situer ces estimations chez l’adulte, les recommandations du CDC indiquent que les personnes de 18 à 60 ans devraient généralement dormir au moins 7 heures par jour. Le calculateur n’impose pas que chaque résultat corresponde à un besoin individuel de sommeil ; il présente le calcul pour que tu puisses privilégier une option qui te laisse assez de temps pour te reposer.',
        ],
      },
      {
        id: 'dates-and-daylight',
        heading: 'Dates, minuit et changements d’heure',
        paragraphs: [
          'Quand une soustraction franchit minuit, la date change avec elle. Un résultat après 00:00 appartient au jour calendaire suivant, et un résultat avant minuit appartient au jour précédent lorsque l’on remonte le temps à partir d’un objectif matinal. L’heure affichée utilise le contexte horaire local du navigateur.',
          'Lors d’un passage à l’heure d’été ou à l’heure d’hiver, les calculs en heure locale suivent les règles de date et d’heure fournies par le navigateur. Un intervalle lu sur l’horloge peut paraître plus court ou plus long lors du changement d’heure. SleepLike n’invente pas de fuseau horaire, ne convertit pas silencieusement le résultat vers un autre lieu et ne prédit pas les futurs stades du sommeil.',
        ],
      },
      {
        id: 'limits',
        heading: 'Ce que l’outil ne fait pas',
        paragraphs: [
          'Le calculateur n’utilise ni microphone, ni objet connecté porté sur soi, ni compte, ni capteur de sommeil. Il n’identifie pas le sommeil paradoxal, le sommeil profond, les réveils ou un trouble, et ne promet pas que se réveiller à une heure affichée procurera une sensation particulière. Le stress, la lumière, la maladie, certaines substances, les changements d’horaires et les variations ordinaires d’une nuit à l’autre peuvent modifier ton expérience.',
          'Si les problèmes de sommeil persistent ou si tu présentes une somnolence excessive en journée, de forts ronflements, des reprises de souffle ou des pauses respiratoires, consulte un professionnel de santé qualifié. Cette méthodologie explique un calcul éducatif simple et ne constitue pas un avis médical.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/fr/a-propos', '/fr/confidentialite', '/fr/conditions', '/fr/cycles-du-sommeil'],
    updated: '2026-10-22',
  },
];
