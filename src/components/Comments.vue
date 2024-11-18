<template>
  <div v-if="details.by">
    <div class="w-full">
      <div class="flex justify-between mb-3">
        <div>{{ details.by }}</div>
        <div>{{ $formatTime(details.time) }}</div>
      </div>
      <div class="overflow-hidden comment" v-html="details.text" />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      commentId: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        details: {
          by: '',
          time: '',
          text: ''
        }
      }
    },
    created() {
      this.$axios.get(`/item/${this.commentId}.json`)
      .then((res: any) => {
        const {by, time, text} = JSON.parse(JSON.stringify(res.data))
        this.details = {
          by, time, text
        }
      })
    },
  }
</script>