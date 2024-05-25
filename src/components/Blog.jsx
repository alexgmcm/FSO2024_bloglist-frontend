import { blogStyle } from '../styles/blog'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
const Blog = ({ blog, giveLike, deleteBlog }) => {
    const  {userState, userDispatch} = useContext(UserContext)

    const handleLike = async (event) => {
        event.preventDefault()
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user ? blog.user.id : null,
        }
        giveLike(updatedBlog)
    }

    const handleDelete = (event) => {
        event.preventDefault()
        deleteBlog(blog.id)
    }

    const isUser = () => {
        if (!blog.user) {
            return { display: 'none' }
        } else if (blog.user.username === userState.username) {
            return {}
        } else {
            return { display: 'none' }
        }
    }

    if(!blog){
        return (<></>)
    }
        return (
            <div style={blogStyle}>
               
                 <h1>
                    {blog.title} {blog.author}
                    </h1>
                <div><a href={blog.url}>{blog.url}</a></div>
                <div>likes {blog.likes}
                <button onClick={handleLike}>like</button> </div>
                <div>added by: {blog.user ? blog.user.name : 'No User'}</div>
                <div style={isUser()}>
                    <button onClick={handleDelete}>remove</button>
                </div>
            </div>
        )
    }


export default Blog
