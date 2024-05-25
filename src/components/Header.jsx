import LogoutButton from './LogoutButton'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import { navMenuStyle } from '../styles/navMenu'

const Header = () => {
const {userState, userDispatch} = useContext(UserContext)


if (userState) {
return (
    <>
    <div style={navMenuStyle}>
    <Link to='/'> blogs </Link>
    <Link to='/users'> users </Link>
    {userState.name} logged in.{' '}
    <LogoutButton userDispatch={userDispatch} userState={userState} />
    </div>
    <div>
    <h2>blogs</h2>
            </div>
            </>
)
}
else {
    return <div style={navMenuStyle}>
    <Link to='/'> blogs </Link>
    <Link to='/users'> users </Link>
    No user logged in.
    </div>
}
}

export default Header