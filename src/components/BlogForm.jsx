import blogService from "../services/blogs";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();
    createBlog({ title: title, url: url, author: author });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            placeholder="write title here..."
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            placeholder="write author here..."
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            data-testid="url"
            type="text"
            value={url}
            name="URL"
            placeholder="write url here..."
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
