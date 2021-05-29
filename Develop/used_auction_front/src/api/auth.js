import http from "./http";

// LOGIN
export const login = ({ username, password }) =>
  http.post("/api/auth/login", { username, password });

export const register = ({ username, password, email, admin }) =>
  http.post("/api/auth/register", { username, password, email, admin });

export const check = () => http.get("/api/auth/check");

// �α׾ƿ�
export const logout = () => http.post("/api/auth/logout");