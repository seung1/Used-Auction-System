import http from "./http";

// LOGIN
export const login = ({ username, password }) =>
  http.post("/api/auth/login", { username, password });

export const register = ({ username, password }) =>
  http.post("/api/auth/register", { username, password });

export const check = () => http.get("/api/auth/check");

// ·Î±×¾Æ¿ô
export const logout = () => http.post("/api/auth/logout");
