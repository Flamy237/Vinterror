'use client';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import './GridScan.css';

const PortalOverlay = () => {
    return (
        <div className="portal-container">
            <motion.div
                className="portal-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.span
                    className="portal-tagline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    L'Héritage rencontre l'Optique
                </motion.span>

                <h1 className="portal-title">
                    Le terroir ne change pas,<br />
                    <span className="highlight">seule notre vision évolue.</span>
                </h1>

                <p className="portal-description">
                    Plongez dans une dégustation augmentée où les racines du Cameroun
                    se révèlent à travers le prisme du futur.
                </p>

                <motion.div
                    className="cta-wrapper"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                >
                        <Link href="/ar/arPage">
                        <button className="portal-button">
                            
                            <span className="button-text">Entrer dans l'Expérience</span>
                            
                            <span className="button-glitch"></span>
                        </button>
                        </Link>
                </motion.div>

                <div className="tech-deco">
                    <span className="coord">LAT: 3.8480° N</span>
                    <span className="coord">LONG: 11.5021° E</span>
                    <div className="scanner-line"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default PortalOverlay;