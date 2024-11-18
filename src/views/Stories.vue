<template>
  <div>
    <Loader v-if="loading" :height="80" :width="80" />

    <div v-else>
      <div class="font-bold text-2xl mb-10 text-primary">HackerNews Top Stories</div>

        <div v-for="storyId in stories" :key="storyId">
          <Story :storyId="storyId" />
        </div>

        <div  v-if="totalPages > 1" class="grid place-content-center my-5">
          <Pagination 
            :max-visible-buttons="totalPages >= 3 ? 2 : 0"
            :total-pages="totalPages"
            :per-page="10"
            :current-page="currentPage"
            @pagechanged="onPageChange"
          />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Story from '../components/cards/Story.vue'
import Pagination from '../components/utils/Pagination.vue';
import Loader from '../components/utils/Loader.vue';
import {useStoriesStore} from "../store/module/stories"

  export default {
    components: {
      Story,
      Pagination,
      Loader
    },
    data() {
      return {
        allStories: [] as number[],
        stories: [] as number[],
        totalPages: 0 as number,
        currentPage: 1 as number,
        loading: true as boolean
      }
    },
    created() {
      if(useStoriesStore().getStories.length){
        this.allStories = useStoriesStore().getStories
        this.formatData()
        this.loading = false
        this.totalPages = Math.ceil(this.allStories.length / 10)
      }else{
        this.$axios.get('/topstories.json')
          .then((res: any) => {
            this.allStories = JSON.parse(JSON.stringify(res.data))
            this.formatData()
            useStoriesStore().setStories(this.allStories)
            this.loading = false
            this.totalPages = Math.ceil(this.allStories.length / 10)
          })
      }
    },
    methods: {
      formatData(){
        this.stories = this.allStories.slice((this.currentPage - 1) * 10, this.currentPage*10)
      },
      onPageChange(page: number){
        this.currentPage = page
        this.formatData()
      }
    }
  }
</script>