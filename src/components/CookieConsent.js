import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './CookieConsent.css';

function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-icon-wrap">
          <Cookie size={24} />
        </div>
        <p className="cookie-text">{t('cookie.message')}</p>
        <div className="cookie-actions">
          <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            {t('cookie.accept')}
          </button>
          <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
            {t('cookie.decline')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
