import http from "./http";

// LOGIN
export const login = ({ username, password }) =>
  http.post("/api/auth/login", { username, password });
