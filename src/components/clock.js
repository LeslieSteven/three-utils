import * as THREE from "three";

import {Component} from "./component";
import {Base} from "../base/base";

class Clock extends Component {
  constructor(base) {
    super(base);

    this.clock = new THREE.Clock();

    this.deltaTime = 0;
    this.elapsedTime = 0;
  }
  update(time) {
    const newElapsedTime = this.clock.getElapsedTime();
    this.deltaTime = newElapsedTime - this.elapsedTime;
    this.elapsedTime = newElapsedTime;
    this.emit("tick");
  }
}

export { Clock };
