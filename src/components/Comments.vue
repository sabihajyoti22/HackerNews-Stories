<template>
  <div>
    <div v-if="details.by">
      <div class="w-full">
        <div class="flex justify-between mb-3">
          <div>{{ details.by }}</div>
          <div>{{ $formatTime(details.time) }}</div>
        </div>
        <div
          class="overflow-hidden comment"
          v-html="details.text"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'

  const props = defineProps({
    commentId: {
      type: Number,
      default: 0
    }
  })

  let details = ref({
    by: '',
    time: '',
    text: ''
  })

  const getAllComments = async() => {
    const comments = await axios.get(`/item/${props.commentId}.json`)

    const {by, time, text} = JSON.parse(JSON.stringify(comments.data))
    details.value = {
      by, time, text
    }
  }

  await getAllComments()
</script>