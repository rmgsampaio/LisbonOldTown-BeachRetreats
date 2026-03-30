import React from 'react';
import { Sparkles, Coffee, MapPin, ShieldCheck } from 'lucide-react';
import './FeaturesList.css';

const ICONS = {
  highlights: Sparkles,
  facilities: Coffee,
  nearby: MapPin,
  policies: ShieldCheck,
};

function FeaturesList({ title, items, type }) {
  const Icon = ICONS[type] || Sparkles;

  return (
    <div className="features-section">
      <h3 className="features-heading">
        <Icon size={20} className="features-icon" />
        {title}
      </h3>
      <ul className="features-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default FeaturesList;
