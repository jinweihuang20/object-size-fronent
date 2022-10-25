<template>
  <div class="virtual-view">
    <div class="transmitter d-flex flex-row">
      <div class="spot">
        <i class="bi bi-webcam-fill"></i>
      </div>
      <div class="spot">
        <i class="bi bi-circle-fill" v-bind:class="exist_sensor_block?'block':'clear'"></i>
      </div>

      <div v-for="index in [0,1,2,3]" :key="index" class="spot">
        <el-popover trigger="click" placement="bottom" :offset="12" :width="400">
          <template #reference>M{{index}}</template>
          <motor_controller :motor_index="index"></motor_controller>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import motor_controller from "@/components/MotorController.vue";

export default {
  props: {
    exist_sensor_block: {
      type: Boolean,
      default() {
        return false
      }
    },
  },
  components: {
    motor_controller,
  },
}
</script>

<style scoped lang="scss">
.virtual-view {
  width: 100%;
  .transmitter {
    justify-content: space-between;
    border-radius: 10px;
    background-color: grey;
    width: 100%;
    height: 40px;
    color: white;
    .spot {
      margin: 3px 12px;

      padding: 3px;
    }
    .spot:active,
    .spot:visited {
      background-color: rgb(77, 77, 77);
    }

    .block {
      color: red;
    }
    .clear {
      color: white;
    }
  }
}
</style>