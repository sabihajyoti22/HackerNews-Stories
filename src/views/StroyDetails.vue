<template>
  <div>
    <div class="flex justify-between mb-10">
      <div class="font-bold text-2xl text-primary">HackerNews Story Details</div>
      <router-link class="uppercase hover:text-primary" to="/">go back to home</router-link>
    </div>
    <div class="w-full p-3 shadow-md rounded-md border-2">
      <div class="font-semibold text-xl my-5">{{ details.title }}</div>
      <div class="text-lg mb-3">Author: {{ details.author }}</div>
      <div class="text-lg">Score: {{ details.score }}</div>
      <div class="text-lg">Time: {{ $formatTime(details.time) }}</div>
      <div class="text-lg mb-4">Comments No: {{ details.commentsNo }}</div>

      <div>
        <div class="text-lg font-semibold mb-3">Comments</div>
        <div v-for="(commentId, commentIndex) in details.comments" :key="commentId">
          <Comments :commentId="commentId" />

          <hr v-if="commentIndex + 1 !== details.comments?.length" class="border-b border-gray-400 my-3">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
  export default {
    components: {
      Comments: defineAsyncComponent(() => import('../components/Comments.vue'))
    },
    data() {
      return {
        details: {
          title: 'No title',
          author: 'No author found',
          score: 0,
          time: 0,
          comments: [],
          commentsNo: 0,
        } as story
      }
    },
    created() {
      if(this.$route.params.id){
        this.$axios.get(`/item/${this.$route.params.id}.json`)
          .then((res: any) => {
            const {title, by, score, time, kids} = JSON.parse(JSON.stringify(res.data))
            this.details = {
              title,
              author: by,
              score,
              time,
              comments: kids ? kids : [],
              commentsNo: kids ? kids?.length : 0
            }
          })
      }
    }
  }
</script>