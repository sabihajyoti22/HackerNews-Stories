<template>
  <div>
    <router-link :to="{name: 'storyDetails', params: {id: storyId}}">
      <div class="w-full p-3 shadow-md rounded-lg flex flex-wrap flex-col md:flex-row justify-between border-2 transition duration-500 hover:-translate-y-1">
        <div>
          <div class="font-semibold mb-1">
            {{ details.title }}
          </div>
          <div>Author: {{ details.author }}</div>
        </div>

        <div>
          <div class="text-right">
            Time: {{ $formatTime(details.time) }}
          </div>
          <div class="">
            Number of comments: {{ details.commentsNo }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  const props = defineProps({
    storyId: {
      type: Number,
      default: 0
    }
  })
  let details = ref({
    title: 'No title',
    author: 'No author found',
    time: 0,
    commentsNo: 0,
  } as story)

  const getStory = async() => {
    const story = await axios.get(`/item/${props.storyId}.json`)
    const {title, by, time, kids} = JSON.parse(JSON.stringify(story.data))
    details.value = {
      title,
      author: by,
      time,
      commentsNo: kids ? kids?.length : 0
    }
  }

  await getStory()
</script>