import blogService from '../services/blogs'

const LogoutButton = ({ userDispatch, userState }) => {
    const logoutHandler = (event) => {
        console.log(`Logging out ${user.name}`)
        event.preventDefault()
        userDispatch({type:"SET_USERNAME",username:''})
        userDispatch({type:"SET_PASSWORD",password:''})
        userDispatch({type:"SET_TOKEN",token:null})
        blogService.setToken(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }
    return <button onClick={logoutHandler}>Logout</button>
}

export default LogoutButton
