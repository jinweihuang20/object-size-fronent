<template>
  <div class="setting-drawer">
    <el-drawer v-model="show" size="80%" direction="rtl" @open="FetchParams">
      <template #header="{ close }">
        <div class="w-100 text-start">
          <el-button
            :type="lock?'danger':'primary'"
            size="large"
            @click="EditBtnClick()"
          >{{ lock?'編輯':'儲存'}}</el-button>
        </div>
      </template>
      <div v-bind:class="lock?'locked':'opened'">
        <h2 class="border-bottom">影像</h2>
        <el-form size="large" label-width="155px" label-position="left" v-model="params">
          <el-form-item class="px-2 cam-size" label="相機尺寸">
            <span>W:</span>
            <el-input-number v-model="params.cam.width" disabled></el-input-number>
            <span class="mx-3">H:</span>
            <el-input-number v-model="params.cam.height" disabled></el-input-number>
          </el-form-item>
          <el-form-item class="px-2" label="ROI實際寬度(cm)">
            <el-input-number :step="0.1" v-model="params.cam.roi_acture_width" placeholder></el-input-number>
          </el-form-item>
          
          <el-form-item class="px-2" label="解析度">
            {{img_resolution}}

          </el-form-item>
        </el-form>
        <h2 class="border-bottom">好/壞參數</h2>
        <el-form size="large" label-width="155px" label-position="left">
          <el-form-item class="px-2 chukry-good-size" label="優斗長度">
            <span>最短(cm)</span>
            <el-input-number :step="0.1" v-model="params.good_size.good_length.min"></el-input-number>
            <span class="mx-3">最長(cm)</span>
            <el-input-number :step="0.1" v-model="params.good_size.good_length.max"></el-input-number>
          </el-form-item>
          <el-form-item class="px-2 chukry-good-size" label="優斗寬度">
            <span>最短(cm)</span>
            <el-input-number :step="0.1" v-model="params.good_size.good_width.min"></el-input-number>
            <span class="mx-3">最長(cm)</span>
            <el-input-number :step="0.1" v-model="params.good_size.good_width.max"></el-input-number>
          </el-form-item>
        </el-form>
        <h2 class="border-bottom">策略</h2>
        <div class="text-start">
          <b-form-radio-group
            id="btn-radios-1"
            v-model="params.pick_mode"
            :options="options"
            button-variant="outline-primary"
            size="lg"
            name="radio-btn-outline"
            buttons
          ></b-form-radio-group>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GetParameters, UpdateParameters } from "@/apis/backend"
export default {
  data() {
    return {
      lock: true,
      show: false,
      selected: "pick_bad",
      options: [
        { text: "挑好", value: "pick_good" },
        { text: "挑壞", value: "pick_bad" },
      ],
      params: {
        cam: {
          height: 480.0,
          roi_acture_width: 23,
          width: 640.0
        },
        good_size: {
          good_length: {
            max: 7,
            min: 5.7
          },
          good_width: {
            max: 3,
            min: 2.5
          }
        },
        pick_mode: "pick_good"
      }
    };
  },
  computed: {
    img_resolution() {
      return this.params.cam.width / this.params.cam.roi_acture_width;
    }
  },
  methods: {
    Open() {
      this.show = true;
    },
    async FetchParams() {
      this.params = await GetParameters();
    },
    async EditBtnClick() {
      this.lock = !this.lock
      if (this.lock) {
        var ret = await UpdateParameters(this.params);
        if (ret == 'ok') {
          this.$notify.success({
            title: '修改參數',
            message: '修改參數成功',
            duration: '4500',
            position: 'top-right',
            showClose: 'true',
          });

        }
      }

    }
  },
};
</script>

<style lang="scss" scoped>
.setting-drawer {
  .locked {
    pointer-events: none;
    opacity: 0.4;
  }
  h2 {
    text-align: left;
    padding-bottom: 20px;
  }
  .el-form-item__label {
    font-size: 30px;
  }
  .cam-size,
  .chukry-good-size {
    span {
      margin: auto 15px;
    }
  }
}
.el-form-item--large {
  --font-size: 18px;
  --el-form-label-font-size: var(--font-size);
  margin-bottom: 22px;
}
</style>
