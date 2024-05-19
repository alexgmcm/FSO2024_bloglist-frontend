import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  setMessage,
  setMessageType,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
    } catch (exception) {
      console.log(exception);
      setMessage("Wrong credentials");
      setMessageType("error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
