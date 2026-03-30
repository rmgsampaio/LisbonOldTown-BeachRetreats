import React from 'react';
import { MapPin, Waves, Mountain, UtensilsCrossed, Camera, Ship } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Atividades.css';

const activities = {
  lisbon: [
    {
      icon: 'castle',
      title: { pt: 'Castelo de São Jorge', en: 'São Jorge Castle' },
      desc: {
        pt: 'Explore as muralhas do castelo medieval com vistas panorâmicas sobre Lisboa e o rio Tejo.',
        en: 'Explore the walls of this medieval castle with panoramic views over Lisbon and the Tagus river.',
      },
    },
    {
      icon: 'camera',
      title: { pt: 'Miradouros de Lisboa', en: 'Lisbon Viewpoints' },
      desc: {
        pt: 'Descubra os famosos miradouros — Santa Luzia, Portas do Sol, Graça — com vistas deslumbrantes.',
        en: 'Discover the famous viewpoints — Santa Luzia, Portas do Sol, Graça — with stunning views.',
      },
    },
    {
      icon: 'food',
      title: { pt: 'Gastronomia & Fado', en: 'Gastronomy & Fado' },
      desc: {
        pt: 'Saboreie pratos tradicionais em tascas típicas e ouça fado ao vivo nas casas de Alfama.',
        en: 'Savour traditional dishes in typical taverns and listen to live fado in the houses of Alfama.',
      },
    },
    {
      icon: 'tram',
      title: { pt: 'Elétrico 28 & Baixa', en: 'Tram 28 & Downtown' },
      desc: {
        pt: 'Passeie no icónico Elétrico 28 através dos bairros históricos até à Baixa Pombalina.',
        en: 'Ride the iconic Tram 28 through historic neighbourhoods to the Pombaline Downtown.',
      },
    },
  ],
  sesimbra: [
    {
      icon: 'beach',
      title: { pt: 'Praias de Sesimbra', en: 'Sesimbra Beaches' },
      desc: {
        pt: 'Relaxe na Praia da Califórnia ou descubra a selvagem Praia do Ribeiro do Cavalo.',
        en: 'Relax at Califórnia Beach or discover the wild Ribeiro do Cavalo Beach.',
      },
    },
    {
      icon: 'nature',
      title: { pt: 'Parque Natural da Arrábida', en: 'Arrábida Natural Park' },
      desc: {
        pt: 'Trilhos deslumbrantes com vistas sobre o mar, praias escondidas e natureza intocada.',
        en: 'Stunning trails with sea views, hidden beaches and untouched nature.',
      },
    },
    {
      icon: 'boat',
      title: { pt: 'Passeios de Barco & Golfinhos', en: 'Boat Trips & Dolphins' },
      desc: {
        pt: 'Observe golfinhos na costa de Setúbal ou faça um passeio de barco pela serra da Arrábida.',
        en: 'Watch dolphins off the Setúbal coast or take a boat trip along the Arrábida mountain.',
      },
    },
    {
      icon: 'food',
      title: { pt: 'Peixe Fresco & Marisco', en: 'Fresh Fish & Seafood' },
      desc: {
        pt: 'Sesimbra é famosa pelo peixe fresco. Desfrute de uma refeição num dos restaurantes à beira-mar.',
        en: 'Sesimbra is famous for its fresh fish. Enjoy a meal at one of the seaside restaurants.',
      },
    },
  ],
};

const iconMap = {
  castle: MapPin,
  camera: Camera,
  food: UtensilsCrossed,
  tram: MapPin,
  beach: Waves,
  nature: Mountain,
  boat: Ship,
};

function Atividades() {
  const { t, localized } = useLanguage();

  const renderSection = (title, items) => (
    <div className="activities-region">
      <h2 className="region-title">{title}</h2>
      <div className="activities-grid">
        {items.map((item, idx) => {
          const Icon = iconMap[item.icon] || MapPin;
          return (
            <div className="activity-card" key={idx}>
              <div className="activity-icon-wrap">
                <Icon size={28} />
              </div>
              <h3>{localized(item.title)}</h3>
              <p>{localized(item.desc)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="atividades-container">
        <div className="atividades-hero">
          <h1>{t('activities.title')}</h1>
          <p className="atividades-subtitle">{t('activities.subtitle')}</p>
        </div>

        {renderSection(t('activities.lisbon'), activities.lisbon)}
        {renderSection(t('activities.sesimbra'), activities.sesimbra)}
      </main>
      <Footer />
    </>
  );
}

export default Atividades;
