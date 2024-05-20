import LogoutButton from './LogoutButton'

const Header = ({userState, userDispatch}) => {
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