import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const [showHeader, setShowHeader] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = React.useRef(0);

  const handleScroll = useCallback(() => {
    if (mobileMenuOpen) return;
    if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    lastScrollY.current = window.scrollY;
  }, [mobileMenuOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change (link click)
  const closeMobile = () => setMobileMenuOpen(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header className={`topo ${showHeader ? 'show' : 'hide'}`}>
      <div className="logo">
        <Link to="/" onClick={closeMobile}>
          <img src="/imagens/Logo Site_FOTO.png" alt="Logo Lisbon Old Town & Beach Retreats" className="logo-img" />
          <span className="logo-text">Lisbon Old Town & Beach Retreats</span>
        </Link>
      </div>

      {/* Hamburger button */}
      <button
        className="hamburger-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile overlay */}
      {mobileMenuOpen && <div className="mobile-overlay" onClick={closeMobile} />}

      {/* Navigation */}
      <nav className={`nav-menu ${mobileMenuOpen ? 'nav-open' : ''}`}>
        <ul>
          <li className="dropdown">
            <span className="menu-title">
              {t('nav.apartments')} <ChevronDown size={16} className="chevron-icon" />
            </span>
            <ul className="dropdown-content">
              <li><Link to="/alfama" onClick={closeMobile}>Alfama</Link></li>
              <li><Link to="/sesimbra" onClick={closeMobile}>Sesimbra</Link></li>
            </ul>
          </li>
          <li><Link to="/atividades" onClick={closeMobile}>{t('nav.activities')}</Link></li>
          <li><Link to="/contactos" onClick={closeMobile}>{t('nav.contacts')}</Link></li>
          <li>
            <button className="lang-toggle" onClick={toggleLanguage} aria-label="Change language">
              <Globe size={18} />
              <span>{language === 'pt' ? 'EN' : 'PT'}</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
