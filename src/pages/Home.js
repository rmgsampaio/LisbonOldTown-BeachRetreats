import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAllApartments } from '../data/apartments';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';
import '../style.css';

function Home() {
  const { t, localized } = useLanguage();
  const apartments = getAllApartments();

  return (
    <>
      <Header />

      {/* Hero subtitle */}
      <main className="home-main">
        <div className="home-hero">
          <h1 className="home-title">{t('home.title')}</h1>
          <p className="home-subtitle">{t('home.subtitle')}</p>
        </div>

        <div className="apartamentos-container">
          {apartments.map((apt) => (
            <Link to={`/${apt.slug}`} className="apartamento" key={apt.id}>
              <img
                src={apt.coverImage}
                alt={apt.name}
                loading="lazy"
              />
              <div className="apartamento-body">
                <h2>{localized(apt.tagline)}</h2>
                <div className="tags">
                  {localized(apt.tags).map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
                <div className="apartamento-footer">
                  <div className="info">
                    <p>📍 {localized(apt.location)}</p>
                    <p>🏠 {apt.capacity.bedrooms} {apt.capacity.bedrooms === 1
                      ? t('apt.bedroom')
                      : t('apt.bedrooms')
                    }</p>
                  </div>
                  <span className="view-link">
                    {t('home.viewDetails')} <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Reviews Section */}
      <Reviews />

      <Footer />
    </>
  );
}

export default Home;
