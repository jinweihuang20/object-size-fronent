<template>
  <div class="home px-5">
    <div class="bg-light d-flex flex-row">
      <h1 class="flex-fill">挑選機 Beta-1</h1>
      <div id="setting-icon" class="text-end">
        <i class="bi bi-gear" @click="OpenSettingPanel"></i>
      </div>
    </div>
    <div class="opt-mode d-flex flex-row border-bottom py-3">
      <big_button @click="SwitchMode(1)" :_disabled="online" text="啟動" type="info"></big_button>
      <big_button @click="SwitchMode(0)" :_disabled="!online" text="關閉" type="danger"></big_button>
    </div>
    <motor_controller></motor_controller>
    <avoid_sensor></avoid_sensor>
    <SettingDrawer ref="setting"></SettingDrawer>
  </div>
</template>

<script>
import big_button from "@/components/BigButton.vue"
import motor_controller from "@/components/MotorController.vue";
import avoid_sensor from "@/components/AvoidSensor.vue"
import SettingDrawer from "@/components/SettingDrawer.vue";
import { ModeSwitch } from "@/apis/backend"
export default {
  name: "HomeView",
  components: {
    SettingDrawer, big_button,
    motor_controller, avoid_sensor
  },
  data() {
    return {
      online: false
    }
  },
  methods: {
    OpenSettingPanel() {
      this.$refs.setting.Open();
    },
    async SwitchMode(mode) {
      await ModeSwitch(mode);
      this.online = mode == 1;
    }
  },
};
</script>

<style lang="scss" scoped>
#setting-icon {
  font-size: 30px;
}
</style>
