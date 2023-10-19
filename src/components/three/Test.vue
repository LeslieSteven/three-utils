<script setup>
import { Base, THREE } from '@/base/base.js';
import { OrbitControls } from '@/controls/OrbitControls.js';
import { Box, Capsule } from '@/shader';
import { RaycastSelector } from '@/components';

class Sketch extends Base {
  create() {
    new OrbitControls(this);
    const rs = new RaycastSelector(this);
    const config = {
      width: 0.5,
      height: 0.5,
      depth: 0.5,
      material: new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    };
    const box = new Box(this, config);
    box.addExisting();

    const capConfig = {
      radius: 0.5,
      height: 0.5,
      radialSegments: 32,
      position: new THREE.Vector3(5, 0, 0),
      material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    };
    const cap = new Capsule(this, capConfig);
    cap.addExisting();

    this.update((time) => {
      box.spin(time, 'x');
      cap.spin(time, 'z');
    });

    // mouse
    this.container.addEventListener("mousemove", (e) => {
      const target = rs.onChooseList(this.scene.children);
      if (target) {
        target.material.color.set(0xff0000);
      }else {
        // 恢复颜色
        this.scene.children.forEach((item) => {
          item.material.color.set(0x00ffff);
        });
      }
    });
  }
}
const createSketch = () => {
  const sketch = new Sketch("#amigo");
  sketch.create();
  return sketch;
};

onMounted(() => {
  createSketch();
});


</script>

<template>
  <div
    id="amigo"
  />
</template>

<style scoped lang="scss">
#amigo {
  width: 100vw;
  height: 100vh;
  background: black;
  overflow: hidden;
}

</style>
