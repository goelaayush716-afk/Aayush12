import React, { useState, useEffect } from 'react';
import { testimonials } from '../../data/products';

export const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = testimonials[current];

  return (
    <section className="testimonials section-pad">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Editorial & Critical Acclaim</span>
          <h2 className="section-title">Words of Elegance</h2>
          <div className="gold-divider" />
        </div>

        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <div className="testimonial-stars">✦ ✦ ✦ ✦ ✦</div>
            <p className="testimonial-quote">"{activeTestimonial.quote}"</p>
            <p className="testimonial-author">{activeTestimonial.author}</p>
            <p className="testimonial-role">{activeTestimonial.role}</p>
          </div>

          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${index === current ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
