<template>
  <div class="avoid-sensor">{{State}}</div>
</template>

<script>
import { GetAvoidSensorState } from "@/apis/backend"
export default {
  data() {
    return {
      State: "Clear"
    }
  },
  methods: {
    async FetchState() {
      this.State = await GetAvoidSensorState();
    }
  },
  mounted() {
    setInterval(async () => {
      await this.FetchState();
    }, 1000);
  }
}
</script>

<style>
</style>