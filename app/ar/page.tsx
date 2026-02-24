'use client';

import { useRef, useState, useEffect } from 'react';

// ---- Types ----
type LoadingStep = {
  id: string;
  label: string;
  sublabel: string;
  done: boolean;
  active: boolean;
};

type ErrorType = 'network' | 'camera' | 'model' | 'generic';

type AppError = {
  type: ErrorType;
  title: string;
  message: string;
  action: string;
};

// ---- Utilitaire : détection type d'erreur ----
function parseError(err: any): AppError {
  const msg = String(err?.message || err || '').toLowerCase();

  if (msg.includes('fetch') || msg.includes('network') || msg.includes('load') || msg.includes('failed to fetch')) {
    return {
      type: 'network',
      title: 'Connexion interrompue',
      message: 'Les ressources AR n\'ont pas pu être téléchargées. Vérifiez votre connexion internet et réessayez.',
      action: 'Réessayer',
    };
  }
  if (msg.includes('camera') || msg.includes('permission') || msg.includes('notallowed') || msg.includes('webcam')) {
    return {
      type: 'camera',
      title: 'Caméra inaccessible',
      message: 'L\'accès à votre caméra a été refusé. Autorisez l\'accès dans les paramètres de votre navigateur puis rechargez la page.',
      action: 'Recharger la page',
    };
  }
  if (msg.includes('glb') || msg.includes('gltf') || msg.includes('model') || msg.includes('404')) {
    return {
      type: 'model',
      title: 'Ressource introuvable',
      message: 'Le modèle 3D n\'a pas pu être chargé. Vérifiez votre connexion et réessayez.',
      action: 'Réessayer',
    };
  }
  return {
    type: 'generic',
    title: 'Erreur inattendue',
    message: 'Une erreur s\'est produite lors du démarrage de l\'AR. Rechargez la page pour réessayer.',
    action: 'Recharger la page',
  };
}

const ERROR_ICONS: Record<ErrorType, string> = {
  network: '📡',
  camera: '📷',
  model: '📦',
  generic: '⚠️',
};

