import blogService from '../services/blogs'
import { useState } from 'react'


const BlogForm = ({user, setSubmittedBlog, setMessage, setMessageType}) => {
    const [author, setAuthor] = useState('') 
    const [title, setTitle] = useState('') 
    const [url, setUrl] = useState('') 



    const handleCreate = async (event) => {
        event.preventDefault()
        const newBlog = {"author": author, "title": title, "url":url, user:user.id}
        console.log(`creating new blog ${newBlog}`)
        await blogService.create(newBlog)
        setSubmittedBlog(newBlog)
        setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added!`)
        setMessageType('notice')
        setAuthor('')
        setTitle('')
        setUrl('')

    }


    return (
        <div>
        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      </div>
    )
}

export default BlogForm