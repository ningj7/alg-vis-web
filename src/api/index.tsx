import axios from "axios";
import { message } from "antd";

const Request = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

Request.interceptors.request.use(
  config => {
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (let key of Object.keys(config.params)) {
        const val = config.params[key];
        // 跳过 undefined、null、空字符串，保留 0、false 等
        if (val === undefined || val === null || val === '') continue;
        url += `${key}=${encodeURIComponent(val)}&`;
      }
      config.url = url.slice(0, -1);
      config.params = {};
    }

    // 可选：添加 token
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

Request.interceptors.response.use(
  res => res.data,
  error => {
    message.error("网络异常，请稍后再试！");
    return Promise.reject(error);
  }
);

export default Request;