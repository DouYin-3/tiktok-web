import axios from "axios";

const http = axios.create({
  //baseURL: process.env.VUE_APP_API_URL || "/web/api",
  //baseURL: "http://192.168.1.5:5555/web/api",
});


export default http;
