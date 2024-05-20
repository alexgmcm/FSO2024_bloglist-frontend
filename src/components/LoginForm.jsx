import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({
    userState,
    userDispatch,
    notificationDispatch
}) => {
    const username = userState.username
    const password = userState.password
    const handleLogin = async (event) => {
        
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            console.log("user", user)
            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            )
           userDispatch({type:"SET_TOKEN", token:user.token})
            blogService.setToken(user.token)
        } catch (exception) {
            console.log(exception)
            notificationDispatch({type:"SET_MESSAGE", message:`Wrong credentials ${username} `, messageType: "error"})
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    data-testid="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => userDispatch({type:"SET_USERNAME",username:target.value})}
                />
            </div>
            <div>
                password
                <input
                    data-testid="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => userDispatch({type:"SET_PASSWORD",password:target.value})}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm
