<template>
  <div v-if="visible" v-editable="blok">
    <component :is="iblok.component" v-for="iblok in blok.block" :key="iblok._uid" :blok="iblok" :userId="userId"/>
  </div>
</template>

<script>
import optimizelySDK from '@optimizely/optimizely-sdk'
import { v4 as uuidv4 } from 'uuid';

export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activatedVariation: null,
      userId: this.$route.query.userId || uuidv4(),
    }
  },
  fetch() {

    const sdkKey = this.$config.optimizelySdkKey;
    const experimentKey = this.blok.fullstack.experiment;
    const userId = this.userId;

    console.log("SDK Key", sdkKey)
    console.log("ExperimentKey", experimentKey)
    console.log("User Id", userId)

    const optimizelyClient = optimizelySDK.createInstance({
      sdkKey
    });

    console.log("CLIENT", optimizelyClient);

    optimizelyClient.onReady().then((result) => {
      const variation = optimizelyClient.activate(experimentKey, userId);
      console.log("Activated Variation", variation, result);
      this.activatedVariation = variation;
    });
  },
  computed: {
    visible() {
      const isVisible = this.blok?.fullstack?.variation === this.activatedVariation;
      console.log('Current Variation', this.blok?.fullstack?.variation);
      console.log('isVisible', isVisible, this.blok)
      return isVisible;
    },
  },
}
</script>