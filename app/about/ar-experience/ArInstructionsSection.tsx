// app/about/ar-experience/ArInstructionsSection.tsx

import React from 'react';

// Tableau des étapes d'instruction avec les chemins d'image
const instructions = [
  { 
    title: "SÉLECTIONNER", 
    description: "Sélectionnez une bouteille dans votre magasin",
    imagePath: "/assets/images/bouteille-ar.jpg", 
  },
  { 
    title: "SCANNER", 
    description: "Tournez la bouteille pour afficher le code QR",
    imagePath: "/assets/images/scan-ar.jpg", 
  },
  { 
    title: "POINTER", 
    description: "Scannez le code QR avec votre appareil photo",
    imagePath: "/assets/images/scan-end-ar.jpg", 
  },
  { 
    title: "VISUALISER", 
    description: "Observez vos héros prendre vie",
    imagePath: "/assets/images/ar-experience.jpg", 
  },
];

const ArInstructionsSection = () => {
  return (
    <section className="ar-instructions-section">
      <div className="instructions-container">
        
        {instructions.map((step, index) => (
          <div key={index} className="instruction-step">
            
            {/* Conteneur de l'icône/image (le cercle) */}
            <div className="instruction-icon">
              {/* Image à l'intérieur du cercle */}
              <img 
                  src={step.imagePath} 
                  alt={`Step ${index + 1}: ${step.title}`} 
                  className="instruction-image"
              />
            </div>

            {/* Titre de l'étape*/}
            <h3 className="step-title">{step.title}</h3>
            
            {/* Description */}
            <p className="step-description">{step.description}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ArInstructionsSection;