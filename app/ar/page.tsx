'use client';

/**
 * PRÉREQUIS — une seule fois dans le terminal :
 *   npm install three mind-ar
 *   npm install --save-dev @types/three
 */

import { useRef, useState, useEffect } from 'react';

export default function ARPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarRef = useRef<any>(null);
  const MindARThreeRef = useRef<any>(null);
  const THREERef = useRef<any>(null);
  const GLTFLoaderRef = useRef<any>(null);

  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('Chargement MindAR...');

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        setStatus('Chargement des modules...');

        const [mindARModule, threeModule, gltfModule] = await Promise.all([
          import('mind-ar/dist/mindar-image-three.prod.js'),
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader.js'),
        ]);

        if (cancelled) return;

        MindARThreeRef.current = mindARModule.MindARThree;
        THREERef.current = threeModule;
        GLTFLoaderRef.current = gltfModule.GLTFLoader;

        setStatus('✅ Système prêt');
        setReady(true);
      } catch (err: any) {
        console.error('Erreur init:', err);
        setStatus('❌ ' + err.message);
      }
    };

    init();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    return () => {
      if (mindarRef.current) {
        try { mindarRef.current.stop(); } catch (_) {}
        mindarRef.current = null;
      }
    };
  }, []);

  const startExperience = async () => {
    const MindARThree = MindARThreeRef.current;
    const THREE = THREERef.current;
    const GLTFLoader = GLTFLoaderRef.current;
    if (!MindARThree || !THREE || !GLTFLoader) return;

    setStarted(true);
    setStatus('Initialisation caméra...');

    try {
      const mindarThree = new MindARThree({
        container: containerRef.current!,
        imageTargetSrc: '/models/capteur.mind',
        maxTrack: 1,
        uiScanning: 'yes',
        uiLoading: 'yes',
      });

      const { renderer, scene, camera } = mindarThree;
      mindarRef.current = mindarThree;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(0, 5, 5);
      scene.add(dirLight);

      const anchor = mindarThree.addAnchor(0);
      const loader = new GLTFLoader();
      setStatus('Chargement du modèle...');

      loader.load(
        '/models/personnage.glb',
        (gltf: any) => {
          console.log('✅ Modèle GLB chargé', gltf);
          setStatus('Scannez le capteur 📷');

          const model = gltf.scene;
          model.scale.set(0.1, 0.1, 0.1); // ⚠️ Si invisible → essaie (1,1,1)
          model.position.set(0, 0, 0);

          model.traverse((child: any) => {
            if (child.isMesh) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m: any) => { m.side = THREE.DoubleSide; });
              child.frustumCulled = false;
            }
          });

          anchor.group.add(model);
        },
        (xhr: any) => {
          if (xhr.total > 0) {
            setStatus(`Modèle : ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
          }
        },
        (err: any) => {
          console.error('❌ Erreur GLB:', err);
          setStatus('❌ Erreur chargement modèle — vérifier /public/models/personnage.glb');
        }
      );

      await mindarThree.start();
      renderer.setAnimationLoop(() => renderer.render(scene, camera));

    } catch (err) {
      console.error('Erreur AR:', err);
      setStatus('❌ ' + String(err));
      setStarted(false);
    }
  };

  const stopExperience = () => {
    if (mindarRef.current) {
      try {
        mindarRef.current.renderer?.setAnimationLoop(null);
        mindarRef.current.stop();
      } catch (_) {}
      mindarRef.current = null;
    }
    setStarted(false);
    setStatus('✅ Système prêt');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>

      {!started && (
        <div style={{
          position: 'absolute', zIndex: 10, inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: 'white', background: 'black', textAlign: 'center', padding: '20px',
        }}>
          <h1 style={{ letterSpacing: '4px', marginBottom: '10px', fontSize: '24px' }}>
            VINTERROR AR
          </h1>
          <p style={{ opacity: 0.7, marginBottom: '30px', fontSize: '14px' }}>
            {status}
          </p>
          {ready && (
            <button
              onClick={startExperience}
              style={{
                padding: '15px 40px', background: 'red', color: 'white',
                border: 'none', cursor: 'pointer', fontWeight: 'bold',
                fontSize: '16px', letterSpacing: '2px', borderRadius: '4px',
              }}
            >
              ACTIVER LA CAMÉRA
            </button>
          )}
        </div>
      )}

      {started && (
        <div style={{
          position: 'absolute', zIndex: 20, top: '20px', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <div style={{
            background: 'rgba(0,0,0,0.6)', color: 'white',
            padding: '6px 14px', borderRadius: '20px', fontSize: '13px',
          }}>
            {status}
          </div>
          <button
            onClick={stopExperience}
            style={{
              padding: '8px 20px', background: 'rgba(200,0,0,0.85)',
              color: 'white', border: 'none', cursor: 'pointer',
              borderRadius: '4px', fontSize: '13px', fontWeight: 'bold',
            }}
          >
            ✕ STOP
          </button>
        </div>
      )}

      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      <style jsx global>{`
        video, canvas {
          position: absolute !important;
          top: 0; left: 0;
          width: 100vw !important;
          height: 100vh !important;
          object-fit: cover !important;
        }
      `}</style>
    </div>
  );
}