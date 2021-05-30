import http from "./http";

// http://localhost:4000/api/auth/users
// 사용자 정보들을 읽는 기능
// 프록시를 이용해서
// 아래에 써있는대로 http.get("/api/auth/users");를 하면,
// http://localhost:4000/api/auth/users에 대신 요청한 뒤 결과물을 응답해 줌
// http://localhost:4000 는 src/package.json에서 맨 밑에 써져있음

/*
//export const users = () => http.get("/api/auth/users");
export const users = ({ page }) => {
    const queryString = qs.stringify({
        page
    })
    return http.get(`/api/auth/users?${queryString}`);
}
*/

// get으로 http://localhost:4000/api/auth/users?page=2 를 하면 2페이지로 넘어감
export const users = (page) => http.get(`/api/auth/users?page=${page}`);

// 사용자 정보를 삭제하는 기능
export const removeUser = (id) => http.delete(`/api/auth/remove/${id}`);