// ---- Composant principal ----
export default function ARPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mindarRef = useRef<any>(null);
  const MindARThreeRef = useRef<any>(null);
  const THREERef = useRef<any>(null);
  const GLTFLoaderRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [phase, setPhase] = useState<'loading' | 'ready' | 'ar' | 'error'>('loading');
  const [appError, setAppError] = useState<AppError | null>(null);
  const [arStatus, setArStatus] = useState('Scannez le capteur ');

  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: 'engine',  label: 'Moteur AR',        sublabel: 'Chargement du moteur de tracking',      done: false, active: true  },
    { id: 'render',  label: 'Rendu 3D',          sublabel: 'Initialisation du pipeline graphique',  done: false, active: false },
    { id: 'spatial', label: 'Espace Spatial',    sublabel: 'Calibration des capteurs de profondeur', done: false, active: false },
    { id: 'model',   label: 'Modèle Augmenté',   sublabel: 'Assemblage des ressources visuelles',   done: false, active: false },
  ]);

  const markStep = (id: string, nextId?: string) => {
    setSteps(prev => prev.map(s => ({
      ...s,
      done:   s.id === id   ? true  : s.done,
      active: s.id === nextId ? true : (s.id === id ? false : s.active),
    })));
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        // Étape 1 : MindAR
        const mindARModule = await import('mind-ar/dist/mindar-image-three.prod.js');
        if (cancelled) return;
        markStep('engine', 'render');
        await delay(400);

        // Étape 2 : Three.js
        const threeModule = await import('three');
        if (cancelled) return;
        markStep('render', 'spatial');
        await delay(400);

        // Étape 3 : GLTFLoader
        const gltfModule = await import('three/examples/jsm/loaders/GLTFLoader.js');
        if (cancelled) return;
        markStep('spatial', 'model');
        await delay(400);

        // Étape 4 : Audio
        const audio = new Audio('/audio/voix.mp3');
        audio.preload = 'auto';
        audio.loop = false;
        audioRef.current = audio;
        await delay(500);
        markStep('model');

        MindARThreeRef.current = mindARModule.MindARThree;
        THREERef.current = threeModule;
        GLTFLoaderRef.current = gltfModule.GLTFLoader;

        await delay(600);
        if (!cancelled) setPhase('ready');

      } catch (err: any) {
        if (!cancelled) {
          console.error('Erreur init:', err);
          setAppError(parseError(err));
          setPhase('error');
        }
      }
    };

    init();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
      if (mindarRef.current) { try { mindarRef.current.stop(); } catch (_) {} mindarRef.current = null; }
    };
  }, []);

  const startExperience = async () => {
    const MindARThree = MindARThreeRef.current;
    const THREE = THREERef.current;
    const GLTFLoader = GLTFLoaderRef.current;
    if (!MindARThree || !THREE || !GLTFLoader) return;

    setPhase('ar');
    setArStatus('Initialisation caméra...');

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
      setArStatus('Chargement du modèle...');

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
          setArStatus('Scannez le capteur ');
        },
        (xhr: any) => {
          if (xhr.total > 0) setArStatus(`Modèle : ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
        },
        (err: any) => {
          setAppError(parseError(err));
          setPhase('error');
        }
      );

      anchor.onTargetFound = () => {
        const audio = audioRef.current;
        if (audio) { audio.currentTime = 0; audio.play().catch(() => {}); }
      };
      anchor.onTargetLost = () => {
        const audio = audioRef.current;
        if (audio) { audio.pause(); audio.currentTime = 0; }
      };

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
      });

    } catch (err: any) {
      console.error('Erreur AR:', err);
      setAppError(parseError(err));
      setPhase('error');
    }
  };

  const stopExperience = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    if (mindarRef.current) {
      try { mindarRef.current.renderer?.setAnimationLoop(null); mindarRef.current.stop(); } catch (_) {}
      mindarRef.current = null;
    }
    setPhase('ready');
    setArStatus('Scannez le capteur ');
  };

  const handleErrorAction = () => {
    if (appError?.type === 'camera') window.location.reload();
    else if (appError?.action === 'Recharger la page') window.location.reload();
    else { setPhase('loading'); setSteps(s => s.map((x, i) => ({ ...x, done: false, active: i === 0 }))); }
  };

  const progress = Math.round((steps.filter(s => s.done).length / steps.length) * 100);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          width: 100%; height: 100%; overflow: hidden !important;
          background: #000 !important; margin: 0 !important; padding: 0 !important;
          font-family: 'Rajdhani', sans-serif;
        }
        #__next, main, [data-nextjs-scroll-focus-boundary] {
          width: 100% !important; height: 100% !important;
          max-width: 100% !important; overflow: hidden !important;
        }
        video {
          position: fixed !important; top: 0 !important; left: 0 !important;
          width: 100vw !important; height: 100vh !important;
          object-fit: cover !important; z-index: 0 !important;
        }
        canvas {
          position: fixed !important; top: 0 !important; left: 0 !important;
          width: 100vw !important; height: 100vh !important;
          background: transparent !important; z-index: 1 !important;
        }
        .mindar-ui-overlay, .mindar-ui-scanning {
          width: 100vw !important; height: 100vh !important;
        }

        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-reverse { to { transform: rotate(-360deg); } }
        @keyframes pulse-ring {
          0%   { transform: scale(0.92); opacity: 0.6; }
          50%  { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(0.92); opacity: 0.6; }
        }
        @keyframes scan-line {
          0%   { top: 10%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitch {
          0%   { clip-path: inset(0 0 98% 0); transform: translate(-2px,0); }
          20%  { clip-path: inset(30% 0 50% 0); transform: translate(2px,0); }
          40%  { clip-path: inset(60% 0 20% 0); transform: translate(-1px,0); }
          60%  { clip-path: inset(10% 0 80% 0); transform: translate(1px,0); }
          80%  { clip-path: inset(80% 0 5% 0);  transform: translate(-2px,0); }
          100% { clip-path: inset(0 0 98% 0);   transform: translate(0,0); }
        }
        @keyframes error-shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-8px); }
          40%     { transform: translateX(8px); }
          60%     { transform: translateX(-5px); }
          80%     { transform: translateX(5px); }
        }
        @keyframes hex-rotate {
          0%   { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .hud-btn {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .hud-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .hud-btn:hover::after { transform: translateX(100%); }
        .hud-btn:active { transform: scale(0.97); }
      `}</style>

      {/* ════════════════ LOADING SCREEN ════════════════ */}
      {phase === 'loading' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'linear-gradient(160deg, #000810 0%, #000d1a 50%, #000508 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}>

          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }} />

          {/* Scan line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
            animation: 'scan-line 3s ease-in-out infinite',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {/* Corner brackets */}
          {[
            { top: 20, left: 20, borderTop: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff' },
            { top: 20, right: 20, borderTop: '2px solid #00f0ff', borderRight: '2px solid #00f0ff' },
            { bottom: 20, left: 20, borderBottom: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff' },
            { bottom: 20, right: 20, borderBottom: '2px solid #00f0ff', borderRight: '2px solid #00f0ff' },
          ].map((style, i) => (
            <div key={i} style={{ position: 'absolute', width: 32, height: 32, opacity: 0.6, ...style }} />
          ))}

          {/* Central HUD ring */}
          <div style={{ position: 'relative', width: 180, height: 180, marginBottom: 40 }}>

            {/* Outer ring */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1px solid rgba(0,240,255,0.2)',
              animation: 'pulse-ring 2.5s ease-in-out infinite',
            }} />

            {/* Rotating dashes ring */}
            <div style={{
              position: 'absolute', inset: 8, borderRadius: '50%',
              border: '2px dashed rgba(0,240,255,0.3)',
              animation: 'spin-slow 8s linear infinite',
            }} />

            {/* Main progress arc via conic-gradient */}
            <div style={{
              position: 'absolute', inset: 16, borderRadius: '50%',
              background: `conic-gradient(#00f0ff ${progress * 3.6}deg, rgba(0,240,255,0.06) 0deg)`,
              transition: 'background 0.5s ease',
            }} />

            {/* Inner fill */}
            <div style={{
              position: 'absolute', inset: 20, borderRadius: '50%',
              background: 'radial-gradient(circle, #001a24 60%, #000d1a 100%)',
              border: '1px solid rgba(0,240,255,0.15)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* AR icon */}
              <div style={{ fontSize: 28, marginBottom: 4 }}>⬡</div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 26, fontWeight: 700,
                color: '#00f0ff',
                textShadow: '0 0 20px rgba(0,240,255,0.8)',
              }}>
                {progress}%
              </div>
            </div>

            {/* Counter-rotating inner ring */}
            <div style={{
              position: 'absolute', inset: 22, borderRadius: '50%',
              border: '1px solid rgba(0,240,255,0.1)',
              animation: 'spin-reverse 5s linear infinite',
              borderTopColor: 'rgba(0,240,255,0.5)',
            }} />
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 36, position: 'relative' }}>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 11, letterSpacing: 6,
              color: 'rgba(0,240,255,0.5)',
              marginBottom: 8,
              fontWeight: 600,
            }}>
              SYSTÈME AR — INITIALISATION
            </div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 32, fontWeight: 700,
              color: '#fff',
              letterSpacing: 3,
              textShadow: '0 0 30px rgba(0,240,255,0.4)',
            }}>
              VINTERROR AR
            </div>
            {/* Glitch layer */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 32, fontWeight: 700,
              color: '#00f0ff', letterSpacing: 3,
              opacity: 0.15,
              animation: 'glitch 4s steps(1) infinite',
              pointerEvents: 'none',
            }}>
              VINTERROR AR
            </div>
          </div>

          {/* Steps list */}
          <div style={{ width: '100%', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {steps.map((step, i) => (
              <div key={step.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '10px 14px',
                background: step.active
                  ? 'rgba(0,240,255,0.07)'
                  : step.done
                    ? 'rgba(0,240,255,0.03)'
                    : 'transparent',
                border: step.active
                  ? '1px solid rgba(0,240,255,0.25)'
                  : '1px solid rgba(255,255,255,0.04)',
                borderRadius: 4,
                transition: 'all 0.4s ease',
                animation: step.active ? 'fadeInUp 0.3s ease' : 'none',
              }}>
                {/* Status dot */}
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                  background: step.done
                    ? '#00f0ff'
                    : step.active
                      ? 'rgba(0,240,255,0.8)'
                      : 'rgba(255,255,255,0.1)',
                  boxShadow: step.done || step.active ? '0 0 8px rgba(0,240,255,0.8)' : 'none',
                  animation: step.active ? 'blink 1s ease-in-out infinite' : 'none',
                }} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: 15, fontWeight: 600, letterSpacing: 1,
                    color: step.done ? '#00f0ff' : step.active ? '#fff' : 'rgba(255,255,255,0.3)',
                    transition: 'color 0.3s ease',
                  }}>
                    {step.label}
                  </div>
                  <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 9, letterSpacing: 0.5,
                    color: step.active ? 'rgba(0,240,255,0.6)' : 'rgba(255,255,255,0.15)',
                    marginTop: 1,
                    transition: 'color 0.3s ease',
                  }}>
                    {step.sublabel}
                  </div>
                </div>

                {/* Check or step number */}
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 12, flexShrink: 0,
                  color: step.done ? '#00f0ff' : 'rgba(255,255,255,0.15)',
                }}>
                  {step.done ? '✓' : `0${i + 1}`}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom tag */}
          <div style={{
            position: 'absolute', bottom: 28,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 3,
            color: 'rgba(0,240,255,0.25)',
          }}>
            AUGMENTED REALITY ENGINE v3.5
          </div>
        </div>
      )}

      {/* ════════════════ READY SCREEN ════════════════ */}
      {phase === 'ready' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'linear-gradient(160deg, #000810 0%, #000d1a 50%, #000508 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '32px',
          animation: 'fadeInUp 0.5s ease',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
            backgroundSize: '40px 40px', pointerEvents: 'none',
          }} />

          {[
            { top: 20, left: 20, borderTop: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff' },
            { top: 20, right: 20, borderTop: '2px solid #00f0ff', borderRight: '2px solid #00f0ff' },
            { bottom: 20, left: 20, borderBottom: '2px solid #00f0ff', borderLeft: '2px solid #00f0ff' },
            { bottom: 20, right: 20, borderBottom: '2px solid #00f0ff', borderRight: '2px solid #00f0ff' },
          ].map((style, i) => (
            <div key={i} style={{ position: 'absolute', width: 32, height: 32, opacity: 0.6, ...style }} />
          ))}

          {/* Status badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', marginBottom: 32,
            border: '1px solid rgba(0,240,255,0.3)',
            borderRadius: 2, background: 'rgba(0,240,255,0.06)',
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#00f0ff', boxShadow: '0 0 8px #00f0ff',
              animation: 'blink 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10, letterSpacing: 3, color: '#00f0ff',
            }}>SYSTÈME OPÉRATIONNEL</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 11, letterSpacing: 6,
              color: 'rgba(0,240,255,0.4)', marginBottom: 10, fontWeight: 500,
            }}>RÉALITÉ AUGMENTÉE</div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 42, fontWeight: 700, letterSpacing: 4,
              color: '#fff', lineHeight: 1,
              textShadow: '0 0 40px rgba(0,240,255,0.3)',
            }}>VINTERROR</div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 14, fontWeight: 400, letterSpacing: 8,
              color: 'rgba(0,240,255,0.6)', marginTop: 6,
            }}>EXPÉRIENCE IMMERSIVE</div>
          </div>

          {/* Instructions */}
          <div style={{
            width: '100%', maxWidth: 300,
            padding: '16px 20px', marginBottom: 40,
            background: 'rgba(0,240,255,0.04)',
            border: '1px solid rgba(0,240,255,0.12)',
            borderRadius: 4,
          }}>
            {[
              { icon: '①', text: 'Pointez votre caméra vers le marqueur AR' },
              { icon: '②', text: 'Maintenez une bonne luminosité' },
              { icon: '③', text: 'Gardez le marqueur bien visible à l\'écran' },
            ].map(({ icon, text }) => (
              <div key={icon} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                marginBottom: 12, '&:last-child': { marginBottom: 0 },
              }}>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 13, color: '#00f0ff', flexShrink: 0, marginTop: 1,
                }}>{icon}</span>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4,
                }}>{text}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="hud-btn"
            onClick={startExperience}
            style={{
              width: '100%', maxWidth: 300,
              padding: '18px 32px',
              background: 'transparent',
              border: '2px solid #00f0ff',
              color: '#00f0ff',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 18, fontWeight: 700, letterSpacing: 4,
              boxShadow: '0 0 20px rgba(0,240,255,0.2), inset 0 0 20px rgba(0,240,255,0.05)',
            }}
          >
            ACTIVER LA CAMÉRA
          </button>

          <div style={{
            position: 'absolute', bottom: 28,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 3,
            color: 'rgba(0,240,255,0.2)',
          }}>
            POINTEZ VERS LE MARQUEUR POUR DÉMARRER
          </div>
        </div>
      )}

      {/* ════════════════ ERROR SCREEN ════════════════ */}
      {phase === 'error' && appError && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'linear-gradient(160deg, #0d0000 0%, #100005 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '32px',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(#ff2244 1px, transparent 1px), linear-gradient(90deg, #ff2244 1px, transparent 1px)',
            backgroundSize: '40px 40px', pointerEvents: 'none',
          }} />

          {[
            { top: 20, left: 20, borderTop: '2px solid rgba(255,34,68,0.5)', borderLeft: '2px solid rgba(255,34,68,0.5)' },
            { top: 20, right: 20, borderTop: '2px solid rgba(255,34,68,0.5)', borderRight: '2px solid rgba(255,34,68,0.5)' },
            { bottom: 20, left: 20, borderBottom: '2px solid rgba(255,34,68,0.5)', borderLeft: '2px solid rgba(255,34,68,0.5)' },
            { bottom: 20, right: 20, borderBottom: '2px solid rgba(255,34,68,0.5)', borderRight: '2px solid rgba(255,34,68,0.5)' },
          ].map((style, i) => (
            <div key={i} style={{ position: 'absolute', width: 32, height: 32, ...style }} />
          ))}

          {/* Error badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', marginBottom: 32,
            border: '1px solid rgba(255,34,68,0.4)',
            borderRadius: 2, background: 'rgba(255,34,68,0.08)',
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#ff2244', boxShadow: '0 0 8px #ff2244',
              animation: 'blink 1s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10, letterSpacing: 3, color: '#ff2244',
            }}>SIGNAL INTERROMPU</span>
          </div>

          {/* Error icon */}
          <div style={{
            fontSize: 52, marginBottom: 24,
            animation: 'error-shake 0.5s ease 0.3s',
          }}>
            {ERROR_ICONS[appError.type]}
          </div>

          {/* Error content */}
          <div style={{
            width: '100%', maxWidth: 320, marginBottom: 36, textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 26, fontWeight: 700, letterSpacing: 2,
              color: '#fff', marginBottom: 16,
              textShadow: '0 0 20px rgba(255,34,68,0.3)',
            }}>
              {appError.title}
            </div>
            <div style={{
              padding: '16px 20px',
              background: 'rgba(255,34,68,0.05)',
              border: '1px solid rgba(255,34,68,0.15)',
              borderRadius: 4,
            }}>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 15, color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
              }}>
                {appError.message}
              </p>
            </div>
          </div>

          {/* Action button */}
          <button
            className="hud-btn"
            onClick={handleErrorAction}
            style={{
              width: '100%', maxWidth: 300,
              padding: '16px 32px',
              background: 'transparent',
              border: '2px solid rgba(255,34,68,0.6)',
              color: '#ff2244',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 16, fontWeight: 700, letterSpacing: 4,
              boxShadow: '0 0 20px rgba(255,34,68,0.1)',
            }}
          >
            {appError.action.toUpperCase()}
          </button>
        </div>
      )}

      {/* ════════════════ AR OVERLAY ════════════════ */}
      {phase === 'ar' && (
        <div style={{
          position: 'fixed', zIndex: 20, top: 0, left: 0, right: 0,
          padding: '16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          pointerEvents: 'none',
        }}>
          {/* Status pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 14px',
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(0,240,255,0.2)',
            borderRadius: 4,
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#00f0ff',
              boxShadow: '0 0 6px #00f0ff',
              animation: 'blink 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10, letterSpacing: 1, color: 'rgba(255,255,255,0.8)',
            }}>
              {arStatus}
            </span>
          </div>

          {/* Stop button */}
          <button
            className="hud-btn"
            onClick={stopExperience}
            style={{
              pointerEvents: 'all',
              padding: '8px 18px',
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,34,68,0.5)',
              color: '#ff4466',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 13, fontWeight: 700, letterSpacing: 2,
              borderRadius: 4,
              backdropFilter: 'blur(8px)',
            }}
          >
            ✕ STOP AR
          </button>
        </div>
      )}

      {/* MindAR container */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          overflow: 'hidden',
        }}
      />
    </>
  );
}

// Utilitaire
function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }