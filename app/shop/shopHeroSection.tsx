// app/shop/shopHeroSection.tsx
import React from 'react';

const ShopHeroSection = () => {
  return (
    // La classe 'shop-hero-section' gère l'image de fond et l'overlay
    <div className="shop-hero-section">
      <div className="shop-hero-content">
        
        {/* Titre Principal centré */}
        <h1 className="shop-main-title">LES VINS</h1>
        
        {/* Slogan ou Texte de description */}
        <p className="shop-tagline">
            Histoires infâmes. Vins notoires. Libérez votre côté rebelle.
        </p>
        
      </div>
    </div>
  );
};

export default ShopHeroSection;