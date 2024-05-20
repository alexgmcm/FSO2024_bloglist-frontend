import Blog from './Blog'
import LogoutButton from './LogoutButton'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, userDispatch,userState, giveLike, deleteBlog }) => {
    return (
        <div>
            <h2>blogs</h2>
            <p>
                {userState.name} logged in.{' '}
                <LogoutButton userDispatch={userDispatch} userState={userState} />
            </p>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    giveLike={giveLike}
                    userState={userState}
                    deleteBlog={deleteBlog}
                />
            ))}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    userState: PropTypes.object.isRequired,
    userDispatch: PropTypes.func.isRequired,
    giveLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default BlogList
