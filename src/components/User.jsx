const User = ({user}) => {
console.log(user)
if (!user) {
    return(<></>)
}
    return ( 
        <>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
            {user.blogs.map((x, i) => <li key={i}>{x.title}</li>)}
        </ul>
        </>
    )
}

export default User
