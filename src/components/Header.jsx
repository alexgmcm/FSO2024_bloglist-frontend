import LogoutButton from './LogoutButton'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const Header = () => {
const {userState, userDispatch} = useContext(UserContext)
if (userState) {
return (
    <div>
    <h2>blogs</h2>
            <p>
                {userState.name} logged in.{' '}
                <LogoutButton userDispatch={userDispatch} userState={userState} />
            </p>
            </div>
)
}
else {
    return <></>
}
}

export default Header