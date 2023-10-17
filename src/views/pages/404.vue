<script setup>
</script>

<template>
  <div class="wrap">
    <div>
      <div>404</div>
      <div
        ref="typedRef"
        class="back"
      />
      <RouterLink to="/">
<!--        <a-button-->
<!--          type="primary"-->
<!--          size="large"-->
<!--        >-->
<!--          返回主页-->
<!--        </a-button>-->
      </RouterLink>
    </div>

    <img
      class="cover"
      alt="page not found"
    >
  </div>
</template>

<style lang="scss" scoped>
//@import '@/styles/variables.scss';
//.wrap {
//  @include flexCenter;
//  height: 100vh;
//
//  > div:first-child {
//    flex: 1;
//    width: 300px;
//    text-align: center;
//
//    > div:first-child {
//      margin-bottom: 20px;
//      font-size: $font-size-title-l1;
//    }
//
//    .back {
//      text-align: center;
//      font-size: $font-size-l1;
//      margin-bottom: 20px;
//    }
//  }
//
//  .cover {
//    height: auto;
//    width: 700px;
//    margin: 0 5px;
//    max-width: 100%;
//    max-height: 100%;
//  }
//}
</style>
