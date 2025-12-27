// app/components/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    
    <div className="hero-section">
      <div className="hero-content">
        
        {/* Titre et sous-titre */}
        {/* <div className="main-title">VinTerror.</div> */}
        
        {/* Cadre de collaboration */}
        <div className="collab-frame">
          <p className="universal-monsters">VIN </p>
          <p className="universal-monsters">TERROR<sub><small>AR</small></sub></p>
        </div>

        {/* Slogan */}
        {/* <h2 className="slogan">ICI EN LIVE!</h2> */}
        <img src="../assets/images/ICI_EN_LIVE.png" alt="ICI EN LIVE" className="live"/>
        {/* <p className="story-text">TOUTE LES  BOUTEILLE ONT UNE HISTOIRE A RACONTER.</p> */}
        
        {/* Boutons d'action */}
        <div className="cta-buttons">
          <Link href="/shop-wines" className="cta-button shop-wines">
            ACHETER UN VIN
          </Link>
          <Link href="/find-store" className="cta-button find-store">
            VISITER LE MAGASIN
          </Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default HeroSection;