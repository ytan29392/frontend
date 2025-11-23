import axiosClient from "./axiosClient";

const analyticsApi = {
  monthlySummary: (year) => axiosClient.get("/analytics/monthly_summary", { params: { year } })
};

export default analyticsApi;
