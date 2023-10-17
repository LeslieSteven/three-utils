import mitt from 'mitt';

import { Base } from './base';

class Component {
  constructor(base = Base) {
    this.base = base;
    this.base.update((time) => this.update(time));

    console.log('载入组件');

    this.emitter = mitt();

    this.container = this.base.scene;

    console.log(this.container)
  }

  // 将组件添加至当前场景或替换当前场景中已有的组件
  addExisting() {
    1 + 1;
  }

  // 动画帧
  update(time) {
    1 + 1;
  }

  // 监听事件
  on(type, handler) {
    this.emitter.on(type, handler);
  }

  // 移除事件
  off(type, handler) {
    this.emitter.off(type, handler);
  }

  // 触发事件
  emit(type, event = {}) {
    this.emitter.emit(type, event);
  }
}

export { Component };
