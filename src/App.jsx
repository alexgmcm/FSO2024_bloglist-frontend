import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import {
    notificationReducer,
    notificationSideEffects,
    initialNotificationState,
} from './reducers/notifications'
import { userReducer, initialUserState } from './reducers/user'
import Header from './components/Header'
import { NotificationContext } from './contexts/NotificationContext.js';
import { UserContext } from './contexts/UserContext.js'


const App = () => {
    //const [username, setUsername] = useState('')
    //const [password, setPassword] = useState('')
    //const [user, setUser] = useState(null)
    //const [submittedBlog, setSubmittedBlog] = useState(null)

    const [notificationState, notificationDispatch] = useReducer(
        notificationReducer,
        initialNotificationState
    )

    const [userState, userDispatch] = useReducer(userReducer, initialUserState)

    const queryClient = useQueryClient()
    useEffect(() => {
        notificationSideEffects(notificationState, notificationDispatch)
    }, [notificationState.message])

    const blogQuery = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
    })
    //console.log(JSON.parse(JSON.stringify(blogQuery)))

    const blogs = blogQuery.data
    console.log(blogs)

    /*
      // OLD CODE USING USE STATE FOR BLOGS
    useEffect(() => {
        blogService.getAll().then((blogs) => {
            //console.log(blogs)
            setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        })
    }, [submittedBlog])
    */

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            //setUser(user)
            userDispatch({ type: 'SET_USERNAME', username: user.username })
            userDispatch({ type: 'SET_NAME', name: user.name })
            userDispatch({ type: 'SET_TOKEN', name: user.token })
            blogService.setToken(user.token)
        }
    }, [])

    const newBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })
    const createBlog = async (newBlog) => {
        console.log(`creating new blog ${newBlog}`)
        //await blogService.create({ ...newBlog, user: user.id })
        //setSubmittedBlog(newBlog)
        newBlogMutation.mutate(newBlog)
        // it doesn't need the user info as the backend middleware gets this from the db via the token

        notificationDispatch({
            type: 'SET_MESSAGE',
            message: `A new blog ${newBlog.title} by ${newBlog.author} added!`,
            messageType: 'notice',
        })
    }
    const likeBlogMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })
    const giveLike = async (updatedBlog) => {
        /*
        //OLD CODE
        const response = await blogService.update(updatedBlog)
        let curBlogs = blogs
        const index = curBlogs.findIndex((x) => x.id === updatedBlog.id)
        curBlogs[index] = response
        console.log(curBlogs)
        //setSubmittedBlog(curBlogs) */
        //console.log("Liking blog", updatedBlog)
        likeBlogMutation.mutate(updatedBlog)
    }

    const delBlogMutation = useMutation({
        mutationFn: blogService.del,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })
    const deleteBlog = async (id) => {
        /*const response = await blogService.del(id)
        setSubmittedBlog(response)*/
        delBlogMutation.mutate(id)
    }

    if (blogQuery.isLoading) {
        return <div>loading blogs...</div>
    }

    if (userState.token === null) {
        return (
            <>
            <NotificationContext.Provider value={{notificationState, notificationDispatch}} >
            <UserContext.Provider value = { {userState, userDispatch} }>
                <Notification/>
                <LoginForm
                    data-testid="login-form"
                />
                </UserContext.Provider>
            </NotificationContext.Provider>
            </>
        )
    }

    return (
        <>
        <NotificationContext.Provider value={{notificationState, notificationDispatch}} >
        <UserContext.Provider value = { {userState, userDispatch} }>
        <Router>
            <Notification />
            <Header />
            <Routes>
            <Route path="/users" element={<Users blogs={blogs} />}/>
            <Route path="/" element= {<> <BlogList
                key={JSON.stringify(blogs)}
                blogs={blogs}
                giveLike={giveLike}
                deleteBlog={deleteBlog}
            /> <Togglable buttonLabel="new note">
            <BlogForm createBlog={createBlog} />
        </Togglable> </>} />
           
            
            </Routes>
            </Router>
            </UserContext.Provider>
            </NotificationContext.Provider>
        </>
    )
}

export default App
