<script setup>
import * as THREE from 'three';
import { Base } from '@/base/base.js';
import { OrbitControls } from '@/controls/OrbitControls.js';
import { Box } from '@/shader/box.js';
import { RaycastSelector } from '@/components/RaycastSelector.js';

class Sketch extends Base {
  create() {
    new OrbitControls(this);
    const rs = new RaycastSelector(this);
    const box = new Box(this);
    box.addExisting();

    this.update((time) => {
      box.spin(time);
    });

    // mouse
    this.container.addEventListener("mousemove", (e) => {
      const target = rs.onChooseIntersect(box.mesh);
      console.log(target);
      if (target) {
        const p = "#FF0000";
        box.mesh.material.color.set(p);
      }else {
        const p = "#FFFFFF";
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
