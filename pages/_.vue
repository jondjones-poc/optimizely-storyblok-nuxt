<template>
<div>
  <div class="mt-50 p-50">
    <img src="/banner.png" />
  </div>
  <component
    :is="story.content.component"
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  />
  <div class="p-50" style="margin-top: 50px;">
    <img src="/footer.png" />
  </div>
  </div>
</template>
<script>

export default {
  name: 'Home',
  asyncData(context) {

    const version = 'published'
    const fullSlug = context.route.path === '/' || context.route.path === '' ? 'home' : context.route.path

    console.log("fullSlug", fullSlug, version);

    const data =  context.app.$storyapi
      .get(`cdn/stories/${fullSlug}`, {
        version,
      })
      .then((res) => {
        return res.data
      })
      return data;
  },
  data() {
    return {
      story: { content: {} },
    }
  },
  mounted() {
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge()
      storyblokInstance.on('input', (event) => {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      })
      // Use the bridge to listen the events
      storyblokInstance.on(['published', 'change'], (event) => {
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true,
        })
      })
    })
  },
}
</script>
