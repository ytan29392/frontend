import axiosClient from "./axiosClient";

const alarmApi = {
  getTodayAlarms: () => axiosClient.get("/dashboard"),
};

export default alarmApi;
