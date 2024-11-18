<template>
  <div class="default-layout">
    <RouterView name="default" v-slot="{ Component, route }">
      <transition mode="out-in" :duration="300" :key="route.path">
        <Suspense >
          <template #default>
            <component :is="Component" :key="route.path"/>
          </template>
          <template #fallback>
            <div>
              <Loader :height="80" :width="80" />
            </div>
          </template>
        </Suspense>
      </transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
  import Loader from './components/utils/Loader.vue';
</script>