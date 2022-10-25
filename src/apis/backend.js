import axios from "axios";

export var baseURL = '';
if (process.env.NODE_ENV != 'production') {
  baseURL = "http://192.168.0.105:5030";
  axios.defaults.baseURL = baseURL;
}

var motor_angle_Adjust_path = "/api/Motor/AngleAdjust";
var MOTOR_SWING_PATH = "/api/Motor/Swing";
var AVOID_SENSOR_STATE_PATH = "/api/avoid_senosr";
var MODE_SWITCH_PATH = "/api/Mode"
var GET_PARAMETERS_PATH = "/api/parameters"
var GET_VIDEO_IMG_PATH = "/video_img"
var GET_BOARDDATA_PATH = "/api/boardData"
var GET_INSPECTION_RESULT_PATH = "/api/inspection_result"


export async function MotorAngleControl(angle) {
  await axios.get(motor_angle_Adjust_path + `?angle=${angle}`);
}

export async function GetAvoidSensorState() {
  var res = await axios.get(AVOID_SENSOR_STATE_PATH);
  return res.data;
}

export async function SwingMotorOnce(motor_index = 0) {
  await axios.get(MOTOR_SWING_PATH + `?motor_index=${motor_index}`);
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

export async function GetVideoImg() {
  var res = await axios.get(GET_VIDEO_IMG_PATH);
  return res.data;
}
export async function GetBoardData() {
  var res = await axios.get(GET_BOARDDATA_PATH);
  return res.data;
}

export async function GetInspectionResult() {
  var res = await axios.get(GET_INSPECTION_RESULT_PATH);
  return JSON.parse(res.data);
}