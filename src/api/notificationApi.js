import axiosClient from "./axiosClient";

const notificationApi = {
  fetch: () => axiosClient.get("/notifications"),
};

export default notificationApi;
