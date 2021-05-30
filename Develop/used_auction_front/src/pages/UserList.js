import User from "./User";
import AuthTemplate from "../components/auth/AuthTemplate";
import { users } from "../api/users";
import { useEffect, useState } from "react";

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

  return (
    <AuthTemplate>
      <center><h3>사용자 탈퇴처리 기능</h3></center>
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