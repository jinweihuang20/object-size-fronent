<template>
  <div class="home px-1">
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
    <div class="d-flex flex-row mt-3 w-100">
      <div class="viedo-container flex-fill text-start p-3 m-2 border">
        <img v-if="status.opt_mode=='1'" :src="img" width="500" />
      </div>
      <div class="float-end">
        <motor_controller></motor_controller>
      </div>
    </div>
    <SettingDrawer ref="setting"></SettingDrawer>
    <FootInfo :board_data="status"></FootInfo>
  </div>
</template>

<script>
import big_button from "@/components/BigButton.vue"
import motor_controller from "@/components/MotorController.vue";
import SettingDrawer from "@/components/SettingDrawer.vue";
import FootInfo from "@/components/FootInfo.vue"
import { ModeSwitch, baseURL, GetBoardData } from "@/apis/backend"
export default {
  name: "HomeView",
  components: {
    SettingDrawer, big_button, FootInfo,
    motor_controller,
  },
  data() {
    return {
      online: false,
      img: "http://192.168.0.103/video_img",
      status: {
        opt_mode: '0'
      }
    }
  },
  methods: {
    OpenSettingPanel() {
      this.$refs.setting.Open();
    },
    async SwitchMode(mode) {
      await ModeSwitch(mode);
      this.online = mode == 1;
    },
    async SyncBoardData() {
      this.status = await GetBoardData();
      this.online = this.status.opt_mode == "1";
    }
  },
  mounted() {
    //this.SyncBoardData();
    setInterval(() => {
      this.SyncBoardData();
      if (this.status.opt_mode == '1') {
        this.img = `${baseURL}/video_img?t=${Date.now()}`
      }
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
#setting-icon {
  font-size: 30px;
}
</style>
