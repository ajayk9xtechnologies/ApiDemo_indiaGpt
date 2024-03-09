<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();
</script>

<template>
  <div>
    <!-- <router-view/> -->
  <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
  </router-view>
  <!-- <Home/> -->

  </div>
</template>

<style scoped>

</style>
