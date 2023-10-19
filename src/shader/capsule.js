import * as THREE from "three";

import { Component } from "../components";


class Capsule extends Component {

  constructor(base, config = {}) {
    super(base);
    const {
      radius = 5,
      length = 5,
      capSegments = 10,
      radialSegments = 20,
      position = new THREE.Vector3(0, 0, 0),
      material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffffff"),
      }),
    } = config;

    const geometry = new THREE.CapsuleGeometry(radius, length, capSegments, radialSegments);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    this.mesh = mesh;
  }
  addExisting() {
    this.container.add(this.mesh);
  }

  spin(time, axis = "y", speed = 1) {
    const mesh = this.mesh;
    mesh.rotation[axis] = (time / 1000) * speed;
  }
}

export { Capsule };
