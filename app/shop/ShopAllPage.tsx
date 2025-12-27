// app/shop/ShopAllPage.tsx
"use client";

import React, { useState } from 'react';
// Simuler des données de vin pour l'affichage
import { sampleWines } from './sampleWinesData'; 

interface Wine {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    price: number;
    isSoldOut?: boolean;
}

// Composant pour l'affichage d'une seule carte de vin
// Composant pour l'affichage d'une seule carte de vin
const WineCard = ({ wine }: { wine: Wine }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="wine-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={wine.image} alt={wine.name} className="wine-image" />
            <h3 className="wine-name">{wine.name}</h3>
            <div className="wine-rating" aria-label={`Rating: ${wine.rating} stars`}>
                {'★'.repeat(Math.round(wine.rating)) + '☆'.repeat(5 - Math.round(wine.rating))} ({wine.reviews})
            </div>
            <p className="wine-price">{wine.price.toFixed(2)} FCFA</p>

            {/* NOUVEL OVERLAY DE SURVOL */}
            <div className={`wine-overlay ${isHovered ? 'is-hovered' : ''}`}>
                <div className="overlay-content">
                    <h3 className="overlay-name">{wine.name}</h3>
                    <div className="overlay-rating" aria-label={`Rating: ${wine.rating} stars`}>
                         {'★'.repeat(Math.round(wine.rating)) + '☆'.repeat(5 - Math.round(wine.rating))} ({wine.reviews})
                    </div>
                    <p className="overlay-price">{wine.price.toFixed(2)} FCFA</p>

                    {/* Boutons d'action */}
                    <div className="overlay-buttons">
                        {wine.isSoldOut ? (
                            <button className="overlay-button sold-out" disabled>
                                ÉPUISÉ
                            </button>
                        ) : (
                            <button className="overlay-button add-to-cart">
                                AJOUTER AU PANIER
                            </button>
                        )}
                        {/* <a href={`/shop/${wine.id}`} className="overlay-button find-in-store">
                            VOIR DÉTAILS
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ShopAllPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    
    // Logique de filtrage et de tri
    const filteredWines = sampleWines.filter(wine =>
        wine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedWines = filteredWines.sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        return 0; // 'default'
    });

    return (
        <section className="shop-all-section">
            <div className="shop-container">
                
                {/* 1. Barre d'outils de tri et recherche */}
                <div className="shop-toolbar">
                    <div className="sort-dropdown-container">
                        <label htmlFor="sort-by" className="sort-label">Trier par :</label>
                        <select 
                            id="sort-by" 
                            className="sort-dropdown"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Par défaut</option>
                            <option value="name-asc">Nom (A-Z)</option>
                            <option value="name-desc">Nom (Z-A)</option>
                            <option value="rating-desc">Nombre d'étoiles</option>
                            <option value="price-asc">Prix (le moins cher)</option>
                            <option value="price-desc">Prix (le plus cher)</option>
                        </select>
                    </div>
                    
                    <div className="search-bar-container">
                        <input 
                            type="text"
                            placeholder="Rechercher un vin..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search search-icon"></i>
                    </div>
                </div>

                {/* 2. Conteneur principal: Grille des Vins + Colonne Latérale Insider */}
                <div className="shop-content-grid">
                    
                    {/* Colonne Gauche: La Grille des Vins */}
                    <div className="wines-grid-container">
                        {sortedWines.length > 0 ? (
                            <div className="wines-grid">
                                {sortedWines.map(wine => (
                                    <WineCard key={wine.id} wine={wine} />
                                ))}
                            </div>
                        ) : (
                            <p className="no-results">Aucun vin trouvé pour "{searchTerm}".</p>
                        )}
                    </div>

            {/* Colonne Droite: Carte "Infamous Insider" */}
            <aside className="insider-promo-sidebar">
                        <div className="insider-box">
                            {/* Image de fond (utilisez une image appropriée) */}
                            <img src="/images/insider-bg.jpg" alt="Devenir un Partenaire VinTerror" className="insider-bg-image" />                            <div className="insider-content">
                                <h3 className="insider-title">DEVENEZ UN<br/>DE NOS PARTENAIRES</h3>
                                <p className="insider-text">
                                    Joignez-vous et gagnez en visibilité tout en profitant d'une expérience à la pointe de la technologie.
                                </p>
                                <a href="/insiders" className="insider-button">
                                    EN SAVOIR PLUS
                                </a>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </section>
    );
};

export default ShopAllPage;