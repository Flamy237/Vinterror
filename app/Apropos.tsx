// app/components/CrimesSection.tsx

"use client";

import React, { useState, useEffect } from 'react';

// texte complet de la section
const fullText = "      Nous unissons la richesse des terroirs camerounais à la magie de la realité augmentée  en alliant tradition et technologie. scannez nos étiquettes elles s'animent pour vous conter l'histore unique de chaque cépage, vous transporter au coeur des paysages et vous révéler les secrets de nos vignerons. bien plus qu'une bouteille vivez une immersion dansent pour célébrer un patrimoine local d'exception. Bienvenue dans une nouvelle ère oenologique, ou chaque dégustation commence par un voyage. ";

// Vitesse de frappe 
const TYPING_SPEED = 70; 

const Apropos = () => {
  // Stockage du texte a afficher progressivement
  const [displayedText, setDisplayedText] = useState('');
  // État pour savoir si l'animation est terminée
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    
    // intervalle pour l'animation
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        // Ajout du caractère qui suit au texte affiché
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        // arrêt de l'intervalle une fois tout les caractere afficher
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, TYPING_SPEED);

    // Fonction de nettoyage pour annuler l'intervalle lorsque le composant est démonté
    return () => clearInterval(typingInterval);
  }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'une seule fois


  return (
    <section className="crimes-section">
      <div className="crimes-content-container">
        
        {/* Titre de la section */}
        <h3 className="crimes-title">VIN TERROR<sub>AR</sub></h3>
        
        {/* Texte de description animé */}
        <p className="crimes-text">
          {displayedText}
          
          {!isTypingComplete && (
            <span className="typing-cursor">|</span>
          )}
        </p>
        
      </div>
    </section>
  );
};

export default Apropos;