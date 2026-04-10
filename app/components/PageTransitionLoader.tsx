"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PageTransitionLoader.module.css';

const TOTAL_SEGMENTS = 20;

const PageTransitionLoader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const previousPath = useRef(pathname);
  const mounted = useRef(false);

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
      setProgress(12);

      const interval = window.setInterval(() => {
        setProgress((current) => {
          const next = current + Math.floor(Math.random() * 8) + 3;
          return next >= 100 ? 100 : next;
        });
      }, 120);

      // Masquer le loader après 2 secondes
      const hideTimeout = window.setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(hideTimeout);
      };
    };

    if (!mounted.current) {
      // Premier chargement - afficher le loader
      mounted.current = true;
      previousPath.current = pathname;
      return startLoading();
    }

    if (pathname === previousPath.current) {
      return undefined;
    }

    // Changement de page - afficher le loader
    previousPath.current = pathname;
    return startLoading();
  }, [pathname]);

  if (!isLoading) {
    return null;
  }

  const percent = Math.min(100, Math.max(0, progress));
  const activeSegments = Math.round((percent / 100) * TOTAL_SEGMENTS);

  return (
    <div className={styles.pageTransitionLoader}>
      <div className={styles.loaderCard}>
        <div className={styles.loaderGrid}>
          <div className={styles.dialContainer}>
            <div className={styles.dialRing}>
              <div
                className={styles.dialProgress}
                style={{
                  background: `conic-gradient(#c4a75e ${percent * 3.6}deg, rgba(196, 167, 94, 0.3) ${percent * 3.6}deg)`,
                }}
              />
              <div className={styles.dialCore}>
                <span className={styles.dialState}>LOADING</span>
                <span className={styles.dialValue}>{percent}%</span>
                <span className={styles.dialLabel}>AR SITE</span>
              </div>
            </div>
          </div>

          <div className={styles.progressPanel}>
            <div className={styles.progressHeader}>
              <span className={styles.progressTag}>LOADING...</span>
              <span className={styles.progressSource}>Système VinTerror</span>
            </div>

            <div className={styles.progressTrack}>
              {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => (
                <span
                  key={index}
                  className={`${styles.segment} ${index < activeSegments ? styles.segmentActive : ''}`}
                />
              ))}
            </div>

            <div className={styles.progressFooter}>
              <span className={styles.footerValue}>{percent}%</span>
              <span className={styles.footerText}>Chargement des modules du site</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTransitionLoader;
