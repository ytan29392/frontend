import axiosClient from "./axiosClient";

const taskApi = {
  createTask: (data) => axiosClient.post("/tasks", data),
  getTasks: () => axiosClient.get("/tasks"),
};

export default taskApi;
