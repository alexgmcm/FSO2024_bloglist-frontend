import Blog from './Blog'
import LogoutButton from './LogoutButton'
import PropTypes from 'prop-types'


const BlogList =  ({ blogs, user, setUser, giveLike, deleteBlog }) => {


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

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  giveLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList