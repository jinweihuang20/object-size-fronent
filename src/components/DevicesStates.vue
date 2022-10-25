<template>
  <div class="devices-states">
    <div>
      <span>
        <i class="bi bi-webcam-fill"></i>攝影機
      </span>
      <i class="bi bi-circle-fill" v-bind:class="CamOpened?'open':'close'"></i>
    </div>
    <div>
      <span>
        <i class="bi bi-usb-mini-fill"></i>控制板
      </span>
      <i class="bi bi-circle-fill" v-bind:class="IOBoardConnected?'open':'close'"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    CamOpened: {
      type: Boolean,
      default() {
        return false
      }
    },
    IOBoardConnected: {
      type: Boolean,
      default() {
        return false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.devices-states {
  margin-right: 10px;
  font-size: 2rem;
  color: grey;
  span {
    font-weight: bold;
    margin-right: 8px;
    i {
      margin-right: 6px;
    }
  }

  .open {
    color: rgb(105, 221, 156);
  }
  .close {
    color: rgb(226, 100, 100);
  }
}
</style>