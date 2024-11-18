<template>
  <div class="default-layout">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <Suspense>
            <component :is="Component" />

            <template #fallback>
              <Loader />
            </template>
          </Suspense>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
  import Loader from './components/utils/Loader.vue';
</script>