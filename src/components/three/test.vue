<script setup>
import { Base } from '@/utils/base';
import { OrbitControls } from '@/utils/OrbitControls';
import { Box } from '@/utils/Box';

class Sketch extends Base {
  create() {
    new OrbitControls(this);
    const box = new Box(this)
    box.addExisting();
  }
}

const createSketch = () => {
  const sketch = new Sketch();
  sketch.create();
  return sketch;
};

createSketch();

</script>

<template>
  <div
    id="amigo"
    class="clear"
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
