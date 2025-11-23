import axiosClient from "./axiosClient";

const alarmApi = {
  getTodayAlarms: () => axiosClient.get("/dashboard"),
  updateAlarm: (id, data) => axiosClient.put(`/alarms/${id}`, data)

};

export default alarmApi;
