import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApartmentGallery from '../components/ApartmentGallery';
import FeaturesList from '../components/FeaturesList';
import AvailabilitySidebar from '../components/AvailabilitySidebar';
import '../components/ApartmentPage.css';
import '../components/ApartmentGallery.css';

function Alfama() {
  // Configurações centralizadas para o simulador de preços
  const pricingConfig = {
    // Preços base
    PRICE_LOW: 100,
    PRICE_HIGH: 200,
    CLEANING_FEE: 30,

    // Promoções
    PROMO_WEEK_LOW: 570,
    PROMO_WEEK_HIGH: 1250,
    PROMO_MONTH_LOW: 1800,
    PROMO_MONTH_HIGH: 3000,

    // Constantes
    DAYS_IN_WEEK: 7,
    DAYS_IN_MONTH: 30,

    // Extras por pessoa
    EXTRA_PERSON_3: 10,
    EXTRA_PERSON_4: 15,
    MIN_PEOPLE: 1,
    MAX_PEOPLE: 4,

    // Contato
    EMAIL_TARGET: "5stepshouse@gmail.com",
    WHATSAPP_TARGET: "351966892301",

    // Temporadas (Julho e Agosto são alta temporada)
    isHighSeason: (date) => {
      const month = date.getMonth(); // 0-11 (Jan-Dez)
      return month === 6 || month === 7; // Julho(6) e Agosto(7)
    },

    // Datas indisponíveis (exemplo)
    unavailableRanges: [
      { startDate: new Date('2025-07-10'), endDate: new Date('2025-07-15') },
    ],
  };

  // Dados do apartamento
  const apartment = {
    name: "Sunny & Cozy Apartment",
    images: [
      "/imagens/alfamaApartamento/sala1.jpg",
      "/imagens/alfamaApartamento/sala2.jpg",
      "/imagens/alfamaApartamento/sala3.jpg",
      "/imagens/alfamaApartamento/cozinha1.jpg",
      "/imagens/alfamaApartamento/cozinha2.jpg",
      "/imagens/alfamaApartamento/quarto1.jpg",
      "/imagens/alfamaApartamento/quarto2.jpg",
      "/imagens/alfamaApartamento/WC1.jpg",
    ],
    highlights: [
      "Varanda com vista",
      "Luz natural todo o dia",
      "Localização no centro da cidade",
    ],
    facilities: [
      "Cozinha equipada",
      "Wi-Fi",
      "TV cabo",
      "Aquecimento elétrico",
      "Roupa de cama e de banho",
    ],
    nearby: [
      "Castelo de São Jorge",
      "Miradouro de Santa Luzia",
      "Baixa de Lisboa",
      "Estação de comboios de Santa Apolónia",
    ],
    policies: [
      "Fumar não é permitido",
      "Animais de estimação não são permitidos",
    ],
    description: `O Sunny & Cozy Apartment é um apartamento cheio de luz, equipado para proporcionar todo o conforto, localizado no bairro mais histórico e na Lisboa mais antiga - Alfama. Está a apenas cerca de 5 minutos a pé do centro da cidade, do rio, do Miradouro das Portas do Sol e, um pouco mais acima, do Castelo de São Jorge. Perto de todo o tipo de transportes públicos, supermercados, cafés, restaurantes típicos, casas de fado, bares...`,
    location: "Beco das Cruzes, Porta 6, Alfama, Lisbon, Portugal",
    capacity: {
      guests: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
    },
  };

  // Link do Google Maps
  const googleMapsLink = "https://maps.app.goo.gl/jUpAofSupujJdv3bA";

  return (
    <>
      <Header />

      {/* Galeria */}
      <section className="gallery-fullwidth">
        <h1 className="apartment-title">{apartment.name}</h1>
        <ApartmentGallery images={apartment.images} />
      </section>

      {/* Descrição */}
      <section className="apartment-description">
        <h1>{apartment.name}</h1>

        <div className="amenities-highlights">
          <div className="amenity-item">
            <span className="amenity-icon">👥</span>
            <div>
              <div className="amenity-value">{apartment.capacity.guests}</div>
              <div className="amenity-label">Hóspedes</div>
            </div>
          </div>

          <div className="amenity-item">
            <span className="amenity-icon">🛏️</span>
            <div>
              <div className="amenity-value">{apartment.capacity.bedrooms}</div>
              <div className="amenity-label">Quarto</div>
            </div>
          </div>

          <div className="amenity-item">
            <span className="amenity-icon">🛌</span>
            <div>
              <div className="amenity-value">{apartment.capacity.beds}</div>
              <div className="amenity-label">Camas</div>
            </div>
          </div>

          <div className="amenity-item">
            <span className="amenity-icon">🚿</span>
            <div>
              <div className="amenity-value">{apartment.capacity.bathrooms}</div>
              <div className="amenity-label">Casa de banho</div>
            </div>
          </div>
        </div>

        <p className="description-text">{apartment.description}</p>
      </section>

      {/* Conteúdo principal */}
      <main className="apartment-page">
        <div className="apartment-main">
          <div className="features-list">
            <FeaturesList title="Destaques" items={apartment.highlights} />
            <FeaturesList title="Comodidades" items={apartment.facilities} />
            <FeaturesList title="Locais próximos" items={apartment.nearby} />
            <FeaturesList title="Políticas" items={apartment.policies} />
          </div>

          {/* Mapa */}
          <div className="map-container">
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              <img
                src="/imagens/alfamaApartamento/mapaAlfama.png"
                alt="Mapa da localização do apartamento"
                width="100%"
                height="auto"
                style={{ cursor: 'pointer', borderRadius: '8px' }}
              />
            </a>
          </div>
        </div>

        {/* Sidebar com simulador */}
        <div className="apartment-sidebar">
          <AvailabilitySidebar pricingConfig={pricingConfig} />
        </div>
      </main>

      {/* Tabela de Preços (opcional - pode ser removida se o simulador for suficiente) */}
      <section className="apartment-pricing">
        <h3>Preços de Referência</h3>
        <table>
          <thead>
            <tr>
              <th>Temporada</th>
              <th>Diário</th>
              <th>Semanal</th>
              <th>Mensal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Baixa</td>
              <td>€{pricingConfig.PRICE_LOW}</td>
              <td>€{pricingConfig.PROMO_WEEK_LOW}</td>
              <td>€{pricingConfig.PROMO_MONTH_LOW}</td>
            </tr>
            <tr>
              <td>Alta</td>
              <td>€{pricingConfig.PRICE_HIGH}</td>
              <td>€{pricingConfig.PROMO_WEEK_HIGH}</td>
              <td>€{pricingConfig.PROMO_MONTH_HIGH}</td>
            </tr>
          </tbody>
        </table>

        <div className="extra-guest-pricing">
          <p><strong>Preço por pessoa adicional:</strong></p>
          <ul>
            <li>3ª pessoa: +€{pricingConfig.EXTRA_PERSON_3}/noite</li>
            <li>4ª pessoa: +€{pricingConfig.EXTRA_PERSON_4}/noite</li>
          </ul>
        </div>

        <div className="cleaningfee-pricing">
          <p><strong>Taxa de limpeza:</strong> €{pricingConfig.CLEANING_FEE}</p>
        </div>
      </section>

      {/* Políticas */}
      <section className="payment-policy">
        <h3>Política de Pagamentos</h3>
        <div className="payment-schedule">
          <p><strong>Pagamento antecipado:</strong> €100 no ato da reserva.</p>
          <p><strong>Saldo restante:</strong> Pagamento na chegada.</p>
        </div>
        <div className="cancellation-policy">
          <p><strong>Cancelamento:</strong> Pré-pagos não são reembolsáveis.</p>
        </div>
      </section>

      {/* Anfitrião */}
      <section className="about-host">
        <h3>Sobre o Anfitrião</h3>
        <div className="host-info">
          <p><strong>Nuno Sampaio</strong></p>
          <p>
            Sou uma pessoa muito viajada que sabe o quão importante é ser bem recebido em um lugar ou país estrangeiro...
          </p>
        </div>
        <div className="contact-info">
          <p><strong>Email:</strong> {pricingConfig.EMAIL_TARGET}</p>
          <p><strong>Telefone:</strong> +{pricingConfig.WHATSAPP_TARGET}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Alfama;