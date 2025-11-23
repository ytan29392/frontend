import axiosClient from "./axiosClient";

const subtaskApi = {
  createSubtask: (data) => axiosClient.post("/subtasks", data),
  getByTask: (taskId) => axiosClient.get(`/subtasks/task/${taskId}`),
  updateSubtask: (id, data) => axiosClient.put(`/subtasks/${id}`, data),
};

export default subtaskApi;
