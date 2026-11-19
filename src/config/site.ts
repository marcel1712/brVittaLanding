/**
 * Dados centrais do site. Tudo que aparece em mais de um lugar
 * (WhatsApp, CRM, endereço, domínio) vive aqui.
 *
 * ⚠️  Campos marcados com TODO precisam ser preenchidos antes de publicar.
 */

export const site = {
  // Domínio definitivo (sem barra no final). Manter igual em astro.config.mjs e public/robots.txt
  url: 'https://www.brvitta.com.br',
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
      'Olá! Vim pelo site da BrVitta e gostaria de agendar uma consulta com o Dr. Bruno.',
  },

  // Manter idêntico ao Perfil da Empresa no Google (NAP consistente)
  address: {
    building: 'Edifício Works',
    street: 'Av. Dom Pedro II, 1641',
    // TODO: número da sala, se quiser exibir (ex.: 'Sala 52')
    unit: '',
    neighborhood: 'Campestre',
    city: 'Santo André',
    state: 'SP',
    postalCode: '09080-111',
    country: 'BR',
    // TODO: confirmar o pino exato (Google Maps > botão direito no prédio > copiar coordenadas).
    // Valor atual = interpolação do nº 1641 entre endereços do OpenStreetMap na mesma avenida
    // (nº 1313 e nº 1961, lado ímpar); o prédio em si não existe no OpenStreetMap.
    lat: -23.6423,
    lng: -46.5403,
  },

  // Edifício Works desenhado em 3D (dourado) no mapa, porque a base do OpenStreetMap não tem o prédio.
  building3d: {
    // TODO: confirmar o número de andares
    floors: 15,
    floorHeight: 3.3, // metros por andar
    // base retangular centrada no pino, alinhada à avenida (metros; graus a partir do norte)
    width: 22,
    depth: 30,
    bearing: -28,
    // opcional: contorno exato do prédio [[lng, lat], ...]; quando preenchido, substitui o retângulo
    footprint: null as null | [number, number][],
  },

  // TODO: trocar pelo link do Perfil da Empresa no Google Maps quando existir (ex.: https://maps.app.goo.gl/...)
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio+Works+Av.+Dom+Pedro+II+1641+Campestre+Santo+Andr%C3%A9+SP',
  wazeUrl: 'https://waze.com/ul?q=Av.%20Dom%20Pedro%20II%2C%201641%2C%20Santo%20Andr%C3%A9&navigate=yes',

  // TODO: confirmar horários de atendimento
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
  ],
  openingHoursLabel: 'Segunda a sexta, das 8h às 19h',

  instagram: '', // TODO: ex.: https://instagram.com/brvitta (deixe vazio para ocultar)

  // Analytics/conversão (opcional). Deixe vazio para não carregar nada.
  analytics: {
    googleTagId: '', // ex.: G-XXXXXXX ou AW-XXXXXXX (Google Ads)
    metaPixelId: '', // ex.: 123456789012345
  },
} as const;

export function whatsappLink(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const faqs = [
  {
    q: 'Preciso praticar esporte para ser atendido?',
    a: 'Não. O atendimento cuida da relação entre saúde, corpo e movimento. Atendemos quem treina há anos e quem ainda não começou, incluindo quem quer sair do sedentarismo com segurança.',
  },
  {
    q: 'Como funciona a primeira consulta?',
    a: 'São de 50 a 60 minutos para conversar sobre histórico, rotina, treino, sono e objetivos, fazer o exame físico e a avaliação de composição corporal, ler seus exames e definir juntos as prioridades.',
  },
  {
    q: 'O atendimento é presencial ou online?',
    a: 'A consulta é presencial, no consultório em Santo André. Entre as consultas, o acompanhamento e o suporte para dúvidas acontecem pelo WhatsApp.',
  },
  {
    q: 'Onde fica o consultório?',
    a: 'No Edifício Works, na Av. Dom Pedro II, 1641, no Campestre, em Santo André. As orientações de chegada são enviadas na confirmação do agendamento.',
  },
  {
    q: 'Quanto custa a consulta?',
    a: 'Os valores e as formas de pagamento são informados pelo WhatsApp, junto com os horários disponíveis. Se fizer sentido continuar depois da primeira consulta, as opções de acompanhamento são apresentadas sem compromisso.',
  },
  {
    q: 'Atende convênio?',
    a: 'O atendimento é particular. Emitimos recibo e relatório para você solicitar reembolso, quando o seu convênio prevê essa possibilidade.',
  },
  {
    q: 'Como faço para agendar?',
    a: 'Pelo WhatsApp. Você fala direto com a nossa equipe, tira as dúvidas, consulta valores e escolhe o melhor horário.',
  },
] as const;
