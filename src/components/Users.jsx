const Users = ({blogs}) => {
    let userMap = {}
    console.log("blogs", blogs)
    blogs.forEach((x) => {
        if(x.user){
            if (userMap[x.user.id]){
                const curVal = userMap[x.user.id]
                userMap[x.user.id] = {...curVal, count: curVal.count + 1}
    }
    else {
        userMap[x.user.id] = {name: x.user.name, count: 1}
    }
    }
    })
   // console.log("userMap", userMap)
//usermap - id: {name,count}
    let userArray = Object.keys(userMap).map((k,i) => {
        return userMap[k]
    })

    userArray.sort((a,b) => {
        if (a.count>b.count) {
            return 1
        }
        else if (a.count<b.count){
            return -1
        }
        else {
            return 0
        }
    })

   console.log("userArray",userArray)
   //userArray.forEach(x => console.log(x.name))
   console.log(userArray.map(x => x.count))

/*   */
    


    return (
        <>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">blogs created</th>
                    </tr>
                </thead>
                <tbody>
                {userArray.map((user, i) => 
                    
                    <tr key={i}>
                        <th scope="row">{user.name}</th>
                        <td >{user.count}</td>
                    </tr>
                    
                )}
               
                </tbody>
            </table>
        </>
    )
}

export default Users
