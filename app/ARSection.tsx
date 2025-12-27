// app/components/ARSection.tsx

const ARSection = () => {
  return (
    <section className="ar-section">
      <div className="ar-container">
        
        {/* Colonne Gauche : Vidéo/Image */}
        <div className="ar-media">
         
          
          
          <div className="video-player">
              <img src="/images/video-placeholder.jpg" alt="Expérience AR VinTerror" className="video-thumb" />
              {/* Icône de lecture pour simuler le bouton Play */}
              <div className="play-button">
                  <i className="fas fa-play"></i>
              </div>
          </div>
        </div>

        {/* Colonne Droite : Texte et Bouton */}
        <div className="ar-content">
          
          <h2 className="ar-title">L'EXPÉRIENCE AR</h2>
          
         
          <div className="ar-separator-logo">
             
             <img src="/images/ar-emblem.png" alt="Emblème" />
          </div>
          
          <p className="ar-text">
            Venez face à face avec des criminels infâmes pour entendre leur version de l'histoire. 
            Découvrez les expériences de réalité augmentée de VinTerror et bien plus.
          </p>
          
          {/* Bouton CTA */}
          <a href="/experience" className="ar-button">
            COMMENCER MAINTENANT
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default ARSection;