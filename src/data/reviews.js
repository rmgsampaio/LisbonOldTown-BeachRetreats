/**
 * Guest reviews / testimonials.
 * Easy to add more — just add new objects to the array.
 */

const reviews = [
  {
    id: 1,
    name: 'Maria S.',
    country: { pt: 'Alemanha', en: 'Germany' },
    apartment: 'alfama',
    rating: 5,
    date: '2025-03',
    text: {
      pt: 'Apartamento maravilhoso com uma vista incrível! O Nuno foi muito atencioso e prestável. Localização perfeita para explorar Alfama e o centro de Lisboa. Recomendo vivamente!',
      en: 'Wonderful apartment with an incredible view! Nuno was very attentive and helpful. Perfect location to explore Alfama and central Lisbon. Highly recommended!',
    },
  },
  {
    id: 2,
    name: 'James L.',
    country: { pt: 'Reino Unido', en: 'United Kingdom' },
    apartment: 'sesimbra',
    rating: 5,
    date: '2025-06',
    text: {
      pt: 'O apartamento em Sesimbra superou todas as nossas expectativas. A piscina no rooftop é simplesmente fantástica e a praia está mesmo ali. Voltaremos com certeza!',
      en: 'The apartment in Sesimbra exceeded all our expectations. The rooftop pool is simply fantastic and the beach is right there. We will definitely return!',
    },
  },
  {
    id: 3,
    name: 'Sophie D.',
    country: { pt: 'França', en: 'France' },
    apartment: 'alfama',
    rating: 5,
    date: '2025-04',
    text: {
      pt: 'Estadia perfeita! O apartamento tem tudo o que precisamos e a localização é ideal. O Nuno deu-nos excelentes recomendações de restaurantes. Adorámos a experiência.',
      en: 'Perfect stay! The apartment has everything we needed and the location is ideal. Nuno gave us excellent restaurant recommendations. We loved the experience.',
    },
  },
  {
    id: 4,
    name: 'Carlos M.',
    country: { pt: 'Espanha', en: 'Spain' },
    apartment: 'sesimbra',
    rating: 5,
    date: '2025-07',
    text: {
      pt: 'Apartamento de luxo com uma vista mar espetacular. A cozinha está muito bem equipada e o ambiente é muito tranquilo. O ginásio e a sauna são um bónus incrível.',
      en: 'Luxury apartment with a spectacular sea view. The kitchen is very well equipped and the atmosphere is very peaceful. The gym and sauna are an incredible bonus.',
    },
  },
  {
    id: 5,
    name: 'Anna K.',
    country: { pt: 'Suécia', en: 'Sweden' },
    apartment: 'alfama',
    rating: 4,
    date: '2025-05',
    text: {
      pt: 'Localização fantástica no coração de Alfama. O apartamento é acolhedor e tem tudo o necessário. Adorámos acordar com a luz natural e tomar café na varanda.',
      en: 'Fantastic location in the heart of Alfama. The apartment is cosy and has everything you need. We loved waking up to natural light and having coffee on the balcony.',
    },
  },
];

export default reviews;
