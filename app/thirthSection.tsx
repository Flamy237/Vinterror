// app/components/InfoCardsSection.tsx

const cardData = [
  {
    iconClass: "fas fa-money-bill-alt",
    title: "PARTENAIRE NOTOIRE",
    description: "Rejoignez et gagnez des points pour des récompenses VIP incluant des cadeaux et des expériences.",
  },
  {
    iconClass: "fas fa-truck", 
    title: "FRAIS DE PORT FIXES",
    description: "Frais de port fixes pour que vous connaissiez toujours le coût total de vos vins VinTerror.",
  },
  {
    iconClass: "fas fa-globe-africa", 
    title: "LIVRAISON À",
    description: "DLA, YDE, NGA, GA, NRD, BUE, ADM, MRD, & NG",
  },
];

const InfoCardsSection = () => {
  return (
    <section className="info-cards-section">
      <div className="cards-grid">
        
        {cardData.map((card, index) => (
          <div key={index} className="info-card">
            
            
            <i className={`${card.iconClass} card-icon`}></i>
            
            {/* Titre */}
            <h4 className="card-title">{card.title}</h4>
            
            {/* Description */}
            <p className="card-description">{card.description}</p>
            
            {/* Bouton Learn More */}
            <a href="#" className="learn-more-button">
              EN SAVOIR PLUS
            </a>
          </div>
        ))}
        
      </div>
    </section>
  );
};

export default InfoCardsSection;