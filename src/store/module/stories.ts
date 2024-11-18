import { defineStore } from 'pinia'

const useStoriesStore = defineStore('stories', {
  state: () => {
    return {
      stories: [] as number[]
    }
  },
  getters: {
    getStories: (state) => state.stories
  },
  actions: {
    setStories(payload: any) {
      this.stories = payload
    }
  }
})

export { useStoriesStore }