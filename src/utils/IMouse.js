import * as THREE from 'three';

import { Component } from './component';

class IMouse extends Component {
  constructor(base) {
    super(base);

    this.mouse = new THREE.Vector2(0, 0);

    this.mouseDOM = new THREE.Vector2(0, 0);

    this.mouseScreen = new THREE.Vector2(0, 0);

    this.prevMouseDOM = new THREE.Vector2(0, 0);
    this.isMouseMoving = false;
    this.mouseMoveOffset = 4;
    this.mouseDOMDelta = new THREE.Vector2(0, 0);
  }

  getMouse(x, y) {
    return new THREE.Vector2(x, window.innerHeight - y);
  }

  getMouseDOM(x, y) {
    return new THREE.Vector2(x, y);
  }

  getMouseScreen(x, y) {
    return new THREE.Vector2(
      x - window.innerWidth / 2,
      -(y - window.innerHeight / 2)
    );
  }

  listenForMouse() {
    this.listenForDesktop();
  }

  listenForDesktop() {
    window.addEventListener('mousemove', (e) => {
      this.mouse = this.getMouse(e.clientX, e.clientY);

      this.mouseDOM = this.getMouseDOM(e.clientX, e.clientY);

      this.mouseScreen = this.getMouseScreen(e.clientX, e.clientY);
    });
  }

  syncMouseDOM() {
    this.prevMouseDOM.x = this.mouseDOM.x;
    this.prevMouseDOM.y = this.mouseDOM.y;
  }

  judgeIsMouseMoving() {
    if (
      Math.abs(this.mouseDOMDelta.x) < this.mouseMoveOffset
      && Math.abs(this.mouseDOMDelta.y) < this.mouseMoveOffset
    ) {
      this.isMouseMoving = false;
    } else {
      this.isMouseMoving = true;
    }
  }

  getMouseDOMDelta() {
    const x = this.mouseDOM.x - this.prevMouseDOM.x;
    const y = this.mouseDOM.y - this.prevMouseDOM.y;
    this.mouseDOMDelta = new THREE.Vector2(x, y);
  }

  // eslint-disable-next-line no-unused-vars
  update(time) {
    this.getMouseDOMDelta();
    this.judgeIsMouseMoving();
    this.syncMouseDOM();
  }
}

export { IMouse };
