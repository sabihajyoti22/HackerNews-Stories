<template>
  <div>
    <nav
      class="isolate inline-flex items-center"
      aria-label="Pagination"
    >
      <!-- Previous Button -->
      <button
        :disabled="isInFirstPage"
        class="relative inline-flex items-center justify-center bg-white h-8 w-8 font-medium mr-2 hover:bg-gray-50 hover:cursor-pointer border rounded-sm"
        :class="!isInFirstPage ? 'border-primary' : 'border-grey2'"
        @click="onClickPreviousPage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="#64748B"
          :class="{'fill-primary': !isInFirstPage}"
        >
          <path
            d="M8.13678 0.195416C8.00645 0.0650826 7.83611 8.39233e-05 7.66545 8.39233e-05C7.49478 8.39233e-05 7.32445 0.0650826 7.19411 0.195416L0.860781 6.52875C0.600447 6.78908 0.600447 7.21108 0.860781 7.47142L7.19411 13.8047C7.45445 14.0651 7.87645 14.0651 8.13678 13.8047C8.39711 13.5444 8.39711 13.1224 8.13678 12.8621L2.27478 7.00008L8.13678 1.13808C8.39711 0.87775 8.39711 0.45575 8.13678 0.195416Z"
          />
        </svg>
      </button>
      <div
        v-for="(page, index) in pages"
        :key="page.name"
      >
        <div
          class="relative z-10 inline-flex justify-center items-center text-body1 font-semibold mr-2 h-8 w-8 hover:cursor-pointer rounded-sm"
          :disabled="page.isDisabled"
          :class="isPageActive(page.name) ? 'bg-primary text-white' : 'bg-white border border-grey2'"
          @click="onClickPage(page.name)"
        >
          {{ page.name }}
        </div>
        <span
          v-if="index === 1 && totalPages > 3"
          class="relative z-10 inline-flex items-center bg-white text-body1 font-semibold mr-2 px-4 py-2 hover:cursor-pointer"
        >...</span>
      </div>
      <button
        :disabled="isInLastPage"
        class="relative inline-flex items-center justify-center bg-white h-8 w-8 font-medium mr-2 hover:bg-gray-50 hover:cursor-pointer rounded-sm border"
        :class="!isInLastPage ? 'border-primary' : 'border-grey2'"
        @click="onClickNextPage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="14"
          viewBox="0 0 9 14"
          fill="#64748B"
          :class="{'fill-primary': !isInLastPage}"
        >
          <path
            d="M0.863219 13.8046C0.993552 13.9349 1.16389 13.9999 1.33455 13.9999C1.50522 13.9999 1.67555 13.9349 1.80589 13.8046L8.13922 7.47125C8.39955 7.21092 8.39955 6.78892 8.13922 6.52858L1.80589 0.19525C1.54555 -0.0650833 1.12355 -0.0650833 0.863219 0.19525C0.602885 0.455583 0.602885 0.877583 0.863219 1.13792L6.72522 6.99992L0.863219 12.8619C0.602885 13.1222 0.602885 13.5443 0.863219 13.8046Z"
          />
        </svg>
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      maxVisibleButtons: {
        type: Number,
        default: 2
      },    
      totalPages: {
        type: Number,
        default: 10
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    computed: {
      startPage() {
        if (this.currentPage === 1) {
          return 1;
        }
        if (this.currentPage === this.totalPages) {
          return this.totalPages - this.maxVisibleButtons;
        }
        return this.currentPage - 1;
      },
      pages() {
        const range = [];
        for (
          let i = this.startPage;
          i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
          i++
        ) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage
          });
        }
        if(this.startPage+1 !== this.totalPages-1 && this.totalPages !== 1){
          range.push({
            name: this.totalPages-1,
            isDisabled: this.totalPages-1 === this.currentPage
          })
        }
        {
          range.push({
            name: this.totalPages,
            isDisabled: this.totalPages === this.currentPage
          })
        }
        return range;
      },
      isInFirstPage() {
        return this.currentPage === 1;
      },
      isInLastPage() {
        return this.currentPage === this.totalPages;
      }
    },
    methods: {
      onClickPreviousPage() {
        this.$emit('pagechanged', this.currentPage - 1);
      },
      onClickPage(page: number) {
        this.$emit('pagechanged', page);
      },
      onClickNextPage() {
        this.$emit('pagechanged', this.currentPage + 1);
      },
      isPageActive(page: number) {
        return this.currentPage === page;
      },
    }
  }
</script>