import axios from "axios";
axios.defaults.baseURL = "http://192.168.0.103";

var motor_angle_Adjust_path = "/api/Motor/AngleAdjust";
var MOTOR_SWING_PATH = "/api/Motor/Swing";
var AVOID_SENSOR_STATE_PATH = "/api/avoid_senosr";
var MODE_SWITCH_PATH = "/api/Mode"
var GET_PARAMETERS_PATH = "/api/parameters"


export async function MotorAngleControl(angle) {
  await axios.get(motor_angle_Adjust_path + `?angle=${angle}`);
}

export async function GetAvoidSensorState() {
  var res = await axios.get(AVOID_SENSOR_STATE_PATH);
  return res.data;
}

export async function SwingMotorOnce() {
  await axios.get(MOTOR_SWING_PATH);
}

export async function ModeSwitch(mode = 0) {
  await axios.get(`${MODE_SWITCH_PATH}?mode=${mode}`);
}

export async function GetParameters() {
  var res = await axios.get(GET_PARAMETERS_PATH);
  return res.data;
}
export async function UpdateParameters(param) {
  var res = await axios.post(GET_PARAMETERS_PATH, param);
  return res.data;
}