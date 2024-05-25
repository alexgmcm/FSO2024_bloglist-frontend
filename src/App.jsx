import {  useEffect, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {  Routes, Route, Link, useMatch } from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog.jsx'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User.jsx'
import {
    notificationReducer,
    notificationSideEffects,
    initialNotificationState,
} from './reducers/notifications'
import { userReducer, initialUserState } from './reducers/user'
import Header from './components/Header'
import { NotificationContext } from './contexts/NotificationContext.js';
import { UserContext } from './contexts/UserContext.js'
import { blogsToUserArray } from './helpers/blogsToUserArray.js'


const App = () => {
   
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

    const blogs = blogQuery.data
    console.log("blogs",blogs)
    const userArray = blogs ? blogsToUserArray(blogs) : null

   

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
        likeBlogMutation.mutate(updatedBlog)
    }

    const delBlogMutation = useMutation({
        mutationFn: blogService.del,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })
    const deleteBlog = async (id) => {
        delBlogMutation.mutate(id)
    }

    
  const matchUser = useMatch('/users/:id')
  const matchedUser = matchUser
    ? userArray ? userArray.find(user => user.id === String(matchUser.params.id)) : null
    : null

const matchBlog = useMatch('/blogs/:id')
const matchedBlog = matchBlog
      ? blogs ? blogs.find(blog => blog.id === String(matchBlog.params.id)) : null
      : null


    console.log("matchedBlog",matchedBlog)
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
            <Notification />
            <Header />
            <Routes>
            <Route path="/users" element={<Users userArray={userArray} />}/>
            <Route path="/users/:id" element={<User user={matchedUser} />} />
            <Route path="/blogs/:id" element={<Blog blog={matchedBlog} giveLike={giveLike} deleteBlog={deleteBlog} />} />
            <Route path="/" element= {<> <BlogList
                key={JSON.stringify(blogs)}
                blogs={blogs}
            /> <Togglable buttonLabel="new note">
            <BlogForm createBlog={createBlog} />
        </Togglable> </>} />
           
            
            </Routes>

            </UserContext.Provider>
            </NotificationContext.Provider>
        </>
    )
}

export default App
