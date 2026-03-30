import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import reviewsData from '../data/reviews';
import './Reviews.css';

function Reviews() {
  const { t, localized } = useLanguage();
  const [current, setCurrent] = useState(0);

  const nextReview = () => setCurrent((current + 1) % reviewsData.length);
  const prevReview = () => setCurrent((current - 1 + reviewsData.length) % reviewsData.length);

  const review = reviewsData[current];

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">{t('reviews.title')}</h2>
      <div className="reviews-carousel">
        <button className="reviews-nav reviews-nav-prev" onClick={prevReview} aria-label="Previous review">
          <ChevronLeft size={24} />
        </button>

        <div className="review-card">
          <div className="review-quote">
            <Quote size={32} />
          </div>
          <p className="review-text">{localized(review.text)}</p>
          <div className="review-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < review.rating ? '#caa766' : 'none'}
                stroke={i < review.rating ? '#caa766' : '#ccc'}
              />
            ))}
          </div>
          <div className="review-author">
            <strong>{review.name}</strong>
            <span className="review-country">{localized(review.country)}</span>
          </div>
        </div>

        <button className="reviews-nav reviews-nav-next" onClick={nextReview} aria-label="Next review">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="reviews-dots">
        {reviewsData.map((_, idx) => (
          <button
            key={idx}
            className={`reviews-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Review ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Reviews;
