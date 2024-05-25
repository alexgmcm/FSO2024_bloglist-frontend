import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { blogStyle } from '../styles/blog'

const BlogList = ({ blogs }) => {
    console.log(blogs)
    return (

        <div>
            {blogs.map((blog,i) => (
                <div key={i} style={blogStyle}>
               <Link  to={`/blogs/${blog.id}`} >{blog.title}</Link>
               </div>
            ))}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,

}

export default BlogList
