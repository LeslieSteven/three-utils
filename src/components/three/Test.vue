<script setup>
import { Base, THREE } from '@/base/base.js';
import { OrbitControls } from '@/controls/OrbitControls.js';
import { Box } from '@/shader/box.js';
import { RaycastSelector } from '@/components';

class Sketch extends Base {
  create() {
    new OrbitControls(this);
    const rs = new RaycastSelector(this);
    const config = {
      width: 0.5,
      height: 0.5,
      depth: 0.5,
      material: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    };
    const box = new Box(this, config);
    box.addExisting();

    this.update((time) => {
      box.spin(time, 'x');
    });

    // mouse
    this.container.addEventListener("mousemove", (e) => {
      const target = rs.onChooseIntersect(box.mesh);
      if (target) {
        const p = "#FF0000";
        box.mesh.material.color.set(p);
      }else {
        const p = "#00ff00";
        box.mesh.material.color.set(p);
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
