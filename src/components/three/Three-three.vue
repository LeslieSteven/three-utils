<script setup>
import * as THREE from 'three';
import threeUtils from '@/utils/three';

const three = new threeUtils();

function initModel() {
  const path = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-20, 0, 0)
  );

  const tubularSegments = 50; // 路径上的段数
  const radius = 1; // 半径
  const radialSegments = 8; // 径向段数

  const geometry = new THREE.TubeGeometry(path, tubularSegments, radius, radialSegments);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  three.mesh = new THREE.Mesh(geometry, material);
  three.scene.add(three.mesh);
}

onMounted(() => {
  three.init(
    {
      callFunc: initModel
    }
  );
  three.start();
});
</script>

<template>
  <div
    ref="cont"
    class="clear"
  />
</template>

<style scoped lang="scss">

</style>
