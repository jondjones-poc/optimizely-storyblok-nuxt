<template>
  <div v-editable="blok" class="pb-8 mb-6 font-bold text-center">

      <img v-if="blok.headline === 'Banner 1'" class="w-full object-cover"  src="25.png" />
      <img v-else class="w-full object-cover"  src="24.png" />
      <button
        class="flex-shrink-0
          text-white
          bg-purple-500
          border-0
          py-2
          px-8
          focus:outline-none
          hover:bg-purple-600
          rounded
          text-lg
          mt-10 inline-block"
        button v-on:click="order()">
        Order Now
        </button>
  </div>
</template>

<script>
import optimizelySDK from '@optimizely/optimizely-sdk'

export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  methods: {
    order: function () {
      const optimizelyClient = optimizelySDK.createInstance({
        sdkKey: this.$config.optimizelySdkKey
      });

      const event = this.blok.event;
      console.log("User Id", this.userId);
      console.log("Event", event);

      optimizelyClient.onReady().then(() => {
        optimizelyClient.track(event, this.userId);
      });

    }
  }
}
</script>
