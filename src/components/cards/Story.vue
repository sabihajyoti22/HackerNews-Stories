<template>
  <router-link :to="{name: 'storyDetails', params: {id: storyId}}">
    <div class="w-full p-3 shadow-md rounded-lg flex flex-wrap flex-col md:flex-row justify-between border-2 transition duration-500 hover:-translate-y-1">
      <div>
        <div class="font-semibold mb-1">{{ details.title }}</div>
        <div>Author: {{ details.author }}</div>
      </div>

      <div>
        <div class="">Time: {{ $formatTime(details.time) }}</div>
        <div class="">Comments No: {{ details.commentsNo }}</div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
  export default {
    props: {
      storyId: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        details: {
          title: 'No title',
          author: 'No author found',
          time: 0,
          commentsNo: 0,
        } as story
      }
    },
    created() {
      this.$axios.get(`/item/${this.storyId}.json`)
        .then((res: any) => {
          const {title, by, time, kids} = JSON.parse(JSON.stringify(res.data))
          this.details = {
            title,
            author: by,
            time,
            commentsNo: kids ? kids?.length : 0
          }
        })
    },
  }
</script>