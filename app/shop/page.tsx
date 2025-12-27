// app/shop/page.tsx
import React from 'react';
// Chemins corrigés pour remonter d'un niveau depuis app/shop/
import Header from '../Header'; 
import Footer from '../Footer'; 
import ShopHeroSection from './shopHeroSection'; // Le chemin interne est correct
import ShopAllPage from './ShopAllPage';
import ArCtaSection from '../about/ar-experience/ArCtaSection';

// Nous utiliserons ce composant plus tard pour la grille des vins
// import ShopAllPage from './shopAllPage'; 

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        
        {/* 1. Section Hero */}
        <ShopHeroSection />
        
        {/* {2 Tout les vins} */}

        <ShopAllPage />

        {/* ArCta Section */}
        <ArCtaSection />
        
        
      </main>
      
      <Footer />
    </div>
  );
}