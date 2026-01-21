import React from 'react';
import '../components/FeaturesList.css';

function FeaturesList({ title, items }) {
  return (
    <div className="features-section">
      <h3>{title}</h3>
      <ul className="features-list">
        {items.map((item, i) => <li key={i}>• {item}</li>)}
      </ul>
    </div>
  );
}

export default FeaturesList;
