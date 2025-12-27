'use client';

import { useEffect, useRef, useState } from 'react';

export default function ARPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Chargement dynamique des scripts MindAR et A-Frame
    const loadScripts = async () => {
      let aframeScript: HTMLScriptElement | null = null;
      let mindarScript: HTMLScriptElement | null = null;
      try {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
          setError('Environment does not support window/document');
          return;
        }

        aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
        aframeScript.async = true;
        document.head.appendChild(aframeScript);

        // Attendre que A-Frame soit chargé
        await new Promise<void>((resolve, reject) => {
          aframeScript!.onload = () => resolve();
          aframeScript!.onerror = () => reject(new Error('Failed to load A-Frame'));
        });

        // Charger MindAR après A-Frame — essayer plusieurs CDN en repli
        const mindarUrls = [
          'https://cdn.jsdelivr.net/npm/mind-ar@1.1.1/dist/mindar-image-aframe.prod.js',
          'https://unpkg.com/mind-ar/dist/mindar-image-aframe.prod.js',
          'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@master/dist/mindar-image-aframe.prod.js',
        ];
        let loaded = false;
        for (const url of mindarUrls) {
          try {
            mindarScript = document.createElement('script');
            mindarScript.src = url;
            mindarScript.async = true;
            document.head.appendChild(mindarScript);

            await new Promise<void>((resolve, reject) => {
              mindarScript!.onload = () => resolve();
              mindarScript!.onerror = () => reject(new Error(`Failed to load MindAR from ${url}`));
            });

            loaded = true;
            break;
          } catch (e) {
            console.warn('MindAR CDN failed, trying next...', e);
            if (mindarScript && mindarScript.parentNode) mindarScript.parentNode.removeChild(mindarScript);
            mindarScript = null;
          }
        }
        if (!loaded) throw new Error('Failed to load MindAR from all CDNs');

        // Injecter le markup A-Frame dans le conteneur (après chargement des scripts)
        if (containerRef.current) {
          const html = `
            <a-scene
              mindar-image="imageTargetSrc: /models/card.mind; maxTrack: 1;"
              color-space="sRGB"
              renderer="antialias: true; physicallyCorrectLights: true"
              vr-mode-ui="enabled: false"
              embedded
            >
              <a-assets>
                <a-asset-item id="wineModel" src="/models/scene.gltf"></a-asset-item>
              </a-assets>

              <a-camera-static></a-camera-static>

              <a-entity mindar-image-target="targetIndex: 0">
                <a-entity
                  gltf-model="#wineModel"
                  scale="0.08 0.08 0.08"
                  position="0 0 0"
                  rotation="0 0 0"
                ></a-entity>
              </a-entity>

              <a-entity camera></a-entity>
            </a-scene>
          `;
          containerRef.current.innerHTML = html;
        }
      } catch (err: any) {
        console.error('AR load error', err);
        setError(err?.message || 'Unknown error while loading AR scripts');
      }

      // cleanup function: remove appended scripts when unmounting
      return () => {
        try {
          if (mindarScript && mindarScript.parentNode) mindarScript.parentNode.removeChild(mindarScript);
          if (aframeScript && aframeScript.parentNode) aframeScript.parentNode.removeChild(aframeScript);
          if (containerRef.current) containerRef.current.innerHTML = '';
        } catch (e) {
          // ignore cleanup errors
        }
      };
    };

    const cleanupPromise = loadScripts();

    // If loadScripts returned a cleanup function, handle it on unmount
    return () => {
      // cleanupPromise may resolve to a function (we returned cleanup inside loadScripts)
      cleanupPromise?.then((fn: any) => {
        if (typeof fn === 'function') fn();
      }).catch(() => {});
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Contrôles UI */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '14px',
          zIndex: 100,
        }}
      >
        {error ? `Erreur AR: ${error}` : '📷 Pointez votre caméra sur le marqueur pour voir la bouteille'}
      </div>
    </div>
  );
}
