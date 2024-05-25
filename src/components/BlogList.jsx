import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { blogStyle } from '../styles/blog'
import Table from 'react-bootstrap/Table';


const BlogList = ({ blogs }) => {
    console.log(blogs)
    return (

        <div className="container">
            <Table striped>
            <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                    </tr>
                </thead>
            <tbody>
            {blogs.map((blog,i) => (
                <tr key={i}>
               <td><Link  to={`/blogs/${blog.id}`} >{blog.title}</Link></td>
               <td>{blog.author}</td>
               </tr>
            ))}
            </tbody>

</Table>
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,

}

export default BlogList
