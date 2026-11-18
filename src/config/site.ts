/**
 * Dados centrais do site. Tudo que aparece em mais de um lugar
 * (WhatsApp, CRM, endereço, domínio) vive aqui.
 *
 * ⚠️  Campos marcados com TODO precisam ser preenchidos antes de publicar.
 */

export const site = {
  // TODO: domínio definitivo (sem barra no final). Também atualizar em astro.config.mjs
  url: 'https://brvitta.com.br',
  name: 'Vitta Performance',
  shortName: 'BrVitta',

  doctor: {
    name: 'Dr. Bruno Ricardo Rodrigues Batista',
    displayName: 'Dr. Bruno Ricardo',
    // TODO: número do CRM (obrigatório em toda publicidade médica — Res. CFM 2.336/2023)
    crm: 'CRM-SP 000000',
    education: 'Medicina pela Universidade Municipal de São Caetano do Sul (USCS)',
  },

  whatsapp: {
    // TODO: número com DDI + DDD, só dígitos. Ex.: 5511999999999
    number: '5511900000000',
    defaultMessage:
      'Olá! Vim pelo site da Vitta Performance e gostaria de agendar uma consulta com o Dr. Bruno.',
  },

  // TODO: endereço completo exatamente igual ao do Perfil da Empresa no Google (NAP consistente)
  address: {
    street: 'Rua Exemplo, 000 — Sala 00',
    neighborhood: 'Centro',
    city: 'Santo André',
    state: 'SP',
    postalCode: '09000-000',
    country: 'BR',
    // TODO: coordenadas do consultório (clique com o botão direito no Google Maps > copiar)
    lat: -23.6639,
    lng: -46.5383,
  },

  // TODO: link do Perfil da Empresa no Google Maps (ex.: https://maps.app.goo.gl/...)
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vitta+Performance+Santo+Andr%C3%A9',

  // TODO: confirmar horários de atendimento
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
  ],
  openingHoursLabel: 'Segunda a sexta, das 8h às 19h',

  instagram: '', // TODO: ex.: https://instagram.com/brvitta (deixe vazio para ocultar)
  platformUrl: 'https://brvitta.vercel.app/login',

  // Analytics/conversão (opcional). Deixe vazio para não carregar nada.
  analytics: {
    googleTagId: '', // ex.: G-XXXXXXX ou AW-XXXXXXX (Google Ads)
    metaPixelId: '', // ex.: 123456789012345
  },
} as const;

export function whatsappLink(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const plans = [
  {
    id: 'avulsa',
    name: 'Consulta Avulsa',
    tagline: 'Para conhecer o método e sair com um plano claro.',
    price: 'R$ 500',
    priceNote: 'pagamento único',
    priceTotal: null,
    featured: false,
    items: [
      'Consulta médica completa, de 50 a 60 minutos',
      'Análise e interpretação de exames laboratoriais',
      'Avaliação de composição corporal (InBody)',
      'Planejamento de treino, nutrição, suplementação e estilo de vida',
      '1 retorno incluído em até 1 mês',
      'Suporte pontual para dúvidas pelo WhatsApp',
    ],
  },
  {
    id: 'evolution',
    name: 'Vitta Evolution',
    tagline: 'Seis meses de acompanhamento, com ajustes a cada etapa.',
    price: 'R$ 250',
    priceNote: '/mês em até 6x',
    priceTotal: 'R$ 1.500 no total, ou R$ 1.425 à vista',
    featured: false,
    items: [
      '4 consultas em 6 meses, a cada 2 meses',
      'Composição corporal em todas as consultas',
      'Acompanhamento de exames laboratoriais',
      'Ajustes contínuos de treino, nutrição e suplementação',
      'Suporte para dúvidas pelo WhatsApp',
    ],
  },
  {
    id: 'performance',
    name: 'Vitta Performance',
    tagline: 'Um ano inteiro de cuidado, para resultado que se sustenta.',
    price: 'R$ 208,33',
    priceNote: '/mês em até 12x',
    priceTotal: 'R$ 2.500 no total, ou R$ 2.375 à vista',
    featured: true,
    items: [
      '7 consultas em 12 meses, a cada 2 meses',
      'Composição corporal em todas as consultas',
      'Acompanhamento de exames laboratoriais',
      'Ajustes contínuos de treino, nutrição e suplementação',
      'Suporte para dúvidas pelo WhatsApp',
      'Acompanhamento por 12 meses',
    ],
  },
] as const;

export const faqs = [
  {
    q: 'Preciso praticar esporte para ser atendido?',
    a: 'Não. O atendimento cuida da relação entre saúde, corpo e movimento. Atendemos quem treina há anos e quem ainda não começou, incluindo quem quer sair do sedentarismo com segurança.',
  },
  {
    q: 'Como funciona a primeira consulta?',
    a: 'Você responde uma anamnese antes do encontro. Na consulta, de 50 a 60 minutos, conversamos sobre histórico, rotina, treino, sono e objetivos, fazemos exame físico e avaliação de composição corporal e definimos juntos o plano.',
  },
  {
    q: 'O atendimento é presencial ou online?',
    a: 'A primeira consulta é presencial, no consultório em Santo André. Os retornos podem ser presenciais ou por teleconsulta, conforme o seu plano.',
  },
  {
    q: 'Onde fica o consultório?',
    a: 'Em Santo André, SP. O endereço completo e as orientações de chegada são enviados na confirmação do agendamento.',
  },
  {
    q: 'Preciso assinar um plano ou posso fazer uma consulta única?',
    a: 'A consulta avulsa é a porta de entrada mais comum. Se fizer sentido continuar, os planos de acompanhamento são apresentados na própria consulta, sem compromisso.',
  },
  {
    q: 'Atende convênio?',
    a: 'O atendimento é particular. Emitimos recibo e relatório para você solicitar reembolso ao seu convênio, quando o plano prevê essa possibilidade.',
  },
  {
    q: 'Como faço para agendar?',
    a: 'Pelo WhatsApp. Você fala direto com a nossa equipe, tira as dúvidas e escolhe o melhor horário.',
  },
] as const;
