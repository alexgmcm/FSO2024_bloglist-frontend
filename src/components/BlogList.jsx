import Blog from './Blog'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const BlogList = ({ blogs,  giveLike, deleteBlog }) => {
    const {userState, userDispatch} = useContext(UserContext)
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
    giveLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default BlogList
