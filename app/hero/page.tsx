'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../../app/globals.css';
import Header from '../../app/Header';
import Footer from '../../app/Footer';
export default function NosHerosPage() {
  const [selectedHero, setSelectedHero] = useState<number | null >(null);

  const monuments = [
    {
      id: 1,
      title: "Ruben Um Nyobé",
      description: " Ruben Um Nyobè (1913-1958) fut le leader nationaliste camerounais qui a mené la lutte pour l'indépendance immédiate et la réunification du pays. Secrétaire général de l'UPC, il a porté la cause devant l'ONU avant d'être contraint à la clandestinité. Assassiné par l'armée française dans le maquis en 1958, il est devenu un martyr et un symbole de la résistance anticoloniale camerounaise",
      image: "/assets/images/nyobe.jpeg",
      region: "Um Nyobe",
      vinAssocie: "Cuvée de l'Unité"
    },
    {
      id: 2,
      title: "Ernest Ouandie",
      description: "Ernest Ouandié (1924-1971) fut le successeur de Ruben Um Nyobè à la tête de l'UPC. Il a continué la lutte armée contre le régime post-colonial d'Ahidjo depuis le maquis. Arrêté fin 1970, il fut publiquement fusillé à Bafoussam le 15 janvier 1971. Il est aujourd'hui reconnu comme un héros national et un martyr de l'indépendance camerounaise.",
      image: "/assets/images/ouandie.jpeg",
      region: "Ouandie",
      vinAssocie: "Vin de la Vision"
    },
    {
      id: 3,
      title: "Le Monument de la Réunification",
      description: "Symbole de l'unification des Camerouns français et britannique en 1961, ce monument représente l'unité nationale qui inspire notre engagement à valoriser tous les terroirs viticoles camerounais.",
      image: "/assets/images/reunification.jpeg",
      region: "Yaoundé",
      vinAssocie: "Cuvée du Chef"
    },
    {
      id: 4,
      title: "Chutes de la Lobé",
      description: "Les Chutes de la Lobé sont un site naturel unique près de Kribi, au Cameroun, où le fleuve Lobé se jette directement dans l'océan Atlantique par des cascades. C'est une attraction touristique majeure et un paysage culturel reconnu par l'UNESCO, célèbre pour la beauté de sa rencontre entre la forêt dense, les chutes et la mer",
      image: "/assets/images/chute.jpeg",
      region: "Kribi",
      vinAssocie: "Vin du Phare"
    },
    {
      id: 5,
      title: "Mont Cameroun",
      description: "Le Mont Cameroun (Fako) est le plus haut volcan actif d'Afrique de l'Ouest (4 095 m), situé près de la côte camerounaise. Connu pour ses éruptions régulières (la dernière en 2000), il offre des paysages variés et attire les randonneurs, notamment lors de la célèbre <<Course de l'Espoir>> annuelle.",
      image: "/assets/images/Mont.jpeg",
      region: "Sud-Ouest",
      vinAssocie: "Cuvée Tradition"
    },
    {
      id: 6,
      title: "Musee Royal Bamoun",
      description: "Le Musée des Rois Bamoun est situé dans le palais des sultans à Foumban, au Cameroun. Il expose plus de 10 000 objets, dont des costumes royaux et des manuscrits, retraçant l'histoire de la dynastie Bamoun depuis le XIVe siècle. Installé dans un bâtiment moderne inauguré en 2024, il constitue un pôle majeur de la culture camerounaise.",
      image: "/assets/images/Bamoun.jpeg",
      region: "Foumban",
      vinAssocie: "Vin du Courage"
    },
    
  ];

  return (
    <>
      <Header />
      <main>
        {/* Section Hero de la page AR */}
        
         </main>
    <div className="nos-heros-container">
      {/* Hero Section */}
      <section className="hero-sections">
        <div className="hero-overlay">
          <h1>Nos Héros & Notre Patrimoine</h1>
          <p className="hero-subtitle">
            À VinterroRAR, nous puisons notre inspiration dans la richesse historique 
            du Cameroun pour célébrer l'excellence de nos vins locaux.
          </p>
              </div>
      </section>

      {/* Introduction */}
      <section className="introduction-section">
        <div className="container">
          <h2>L'Histoire dans chaque Bouteille</h2>
          <p>
            De la même manière que ces monuments ont façonné l'identité camerounaise, 
            nos vignerons sculptent, année après année, le caractère unique des vins locaux. 
            La réalité augmentée de VinterroRAR vous invite à un voyage où histoire et œnologie 
            se rencontrent pour une expérience sensorielle inédite.
          </p>
          <div className="stats-grid">
            <div className="stat-item">
<span className="stat-number">{monuments.length}</span>
              <span className="stat-label">Monuments célébrés</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12+</span>
              <span className="stat-label">Vignerons partenaires</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Expérience AR disponible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Monuments Grid */}
      <section className="monuments-section">
        <div className="container">
          <h2>Patrimoine historique Camerounais</h2>
          <p className="section-subtitle">
            Ces édifices incarnent l'esprit qui anime notre démarche : fierté, innovation et enracinement.
          </p>
          
          <div className="monuments-grid">
            {monuments.map((monument) => (
              <div 
                key={monument.id} 
                className="monument-card"
                onMouseEnter={() => setSelectedHero(monument.id)}
                onMouseLeave={() => setSelectedHero(null)}>
              
                <div className="monument-image-container">
                  {/* Image placeholder - remplacer par vos images */}
                  <div className="monument-image">
                    <img src={monument.image}></img>
                    <div className="image-placeholder">
                      {monument.title.charAt(0)}
                    </div>
                  </div>
                  <div className="monument-region">{monument.region}</div>
                  <div className="vin-associe">{monument.vinAssocie}</div>
                </div>
                
                <div className="monument-content">
                  <h3>{monument.title}</h3>
                  <p>{monument.description}</p>
                  
                  <div className="monument-link">
                    <span className="link-text">
                      Découvrir le vin associé en AR
                    </span>
                    <span className="link-arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Vivez l'Expérience Historique en Réalité Augmentée</h2>
          <p>
            Scannez les bouteilles de nos partenaires et découvrez comment chaque vin 
            dialogue avec un monument de notre patrimoine national.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary">
              Télécharger l'application
            </button>
            <button className="btn-secondary">
              Voir nos vins partenaires
            </button>
          </div>
        </div>
      </section>
    </div>
     <Footer />
    </>
  );
}
