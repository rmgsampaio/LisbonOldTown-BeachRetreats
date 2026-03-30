/**
 * Central data file for all apartments.
 * Edit this file to update prices, descriptions, images, etc.
 * 
 * For quick edits (prices, unavailable dates), use the /admin page instead.
 * Admin overrides are saved in localStorage and merged with these defaults.
 */

const defaultApartments = {
  alfama: {
    id: 'alfama',
    slug: 'alfama',
    name: 'Sunny & Cozy Apartment',
    tagline: {
      pt: 'Apartamento 1 quarto - Alfama, Lisboa',
      en: '1 Bedroom Apartment - Alfama, Lisbon',
    },
    description: {
      pt: `O Sunny & Cozy Apartment é um apartamento cheio de luz, equipado para proporcionar todo o conforto, localizado no bairro mais histórico e na Lisboa mais antiga - Alfama. Está a apenas cerca de 5 minutos a pé do centro da cidade, do rio, do Miradouro das Portas do Sol e, um pouco mais acima, do Castelo de São Jorge. Perto de todo o tipo de transportes públicos, supermercados, cafés, restaurantes típicos, casas de fado, bares...`,
      en: `The Sunny & Cozy Apartment is a light-filled apartment, fully equipped for maximum comfort, located in Lisbon's most historic and oldest neighbourhood - Alfama. It's just a 5-minute walk from the city centre, the river, the Portas do Sol viewpoint, and a bit further up, São Jorge Castle. Close to all kinds of public transport, supermarkets, cafés, traditional restaurants, fado houses, bars...`,
    },
    location: {
      pt: 'Beco das Cruzes, Porta 6, Alfama, Lisboa, Portugal',
      en: 'Beco das Cruzes, Door 6, Alfama, Lisbon, Portugal',
    },
    coverImage: '/imagens/alfamaApartamento/sala1.jpg',
    images: [
      '/imagens/alfamaApartamento/sala1.jpg',
      '/imagens/alfamaApartamento/sala2.jpg',
      '/imagens/alfamaApartamento/sala3.jpg',
      '/imagens/alfamaApartamento/cozinha1.jpg',
      '/imagens/alfamaApartamento/cozinha2.jpg',
      '/imagens/alfamaApartamento/quarto1.jpg',
      '/imagens/alfamaApartamento/quarto2.jpg',
      '/imagens/alfamaApartamento/WC1.jpg',
    ],
    capacity: {
      guests: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
    },
    highlights: {
      pt: ['Varanda com vista', 'Luz natural todo o dia', 'Localização no centro da cidade'],
      en: ['Balcony with a view', 'Natural light all day', 'City centre location'],
    },
    facilities: {
      pt: ['Cozinha equipada', 'Wi-Fi', 'TV cabo', 'Aquecimento elétrico', 'Roupa de cama e de banho'],
      en: ['Equipped kitchen', 'Wi-Fi', 'Cable TV', 'Electric heating', 'Bed linen and towels'],
    },
    nearby: {
      pt: ['Castelo de São Jorge', 'Miradouro de Santa Luzia', 'Baixa de Lisboa', 'Estação de comboios de Santa Apolónia'],
      en: ['São Jorge Castle', 'Santa Luzia Viewpoint', 'Lisbon Downtown', 'Santa Apolónia Train Station'],
    },
    policies: {
      pt: ['Fumar não é permitido', 'Animais de estimação não são permitidos'],
      en: ['Smoking is not allowed', 'Pets are not allowed'],
    },
    tags: {
      pt: ['Varanda', 'Cozinha equipada', 'Perto do rio', 'Centro histórico'],
      en: ['Balcony', 'Equipped kitchen', 'Near the river', 'Historic centre'],
    },
    googleMapsLink: 'https://maps.app.goo.gl/jUpAofSupujJdv3bA',
    mapImage: '/imagens/alfamaApartamento/mapaAlfama.png',
    hostDescription: {
      pt: 'Sou uma pessoa muito viajada que sabe o quão importante é ser bem recebido em um lugar ou país estrangeiro...',
      en: 'I am a well-travelled person who knows how important it is to be well received in a foreign place or country...',
    },
    paymentPolicy: {
      pt: {
        advance: '€100 no ato da reserva.',
        remaining: 'Pagamento na chegada.',
        cancellation: 'Pré-pagos não são reembolsáveis.',
      },
      en: {
        advance: '€100 upon booking.',
        remaining: 'Payment on arrival.',
        cancellation: 'Pre-payments are non-refundable.',
      },
    },
    pricingConfig: {
      PRICE_LOW: 100,
      PRICE_HIGH: 200,
      CLEANING_FEE: 30,
      PROMO_WEEK_LOW: 570,
      PROMO_WEEK_HIGH: 1250,
      PROMO_MONTH_LOW: 1800,
      PROMO_MONTH_HIGH: 3000,
      DAYS_IN_WEEK: 7,
      DAYS_IN_MONTH: 30,
      EXTRA_PERSON_3: 10,
      EXTRA_PERSON_4: 15,
      MIN_PEOPLE: 1,
      MAX_PEOPLE: 4,
      unavailableRanges: [
        { start: '2025-07-10', end: '2025-07-15' },
      ],
    },
  },

  sesimbra: {
    id: 'sesimbra',
    slug: 'sesimbra',
    name: 'Sesimbra Edition Prestige',
    tagline: {
      pt: 'Apartamento 2 quartos - Sesimbra, Setúbal',
      en: '2 Bedroom Apartment - Sesimbra, Setúbal',
    },
    description: {
      pt: `O Sesimbra Edition Prestige é um apartamento de luxo localizado em frente à praia, com acabamentos de alta qualidade e todas as comodidades para uma estadia inesquecível. Com dois quartos espaçosos, este refúgio à beira-mar oferece uma varanda com vista deslumbrante, piscina aquecida no rooftop, ginásio e sauna privativos. A segurança 24 horas garante total tranquilidade durante sua estadia. A localização privilegiada permite fácil acesso às melhores praias, restaurantes gourmet e atrações naturais da região.`,
      en: `The Sesimbra Edition Prestige is a luxury apartment located in front of the beach, with high-quality finishes and all amenities for an unforgettable stay. With two spacious bedrooms, this beachfront retreat offers a balcony with stunning views, heated rooftop pool, private gym and sauna. 24-hour security ensures complete peace of mind during your stay. The privileged location provides easy access to the best beaches, gourmet restaurants and natural attractions in the region.`,
    },
    location: {
      pt: 'Avenida do Mar, Sesimbra, Portugal',
      en: 'Avenida do Mar, Sesimbra, Portugal',
    },
    coverImage: '/imagens/sesimbraApartamento/quartoFake.jpeg',
    images: [
      '/imagens/sesimbraApartamento/quartoFake.jpeg',
      '/imagens/sesimbraApartamento/sala1.jpg',
      '/imagens/sesimbraApartamento/sala2.jpg',
      '/imagens/sesimbraApartamento/cozinha1.jpg',
      '/imagens/sesimbraApartamento/cozinha2.jpg',
      '/imagens/sesimbraApartamento/quarto1.jpg',
      '/imagens/sesimbraApartamento/quarto2.jpg',
      '/imagens/sesimbraApartamento/WC1.jpg',
      '/imagens/sesimbraApartamento/piscina.jpg',
      '/imagens/sesimbraApartamento/ginasio.jpg',
      '/imagens/sesimbraApartamento/sauna.jpg',
    ],
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 1,
    },
    highlights: {
      pt: ['Varanda com vista para o mar', 'Luz natural abundante', 'Localização privilegiada em frente à praia', 'Piscina aquecida no rooftop', 'Ginásio e sauna privativos', 'Segurança 24 horas'],
      en: ['Balcony with sea view', 'Abundant natural light', 'Prime beachfront location', 'Heated rooftop pool', 'Private gym and sauna', '24-hour security'],
    },
    facilities: {
      pt: ['Cozinha totalmente equipada de luxo', 'Wi-Fi de alta velocidade', 'TV cabo premium', 'Ar condicionado em todas as divisões', 'Roupa de cama e de banho de alta qualidade', 'Produtos de higiene premium', 'Estacionamento privativo'],
      en: ['Fully equipped luxury kitchen', 'High-speed Wi-Fi', 'Premium cable TV', 'Air conditioning in all rooms', 'High-quality bed linen and towels', 'Premium toiletries', 'Private parking'],
    },
    nearby: {
      pt: ['Praia da Califórnia', 'Castelo de Sesimbra', 'Restaurantes Michelin', 'Marina de Sesimbra', 'Parque Natural da Arrábida'],
      en: ['Califórnia Beach', 'Sesimbra Castle', 'Michelin Restaurants', 'Sesimbra Marina', 'Arrábida Natural Park'],
    },
    policies: {
      pt: ['Fumar não é permitido', 'Animais de estimação requerem aprovação prévia', 'Check-in após as 16h, check-out até as 11h'],
      en: ['Smoking is not allowed', 'Pets require prior approval', 'Check-in after 4 PM, check-out by 11 AM'],
    },
    tags: {
      pt: ['Varanda', 'Cozinha equipada', 'Ar condicionado', 'Piscina aquecida', 'Rooftop', 'Jardim', 'Estacionamento com carregamento', 'Elevador', 'Vista mar', 'Perto da praia'],
      en: ['Balcony', 'Equipped kitchen', 'Air conditioning', 'Heated pool', 'Rooftop', 'Garden', 'Parking with EV charging', 'Elevator', 'Sea view', 'Near the beach'],
    },
    googleMapsLink: 'https://maps.app.goo.gl/LQZYqbvFqNZdKKwV8',
    mapImage: '/imagens/sesimbraApartamento/mapaSesimbra.png',
    hostDescription: {
      pt: 'Especialista em propriedades premium, ofereço experiências exclusivas em alguns dos locais mais desejados de Portugal. Cada detalhe foi pensado para proporcionar conforto e sofisticação.',
      en: 'Specialist in premium properties, I offer exclusive experiences in some of Portugal\'s most sought-after locations. Every detail has been designed to provide comfort and sophistication.',
    },
    paymentPolicy: {
      pt: {
        advance: '€200 no ato da reserva.',
        remaining: 'Pagamento na chegada.',
        cancellation: 'Pré-pagos não são reembolsáveis.',
      },
      en: {
        advance: '€200 upon booking.',
        remaining: 'Payment on arrival.',
        cancellation: 'Pre-payments are non-refundable.',
      },
    },
    pricingConfig: {
      PRICE_LOW: 150,
      PRICE_HIGH: 300,
      CLEANING_FEE: 50,
      PROMO_WEEK_LOW: 950,
      PROMO_WEEK_HIGH: 2000,
      PROMO_MONTH_LOW: 3500,
      PROMO_MONTH_HIGH: 6000,
      DAYS_IN_WEEK: 7,
      DAYS_IN_MONTH: 30,
      EXTRA_PERSON_3: 15,
      EXTRA_PERSON_4: 20,
      MIN_PEOPLE: 1,
      MAX_PEOPLE: 4,
      unavailableRanges: [
        { start: '2025-08-01', end: '2025-08-15' },
        { start: '2026-01-26', end: '2026-02-02' },
      ],
    },
  },
};

