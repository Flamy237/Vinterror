"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MouseEvent as ReactMouseEvent } from 'react';

// Liste des liens de la collection du  Mega Menu (gauche)
const wineMegaMenuLinks = [
    { name: 'Tout les Vins', href: '/shop/' },
    { name: 'Les Classiques', href: '/classic' },
    { name: 'En Avant premiere', href: '/avant-premier' },
    { name: 'Disponible en AR', href: '/dispo-ar' },
    { name: 'UNIVERSAL MONSTERS', href: '/universal-monswters' },
];

const Header = () => {
    // États pour gérer l'ouverture/fermeture des menus
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isWineMegaMenuOpen, setIsWineMegaMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Référence pour le menu mobile
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    // Gestionnaire de clic en dehors du menu mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (!mobileMenuRef.current) return;

            // Vérifie si le clic est en dehors du conteneur mobile
            if (!mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Bloquer le scroll du body quand le menu mobile est ouvert
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    // Définition des fonctions d'ouverture/fermeture pour le menu "A PROPOS"
    const openAboutDropdown = () => setIsAboutDropdownOpen(true);
    const closeAboutDropdown = () => setIsAboutDropdownOpen(false);

    // Définition des liens pour la navigation principale
    const navLinks = [

        { name: 'NOS MAGASINS', href: '/store-locator' },
        { name: 'NOS HEROS', href: '/hero' },
        // 'A PROPOS' est traité séparément comme Dropdown
    ];

    // Définition des liens pour le menu déroulant "A PROPOS" 
    const aboutDropdownLinks = [
        { name: 'VinTerror', href: '/about/crimes' },
        { name: 'The Crew', href: '/about/crew' },
        { name: 'AR Experience', href: '/about/ar-experience' },
    ];

    return (
        <header className="header">
            <div className="header-container">

                {/* Logo */}
                <div className="logo">
                    <a href="/">
                        <img src="../assets/images/logo_vinterror.png" alt="VinTerror Logo" className="logo" />
                    </a>
                </div>

                {/* Bouton hamburger pour mobile (caché quand le menu est ouvert) */}
                {!isMobileMenuOpen && (
                    <button
                        className="hamburger-button mobile-only"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                )}

                {/* Liens de navigation centraux - visible sur desktop */}
                <nav className="nav-links desktop-only">

                    {/* 🛑 MEGA MENU 'LES VINS' 🛑 */}
                    <div
                        className="mega-menu-container"
                        onMouseEnter={() => setIsWineMegaMenuOpen(true)}
                        onMouseLeave={() => setIsWineMegaMenuOpen(false)}
                    >
                        {/* Lien principal 'LES VINS' */}
                        <a href="/vin" className="nav-link wine-link">
                            LES VINS
                        </a>

                        {/* Structure du Mega Menu */}
                        <div
                            className={`mega-menu ${isWineMegaMenuOpen ? 'is-open' : ''}`}

                            style={{
                                left: '50%',
                                transform: 'translateX(-50%)',
                                position: 'absolute',
                            }}
                        >
                            <div className="mega-menu-content">

                                {/* Colonne Gauche: Liens de collection */}
                                <div className="mega-menu-links">
                                    {wineMegaMenuLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="mega-menu-link-item"
                                            onClick={() => setIsWineMegaMenuOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>

                                {/* Colonne Droite: Carte Promo (Image E14A63.png) */}
                                <div className="mega-menu-promo">
                                    <div className="promo-box">

                                        <img
                                            src="/assets/images/gangs.jpg"
                                            alt="Vin Terror  Promo"
                                            className="promo-image"
                                        />

                                        {/* Bouton du Call to Action */}
                                        <div className="promo-cta-box">
                                            <a href="/universal-monsters" className="promo-cta-button">
                                                ACHETEZ EN VIP ET SOUTENEZ NOTRE PATRIMOINE
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* 🛑 FIN MEGA MENU 🛑 */}

                    {/* Liens statiques */}
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}

                    {/* Conteneur du Dropdown "A PROPOS" */}
                    <div
                        className="dropdown-container"
                        onMouseEnter={openAboutDropdown}
                        onMouseLeave={closeAboutDropdown}
                    >
                        {/* Le lien principal 'A PROPOS' */}
                        <a href="/A_propos" className="nav-link about-link">
                            A PROPOS
                        </a>

                        {/* Menu Déroulant */}
                        <div className={`dropdown-menu ${isAboutDropdownOpen ? 'is-open' : ''}`}>
                            {aboutDropdownLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="dropdown-item"
                                    onClick={closeAboutDropdown} // Ferme le menu après le clic
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Icônes Utilitaires */}
                <div className="utility-icons desktop-only">
                    <div className="icon search-icon" aria-label="Recherche">
                        <i className="fas fa-search"></i>
                    </div>

                    <div className="utility-icons-2">
                        <div className="icon account-icon" aria-label="Compte">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                        <div className="icon cart-icon" aria-label="Panier">
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                    
                </div>

                {/* Menu Mobile */}
                <div
                    className={`mobile-menu-overlay ${isMobileMenuOpen ? 'is-open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div
                        className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}
                        ref={mobileMenuRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Bouton de fermeture (mobile) */}
                        <button
                            className="mobile-close-button"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Fermer le menu"
                        >
                            <i className="fas fa-times" aria-hidden="true"></i>
                        </button>
                        {/* Liens du menu mobile */}
                        <div className="mobile-links-group">
                            <span className="mobile-title">Les Vins</span>
                            {wineMegaMenuLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="mobile-sub-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        <hr className="mobile-separator" />

                        {/* Liens de navigation principaux */}
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="mobile-main-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}

                        <hr className="mobile-separator" />

                        {/* Liens À Propos */}
                        <div className="mobile-links-group">
                            <span className="mobile-title">À Propos</span>
                            {aboutDropdownLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="mobile-sub-link"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        <hr className="mobile-separator" />

                        {/* Icônes utilitaires pour mobile */}
                        <div className="mobile-utility-icons">
                            <a href="/search" className="mobile-main-link">
                                <i className="fas fa-search"></i> Recherche
                            </a>
                            <a href="/account" className="mobile-main-link">
                                <i className="fas fa-user"></i> Mon Compte
                            </a>
                            <a href="/cart" className="mobile-main-link">
                                <i className="fas fa-shopping-bag"></i> Panier
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
