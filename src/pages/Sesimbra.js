import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApartmentGallery from '../components/ApartmentGallery';
import FeaturesList from '../components/FeaturesList';
import AvailabilitySidebar from '../components/AvailabilitySidebar';
import '../components/ApartmentPage.css';
import '../components/ApartmentGallery.css';

function Sesimbra() {
  // Configurações centralizadas para o simulador de preços
  const pricingConfig = {
    // Preços base
    PRICE_LOW: 150,  // Preço mais alto que Alfama por ser de luxo
    PRICE_HIGH: 300, // Preço mais alto na alta temporada
    CLEANING_FEE: 50, // Taxa de limpeza maior

    // Promoções
    PROMO_WEEK_LOW: 950,  // Promoção semanal época baixa
    PROMO_WEEK_HIGH: 2000, // Promoção semanal época alta
    PROMO_MONTH_LOW: 3500, // Promoção mensal época baixa
    PROMO_MONTH_HIGH: 6000, // Promoção mensal época alta

    // Constantes
    DAYS_IN_WEEK: 7,
    DAYS_IN_MONTH: 30,

    // Extras por pessoa
    EXTRA_PERSON_3: 15,  // Valor maior que Alfama
    EXTRA_PERSON_4: 20,  // Valor maior que Alfama
    MIN_PEOPLE: 1,
    MAX_PEOPLE: 4,

    // Contato (mesmo do Alfama)
    EMAIL_TARGET: "5stepshouse@gmail.com",
    WHATSAPP_TARGET: "351966892301",

    // Temporadas (Julho e Agosto são alta temporada)
    isHighSeason: (date) => {
      const month = date.getMonth(); // 0-11 (Jan-Dez)
      return month === 6 || month === 7; // Julho(6) e Agosto(7)
    },

    // Datas indisponíveis (exemplo)
    unavailableRanges: [
      { startDate: new Date('2025-08-01'), endDate: new Date('2025-08-15') },
      { startDate: new Date('2026-01-26'), endDate: new Date('2026-02-02') },
    ],
  };

  // Dados do apartamento
  const apartment = {
    name: "Sesimbra Edition Prestige",
    images: [
      "/imagens/sesimbraApartamento/quartoFake.jpeg",
      "/imagens/sesimbraApartamento/sala1.jpg",
      "/imagens/sesimbraApartamento/sala2.jpg",
      "/imagens/sesimbraApartamento/cozinha1.jpg",
      "/imagens/sesimbraApartamento/cozinha2.jpg",
      "/imagens/sesimbraApartamento/quarto1.jpg",
      "/imagens/sesimbraApartamento/quarto2.jpg",
      "/imagens/sesimbraApartamento/WC1.jpg",
      "/imagens/sesimbraApartamento/piscina.jpg",
      "/imagens/sesimbraApartamento/ginasio.jpg",
      "/imagens/sesimbraApartamento/sauna.jpg",
    ],
    highlights: [
      "Varanda com vista para o mar",
      "Luz natural abundante",
      "Localização privilegiada em frente à praia",
      "Piscina aquecida no rooftop",
      "Ginásio e sauna privativos",
      "Segurança 24 horas"
    ],
    facilities: [
      "Cozinha totalmente equipada de luxo",
      "Wi-Fi de alta velocidade",
      "TV cabo premium",
      "Ar condicionado em todas as divisões",
      "Roupa de cama e de banho de alta qualidade",
      "Produtos de higiene premium",
      "Estacionamento privativo"
    ],
    nearby: [
      "Praia da Califórnia",
      "Castelo de Sesimbra",
      "Restaurantes Michelin",
      "Marina de Sesimbra",
      "Parque Natural da Arrábida"
    ],
    policies: [
      "Fumar não é permitido",
      "Animais de estimação requerem aprovação prévia",
      "Check-in após as 16h, check-out até as 11h"
    ],
    description: `O Sesimbra Edition Prestige é um apartamento de luxo localizado em frente à praia, com acabamentos de alta qualidade e todas as comodidades para uma estadia inesquecível. Com dois quartos espaçosos, este refúgio à beira-mar oferece uma varanda com vista deslumbrante, piscina aquecida no rooftop, ginásio e sauna privativos. A segurança 24 horas garante total tranquilidade durante sua estadia. A localização privilegiada permite fácil acesso às melhores praias, restaurantes gourmet e atrações naturais da região.`,
    location: "Avenida do Mar, Sesimbra, Portugal",
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 3,  // 1 cama casal + 2 camas individuais
      bathrooms: 1,
    },
  };

  // Link do Google Maps
  const googleMapsLink = "https://maps.app.goo.gl/LQZYqbvFqNZdKKwV8";

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
              <div className="amenity-label">Quartos</div>
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
                src="/imagens/sesimbraApartamento/mapaSesimbra.png"
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

      {/* Tabela de Preços */}
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
          <p><strong>Pagamento antecipado:</strong> €200 no ato da reserva.</p>
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
            Especialista em propriedades premium, ofereço experiências exclusivas em alguns dos locais mais desejados de Portugal. Cada detalhe foi pensado para proporcionar conforto e sofisticação.
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

export default Sesimbra;