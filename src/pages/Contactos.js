import React from 'react';
import { Mail, MessageCircle, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT } from '../data/apartments';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Contactos.css';

function Contactos() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="contactos-container">
        <section className="about-section">
          <h1>{t('contact.title')}</h1>
          <p dangerouslySetInnerHTML={{ __html: t('contact.intro') }} />

          <div className="profile-card">
            <div className="profile-image">
              <div className="avatar-placeholder">NS</div>
            </div>
            <div className="profile-info">
              <h2>{CONTACT.hostName}</h2>
              <p className="title">{t('contact.hostTitle')}</p>
              <p>{t('contact.hostBio')}</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>{t('contact.getInTouch')}</h2>
          <p className="subtitle">{t('contact.getInTouchSubtitle')}</p>

          <div className="contact-methods">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-icon-wrap">
                <MessageCircle size={32} />
              </div>
              <h3>{t('contact.whatsapp')}</h3>
              <p>{CONTACT.whatsappFormatted}</p>
              <p className="contact-hint">({t('contact.clickChat')})</p>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="contact-card"
            >
              <div className="contact-icon-wrap">
                <Mail size={32} />
              </div>
              <h3>Email</h3>
              <p>{CONTACT.email}</p>
              <p className="contact-hint">({t('contact.clickEmail')})</p>
            </a>
          </div>

          <div className="social-section">
            <h3>{t('contact.followUs')}</h3>
            <div className="social-links">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Globe size={20} /> Instagram
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Globe size={20} /> Facebook
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contactos;