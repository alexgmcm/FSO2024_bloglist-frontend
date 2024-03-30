import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'




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
    <BlogForm user={user} setSubmittedBlog={setSubmittedBlog} setMessage={setMessage} setMessageType={setMessageType} />
    </>

  )


    
}

export default App