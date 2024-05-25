import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table';

const Users = ({userArray}) => {
    if (!userArray){
        return (<></>)
    }
    return (
        <>
            <h1>Users</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">blogs created</th>
                    </tr>
                </thead>
                <tbody>
                {userArray.map((user, i) => 
                    
                    <tr key={i}>
                        <th scope="row"><Link to={`/users/${user.id}`}>{user.name}</Link></th>
                        <td >{user.count}</td>
                    </tr>
                    
                )}
               
                </tbody>
            </Table>
        </>
    )
}

export default Users
