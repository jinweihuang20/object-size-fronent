<template>
  <div class="home px-1">
    <div class="banner bg-light d-flex flex-row">
      <h1 class="flex-fill font-weight-bold pt-3">秋葵分選機</h1>
      <div id="setting-icon" class="text-end">
        <i class="bi bi-gear" @click="OpenSettingPanel"></i>
      </div>
    </div>
    <div class="opt-mode d-flex flex-row border-bottom py-3">
      <div class="d-flex flex-row flex-fill">
        <big_button @click="SwitchMode(1)" :_disabled="online" text="啟動" type="info"></big_button>
        <big_button @click="SwitchMode(0)" :_disabled="!online" text="關閉" type="danger"></big_button>
      </div>
      <DevicesStates :CamOpened="status.CamOpen" :IOBoardConnected="status.IOBoardConnected"></DevicesStates>
    </div>
    <div class="inspect-result px-3 text-start d-flex flex-row border-bottom">
      <div class="d-flex flex-column" style="width:220px">
        <span>分類結果</span>
        <div v-bind:class="inspection_result.size_class" class="class-result-text">{{class_chinese}}</div>
      </div>
      <div>
        <div>:</div>
      </div>
      <div>
        <span>長度(公分)</span>
        <div>{{inspection_result.length.toFixed(2)}}</div>
      </div>
      <div>
        <span>寬度(公分)</span>
        <div>{{inspection_result.width.toFixed(2)}}</div>
      </div>
    </div>
    <div class="d-flex flex-row mt-1 w-100">
      <div class="viedo-container text-start p-3 m-2 border" style="width:550px">
        <img v-if="status.opt_mode=='1' && status.CamOpen" :src="img" width="500" />
        <img v-else src="@/assets/images/video_not_found.png" width="500" />
      </div>
      <div class="flex-fill">
        <!-- <motor_controller v-for="index in [0,1,2,3]" :key="index" :motor_index="index"></motor_controller> -->
        <VirtualView :exist_sensor_block="exist_sensor_blocked"></VirtualView>
        <StatResult
          :bad_count="status.bad_count"
          :good_class1_count="status.good_class1_count"
          :good_class2_count="status.good_class2_count"
          :good_class3_count="status.good_class3_count"
        ></StatResult>
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
import DevicesStates from '@/components/DevicesStates.vue'
import VirtualView from '@/components/VirtualView.vue'
import StatResult from '@/components/StatResult.vue'
import { ModeSwitch, baseURL, GetBoardData, GetInspectionResult } from "@/apis/backend"
export default {
  name: "HomeView",
  components: {
    SettingDrawer, big_button, FootInfo,
    motor_controller, DevicesStates, VirtualView, StatResult
  },
  computed: {
    class_chinese() {
      var _class = this.inspection_result.size_class;
      if (_class == 'none')
        return '無';
      else if (_class == 'bad')
        return '壞';
      else if (_class == 'class1')
        return '好(1)';
      else if (_class == 'class2')
        return '好(2)';
      else
        return '好(3)';
    },
    exist_sensor_blocked() {
      return this.status.exist_sensor_state == "Block";
    }
  },
  data() {
    return {
      online: false,
      img: "http://192.168.0.103/video_img",
      status: {
        opt_mode: '0'
      },
      inspection_result: {
        length: -1,
        width: -1,
        size_class: 'none'
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
    },
    async SyncInspectionResult() {
      this.inspection_result = await GetInspectionResult();
    }
  },
  mounted() {
    //this.SyncBoardData();
    setInterval(() => {
      this.SyncBoardData();
      this.SyncInspectionResult();
      if (this.status.opt_mode == '1') {
        this.img = `${baseURL}/video_img?t=${Date.now()}`
      }
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
#setting-icon {
  font-size: 50px;
}

.banner {
  background-image: url("@/assets/images/chu_kry.jpg");
  background-blend-mode: color-burn;
  h1 {
    opacity: 1;
  }
}

#logo {
  width: 120px;
  height: 80px;
}
.inspect-result {
  div {
    margin: auto 10px;
    width: 140px;
    span {
      font-size: 1.5rem;
    }
    div {
      font-size: 4em;
      width: 100%;
    }
    .bad {
      color: red;
    }
    .class1,
    .class2,
    .class3 {
      color: lime;
    }
    .none {
      color: grey;
    }
  }
}
.class-result-text {
  font-size: 4em;
}
</style>
