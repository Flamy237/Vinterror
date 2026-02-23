'use client';

import { useRef, useState, useEffect } from 'react';

export default function ARPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarRef = useRef<any>(null);
  const MindARThreeRef = useRef<any>(null);
  const THREERef = useRef<any>(null);
  const GLTFLoaderRef = useRef<any>(null);
  // ✅ Référence audio — un seul objet Audio réutilisé
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

        // ✅ Préchargement de l'audio dès que les modules sont prêts
        // On le crée ici pour qu'il soit prêt à jouer instantanément lors du scan
        const audio = new Audio('/audio/voix.mp3');
        audio.preload = 'auto';
        audio.loop = false; // passe à true si tu veux une boucle
        audioRef.current = audio;

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
      // Nettoyage audio + AR au démontage
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
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

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(0, 5, 5);
      scene.add(dirLight);

      const anchor = mindarThree.addAnchor(0);
      const loader = new GLTFLoader();
      setStatus('Chargement du modèle...');

      const clock = new THREE.Clock();
      let mixer: any = null;

      loader.load(
        '/models/personnage.glb',
        (gltf: any) => {
          const model = gltf.scene;
          model.scale.set(0.5, 0.5, 0.5);
          model.position.set(0, 0, 0);

          model.traverse((child: any) => {
            if (child.isMesh) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m: any) => { m.side = THREE.DoubleSide; });
              child.frustumCulled = false;
            }
          });

          anchor.group.add(model);

          if (gltf.animations?.length > 0) {
            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip: any) => mixer.clipAction(clip).play());
          }

          setStatus('Scannez le capteur 📷');
        },
        (xhr: any) => {
          if (xhr.total > 0) setStatus(`Modèle : ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
        },
        (err: any) => {
          console.error('❌ Erreur GLB:', err);
          setStatus('❌ Erreur chargement modèle');
        }
      );

      // ✅ targetFound : le capteur est détecté → personnage visible → audio démarre
      anchor.onTargetFound = () => {
        console.log('🎯 Capteur détecté — démarrage audio');
        const audio = audioRef.current;
        if (audio) {
          audio.currentTime = 0; // repart du début si rejoué
          audio.play().catch((err) => {
            // Les navigateurs mobiles bloquent parfois l'audio sans interaction
            console.warn('Audio bloqué par le navigateur :', err);
          });
        }
      };

      // ✅ targetLost : le capteur disparaît → personnage masqué → audio s'arrête
      anchor.onTargetLost = () => {
        console.log('❌ Capteur perdu — arrêt audio');
        const audio = audioRef.current;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      };

      await mindarThree.start();

      renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
      });

    } catch (err) {
      console.error('Erreur AR:', err);
      setStatus('❌ ' + String(err));
      setStarted(false);
    }
  };

  const stopExperience = () => {
    // Arrêt audio propre quand on clique STOP
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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
    <>
      <style jsx global>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body {
          width: 100%;
          height: 100%;
          max-width: 100%;
          overflow: hidden !important;
          background: #000 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        #__next, main, [data-nextjs-scroll-focus-boundary] {
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          overflow: hidden !important;
        }
        video {
          position: fixed !important;
          top: 0 !important; left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          object-fit: cover !important;
          z-index: 0 !important;
        }
        canvas {
          position: fixed !important;
          top: 0 !important; left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: transparent !important;
          z-index: 1 !important;
        }
        .mindar-ui-overlay,
        .mindar-ui-scanning {
          width: 100vw !important;
          height: 100vh !important;
        }
      `}</style>

      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        overflow: 'hidden', background: '#000',
      }}>

        {!started && (
          <div style={{
            position: 'fixed', zIndex: 10, inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: 'white', textAlign: 'center', padding: '20px',
            background: 'rgba(0,0,0,0.6)',
          }}>
            <h1 style={{ letterSpacing: '4px', marginBottom: '10px', fontSize: '24px' }}>
              VINTERROR AR
            </h1>
            <p style={{ opacity: 0.85, marginBottom: '30px', fontSize: '14px' }}>
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
            position: 'fixed', zIndex: 20, top: '20px', left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.5)', color: 'white',
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

        <div
          ref={containerRef}
          style={{
            position: 'fixed', top: 0, left: 0,
            width: '100vw', height: '100vh',
            overflow: 'hidden',
          }}
        />
      </div>
    </>
  );
}