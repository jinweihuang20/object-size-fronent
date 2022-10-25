<template>
  <div class="motor-controller">
    <span>角度控制</span>
    <el-input-number v-model="angle" placeholder="角度" :min="0" :max="180" @change="AngleWrite()"></el-input-number>
    <el-button @click="SwingOnce()">Swing</el-button>
  </div>
</template>

<script>
import { MotorAngleControl, SwingMotorOnce } from "@/apis/backend.js";
export default {
  props: {
    motor_index: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      angle: 0,
    };
  },
  methods: {
    async AngleWrite() {
      await MotorAngleControl(this.angle);
    },
    async SwingOnce() {
      await SwingMotorOnce(this.motor_index);
    }
  },
};
</script>

<style></style>
