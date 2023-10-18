import * as THREE from 'three';
import {InteractionManager} from 'three.interactive';
import {IMouse, Animator, Clock} from '../components';

class Base {
  constructor(sel = "#app") {
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 1;
    this.camera = camera;

    this.scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer = renderer;

    const container = document.querySelector(sel);
    container?.appendChild(renderer.domElement);
    this.container = container

    this.animator = new Animator(this);

    this.interactionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );

    this.composer = null;

    const clock = new Clock(this);
    this.clock = clock;

    this.iMouse = new IMouse(this);

    this.init();

    this.addEventListeners();
  }

  addEventListeners() {
    // mouse
    this.iMouse.listenForMouse();
  }

  init() {
    this.update(() => {
      this.interactionManager.update();
    });
    this.animator.update();
  }

  update(fn) {
    this.animator.add(fn);
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
