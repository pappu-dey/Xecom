import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './HeroPosterCarousel.css';

const POSTER_SLIDES = [
  {
    id: 1,
    image: '/poster_diwali_sale.jpg',
    title: 'Diwali Mega Sale',
    subtitle: 'Celebrate with unbeatable deals on top electronics',
    originalPrice: '₹49,999',
    salePrice: '₹29,999',
    discount: '40% OFF',
    cta: 'Shop Diwali Offers',
    ctaLink: '#diwali-sale',
    gradient: 'linear-gradient(135deg, rgba(88,28,135,0.92) 0%, rgba(30,10,60,0.95) 100%)',
    accentColor: '#f59e0b',
    tagline: 'Free delivery across India 🇮🇳',
  },
  {
    id: 2,
    image: '/poster_fashion_india.jpg',
    title: 'Ethnic Fashion Fiesta',
    subtitle: 'Stunning sarees, lehengas & kurta sets for every occasion',
    originalPrice: '₹7,999',
    salePrice: '₹2,999',
    discount: 'Up to 65% OFF',
    cta: 'Explore Collection',
    ctaLink: '#fashion-fiesta',
    gradient: 'linear-gradient(135deg, rgba(180,83,9,0.88) 0%, rgba(6,78,59,0.92) 100%)',
    accentColor: '#fbbf24',
    tagline: 'COD available • Easy returns',
  },
  {
    id: 3,
    image: '/poster_appliances.jpg',
    title: 'Home Appliance Bonanza',
    subtitle: 'Refrigerators, ACs, washing machines & more at lowest prices',
    originalPrice: '₹35,990',
    salePrice: '₹18,999',
    discount: 'Up to 50% OFF',
    cta: 'Shop Appliances',
    ctaLink: '#appliances-sale',
    gradient: 'linear-gradient(135deg, rgba(7,89,133,0.90) 0%, rgba(15,23,42,0.93) 100%)',
    accentColor: '#38bdf8',
    tagline: 'No-cost EMI from ₹1,583/mo',
  },
  {
    id: 4,
    image: '/poster_electronics.jpg',
    title: 'Electronics Mega Deals',
    subtitle: 'Gaming laptops, smartwatches & headphones at jaw-dropping prices',
    originalPrice: '₹1,29,999',
    salePrice: '₹74,999',
    discount: 'Up to 45% OFF',
    cta: 'Grab the Deal',
    ctaLink: '#tech-deals',
    gradient: 'linear-gradient(135deg, rgba(15,23,42,0.93) 0%, rgba(30,58,138,0.90) 100%)',
    accentColor: '#818cf8',
    tagline: 'Extra ₹5,000 off with HDFC cards',
  },
];

const handleDragStart = (e) => e.preventDefault();

export default function HeroPosterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const onSlideChanged = (e) => {
    setActiveIndex(e.item);
  };

  const items = POSTER_SLIDES.map((slide) => (
    <div
      key={slide.id}
      className="hero-slide"
      onDragStart={handleDragStart}
      role="presentation"
    >
      {/* Background Image */}
      <div className="hero-slide__bg">
        <img src={slide.image} alt={slide.title} />
        <div
          className="hero-slide__overlay"
          style={{ background: slide.gradient }}
        />
      </div>

      {/* Content */}
      <div className="hero-slide__content">
        <div className="hero-slide__text-block">
          {/* Badge */}
          <span className="hero-slide__badge" style={{ '--accent': slide.accentColor }}>
            {slide.badge}
          </span>

          {/* Discount Tag */}
          <div className="hero-slide__discount" style={{ '--accent': slide.accentColor }}>
            {slide.discount}
          </div>

          {/* Title */}
          <h2 className="hero-slide__title">{slide.title}</h2>

          {/* Subtitle */}
          <p className="hero-slide__subtitle">{slide.subtitle}</p>

          {/* Price Block */}
          <div className="hero-slide__price-block">
            <span className="hero-slide__original-price">{slide.originalPrice}</span>
            <span className="hero-slide__sale-price" style={{ color: slide.accentColor }}>
              {slide.salePrice}
            </span>
          </div>

          {/* Tagline */}
          <p className="hero-slide__tagline">{slide.tagline}</p>

          {/* CTA Button */}
          <a
            href={slide.ctaLink}
            className="hero-slide__cta"
            style={{
              '--accent': slide.accentColor,
              background: slide.accentColor,
            }}
          >
            {slide.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="hero-carousel-section" id="hero-carousel">
      <div className="hero-carousel-wrapper">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          activeIndex={activeIndex}
          onSlideChanged={onSlideChanged}
          autoPlay
          autoPlayInterval={4500}
          animationDuration={800}
          animationType="fadeout"
          infinite
          disableButtonsControls
          disableDotsControls
          mouseTracking
          touchTracking
          autoPlayStrategy="none"
        />

        {/* Custom Navigation Arrows */}
        <button
          className="hero-nav-btn hero-nav-btn--prev"
          onClick={slidePrev}
          aria-label="Previous slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="hero-nav-btn hero-nav-btn--next"
          onClick={slideNext}
          aria-label="Next slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Custom Dots */}
        <div className="hero-dots">
          {POSTER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              className={`hero-dot ${activeIndex === idx ? 'hero-dot--active' : ''}`}
              onClick={() => carouselRef.current?.slideTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={activeIndex === idx ? { '--dot-color': slide.accentColor } : {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
