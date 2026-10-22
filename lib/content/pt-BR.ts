import type { ContentPage } from './pages';

const sleepSources = [
  {
    title: 'NHLBI · Fases e estágios do sono',
    url: 'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
  },
  {
    title: 'NHLBI · Hábitos para um sono saudável',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits',
  },
  {
    title: 'CDC · Sobre o sono',
    url: 'https://www.cdc.gov/sleep/about/',
  },
];

const durationSource = {
  title: 'NHLBI · Quanto sono é suficiente?',
  url: 'https://www.nhlbi.nih.gov/health/sleep/how-much-sleep',
};

const contactSource = {
  title: 'MaatWork · Site público',
  url: 'https://maat.work',
};

export const ptBRPages: ContentPage[] = [
  {
    path: '/pt-br',
    locale: 'pt-BR',
    kind: 'tool',
    key: 'home',
    title: 'Calculadora de sono',
    description: 'Planeje um horário para dormir a partir da hora de acordar com uma calculadora de ciclos do sono educativa e que respeita sua privacidade.',
    heading: 'Calculadora de sono',
    intro: 'Informe a que horas você precisa acordar e use as estimativas para escolher um horário viável para deitar.',
    mode: 'wake',
    sections: [
      {
        id: 'fixed-wake-time',
        heading: 'Comece pelo horário que não pode mudar',
        paragraphs: [
          'Um horário fixo para acordar dá ao cálculo um ponto de referência útil. A ferramenta conta para trás a partir desse horário, usando ciclos de sono aproximados e reservando uma pequena margem para adormecer. Você pode usar o resultado para planejar um dia de trabalho, uma viagem ou um compromisso pela manhã.',
          'A margem padrão é de 15 minutos. Ela é uma convenção prática de planejamento, não uma medição da sua latência do sono. Se você costuma precisar de mais ou menos tempo, considere as opções exibidas um ponto de partida e ajuste sua rotina de desaceleração conforme necessário.',
        ],
      },
      {
        id: 'estimated-options',
        heading: 'Entenda as opções como uma faixa de possibilidades',
        paragraphs: [
          'Os ciclos do sono costumam ser descritos como períodos de cerca de 90 minutos, mas os ciclos reais variam de pessoa para pessoa e de uma noite para outra. Um resultado que coincide com o fim estimado de um ciclo ainda pode produzir sensações diferentes a cada noite. As opções ajudam você a comparar o tempo disponível na cama; elas não preveem as fases pelas quais você passará.',
          'Dê prioridade a uma opção que reserve tempo suficiente para dormir e se encaixe na sua vida. Um horário mais tarde pode ser viável em uma noite cheia de tarefas, enquanto um horário mais cedo cria mais espaço quando você consegue começar a desacelerar antes.',
        ],
        bullets: [
          'Prefira os horários de deitar mais cedo quando puder reservar uma noite mais longa.',
          'Mantenha o mesmo horário de acordar quando possível, para dar à rotina um ponto de referência estável.',
          'Se uma opção deixar pouco tempo para dormir, encare-a como um plano limitado pelas circunstâncias, não como uma meta.',
        ],
      },
      {
        id: 'practical-use',
        heading: 'Transforme uma estimativa em rotina',
        paragraphs: [
          'Escolha um horário de deitar que você consiga repetir e comece uma transição tranquila antes dele. Diminua a luz forte, termine as tarefas mais exigentes e prepare a manhã seguinte para facilitar o cumprimento do plano. Uma calculadora pode organizar os horários; sua rotina e o tempo disponível para dormir continuam sendo essenciais.',
          'Esta página serve para o planejamento educativo do bem-estar. O sono varia, e dificuldade persistente para dormir, sonolência excessiva durante o dia, ronco alto, engasgos ou pausas na respiração são motivos para conversar com um profissional de saúde habilitado.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/pt-br/hora-de-dormir', '/pt-br/calculadora-de-cochilo', '/pt-br/ciclos-do-sono', '/pt-br/quantas-horas-dormir'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/hora-de-dormir',
    locale: 'pt-BR',
    kind: 'tool',
    key: 'bedtime',
    title: 'Calculadora de horário para dormir',
    description: 'Encontre horários estimados para deitar a partir da hora de acordar, com uma margem explícita para adormecer.',
    heading: 'Encontre seu horário de dormir',
    intro: 'Escolha a hora em que você precisa levantar e compare horários estimados para deitar que se encaixem na sua noite.',
    mode: 'wake',
    sections: [
      {
        id: 'work-backward',
        heading: 'Faça a conta de trás para a frente a partir da manhã',
        paragraphs: [
          'Quando o horário da manhã é fixo, planejar a hora de dormir exige fazer a conta de trás para a frente. Esta calculadora subtrai vários ciclos aproximados de 90 minutos e reserva mais 15 minutos para o tempo que você pode levar para adormecer. O horário exibido indica quando deitar, não promete o momento em que você estará dormindo.',
          'Por exemplo, acordar às 07:00 com cinco ciclos estimados corresponde a 7 horas e 30 minutos de sono. Com a margem de planejamento, o horário sugerido para deitar fica por volta das 23:15. Em outra noite, pode ser melhor escolher uma opção mais cedo se você precisar de mais tempo na cama.',
        ],
      },
      {
        id: 'choose-an-option',
        heading: 'Escolha o horário que você realmente consegue reservar',
        paragraphs: [
          'O resultado mais cedo não é automaticamente a melhor escolha. Procure um horário que permita terminar as tarefas habituais da noite sem pressa e ainda deixe um tempo razoável para dormir. Se você já está com pouco tempo, a ferramenta pode mostrar a conta com clareza, mas não consegue transformar uma noite curta em uma noite completa.',
          'Os ciclos do sono costumam ser descritos como períodos de cerca de 90 minutos, enquanto o NHLBI informa que eles podem recomeçar a cada 80 a 100 minutos. Essa variação explica por que os resultados são estimativas. Use os horários para organizar sua rotina e observe como seu sono e sua disposição pela manhã respondem.',
        ],
        bullets: [
          'Prefira uma opção mais cedo quando ela couber na rotina sem reduzir seu tempo de desaceleração.',
          'Use o mesmo horário de acordar na maioria dos dias, quando sua rotina permitir.',
          'Deixe a calculadora de lado assim que tiver um plano viável; ficar olhando o relógio pode aumentar a pressão.',
        ],
      },
      {
        id: 'before-bed',
        heading: 'Facilite a última hora antes de dormir',
        paragraphs: [
          'Use a hora antes de deitar para tarefas menos estimulantes: arrume a bolsa, separe a roupa, diminua as luzes e deixe os planejamentos mais exigentes para amanhã. Um quarto fresco, silencioso e confortável, com menos interrupções de aparelhos eletrônicos, pode tornar a transição planejada mais viável.',
          'Esta calculadora é uma ferramenta educativa de bem-estar, não uma orientação médica. Se a dificuldade para adormecer continuar se repetindo, ou se sonolência diurna, ronco, engasgos ou pausas na respiração preocuparem você, peça orientação a um profissional de saúde habilitado.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/pt-br', '/pt-br/calculadora-de-cochilo', '/pt-br/tempo-para-adormecer', '/pt-br/horario-de-sono'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/calculadora-de-cochilo',
    locale: 'pt-BR',
    kind: 'tool',
    key: 'nap',
    title: 'Calculadora de cochilo',
    description: 'Planeje um cochilo curto ou de ciclo completo com estimativas locais simples e ressalvas claras sobre os ciclos do sono.',
    heading: 'Encontre tempo para um cochilo',
    intro: 'Escolha um cochilo curto ou de ciclo completo e use a estimativa para preservar sua tarde e sua noite.',
    mode: 'nap',
    sections: [
      {
        id: 'two-nap-shapes',
        heading: 'Escolha o tipo de cochilo',
        paragraphs: [
          'Um cochilo curto oferece uma pequena pausa sem planejar um ciclo completo de sono. A opção de ciclo completo reserva mais tempo, mas também exige um intervalo maior no seu dia e pode deixar você com menos sono na hora de dormir à noite. A calculadora apresenta as duas como escolhas de planejamento, não como garantias de como você vai se sentir ao acordar.',
          'Para adultos, o NHLBI descreve cochilos de no máximo 20 minutos como uma opção quando cochilar é útil. Na opção curta da calculadora, são 20 minutos na cama, não uma promessa de 20 minutos dormindo. Se você escolher um cochilo mais longo, reserve tempo depois para se sentar, beber água e retomar as tarefas antes de dirigir ou fazer qualquer coisa que exija atenção plena.',
        ],
      },
      {
        id: 'use-the-clock',
        heading: 'Conte também o tempo antes e depois do cochilo',
        paragraphs: [
          'O tempo para se acomodar também importa. Se você planejar um cochilo curto de 20 minutos na cama às 14:00, reserve um pouco mais de 20 minutos no total para a transição e para despertar. Um lugar silencioso, com pouca luz e confortável pode facilitar o plano, enquanto um cochilo tarde demais pode dificultar o sono noturno para algumas pessoas.',
          'A duração do cochilo é apenas uma parte da decisão. Considere quando você precisa voltar a estar alerta, quanto o dia já avançou e se está usando cochilos para compensar um padrão de noites com pouco sono.',
        ],
        bullets: [
          'Escolha um cochilo curto quando precisar de uma pausa breve e tiver um horário normal para dormir à noite.',
          'Deixe uma margem após acordar antes de dirigir, fazer exercícios ou tomar decisões importantes.',
          'Se os cochilos substituírem o sono noturno repetidamente, reveja seus horários e converse com um profissional sobre os problemas que persistirem.',
        ],
      },
      {
        id: 'night-sleep-context',
        heading: 'Não perca o sono noturno de vista',
        paragraphs: [
          'Um cochilo pode fazer parte de uma rotina saudável, mas não substitui o tempo regular para dormir de que a maioria dos adultos precisa. A orientação do CDC é que adultos de 18 a 60 anos geralmente durmam pelo menos sete horas por dia. Suas necessidades e a qualidade do seu sono podem ser diferentes, então use o resultado como uma forma simples de planejar os horários.',
          'Esta página serve apenas para o planejamento educativo do bem-estar. Ela não diagnostica nem trata problemas de sono. Converse com um profissional de saúde habilitado se você tiver dificuldade persistente para dormir, sonolência diurna incomumente intensa ou sintomas respiratórios durante o sono.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/pt-br', '/pt-br/hora-de-dormir', '/pt-br/horario-de-sono', '/pt-br/tempo-para-adormecer'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/ciclos-do-sono',
    locale: 'pt-BR',
    kind: 'guide',
    key: 'cycles',
    title: 'Ciclos do sono: a estimativa de 90 minutos',
    description: 'Entenda os ciclos do sono, por que 90 minutos são apenas uma estimativa e como planejar sem tratar o cálculo como uma promessa.',
    heading: 'Ciclos do sono são padrões, não cronômetros',
    intro: 'Uma estimativa simples de ciclos pode ajudar a organizar a hora de deitar ou o alarme, desde que você considere a variação normal.',
    sections: [
      {
        id: 'cycle-basics',
        heading: 'O que um ciclo do sono descreve',
        paragraphs: [
          'Durante uma noite de sono, o cérebro e o corpo passam por fases não REM e REM. O NHLBI descreve o ciclo como uma sequência que recomeça aproximadamente a cada 80 a 100 minutos, sendo comuns de quatro a seis ciclos por noite. Esses números descrevem um padrão amplo observado em estudos do sono; não são um cronômetro pessoal que toca no mesmo minuto todas as noites.',
          'A proporção entre os estágios muda ao longo da noite. O sono não REM profundo tende a ocupar uma parcela maior do início da noite, enquanto o sono REM costuma ganhar mais espaço depois. Acordar perto do fim estimado de um ciclo pode provocar uma sensação diferente de acordar no meio de um estágio, mas uma conta com o relógio não consegue identificar em que estágio você está nem garantir uma sensação específica pela manhã.',
        ],
      },
      {
        id: 'stages-in-plain-language',
        heading: 'Os estágios em linguagem simples',
        paragraphs: [
          'O sono não REM inclui a transição para o sono, um estágio em que você já está dormindo e o sono mais profundo de ondas lentas. O sono REM inclui intensa atividade cerebral, movimentos rápidos dos olhos e relaxamento muscular temporário. Os estágios formam uma sequência que se repete, mas essa sequência não é idêntica de uma pessoa para outra nem de uma noite para outra.',
        ],
        bullets: [
          'O estágio 1 é a breve transição entre a vigília e o sono.',
          'O estágio 2 é uma fase estável do sono que costuma ocupar boa parte da noite.',
          'O estágio 3 é o sono mais profundo de ondas lentas, geralmente mais frequente no início da noite.',
          'O REM é uma fase distinta que costuma se tornar mais frequente no fim da noite.',
        ],
      },
      {
        id: 'ninety-minute-planning',
        heading: 'Por que as calculadoras usam 90 minutos',
        paragraphs: [
          'Noventa minutos é um ponto médio conveniente para fazer contas dentro da faixa mais ampla de 80–100 minutos. Este site usa esse valor como média prática para que o resultado seja fácil de entender. É melhor interpretá-lo como um intervalo de planejamento, não como uma afirmação sobre a arquitetura exata do seu sono.',
          'Por exemplo, se você quer acordar às 07:00, subtrair cinco intervalos de 90 minutos resulta em 23:30 como início estimado do sono. Reservar mais 15 minutos para se acomodar antecipa o horário sugerido de deitar para cerca de 23:15. Um horário mais tarde ainda pode funcionar de outro modo em uma noite na qual seus ciclos reais sejam mais curtos ou mais longos.',
        ],
        table: {
          headers: ['Ciclos estimados', 'Tempo de sono', 'Para acordar às 07:00'],
          rows: [
            ['4', '6 horas', 'Deitar às 00:45, com 15 minutos para adormecer'],
            ['5', '7 horas e 30 minutos', 'Deitar às 23:15, com 15 minutos para adormecer'],
            ['6', '9 horas', 'Deitar às 21:45, com 15 minutos para adormecer'],
          ],
        },
      },
      {
        id: 'what-changes-the-estimate',
        heading: 'O que pode mudar esse padrão',
        paragraphs: [
          'O horário do sono responde a mais fatores do que um cálculo da hora de deitar. Seus horários de dormir e acordar, exposição à luz, estresse, doenças, álcool, cafeína, exercícios e interrupções podem afetar quando você adormece e como a noite transcorre. A idade também muda a proporção dos estágios. Uma estimativa de ciclos não consegue ajustar todos esses fatores.',
          'Use o número como uma ajuda leve para planejar. Se o resultado entrar em conflito com a quantidade de tempo de que você precisa, priorize um período maior disponível para dormir. A conta não é motivo para encurtar uma noite só para coincidir com um múltiplo exato.',
        ],
        bullets: [
          'Reserve tempo suficiente na cama para sua necessidade habitual de sono, incluindo o tempo para se acomodar.',
          'Compare como você se sente com horários regulares ao longo de vários dias, em vez de julgar um único alarme.',
          'Considere uma noite difícil uma informação sobre sua rotina, não um cálculo que deu errado.',
        ],
      },
      {
        id: 'use-the-guide',
        heading: 'Uma forma prática de usar este guia',
        paragraphs: [
          'Comece com um horário de acordar que você consiga manter, escolha um horário estimado de deitar que reserve tempo suficiente para dormir e prepare uma transição tranquila. Depois, pare de calcular e deixe a noite seguir. Se você frequentemente não consegue dormir, sente muito sono durante o dia ou percebe ronco alto, engasgos ou pausas na respiração, converse com um profissional de saúde habilitado. Este guia educativo não é uma orientação médica.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/pt-br', '/pt-br/hora-de-dormir', '/pt-br/quantas-horas-dormir', '/pt-br/tempo-para-adormecer'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/quantas-horas-dormir',
    locale: 'pt-BR',
    kind: 'guide',
    key: 'duration',
    title: 'Quantas horas os adultos precisam dormir?',
    description: 'Um guia prático sobre duração e qualidade do sono dos adultos e como escolher horários que reservem tempo suficiente para descansar.',
    heading: 'Quanto tempo um adulto deve reservar para dormir?',
    intro: 'Comece com tempo suficiente para dormir e depois use sua disposição, seus horários e a qualidade do sono para ajustar o plano.',
    sections: [
      {
        id: 'adult-range',
        heading: 'Use a recomendação como ponto de partida',
        paragraphs: [
          'A orientação do CDC é que adultos de 18 a 60 anos geralmente durmam 7 horas ou mais por dia. O NHLBI costuma apresentar uma faixa de 7 a 9 horas para adultos. Esses números são orientações para a população, não uma pontuação que você precisa alcançar perfeitamente todas as noites. Necessidades individuais, saúde, idade, horários e qualidade do sono variam.',
          'A pergunta útil não é apenas “A que horas devo deitar?”. É também “Quanto tempo consigo reservar para dormir antes de precisar começar o dia?”. Se você acorda às 06:30 e quer oito horas de sono, começar a dormir às 22:30 é o ponto de partida da conta. Se costuma precisar de 15 minutos para se acomodar, deitar por volta das 22:15 dá uma margem ao plano.',
        ],
        table: {
          headers: ['Faixa etária adulta', 'Referência geral', 'Observação para o planejamento'],
          rows: [
            ['18–60 anos', '7 horas ou mais', 'Reserve um período regular para dormir e observe como você funciona no dia a dia.'],
            ['61–64 anos', '7–9 horas', 'Uma faixa pode ser útil quando necessidades e rotinas mudam com a idade.'],
            ['65 anos ou mais', '7–8 horas', 'Use a faixa como contexto, não como um diagnóstico pessoal.'],
          ],
        },
      },
      {
        id: 'duration-and-quality',
        heading: 'A quantidade de horas importa, e a qualidade também',
        paragraphs: [
          'Sete horas na cama nem sempre equivalem a sete horas dormindo. Acordar várias vezes, levar muito tempo para adormecer ou acordar sem se sentir descansado pode reduzir o descanso efetivo da noite. O CDC descreve o sono de qualidade como ininterrupto e reparador, então uma meta de duração deve vir acompanhada de perguntas sobre como a noite realmente foi.',
          'Uma calculadora pode mostrar um intervalo, mas não consegue medir a qualidade do sono. Observe padrões ao longo de vários dias: hora de deitar, hora de acordar, despertares, cochilos, cafeína, álcool, exercícios e seu nível de alerta. Uma anotação breve pode mostrar se o problema é pouco tempo disponível, horários irregulares ou uma dificuldade recorrente de sono que merece atenção profissional.',
        ],
        bullets: [
          'Priorize um horário regular para acordar antes de tentar otimizar alguns minutos na conta da hora de deitar.',
          'Deixe o quarto silencioso, confortável e fresco o suficiente para você se acomodar.',
          'Reduza telas muito iluminadas e tarefas exigentes na parte final da noite.',
        ],
      },
      {
        id: 'example-week',
        heading: 'Leve a conta para uma semana de verdade',
        paragraphs: [
          'Suponha que seu alarme nos dias úteis toque às 06:45. Um plano de 7 horas e 30 minutos de sono aponta para um início estimado do sono às 23:15. Se adormecer leva cerca de 15 minutos, planeje deitar por volta das 23:00. Você pode escolher deitar mais cedo nas noites em que estiver se recuperando de uma noite que terminou tarde, mas mantenha um horário de manhã que seja viável.',
          'Os fins de semana podem dar vontade de deslocar todos os horários. Uma mudança pequena pode ser mais fácil de acomodar do que uma grande alteração. Tanto o NHLBI quanto o CDC destacam horários regulares como um hábito útil para o sono. Use a tabela para conciliar o plano com sua agenda, não como uma regra que se sobrepõe ao trabalho, aos cuidados com outras pessoas, às viagens ou a como você se sente.',
        ],
        table: {
          headers: ['Objetivo', 'Horário de exemplo', 'Por que ajuda'],
          rows: [
            ['Acordar', '06:45', 'Dá um ponto de referência à manhã e facilita calcular a hora de deitar.'],
            ['Deitar', '23:00', 'Reserva uma pequena margem para se acomodar antes do início planejado do sono.'],
            ['Tempo disponível para dormir', '7 horas e 45 minutos', 'Inclui a margem de 15 minutos em vez de contá-la como sono.'],
          ],
        },
      },
      {
        id: 'when-to-ask',
        heading: 'Saiba quando uma calculadora não é suficiente',
        paragraphs: [
          'Dificuldade persistente para adormecer, despertares repetidos, sonolência diurna intensa, ronco alto, engasgos ou pausas na respiração exigem a avaliação de um profissional de saúde habilitado. Um diário do sono pode ajudar você a descrever o padrão: registre quando deita, quando acorda, cochilos, exercícios, cafeína ou álcool, medicamentos e como se sente em relação ao descanso.',
          'Este guia é um conteúdo educativo de bem-estar. Ele não diagnostica nem trata doenças, e mais horas não são automaticamente melhores para todas as pessoas. Use as recomendações para adultos como ponto de partida, crie uma rotina viável e busque orientação individual quando esse padrão continuar interferindo na vida diária.',
        ],
      },
    ],
    sources: [...sleepSources, durationSource],
    related: ['/pt-br', '/pt-br/ciclos-do-sono', '/pt-br/horario-de-sono', '/pt-br/tempo-para-adormecer'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/tempo-para-adormecer',
    locale: 'pt-BR',
    kind: 'guide',
    key: 'latency',
    title: 'Quanto tempo leva para adormecer?',
    description: 'Entenda a latência do sono, use uma margem simples no planejamento e reconheça quando a dificuldade recorrente merece ajuda profissional.',
    heading: 'Planeje o tempo entre deitar e dormir',
    intro: 'Adormecer faz parte da noite. Inclua essa transição em vez de tratar a hora de deitar como um interruptor instantâneo.',
    sections: [
      {
        id: 'latency-definition',
        heading: 'A latência do sono é uma transição normal',
        paragraphs: [
          'Latência do sono é o tempo entre tentar dormir e realmente adormecer. Ela muda de uma noite para outra. Você pode adormecer rapidamente depois de um dia exigente, precisar de mais tempo quando a mente está ocupada ou passar mais tempo acordado quando seus horários estão fora de ritmo. Uma única estimativa não consegue indicar se há algo errado.',
          'Para planejar, esta calculadora usa uma margem padrão de 15 minutos. Esse número mantém a conta simples e dá uma folga ao horário calculado para deitar. Não é uma meta, uma promessa nem uma medição de um estudo do sono. Se o seu padrão pessoal for diferente, use o resultado como lembrete para começar sua rotina mais cedo ou reservar mais tempo na cama.',
        ],
      },
      {
        id: 'simple-arithmetic',
        heading: 'Veja o que a margem muda',
        paragraphs: [
          'Suponha que você precise estar dormindo por volta das 23:00. Se costuma levar 15 minutos para se acomodar, deitar às 22:45 dá uma margem razoável à conta. Se a duração planejada do sono for de 7 horas e 30 minutos e o horário de acordar for 07:00, a mesma conta coloca a hora de deitar às 23:15 para uma estimativa de cinco ciclos: 07:00 menos 7 horas e 30 minutos menos 15 minutos.',
          'O resultado ajuda a separar duas perguntas: quanto tempo você quer dormir e de quanto tempo precisa para se preparar para o sono. Manter essas perguntas separadas pode diminuir a pressão para adormecer no instante em que a cabeça toca o travesseiro.',
        ],
        table: {
          headers: ['Início planejado do sono', 'Margem', 'Hora de deitar'],
          rows: [
            ['22:30', '15 minutos', '22:15'],
            ['23:00', '30 minutos', '22:30'],
            ['23:15', '15 minutos', '23:00'],
          ],
        },
      },
      {
        id: 'reduce-friction',
        heading: 'Torne a transição menos exigente',
        paragraphs: [
          'Use a parte final da noite para facilitar a transição: termine as tarefas práticas, diminua a luz forte, deixe o celular de lado se ele mantém você em alerta e mantenha o quarto silencioso e confortável. Uma sequência que possa ser repetida importa mais do que uma rotina complicada. Tente não transformar o relógio em uma prova na qual você pode passar ou falhar.',
          'Cafeína, nicotina, álcool, refeições pesadas tarde da noite, exercícios intensos perto da hora de dormir, estresse e horários irregulares podem afetar essa transição. Você não precisa mudar tudo de uma vez. Escolha um pequeno ajuste, repita por várias noites e observe o padrão em vez de julgar um único resultado.',
        ],
        bullets: [
          'Comece a desacelerar antes do horário calculado para deitar.',
          'Anote a hora de deitar, a hora de acordar, os cochilos e qualquer coisa que possa ter mudado sua noite.',
          'Se você estiver acordado e cada vez mais frustrado, faça uma atividade tranquila até sentir sono novamente.',
        ],
      },
      {
        id: 'persistent-difficulty',
        heading: 'Quando a dificuldade recorrente pede outra conversa',
        paragraphs: [
          'Se a dificuldade para adormecer persistir, afetar seu funcionamento durante o dia ou vier acompanhada de despertares repetidos, sonolência excessiva, ronco alto, engasgos ou pausas na respiração, peça uma avaliação a um profissional de saúde habilitado. Um diário do sono pode trazer detalhes úteis para essa conversa sem exigir um dispositivo de monitoramento ou microfone.',
          'Este guia é um conteúdo educativo de bem-estar, não uma orientação médica. A calculadora pode reservar tempo para uma transição, mas não consegue diagnosticar um distúrbio do sono nem substituir cuidados individualizados. O objetivo é ter uma oportunidade sustentável de dormir, não alcançar um número perfeitamente cronometrado.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/pt-br/hora-de-dormir', '/pt-br', '/pt-br/horario-de-sono', '/pt-br/quantas-horas-dormir'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/horario-de-sono',
    locale: 'pt-BR',
    kind: 'guide',
    key: 'schedule',
    title: 'Como organizar seu horário de sono',
    description: 'Crie horários de sono viáveis para adultos, com uma hora estável de acordar, tempo suficiente para dormir e espaço para a vida real.',
    heading: 'Monte uma rotina de sono que você consiga repetir',
    intro: 'Um ponto de referência estável e tempo suficiente para dormir são uma base mais sólida do que um cálculo perfeito da hora de deitar.',
    sections: [
      {
        id: 'choose-anchor',
        heading: 'Escolha primeiro o ponto de referência da manhã',
        paragraphs: [
          'Comece pelo horário em que você precisa levantar na maioria dos dias. Faça a conta para trás para reservar pelo menos a quantidade de sono recomendada para sua idade e suas circunstâncias. Para adultos de 18 a 60 anos, a orientação do CDC é de 7 horas ou mais por dia. O NHLBI também destaca deitar e acordar no mesmo horário todos os dias como um hábito útil.',
          'Um horário de acordar como referência torna o restante do plano mais claro. Se o alarme toca às 06:30 e você quer 8 horas de sono, planeje começar a dormir por volta das 22:30. Se costuma levar 15 minutos para adormecer, deite perto das 22:15. Essa transição extra faz parte do planejamento, embora não seja tempo de sono.',
        ],
      },
      {
        id: 'weekly-example',
        heading: 'Torne a semana concreta',
        paragraphs: [
          'Anote o plano ao lado dos compromissos que definem sua noite. A ideia é ver se o horário proposto para deitar é viável, não criar mais um motivo para sentir que você está atrasado. Se uma reunião até tarde ou uma tarefa de cuidado mudar uma noite, retome seu ponto de referência quando puder e ajuste a noite seguinte sem tentar compensar com contas complicadas.',
          'Pequenas diferenças entre dias úteis e fins de semana podem ser mais fáceis de administrar do que uma mudança grande. O NHLBI sugere manter essa diferença em cerca de uma hora, quando possível. Trabalho, família, viagens e saúde podem exigir outro padrão; use a tabela como exemplo de planejamento, não como um horário rígido.',
        ],
        table: {
          headers: ['Dia', 'Hora de acordar', 'Hora de deitar', 'Tempo disponível para dormir'],
          rows: [
            ['Segunda a quinta-feira', '06:30', '22:15', '8 horas e 15 minutos, incluindo o tempo para se acomodar'],
            ['Sexta-feira', '06:30', '22:30', '8 horas'],
            ['Sábado', '07:15', '23:00', '8 horas'],
            ['Domingo', '06:30', '22:15', '8 horas e 15 minutos, incluindo o tempo para se acomodar'],
          ],
        },
      },
      {
        id: 'support-the-evening',
        heading: 'Facilite o cumprimento dos horários',
        paragraphs: [
          'Use a última hora para tarefas previsíveis e menos estimulantes. Prepare roupas ou comida, reduza a luz forte e mantenha o quarto silencioso, fresco e confortável. O CDC também recomenda evitar refeições grandes e álcool antes de dormir e limitar a cafeína à tarde ou à noite. Escolha as mudanças que cabem na sua vida, em vez de copiar uma lista longa que você vai abandonar.',
          'Uma rotina de sono funciona melhor quando a manhã também contribui. Faça atividades físicas regularmente durante o dia e passe tempo ao ar livre quando possível. Deixe o horário de acordar visível na sua agenda e use um alarme ou lembrete que não exija uma conta. O cálculo pode indicar uma direção; a repetição dá sentido a ela.',
        ],
        bullets: [
          'Priorize o tempo disponível para dormir antes de reduzir o plano para encaixar mais tarefas.',
          'Mantenha uma sequência curta de desaceleração na mesma ordem na maioria das noites.',
          'Avalie o padrão depois de vários dias, em vez de mudá-lo após uma única noite difícil.',
        ],
      },
      {
        id: 'adapt-without-chasing',
        heading: 'Adapte sem perseguir um número perfeito',
        paragraphs: [
          'Viagens, mudanças nos relógios, trabalho em turnos, doenças, estresse e compromissos sociais podem alterar os horários. Nesses dias, use os mesmos princípios: reserve tempo suficiente para dormir, mantenha um ponto de referência quando possível e permita uma transição tranquila. Uma estimativa de ciclos de 90 minutos pode ajudar a comparar opções, mas os ciclos reais variam e não devem se sobrepor ao tempo total disponível para dormir.',
          'Se você frequentemente não consegue manter uma rotina porque o sono não vem, ou se tem sonolência excessiva durante o dia, ronco alto, engasgos ou pausas na respiração, converse com um profissional de saúde habilitado. Este guia é um conteúdo educativo de bem-estar, não uma orientação médica.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/pt-br', '/pt-br/hora-de-dormir', '/pt-br/quantas-horas-dormir', '/pt-br/tempo-para-adormecer'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/sobre',
    locale: 'pt-BR',
    kind: 'legal',
    key: 'about',
    title: 'Sobre o SleepLike',
    description: 'Saiba quem publica o SleepLike, para que serve a calculadora e como o conteúdo educativo é mantido.',
    heading: 'Sobre o SleepLike / Maat Work',
    intro: 'O SleepLike é um pequeno projeto educativo de bem-estar da equipe editorial SleepLike / Maat Work.',
    sections: [
      {
        id: 'purpose',
        heading: 'Uma ferramenta simples de planejamento',
        paragraphs: [
          'O SleepLike ajuda adultos a organizar a hora de deitar, a hora de acordar, um cochilo ou o tempo disponível para dormir usando contas simples feitas localmente. Ele não exige conta nem microfone, e o cálculo principal foi desenvolvido para funcionar no navegador sem enviar horários de sono a um servidor.',
          'As estimativas usam convenções comuns de planejamento do sono e explicam seus limites. O sono varia de pessoa para pessoa e de uma noite para outra. Por isso, a ferramenta serve para o planejamento educativo do bem-estar e não é uma orientação médica, um dispositivo médico nem uma forma de diagnosticar uma condição relacionada ao sono.',
        ],
        bullets: [
          'SleepLike / Maat Work é o nome editorial institucional deste projeto.',
          'A calculadora não mede as fases do sono nem prevê o que acontecerá durante uma noite.',
          'Dúvidas sobre sintomas ou cuidados pessoais devem ser tratadas com um profissional de saúde habilitado.',
        ],
      },
      {
        id: 'editorial-approach',
        heading: 'Como o conteúdo é mantido',
        paragraphs: [
          'A equipe editorial escreve explicações práticas com base em fontes primárias públicas de saúde, informa as premissas usadas pela calculadora e registra uma data de atualização em cada página. As páginas são voltadas à educação geral de adultos e não apresentam a equipe como profissionais clínicos nem afirmam ter revisão médica.',
          'O projeto pode mudar conforme o produto, as fontes ou a configuração de privacidade mudam. A página de metodologia explica as contas e os limites das estimativas para que você possa decidir se um resultado é útil para sua situação.',
        ],
      },
      {
        id: 'contact',
        heading: 'Entre em contato com a equipe',
        paragraphs: [
          'Para dúvidas sobre o produto, acessibilidade, privacidade ou conteúdo, acesse a página pública de contato da MaatWork em https://maat.work. Não envie um histórico médico detalhado por um formulário geral de contato do produto. Se você tiver alguma preocupação com o sono, procure um profissional de saúde habilitado.',
        ],
      },
    ],
    sources: [contactSource, sleepSources[0]],
    related: ['/pt-br/contato', '/pt-br/privacidade', '/pt-br/termos', '/pt-br/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/contato',
    locale: 'pt-BR',
    kind: 'legal',
    key: 'contact',
    title: 'Contato do SleepLike',
    description: 'Encontre o canal público de contato da MaatWork para dúvidas sobre o SleepLike, privacidade, acessibilidade ou conteúdo.',
    heading: 'Entre em contato com o SleepLike',
    intro: 'Use o canal público de contato da MaatWork para dúvidas sobre o produto, privacidade, acessibilidade ou conteúdo.',
    sections: [
      {
        id: 'public-contact',
        heading: 'Onde escrever',
        paragraphs: [
          'O canal público de contato é https://maat.work. O site da MaatWork publica o e-mail comercial maatwork.comercial@gmail.com para dúvidas gerais. Use o canal mais conveniente e mencione o SleepLike para dar contexto à pergunta.',
          'O SleepLike é uma ferramenta educativa de bem-estar. A equipe pode receber dúvidas sobre o site, conteúdo, acessibilidade ou configuração de privacidade, mas não oferece orientação médica individualizada nem interpreta sintomas.',
        ],
      },
      {
        id: 'useful-context',
        heading: 'O que ajuda na investigação',
        paragraphs: [
          'Para uma dúvida sobre o produto, inclua o caminho da página, o navegador, o idioma e uma descrição breve do que você esperava que acontecesse. Evite enviar diários do sono, prontuários ou outros históricos de saúde por um canal geral de contato; um profissional de saúde habilitado é a pessoa indicada para orientar você sobre seu sono.',
          'Para uma dúvida sobre privacidade, descreva a configuração ou a escolha de consentimento sobre a qual deseja saber. A página de privacidade explica o que a ferramenta local armazena e como as integrações opcionais de terceiros são descritas quando estão ativadas.',
        ],
      },
      {
        id: 'response-scope',
        heading: 'Para que serve este canal',
        paragraphs: [
          'Este canal serve para dúvidas sobre o serviço e seu conteúdo. Não é um serviço de emergência. Se você tiver uma preocupação urgente de saúde ou segurança, entre em contato com o serviço local de emergência ou de saúde adequado.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/pt-br/sobre', '/pt-br/privacidade', '/pt-br/termos', '/pt-br/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/privacidade',
    locale: 'pt-BR',
    kind: 'legal',
    key: 'privacy',
    title: 'Privacidade no SleepLike',
    description: 'Saiba como o SleepLike lida com cálculos locais, preferências do navegador, análises opcionais, consentimento e integrações de publicidade preparadas.',
    heading: 'Privacidade no SleepLike',
    intro: 'A calculadora foi desenvolvida para uso local, com poucas preferências no navegador e escolhas claras sobre serviços opcionais.',
    sections: [
      {
        id: 'local-calculator',
        heading: 'A calculadora funciona localmente',
        paragraphs: [
          'O cálculo principal foi desenvolvido para funcionar no seu navegador. Ele não exige conta nem microfone e não foi projetado para manter histórico de saúde, diário do sono, histórico de horários de deitar ou acordar nem valores informados nos cálculos em um servidor do SleepLike. O resultado é produzido a partir dos valores que você informa e dos dados do relógio local necessários para a conta.',
          'O navegador pode armazenar um conjunto limitado de preferências, como idioma, formato de horário ou escolha de consentimento. Esse armazenamento no navegador serve apenas para preferências e controle de consentimento; não é usado para manter um histórico pessoal de informações de sono ou saúde.',
        ],
      },
      {
        id: 'prepared-services',
        heading: 'Integrações preparadas e seu funcionamento',
        paragraphs: [
          'Uma integração de terceiros pode estar preparada no código sem estar ativada em todas as versões publicadas do site. O Vercel Analytics só fica disponível depois que você aceita seu uso pelo controle Preferências de privacidade no rodapé; quando ativado, ele é usado de forma agregada para medir a atividade nos caminhos das páginas. Ele não se destina a receber horários exatos de deitar, acordar ou cochilar, nem os valores informados na calculadora.',
          'A disponibilidade e a configuração de serviços opcionais podem mudar conforme a versão publicada. Um serviço descrito aqui como preparado não deve ser interpretado como prova de que está funcionando durante sua visita; a interface de consentimento e o comportamento da rede no navegador são os indicadores práticos daquela sessão.',
        ],
      },
      {
        id: 'advertising-choice',
        heading: 'Publicidade condicionada',
        paragraphs: [
          'Se a publicidade for ativada, ela só será carregada depois que as integrações relevantes do Google CMP e do AdSense forem ativadas e aprovadas. Os anúncios permanecem desligados até que essas condições sejam atendidas. A interface de consentimento foi concebida para permitir que você aceite, recuse, desative ou altere sua escolha. O SleepLike solicita anúncios não personalizados somente após seu consentimento. Esses anúncios ainda podem usar cookies e processar informações como seu endereço IP ou detalhes do dispositivo. Recusar o consentimento mantém a calculadora disponível sem anúncios.',
          'A publicidade é opcional na configuração do produto e não é necessária para o cálculo local. Não há previsão de exibir publicidade nesta página legal. O texto aqui descreve uma configuração possível; não afirma que a publicidade esteja funcionando no momento em que você o lê.',
        ],
      },
      {
        id: 'choices-and-questions',
        heading: 'Seus controles e suas dúvidas',
        paragraphs: [
          'Use o controle Preferências de privacidade no rodapé para desativar um serviço ou revogar uma escolha anterior. Seu navegador pode manter a preferência necessária para lembrar essa decisão. Limpar os dados do site pode remover essa preferência e exigir que você escolha novamente. O site não usa esse armazenamento para manter um histórico de saúde.',
          'Para dúvidas sobre privacidade, acesse https://maat.work ou use o contato comercial público informado na página de contato. Esta página traz informações gerais sobre o produto e não representa uma promessa sobre um serviço que esteja desativado na versão que você está usando.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/pt-br/sobre', '/pt-br/contato', '/pt-br/termos', '/pt-br/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/termos',
    locale: 'pt-BR',
    kind: 'legal',
    key: 'terms',
    title: 'Termos do SleepLike',
    description: 'Termos gerais de uso do SleepLike como ferramenta educativa de planejamento do sono.',
    heading: 'Termos de uso do SleepLike',
    intro: 'Estes termos gerais descrevem o uso pretendido e os limites do site e da calculadora SleepLike.',
    sections: [
      {
        id: 'educational-service',
        heading: 'O que o serviço oferece',
        paragraphs: [
          'O SleepLike oferece páginas educativas estáticas e uma calculadora local para planejar horários aproximados de dormir e acordar. Ele se destina a adultos que buscam informações gerais de bem-estar. O serviço não oferece orientação médica, diagnóstico, tratamento, suporte de emergência nem medição das fases do sono.',
          'Os cálculos usam premissas declaradas, incluindo um intervalo aproximado de ciclo e uma margem para adormecer. Os resultados são estimativas para planejamento. O sono varia de pessoa para pessoa e de uma noite para outra, então você continua sendo responsável por decidir se um horário sugerido se ajusta às suas circunstâncias.',
        ],
      },
      {
        id: 'use-and-changes',
        heading: 'Como usar as páginas',
        paragraphs: [
          'Use as páginas para fins pessoais e lícitos de informação e não trate uma estimativa como garantia. Não use a calculadora como única base para uma decisão crítica de segurança, principalmente quando estiver com muito sono ou precisar dirigir, operar equipamentos ou realizar outra tarefa que exija atenção.',
          'Conteúdo, cálculos, links e integrações opcionais podem ser atualizados, removidos ou alterados conforme o projeto evolui. A data de atualização de uma página ajuda a identificar a versão do texto educativo que você leu. Sites externos têm seus próprios conteúdos e práticas.',
        ],
      },
      {
        id: 'health-and-contact',
        heading: 'Dúvidas de saúde e contato',
        paragraphs: [
          'Se você tiver dificuldade persistente para dormir, sonolência excessiva durante o dia, ronco alto, engasgos, pausas na respiração ou outra preocupação de saúde, converse com um profissional de saúde habilitado. Para dúvidas sobre o produto, privacidade, acessibilidade ou conteúdo, use https://maat.work. Não envie históricos de saúde sensíveis por um canal geral de contato do produto.',
          'Estes termos descrevem o serviço em linguagem simples. Eles não acrescentam uma promessa de que a calculadora seja adequada a uma pessoa, rotina, condição de saúde ou resultado específico.',
        ],
      },
    ],
    sources: [contactSource],
    related: ['/pt-br/sobre', '/pt-br/contato', '/pt-br/privacidade', '/pt-br/metodologia'],
    updated: '2026-10-22',
  },
  {
    path: '/pt-br/metodologia',
    locale: 'pt-BR',
    kind: 'legal',
    key: 'methodology',
    title: 'Metodologia do SleepLike',
    description: 'Conheça os quatro modos da calculadora, as premissas, o uso da hora local, o tratamento das datas e os limites das estimativas do SleepLike.',
    heading: 'Como funcionam as estimativas do SleepLike',
    intro: 'O SleepLike usa contas transparentes com os horários para organizar quatro modos de planejamento; ele não prevê as fases do sono.',
    sections: [
      {
        id: 'four-modes',
        heading: 'Os quatro modos de planejamento',
        paragraphs: [
          'Cada modo responde a uma pergunta diferente sobre horários. A ferramenta usa a data e a hora locais disponíveis no navegador e retorna um pequeno conjunto de estimativas fáceis de ler. O resultado é uma ajuda para planejar, não uma medição de sensor nem uma avaliação clínica.',
        ],
        table: {
          headers: ['Modo', 'Ponto de partida', 'Cálculo'],
          rows: [
            ['Acordar', 'Um horário desejado para acordar', 'Subtrai uma duração estimada de sono e a margem para adormecer.'],
            ['Dormir agora', 'Um registro da hora local no momento do cálculo', 'Soma a margem e um ou mais intervalos aproximados de ciclo.'],
            ['Cochilo', 'Um horário de início do cochilo', 'Soma uma opção curta de cerca de 20 minutos na cama ou uma opção mais longa de cerca de 90 minutos.'],
            ['Tempo disponível', 'Um intervalo fixo disponível', 'Compara quantidades aproximadas de ciclos que cabem no tempo disponível.'],
          ],
        },
      },
      {
        id: 'arithmetic-assumptions',
        heading: 'As premissas por trás da conta',
        paragraphs: [
          'O intervalo padrão de ciclo é de 90 minutos. O NHLBI descreve os ciclos do sono como sequências que recomeçam aproximadamente a cada 80 a 100 minutos, então 90 é usado como um ponto médio conveniente, não como uma duração biológica exata. A margem padrão para adormecer é de 15 minutos, um valor prático de planejamento que não representa uma medição da sua latência.',
          'Como contexto para adultos, a orientação do CDC é que pessoas de 18 a 60 anos geralmente durmam pelo menos 7 horas por dia. A calculadora não força todos os resultados a corresponder a uma necessidade pessoal de sono; ela mostra a conta para que você possa priorizar uma opção que reserve tempo suficiente para o seu descanso.',
        ],
      },
      {
        id: 'dates-and-daylight',
        heading: 'Datas, meia-noite e mudanças nos relógios',
        paragraphs: [
          'Quando a subtração atravessa a meia-noite, a data muda junto. Um resultado depois das 00:00 pertence à data seguinte no calendário, e um resultado antes da meia-noite pertence à data anterior quando a conta é feita para trás a partir de um horário de manhã. O horário exibido usa o contexto de hora local do navegador.',
          'Perto de uma transição de horário de verão, as contas com a hora local seguem as regras de data e hora fornecidas pelo navegador. Um intervalo no relógio pode parecer mais curto ou mais longo quando os relógios mudam. O SleepLike não inventa um fuso horário, não converte silenciosamente o resultado para outro local e não prevê fases futuras do sono.',
        ],
      },
      {
        id: 'limits',
        heading: 'O que a ferramenta não faz',
        paragraphs: [
          'A calculadora não usa microfone, dispositivo vestível, conta nem sensor de sono. Ela não identifica sono REM, sono profundo, despertares ou distúrbios e não promete que acordar em um horário exibido vai produzir uma sensação específica. Estresse, luz, doenças, substâncias, mudanças na rotina e a variação normal de uma noite para outra podem mudar o resultado que você vivencia.',
          'Se os problemas de sono persistirem ou você tiver sonolência excessiva durante o dia, ronco alto, engasgos ou pausas na respiração, converse com um profissional de saúde habilitado. Esta metodologia explica um cálculo educativo simples e não é uma orientação médica.',
        ],
      },
    ],
    sources: sleepSources,
    related: ['/pt-br/sobre', '/pt-br/privacidade', '/pt-br/termos', '/pt-br/ciclos-do-sono'],
    updated: '2026-10-22',
  },
];
