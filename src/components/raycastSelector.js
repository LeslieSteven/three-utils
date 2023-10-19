import * as THREE from "three";

import { Component } from "./component";
import { Base } from "../base/base";

class RaycastSelector extends Component {
  constructor(base = new Base()) {
    super(base);
    this.raycaster = new THREE.Raycaster();
  }
  // 获取点击物
  getInterSects(targets = this.container.children) {
    this.raycaster.setFromCamera(
      this.base.interactionManager.mouse,
      this.base.camera
    );
    const intersects = this.raycaster.intersectObjects(targets, true);
    return intersects;
  }
  // 获取第一个选中物
  getFirstIntersect(targets = this.container.children) {
    const intersects = this.getInterSects(targets);
    const intersect = intersects[0];
    if (!intersect || !intersect.face) {
      return null;
    }
    return intersect;
  }
  // 选中点击物时
  onChooseIntersect(target) {
    const intersect = this.getFirstIntersect();
    if (!intersect) {
      return null;
    }
    const object = intersect.object;
    return target === object ? intersect : null;
  }
  // 选中物包含某个点击物时
  onChooseInclude(target) {
    const targets = this.getInterSects();
    const includedTarget = targets.find((item) => item.object === target);
    return includedTarget ? includedTarget : null;
  }

  onChooseList(targets) {
    const intersects = this.getInterSects();
    const includedTargets = intersects.filter((item) =>
      targets.includes(item.object)
    );
    return includedTargets.length ? includedTargets[0].object : null;
  }
}

export { RaycastSelector };
