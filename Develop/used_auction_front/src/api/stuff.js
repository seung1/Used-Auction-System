import http from "./http";

// export const searchKeyword = ({ keyword }) =>
//   http.post("/api/auth/searchKeyword", { keyword });

export const enrollStuff = ({ product_name, price, category, local_area, user_name }) =>
  http.post("/api/stuff/enrollStuff", { product_name, price, category, local_area, user_name });

export const removeStuff = ({ product_number }) =>
  http.post("/api/stuff/removeStuff", { product_number });

export const getStuff = () => http.get("/api/stuff/getStuff");
