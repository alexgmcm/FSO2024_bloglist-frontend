import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, giveLike, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisible = (event) => {
    event.preventDefault();
    setVisible(!visible);
  };

  const handleLike = async (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    };
    giveLike(updatedBlog);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteBlog(blog.id);
  };

  const isUser = () => {
    if (!blog.user) {
      return { display: "none" };
    } else if (blog.user.username === user.username) {
      return {};
    } else {
      return { display: "none" };
    }
  };

  if (!visible) {
    return (
      <div style={blogStyle}>
        <div style={{ display: "inline" }}>
          {blog.title} {blog.author}
        </div>{" "}
        <button onClick={toggleVisible}>view</button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <div style={{ display: "inline" }}>
          {" "}
          {blog.title} {blog.author}{" "}
        </div>{" "}
        <button onClick={toggleVisible}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes}</div> <button onClick={handleLike}>like</button>
        <div>{blog.user ? blog.user.name : "No User"}</div>
        <div style={isUser()}>
          {" "}
          <button onClick={handleDelete}>remove</button>
        </div>
      </div>
    );
  }
};

export default Blog;
