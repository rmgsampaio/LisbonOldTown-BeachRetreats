import React, { createContext, useContext, useState, useCallback } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'site_language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'pt';
    } catch {
      return 'pt';
    }
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  }, [language, setLanguage]);

  /**
   * Translate a UI key from translations.js
   * Usage: t('nav.apartments') → "Apartamentos" or "Apartments"
   */
  const t = useCallback((key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.pt || key;
  }, [language]);

  /**
   * Get localized value from an object with {pt, en} keys.
   * Usage: localized(apartment.description) → string in current language
   */
  const localized = useCallback((obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.pt || '';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, localized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
