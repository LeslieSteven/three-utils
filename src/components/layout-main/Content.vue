<script setup>

</script>

<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped lang="scss">
</style>
