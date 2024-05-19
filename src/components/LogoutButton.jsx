import blogService from '../services/blogs'

const LogoutButton = ({ setUser, user }) => {
    const logoutHandler = (event) => {
        console.log(`Logging out ${user.name}`)
        event.preventDefault()
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }
    return <button onClick={logoutHandler}>Logout</button>
}

export default LogoutButton