// --- Shared contact info ---
export const CONTACT = {
  email: '5stepshouse@gmail.com',
  whatsapp: '351966892301',
  whatsappFormatted: '+351 966 892 301',
  hostName: 'Nuno Sampaio',
  instagram: 'https://instagram.com/nunosampaio',
  facebook: 'https://facebook.com/nunosampaio',
};

// --- Season logic (shared) ---
export const isHighSeason = (date) => {
  const month = date.getMonth();
  return month === 6 || month === 7; // July & August
};

// --- Admin override helpers ---
const STORAGE_KEY = 'apartment_admin_overrides';

export const getAdminOverrides = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveAdminOverrides = (overrides) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
};

/**
 * Get apartment data with admin overrides merged in.
 * Admin can override: pricingConfig fields and unavailableRanges.
 */
export const getApartment = (id) => {
  const base = defaultApartments[id];
  if (!base) return null;

  const overrides = getAdminOverrides();
  const aptOverrides = overrides[id] || {};

  // Merge pricing config overrides
  const pricingConfig = {
    ...base.pricingConfig,
    ...(aptOverrides.pricingConfig || {}),
  };

  // Override unavailable ranges if admin has set them
  if (aptOverrides.unavailableRanges) {
    pricingConfig.unavailableRanges = aptOverrides.unavailableRanges;
  }

  return { ...base, pricingConfig };
};

/**
 * Get all apartments as an array (with admin overrides).
 */
export const getAllApartments = () => {
  return Object.keys(defaultApartments).map(id => getApartment(id));
};

export default defaultApartments;
