import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [submittedBlog, setSubmittedBlog] = useState(null)
  const [refreshBlogs, setRefreshBlogs] = useState(null) 
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null) 



  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs)
      setBlogs( blogs )
    
    }
    )  
  }, [submittedBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (newBlog) => {
    console.log(`creating new blog ${newBlog}`)
    await blogService.create({...newBlog, user:user.id})
    setSubmittedBlog(newBlog)
    setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added!`)
    setMessageType('notice')
    

  }

  if (user===null){
   return (
    <>
     <Notification message={message} messageType={messageType} setMessage={setMessage} setMessageType={setMessageType}/>
     <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setMessage={setMessage} setMessageType={setMessageType}  />
     </>
   )
  }

  return (
    <>
    <Notification  message={message} messageType={messageType} setMessage={setMessage} setMessageType={setMessageType}/>
    <BlogList key={JSON.stringify(blogs)} blogs={blogs} user={user} setUser={setUser} />
    <Togglable buttonLabel="new note">
      <BlogForm createBlog={createBlog} />
    </Togglable>
    </>

  )


    
}

export default App