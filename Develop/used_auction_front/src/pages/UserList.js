//import { useParams } from "react-router-dom";
import User from "./User";
import AuthTemplate from "../components/auth/AuthTemplate";
import { one, users, removeUser } from "../api/users";
import { useEffect, useState } from "react";
import styled from "styled-components";

//import http from "./http";

export default function UserList() {

  

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    //one('/api/auth/users')
    users(page)
    .then(res => {
      setData(res.data);
    });
  }, [data]);

  const prev = () => {
    if(page === 1){
      setPage(page);
    }
    else{
      setPage(page - 1);
    }
  }

  const next = () => {
    setPage(page + 1);
  }

// array라는 배열에서 num이 3인 것을 제외한다
// array.filter(num => num !== 3); // [1, 2, 4, 5]
// 디비에있는정보배열.filter(user => user.joinType != admin); 이렇게 하면 admin을 제외함

  return (
    <AuthTemplate>
      <table>
        <h3>
            <td>ID</td>
            <td>이메일</td>
            <td>탈퇴처리</td>
        </h3>
      </table>

      
      <table>
        <tbody>
          {data.map(user => (
            User(user)
          ))}
        </tbody>
      </table>
      

      <center>
        <td>
        {page === 1 ? (
            ""
          ) : (
            <button onClick={prev}>이전</button>
          )}
        </td>
        <td>{page}page</td>
        <td><button onClick={next}>다음</button></td>
        </center>
    </AuthTemplate>
  );
}