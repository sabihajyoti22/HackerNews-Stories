<template>
  <div class="min-w-screen min-h-[70vh] flex justify-center items-center">
    <div
      :style="{height: height+'px', width: width+'px'}"
      class="border-8 border-paragraph200 rounded-full border-t-8 border-t-primary animate-spin"
    />
  </div>
</template>
<script lang="ts">
  export default{
    props: {
      height: {
        type: Number,
        default: 60
      },
      width: {
        type: Number,
        default: 60
      }
    }
  }
</script>