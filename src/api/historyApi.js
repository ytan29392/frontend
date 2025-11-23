import axiosClient from "./axiosClient";

const historyApi = {
  fetch: (month, year) =>
    axiosClient.get("/history", { params: { month, year } }),
};

export default historyApi;
