<script setup>
import { Base } from '@/base/base.js';
import { OrbitControls } from '@/controls/OrbitControls.js';
import { Box } from '@/shader/box.js';

class Sketch extends Base {
  create() {
    new OrbitControls(this);
    const box = new Box(this)
    box.addExisting();
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
