<script setup>
import * as THREE from 'three';

const cont = ref(null);
// 画一个三角形
const linePoints = [
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(-10, 0, 0)
];

onMounted(() => {
  init(cont.value, { points: linePoints });
});

function init(divDom, {
  width = window.innerWidth, height = window.innerHeight, points = [], lineColor = 0x00ff00
} = {}) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  divDom.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const material = new THREE.LineBasicMaterial({ color: lineColor });

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  scene.add(line);
  renderer.render(scene, camera);
}
</script>

<template>
  <div
    ref="cont"
    class="clear"
  />
</template>

<style scoped lang="scss">
.clear {
  /* 居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
