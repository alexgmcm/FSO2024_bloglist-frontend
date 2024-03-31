import Blog from './Blog'
import LogoutButton from './LogoutButton'

const BlogList =  ({blogs, user, setUser, giveLike, deleteBlog}) => {
    

    return (
    <div>
        <h2>blogs</h2>
        <p>
        {user.name} logged in. <LogoutButton setUser={setUser} user={user}/>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} giveLike={giveLike} user={user} deleteBlog={deleteBlog} />
        )}
    </div>
    )
}

export default BlogList