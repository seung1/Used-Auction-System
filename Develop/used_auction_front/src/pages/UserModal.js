import { removeUser } from "../api/users";
import Button from "../components/common/Button";

export default function User(user) {

  // 삭제 시키는 함수
  const remove = async () => {
    if(window.confirm("삭제 하시겠습니까?")){
      try {
        await removeUser(user._id);
      } catch (e) { console.log(e); }
    }
  };

  return (
    <tr>
      <center>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        <Button onClick={remove} className="btn_remove">
          삭제
        </Button>
      </td>
      </center>
    </tr>
  );
}