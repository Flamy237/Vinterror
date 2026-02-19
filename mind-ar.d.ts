declare module 'mind-ar/dist/mindar-image-three.prod.js' {
  import * as THREE from 'three';

  export class MindARThree {
    constructor(options: {
      container: HTMLElement;
      imageTargetSrc: string;
      maxTrack?: number;
      uiScanning?: string;
      uiLoading?: string;
    });
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    start(): Promise<void>;
    stop(): void;
    addAnchor(index: number): { group: THREE.Group };
  }
}
