import axios from "axios";

const http = axios.create();

http.defaults.baseURL = "http://localhost:4000";

export default http;
