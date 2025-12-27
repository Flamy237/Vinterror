// app/components/SubscribeSection.tsx

const SubscribeSection = () => {
  return (
    <section className="subscribe-section">
      <div className="subscribe-container">
        
        {/* Titre */}
        <h2 className="subscribe-title">Nous contacter</h2>
        
        {/* Description */}
        <p className="subscribe-description">
          Donnez votre avis , et souscrivez a notre news letter pour ne rien rater de notre actualité...
        </p>
        
        {/* Formulaire */}
        <form className="subscribe-form">
          
          {/* Ligne 1 : Prénom et Nom */}
          <div className="input-group">
            <label htmlFor="firstName">Nom</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          
          <div className="input-group">
            <label htmlFor="lastName">Prenom</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
          
          {/* Ligne 2 : Email et Bouton */}
          <div className="input-group full-width">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          
          <button type="submit" className="subscribe-button">
            Envoyer
          </button>
          
        </form>
        
      </div>
    </section>
  );
};

export default SubscribeSection;