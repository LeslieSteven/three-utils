import * as THREE from "three";

import { Component } from "./component";

class Box extends Component {
  mesh = THREE.Mesh;
  constructor(base, config = {}) {
    super(base);
    const {
      width = 0.2,
      height = 0.2,
      depth = 0.2,
      position = new THREE.Vector3(0, 0, 0),
      material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffffff"),
      }),
    } = config;

    const geometry = new THREE.BoxGeometry(width, height, depth);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    this.mesh = mesh;
  }
  addExisting() {
    console.log("addExisting");
    console.log(this.container);
    this.container.add(this.mesh);
  }
}

export { Box };
