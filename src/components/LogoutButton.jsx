import blogService from '../services/blogs'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
const LogoutButton = () => {
    const {userState: user, userDispatch} = useContext(UserContext)
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
