// app/components/TestimonialSection.tsx

"use client";
import React, { useRef, useEffect } from 'react';

// Largeur de défilement souhaitée (adaptée à la taille d'un élément)
// Nous allons utiliser 300px, car les cartes sont 450px et les bouteilles 250px.
// 300px est un bon pas pour un défilement visible.
const SCROLL_AMOUNT = 300; 

const sliderItems = [
  // L'ordre est important pour l'effet visuel : Avis/Bouteille/Avis/Bouteille...
  { type: 'review', quote: "BOLD, BALANCED", sub: "This is my favorite wine. Perfectly balanced", author: "- KRISTIE M.", wine: "The Warden Red Blend", rating: 4 },
  { type: 'bottle', img: '/images/warden-bottle.png', alt: 'The Warden Red Blend Bottle' },
  
  { type: 'review', quote: "BEST VALUE!", sub: "Great flavour for the price. Always a favourite at parties.", author: "- MARK R.", wine: "Red Blend", rating: 5 },
  { type: 'bottle', img: '/images/prisoner-bottle.png', alt: 'The Prisoner Golden Bottle' },
  
  { type: 'review', quote: "IS THAT SNOOP?", sub: "When I saw the label, I knew I had to buy it. My new go to.", author: "- TARA S.", wine: "Snoop Cali Red", rating: 5 },
  { type: 'bottle', img: '/images/snoop-bottle.png', alt: 'Snoop Dogg Cali Bottle' },

  { type: 'review', quote: "PERFECT GIFT", sub: "I bought this for a friend and they loved the unique packaging.", author: "- JANE D.", wine: "Universal Monsters", rating: 4 },
  { type: 'bottle', img: '/images/frankenstien-bottle.png', alt: 'Frankenstien Wine' },
];

// Fonction utilitaire des etoiles
const renderStars = (count: number) => {
  return Array(count).fill(0).map((_, i) => (
    <i key={i} className="fas fa-star"></i>
  ));
};

const TestimonialSection = () => {
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  // Logique de défilement 
  useEffect(() => {
    const track = sliderTrackRef.current;
    
    if (!track) return; 

    // Les flèches doivent être sélectionnées par leur classe dans ce cas simple
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    
    // Fonctions de défilement (scrollBy est parfait pour cette tâche)
    const scrollLeft = () => {
      track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    };

    const scrollRight = () => {
      track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    };

    // Attachez les écouteurs d'événements
    arrowLeft?.addEventListener('click', scrollLeft);
    arrowRight?.addEventListener('click', scrollRight);

    // Fonction de nettoyage
    return () => {
      arrowLeft?.removeEventListener('click', scrollLeft);
      arrowRight?.removeEventListener('click', scrollRight);
    };
  }, []); 

    
  return (
    <section className="testimonial-section">
      
      {/* Titre */}
      <h2 className="testimonial-header">NE NOUS CROYEZ PAS SUR PAROLE</h2>
      
      <div className="slider-wrapper">
        
        {/* Flèche Gauche */}
        <button className="slider-arrow arrow-left" aria-label="Défiler à gauche">
            <i className="fas fa-arrow-left"></i> 
        </button>

        {/* Conteneur de défilement (attaché à la référence) */}
        <div className="slider-track" ref={sliderTrackRef}>
          
          {sliderItems.map((item, index) => (
            <div 
              key={index} 
              className={`slider-item ${item.type === 'review' ? 'item-review' : 'item-bottle'}`}
            >
              
              {item.type === 'review' ? (
                // Carte d'Avis
                <div className="testimonial-card">
                  <div className="rating">
                    {renderStars(item.rating ?? 0)} {/*item.rating*/}
                  </div>
                  <h3 className="quote-main">"{item.quote}"</h3>
                  <p className="quote-sub">"{item.sub}"</p>
                  <p className="quote-author">{item.author}</p>
                  <p className="quote-wine">{item.wine}</p>
                </div>
              ) : (
                // Image de Bouteille
                <div className="bottle-image">
                  <img src={item.img} alt={item.alt} />
                </div>
              )}
            </div>
          ))}

        </div>
        
        {/* Flèche Droite */}
        <button className="slider-arrow arrow-right" aria-label="Défiler à droite">
            <i className="fas fa-arrow-right"></i> 
        </button>
        
      </div>
    </section>
  );
};

export default TestimonialSection;