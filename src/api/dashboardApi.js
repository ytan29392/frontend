import axiosClient from "./axiosClient";

const dashboardApi = {
  summary: () => axiosClient.get("/dashboard"),
};

export default dashboardApi;
