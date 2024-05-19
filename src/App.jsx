import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [submittedBlog, setSubmittedBlog] = useState(null);
  const [refreshBlogs, setRefreshBlogs] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      //console.log(blogs)
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
  }, [submittedBlog]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (newBlog) => {
    console.log(`creating new blog ${newBlog}`);
    await blogService.create({ ...newBlog, user: user.id });
    setSubmittedBlog(newBlog);
    setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added!`);
    setMessageType("notice");
  };

  const giveLike = async (updatedBlog) => {
    const response = await blogService.update(updatedBlog);
    let curBlogs = blogs;
    const index = curBlogs.findIndex((x) => x.id === updatedBlog.id);
    curBlogs[index] = response;
    console.log(curBlogs);
    setSubmittedBlog(curBlogs);
  };

  const deleteBlog = async (id) => {
    const response = await blogService.del(id);
    setSubmittedBlog(response);
  };

  if (user === null) {
    return (
      <>
        <Notification
          message={message}
          messageType={messageType}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
        <LoginForm
          data-testid="login-form"
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      </>
    );
  }

  return (
    <>
      <Notification
        message={message}
        messageType={messageType}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <BlogList
        key={JSON.stringify(blogs)}
        blogs={blogs}
        user={user}
        setUser={setUser}
        giveLike={giveLike}
        deleteBlog={deleteBlog}
      />
      <Togglable buttonLabel="new note">
        <BlogForm createBlog={createBlog} />
      </Togglable>
    </>
  );
};

export default App;
