import loginService from '../services/login'
import blogService from '../services/blogs'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'
import { Form, Button } from 'react-bootstrap'
const LoginForm = () => {
    const {userState, userDispatch} =  useContext(UserContext)
    const {notificationState, notificationDispatch} = useContext(NotificationContext)
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
            notificationDispatch({type:"SET_MESSAGE", message:`${username} logged in!`, messageType: "success"})
        } catch (exception) {
            console.log(exception)
            notificationDispatch({type:"SET_MESSAGE", message:`Wrong credentials ${username} `, messageType: "danger"})
        }
    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group>
            
            <Form.Label>username</Form.Label>
            
                <Form.Control
                    data-testid="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => userDispatch({type:"SET_USERNAME",username:target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>password</Form.Label>
                <Form.Control
                    data-testid="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => userDispatch({type:"SET_PASSWORD",password:target.value})}
                />
            </Form.Group>
            <Button variant="primary" type="submit">login</Button>
        </Form>
    )
}

export default LoginForm
