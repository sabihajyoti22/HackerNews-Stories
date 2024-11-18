
<template>
  <div>
    <div class="font-bold text-2xl mb-10 text-primary">
      HackerNews Top Stories
    </div>

    <div
      v-for="storyId in stories"
      :key="storyId"
    >
      <Story :story-id="storyId" />
    </div>

    <div
      v-if="totalPages > 1"
      class="grid place-content-center my-5"
    >
      <Pagination 
        :max-visible-buttons="totalPages >= 3 ? 2 : 0"
        :total-pages="totalPages"
        :per-page="10"
        :current-page="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  import axios from 'axios'
  import {useStoriesStore} from "../store/module/stories"
  import Pagination from '../components/utils/Pagination.vue'
  import Story from '../components/cards/Story.vue'

  let allStories = ref([] as number[])
  let stories = ref([] as number[])
  let totalPages = ref(0 as number)
  let currentPage = ref(1 as number)

  const formatData = () => {
    stories.value = allStories.value.slice((currentPage.value - 1) * 10, currentPage.value*10)
  }

  const onPageChange = (page: number) => {
    currentPage.value = page
    formatData()
  }

  const getAllStories = async() => {
    if(useStoriesStore().getStories.length){
      allStories.value = useStoriesStore().getStories
      formatData()
      totalPages.value = Math.ceil(allStories.value.length / 10)
    }else{
      const stories = await axios.get('/topstories.json')
      allStories.value = JSON.parse(JSON.stringify(stories.data))
      formatData()
      useStoriesStore().setStories(allStories.value)
      totalPages.value = Math.ceil(allStories.value.length / 10)
    }
  }

  await getAllStories()
</script>
