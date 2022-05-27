<template>
  <section v-editable="blok" class="text-gray-600 body-font" style="background-color: lightgrey;">
    <div class="container px-5 py-24 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
      <div class="lg:w-2/3 ">
        <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
          {{ blok.headline }}
        </h1>
        <div v-if="blok.text !== ''">
          {{ blok.text }}
        </div>
        <button v-on:click="order()"
          class="
            flex-shrink-0
            text-white
            bg-purple-500
            border-0
            py-2
            px-8
            focus:outline-none
            hover:bg-purple-600
            rounded
            text-lg
            mt-10 inline-block
          "
        >
          {{ blok.headline }}
        </button >
      </div>
       <div class="lg:w-1/3">
          <img class="mx-auto" :src="blok.background" />
       </div>
    </div>
  </section>
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
    }
  },
   methods: {
    order: function () {
      const optimizelyClient = optimizelySDK.createInstance({
        sdkKey: this.$config.optimizelySdkKey
      });

      const event = this.blok.event;
      console.log("User Id", this.userId);
      console.log("Event", this.blok);

      optimizelyClient.onReady().then(() => {
        optimizelyClient.track(event, this.userId);
      });

    }
  }
}
</script>
