import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {
    notificationReducer,
    notificationSideEffects,
    initialNotificationState,
} from './reducers/notifications'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    //const [submittedBlog, setSubmittedBlog] = useState(null)
    const [refreshBlogs, setRefreshBlogs] = useState(null)
    const [notificationState, notificationDispatch] = useReducer(
        notificationReducer,
        initialNotificationState
    )
    const queryClient = useQueryClient()
    useEffect(() => {
        notificationSideEffects(notificationState, notificationDispatch)
    }, [notificationState.message])

    const blogQuery = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
    })
    console.log(JSON.parse(JSON.stringify(blogQuery)))

    const blogs = blogQuery.data

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
            setUser(user)
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
        newBlogMutation.mutate({ ...newBlog, user: user.id })

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
        console.log("Liking blog", updatedBlog)
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

    if (user === null) {
        return (
            <>
                <Notification notificationState={notificationState} />
                <LoginForm
                    data-testid="login-form"
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    setUser={setUser}
                    notificationDispatch={notificationDispatch}
                />
            </>
        )
    }

    return (
        <>
            <Notification notificationState={notificationState} />
            <BlogList
                key={JSON.stringify(blogs)}
                blogs={blogs}
                user={user}
                setUser={setUser}
                giveLike={giveLike}
                deleteBlog={deleteBlog}
            />
            <Togglable buttonLabel="new note">
                <BlogForm createBlog={createBlog} />
            </Togglable>
        </>
    )
}

export default App
