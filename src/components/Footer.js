import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT } from '../data/apartments';
import './Footer.css';

function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src="/imagens/Logo Site_FOTO.png" alt="Logo" className="footer-logo" />
          <span className="footer-brand-name">
            Lisbon Old Town
            <br />
            & Beach Retreats
          </span>
        </div>

        <div className="footer-column">
          <h4>{t('footer.apartments')}</h4>
          <ul>
            <li><Link to="/alfama">Alfama, Lisboa</Link></li>
            <li><Link to="/sesimbra">Sesimbra, Setúbal</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t('footer.quickLinks')}</h4>
          <ul>
            <li><Link to="/atividades">{t('nav.activities')}</Link></li>
            <li><Link to="/contactos">{t('nav.contacts')}</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t('footer.contact')}</h4>
          <ul>
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <Mail size={14} /> {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={14} /> {CONTACT.whatsappFormatted}
              </a>
            </li>
          </ul>

          <div className="footer-social">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Globe size={20} />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Lisbon Old Town & Beach Retreats. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

export default Footer;