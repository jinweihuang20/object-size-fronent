<template>
  <div class="foot-info text-start bg-dark w-100 d-flex flex-row">
    <div>
      <span>操作模式</span>
      <el-tag
        effect="dark"
        :type="board_data.opt_mode=='1'?'':'danger'"
      >{{board_data.opt_mode=='1'?'Online':'Offline'}}</el-tag>
    </div>
    <!-- <div>
      <span>WIFI</span>
      <el-tag effect="dark">{{board_data.wifi_ssid}}</el-tag>
    </div>-->
    <div>
      <span>在席狀態</span>
      <el-tag
        effect="dark"
        :type="board_data.exist_sensor_state=='Clear'?'':'danger'"
      >{{board_data.exist_sensor_state=="Clear"?'Free':'Blocked'}}</el-tag>
    </div>
    <!-- <div>
      <span>伺服角度</span>
      <el-tag effect="dark">{{board_data.servo_angle}}</el-tag>
    </div>
    <div>
      <span>最近一次動作命令</span>
      <el-tag effect="dark">{{board_data.last_rev_cmdByte}}</el-tag>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    board_data: {
      type: Object,
      default() {
        return {
          exist_sensor_state: "Clear",
          last_rev_cmdByte: "110",
          opt_mode: "1",
          servo_angle: "0",
          wifi_connected: "1",
          wifi_pw: "12345678",
          wifi_ssid: "GPM_IDMS_HOTA",

        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.foot-info {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 10px;
  color: white;

  div {
    margin: auto 10px;
    span {
      font-weight: bold;
      margin-right: 5px;
    }
  }
}
</style>