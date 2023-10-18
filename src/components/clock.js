import * as THREE from "three";

import { Component } from "./component";
import { Base } from "../base/base";

class Clock extends Component {
  constructor(base = new Base()) {
    super(base);

    const clock = new THREE.Clock();
    this.clock = clock;

    this.deltaTime = 0;
    this.elapsedTime = 0;
  }
  update(time) {
    const newElapsedTime = this.clock.getElapsedTime();
    const deltaTime = newElapsedTime - this.elapsedTime;
    this.deltaTime = deltaTime;
    this.elapsedTime = newElapsedTime;
    this.emit("tick");
  }
}

export { Clock };
