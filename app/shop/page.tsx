// app/shop/page.tsx
import React from 'react';

import Header from '../Header'; 
import Footer from '../Footer'; 
import ShopHeroSection from './shopHeroSection'; 
import ShopAllPage from './ShopAllPage';
import ArCtaSection from '../about/ar-experience/ArCtaSection';


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