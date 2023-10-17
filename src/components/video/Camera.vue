<template>
  <div class="publish">
    <video ref="videoRef" />
    <canvas
      ref="canvasCamera"
      style="display: none"
    />
    <div
      v-if="imgSrc"
      class="img_bg_camera"
    >
      <img
        :src="imgSrc"
        class="tx_img"
        alt=""
      >
    </div>
    <div
      class="btn"
    >
      <a-button @click="openCamera">
        打开摄像头
      </a-button>
      <a-button @click="closeCamera">
        关闭摄像头
      </a-button>
      <a-button @click="captureImage">
        拍照
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const videoRef = ref(null);
const canvasCamera = ref(null);
const mediaStreamTrack = ref({});
const video_stream = ref('');
const imgSrc = ref('');
let canvas = null;
let context = null;

onMounted(() => {
  // 进入页面 自动调用摄像头
  getCamera();
});

// 调用打开摄像头功能
const getCamera = () => {
  // eslint-disable-next-line no-alert
  // 获取 canvas 画布
  canvas = canvasCamera.value;
  context = canvas.getContext('2d');
  // 旧版本浏览器可能根本不支持 mediaDevices，我们首先设置一个空对象
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  // 正常支持版本
  navigator.mediaDevices
    .getUserMedia({
      video: true
    })
    .then((stream) => {
      // 摄像头开启成功
      mediaStreamTrack.value = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
      video_stream.value = stream;
      videoRef.value.srcObject = stream;
      videoRef.value.play();
    })
    .catch((err) => {
      console.log(err);
    });
};

// 拍照 绘制图片
const captureImage = () => {
  console.log('拍照');
  // 点击 canvas 画图
  context.drawImage(
    videoRef.value,
    0,
    0,
    200,
    100
  );
  // 获取图片 base64 链接
  const image = canvas.toDataURL('image/png');
  imgSrc.value = image;
  // $emit might not be available directly in setup
  // Consider using provide/inject or a store for parent-child communication
};

// 打开摄像头
const openCamera = () => {
  console.log('打开摄像头');
  getCamera();
};

// 关闭摄像头
const closeCamera = () => {
  console.log('关闭摄像头');
  video_stream.value.getTracks()[0].stop();
};
</script>

<style lang="scss" scoped>
.publish {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  video {
    width: 100%;
    height: 300px;
  }
  canvas {
    width: 100%;
    height: 300px;
  }
  .btn {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    button {
      margin: 10px;
    }
  }
  .img_bg_camera {
    img {
      width: 300px;
      height: 200px;
    }
  }
}
</style>
