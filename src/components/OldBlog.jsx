/* Old blog component used from ex 5.7 to ex 7.16 */

import { useState } from 'react'
import { blogStyle } from '../styles/blog'

const Blog = ({ blog, giveLike, userState, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    

    const toggleVisible = (event) => {
        event.preventDefault()
        setVisible(!visible)
    }

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

    if (!visible) {
        return (
            <div style={blogStyle}>
                <div style={{ display: 'inline' }}>
                    {blog.title} {blog.author}
                </div>{' '}
                <button onClick={toggleVisible}>view</button>
            </div>
        )
    } else {
        return (
            <div style={blogStyle}>
                <div style={{ display: 'inline' }}>
                    {' '}
                    {blog.title} {blog.author}{' '}
                </div>{' '}
                <button onClick={toggleVisible}>hide</button>
                <div>{blog.url}</div>
                <div>likes {blog.likes}</div>{' '}
                <button onClick={handleLike}>like</button>
                <div>{blog.user ? blog.user.name : 'No User'}</div>
                <div style={isUser()}>
                    {' '}
                    <button onClick={handleDelete}>remove</button>
                </div>
            </div>
        )
    }
}

export default Blog
