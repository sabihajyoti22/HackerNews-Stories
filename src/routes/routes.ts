const routes = [
  {
    path: '/',
    name: 'stories',
    component: () => import('../views/Stories.vue'),
  },
  {
    path: '/storyDetails/:id',
    name: 'storyDetails',
    component: () => import('../views/StroyDetails.vue'),
  }
]

export default routes