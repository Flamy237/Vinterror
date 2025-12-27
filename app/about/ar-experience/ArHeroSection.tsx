// app/about/ar-experience/ArHeroSection.tsx
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Création d'une texture de point rond
const createCircleTexture = () => {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;

  // Création du gradient radial
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
};

const NetworkBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuration de la scène Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Création des points
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 75;
    const positions = new Float32Array(particlesCount * 3);
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      points.push(new THREE.Vector3(x, y, z));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Matériau des points
    const pointTexture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      map: pointTexture,
      alphaMap: pointTexture,
      alphaTest: 0.1,
      depthWrite: false
    });

    // Création du système de particules
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Création des lignes entre les points proches
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0088ff,
      transparent: true,
      opacity: 0.2
    });

    // Vitesses initiales pour chaque point
    const velocities = points.map(() => new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01
    ));

    // Position de la caméra
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Mise à jour des positions des points
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < points.length; i++) {
        // Mettre à jour la position avec la vélocité
        points[i].add(velocities[i]);

        // Rebondir sur les bords
        if (Math.abs(points[i].x) > 5) velocities[i].x *= -1;
        if (Math.abs(points[i].y) > 5) velocities[i].y *= -1;
        if (Math.abs(points[i].z) > 5) velocities[i].z *= -1;

        // Mettre à jour les positions dans le buffer
        positions[i * 3] = points[i].x;
        positions[i * 3 + 1] = points[i].y;
        positions[i * 3 + 2] = points[i].z;
      }
      
      geometry.attributes.position.needsUpdate = true;

      // Supprimer les anciennes lignes
      scene.children = scene.children.filter(child => child === particles);

      // Créer de nouvelles lignes entre les points proches
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = points[i].distanceTo(points[j]);
          
          if (distance < 2) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Gestion du redimensionnement
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
};

const ArHeroSection = () => {
  return (
    <section className="ar-hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <NetworkBackground />
      <div className="ar-hero-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Colonne Gauche*/}
        <div className="ar-hero-title-box">
          <h1 className="ar-hero-title">
            ALLEZ !! RAMENEZ <br/>
            CES<br/>
            HÉROS<br/>
            À LA VIE.
          </h1>
        </div>
        
        {/* Colonne Droite : Lecteur Vidéo/Instruction */}
        <div className="ar-hero-media">
            
          {/* Conteneur pour simuler le lecteur vidéo */}
          <div className="video-player">
              {/* L'image de fond qui montre le téléphone scannant une bouteille */}
              
              <img 
                  src="/images/scan-bottle-placeholder.jpg" 
                  alt="Scan de bouteille AR" 
                  className="video-thumb" 
              />
              
              {/* Icône de lecture pour simuler le bouton "Play" */}
              <div className="play-overlay">
                  <div className="play-icon-box">
                      <i className="fas fa-play"></i>
                  </div>
                  <span className="watch-text">REGARDEZ & APPRENEZ</span>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArHeroSection;