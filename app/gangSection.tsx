// app/components/GangSection.tsx
import Link from 'next/link';

const GangSection = () => {
  return (
    
    <section className="gang-section">
      {/* Le contenu du texte et du bouton */}
      <div className="gang-content">
        
        {/* Titre */}
        <h2 className="gang-title">L'HERITAGE</h2>
        
        {/* Texte de description */}
        <p className="gang-text">
          De la résistance de Um Nyobé et du courage de Ernest Ouandié, 
         nait aujoud'hui un nouveau combat célébrer la richesse de nos terroirs.
        Comme eux, Nous croyons a un cameroun fier, libre et créatif.
        Notre vin, fruit de nos cépages et de nos paysages, raconte cette histoire de persévérance et de gout.
        Boire local, c'est prolonger leur idéal, affirmer notre identité, ensemble.
        A notre échelle, c'est faire de chaque geste un hommage, et de chaque dégustation, une célébration. 
        </p>
        
        {/* Bouton */}
        <Link href="/gang-story" className="gang-button">
          Lisez leur histoire
        </Link>
        
      </div>
    </section>
  );
};

export default GangSection;