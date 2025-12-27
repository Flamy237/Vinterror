// app/about/ar-experience/ArCtaSection.tsx

const ArCtaSection = () => {
  return (
    <section className="ar-cta-section">
      <div className="cta-container">
        
        {/* Titre/Appel à l'action */}
        <h2 className="cta-title">
          PRET POUR LES RAMENERS A LA VIE ?
        </h2>
        
        {/* Texte d'instruction */}
        <p className="cta-description">
          Téléchargez l'application, scannez et voyez ce qui se passe!
        </p>
        
        {/* Boutons d'action */}
        <div className="cta-buttons">
          
          {/* Bouton pour télécharger l'application (simulé pour le moment) */}
          <a href="#" className="cta-button primary-button">
            TÉLÉCHARGER L'APP
          </a>
          
          {/* Bouton pour trouver un magasin (simulé) */}
          <a href="/store-locator" className="cta-button secondary-button">
            TROUVER LE VIN
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default ArCtaSection;