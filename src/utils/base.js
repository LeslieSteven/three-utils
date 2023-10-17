import * as THREE from 'three';
import { InteractionManager } from 'three.interactive';
import { IMouse } from '@/utils/IMouse';

class Base {
  constructor(sel = '#amigo') {
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    );
    camera.position.z = 1;
    this.camera = camera;

    const scene = new THREE.Scene();
    this.scene = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer = renderer;

    const container = document.querySelector(sel);
    container?.appendChild(renderer.domElement);
    this.container = container;

    this.interactionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );

    this.composer = null;

    this.iMouse = new IMouse(this);

    this.init();

    this.addEventListeners();
  }

  addEventListeners() {
    // mouse
    this.iMouse.listenForMouse();
  }

  init() {
  }

  update(time) {
    console.log('update', time);
  }

  render() {
    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    // scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose();

        Object.values(child.material).forEach((value) => {
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        });
      }
    });

    // renderer
    this.renderer.dispose();
  }
}

export { Base };
