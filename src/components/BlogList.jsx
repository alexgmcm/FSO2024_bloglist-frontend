import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, userState, giveLike, deleteBlog }) => {
    return (

        <div>
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
    giveLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default BlogList
