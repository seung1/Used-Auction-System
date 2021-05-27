import dummy from "../../db/data.json";
import Button from "../../components/common/Button";

export default function AdminForm() {
    //const[users,setUsers]=useState([])
    return(
        <>
            <table>
                <tbody>
                    {dummy.users.map(user=>(
                        <tr>
                            <p>[이름] {user.username} [이메일] {user.email}</p>
                            <td>
                                <Button> 삭제</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
    
}
/*
return (
    <ul className="list">
    {dummy.users.map(user => (
        <li key={user.id}>User {user.username}</li>
    ))}
</ul>
);
*/