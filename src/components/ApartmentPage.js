import React from 'react';
import { Users, BedDouble, Bed, Bath } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getApartment, CONTACT, isHighSeason } from '../data/apartments';
import Header from './Header';
import Footer from './Footer';
import ApartmentGallery from './ApartmentGallery';
import FeaturesList from './FeaturesList';
import AvailabilitySidebar from './AvailabilitySidebar';
import './ApartmentPage.css';
import './ApartmentGallery.css';

function ApartmentPage({ apartmentId }) {
  const { t, localized } = useLanguage();
  const apartment = getApartment(apartmentId);

  if (!apartment) {
    return (
      <>
        <Header />
        <main className="apt-not-found">
          <h1>Apartment not found</h1>
        </main>
        <Footer />
      </>
    );
  }

  // Build enriched pricingConfig with function references
  const pricingConfig = {
    ...apartment.pricingConfig,
    EMAIL_TARGET: CONTACT.email,
    WHATSAPP_TARGET: CONTACT.whatsapp,
    isHighSeason,
  };

  const cap = apartment.capacity;
  const policy = localized(apartment.paymentPolicy);

  return (
    <>
      <Header />

      {/* Gallery */}
      <section className="gallery-fullwidth">
        <h1 className="apartment-title">{apartment.name}</h1>
        <ApartmentGallery images={apartment.images} />
      </section>

      {/* Description & Capacity */}
      <section className="apartment-description">
        <h2 className="apt-section-name">{apartment.name}</h2>

        <div className="amenities-highlights">
          <div className="amenity-item">
            <Users size={28} className="amenity-icon-svg" />
            <div>
              <div className="amenity-value">{cap.guests}</div>
              <div className="amenity-label">{t('apt.guests')}</div>
            </div>
          </div>
          <div className="amenity-item">
            <BedDouble size={28} className="amenity-icon-svg" />
            <div>
              <div className="amenity-value">{cap.bedrooms}</div>
              <div className="amenity-label">{cap.bedrooms === 1 ? t('apt.bedroom') : t('apt.bedrooms')}</div>
            </div>
          </div>
          <div className="amenity-item">
            <Bed size={28} className="amenity-icon-svg" />
            <div>
              <div className="amenity-value">{cap.beds}</div>
              <div className="amenity-label">{t('apt.beds')}</div>
            </div>
          </div>
          <div className="amenity-item">
            <Bath size={28} className="amenity-icon-svg" />
            <div>
              <div className="amenity-value">{cap.bathrooms}</div>
              <div className="amenity-label">{cap.bathrooms === 1 ? t('apt.bathroom') : t('apt.bathrooms')}</div>
            </div>
          </div>
        </div>

        <p className="description-text">{localized(apartment.description)}</p>
      </section>

      {/* Main Content: Features + Map + Sidebar */}
      <main className="apartment-page">
        <div className="apartment-main">
          <div className="features-grid">
            <FeaturesList title={t('apt.highlights')} items={localized(apartment.highlights)} type="highlights" />
            <FeaturesList title={t('apt.facilities')} items={localized(apartment.facilities)} type="facilities" />
            <FeaturesList title={t('apt.nearby')} items={localized(apartment.nearby)} type="nearby" />
            <FeaturesList title={t('apt.policies')} items={localized(apartment.policies)} type="policies" />
          </div>

          {/* Map */}
          <div className="map-container">
            <a href={apartment.googleMapsLink} target="_blank" rel="noopener noreferrer">
              <img
                src={apartment.mapImage}
                alt={t('apt.mapAlt')}
                loading="lazy"
                className="map-image"
              />
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="apartment-sidebar">
          <AvailabilitySidebar pricingConfig={pricingConfig} />
        </div>
      </main>

      {/* Pricing Table */}
      <section className="apartment-pricing">
        <h3>{t('apt.pricing')}</h3>
        <table>
          <thead>
            <tr>
              <th>{t('apt.season')}</th>
              <th>{t('apt.daily')}</th>
              <th>{t('apt.weekly')}</th>
              <th>{t('apt.monthly')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('apt.seasonLow')}</td>
              <td>€{pricingConfig.PRICE_LOW}</td>
              <td>€{pricingConfig.PROMO_WEEK_LOW}</td>
              <td>€{pricingConfig.PROMO_MONTH_LOW}</td>
            </tr>
            <tr>
              <td>{t('apt.seasonHigh')}</td>
              <td>€{pricingConfig.PRICE_HIGH}</td>
              <td>€{pricingConfig.PROMO_WEEK_HIGH}</td>
              <td>€{pricingConfig.PROMO_MONTH_HIGH}</td>
            </tr>
          </tbody>
        </table>

        <div className="extra-guest-pricing">
          <p><strong>{t('apt.extraGuest')}:</strong></p>
          <ul>
            <li>{t('apt.person3')}: +€{pricingConfig.EXTRA_PERSON_3}{t('apt.perNight')}</li>
            <li>{t('apt.person4')}: +€{pricingConfig.EXTRA_PERSON_4}{t('apt.perNight')}</li>
          </ul>
        </div>

        <div className="cleaningfee-pricing">
          <p><strong>{t('apt.cleaningFee')}:</strong> €{pricingConfig.CLEANING_FEE}</p>
        </div>
      </section>

      {/* Payment Policy */}
      <section className="payment-policy">
        <h3>{t('apt.paymentPolicy')}</h3>
        <div className="payment-schedule">
          <p><strong>{t('apt.advancePayment')}:</strong> {policy.advance}</p>
          <p><strong>{t('apt.remainingBalance')}:</strong> {policy.remaining}</p>
        </div>
        <div className="cancellation-policy">
          <p><strong>{t('apt.cancellation')}:</strong> {policy.cancellation}</p>
        </div>
      </section>

      {/* Host */}
      <section className="about-host">
        <h3>{t('apt.aboutHost')}</h3>
        <div className="host-info">
          <p><strong>{CONTACT.hostName}</strong></p>
          <p>{localized(apartment.hostDescription)}</p>
        </div>
        <div className="contact-info">
          <p><strong>{t('apt.email')}:</strong> {CONTACT.email}</p>
          <p><strong>{t('apt.phone')}:</strong> +{CONTACT.whatsapp}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ApartmentPage;
