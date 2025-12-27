// app/about/ar-experience/page.tsx

import Header from '../../../app/Header';
import Footer from '../../../app/Footer';
import ArHeroSection from './ArHeroSection';
import ArInstructionsSection from './ArInstructionsSection';
import ArCtaSection from './ArCtaSection';

export default function ARExperiencePage() {
  return (
    <>
      <Header />
      <main>
        {/* Section Hero de la page AR */}
        <ArHeroSection />
        

        {/* ✅ Section des instructions */}
        <ArInstructionsSection />

        {/* ✅ Section CTA */}
        <ArCtaSection />
       
      </main>
      <Footer />
    </>
  );
}