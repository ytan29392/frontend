// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8000", // FastAPI URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosClient;


import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" }
});

export default axiosClient;
