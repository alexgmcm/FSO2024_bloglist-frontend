import Blog from './Blog'
import LogoutButton from './LogoutButton'

const BlogList =  ({blogs, user, setUser}) => {

    return (
    <div>
        <h2>blogs</h2>
        <p>
        {user.name} logged in. <LogoutButton setUser={setUser} user={user}/>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
    )
}

export default BlogList