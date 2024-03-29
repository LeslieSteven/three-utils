import { Base } from "../base/base";

class Animator {
  constructor(base = new Base()) {
    this.base = base;
    this.tasks = [];
  }
  add(fn) {
    this.tasks.push(fn);
  }
  update() {
    this.base.renderer.setAnimationLoop((time) => {
      this.tick(time);
    });
  }
  tick(time = 0) {
    this.tasks.forEach((task) => {
      task(time);
    });
    this.base.render();
  }
}

export { Animator };
