import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Form from "./components/Form";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState();
  const [blog, setBlog] = useState({
    title: "",
    url: "",
    author: ""
  });
  const [notification, setNotification] = useState();

  useEffect(() => {
    const loggedInUserFromStorage = localStorage.getItem("user");
    if (loggedInUserFromStorage) {
      const userFromStorage = JSON.parse(loggedInUserFromStorage);
      setUser(userFromStorage);
      setIsLoggedIn(true);
    }
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async () => {
    setNotification(``);
    try {
      const response = await axios.post("http://localhost:3002/api/login", {
        username,
        password
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoggedIn(true);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      setNotification(`wrong username or password`);
      console.log(error);
    }
  };

  const handleLogOut = () => {
    setUser({});
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const createBlog = async e => {
    setNotification(``);
    e.preventDefault();

    setBlog(prevState => ({
      ...prevState,
      title,
      author,
      url
    }));
    try {
      await blogService.createBlog(user.token, blog);
      setNotification(`a new blog ${blog.title} added.`);
    } catch (error) {
      setNotification(`blog was not created`);
      console.log(error);
    }
  };
  if (!isLoggedIn) {
    return (
      <div>
        <Login
          username={username}
          password={password}
          handleUsername={({ target }) => {
            setUsername(target.value);
          }}
          handlePassword={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      {notification ? (
        <div style={{ fontWeight: "bold", fontSize: "2em", color: "green" }}>
          {notification}
        </div>
      ) : (
        <> </>
      )}
      <h2>blogs</h2>
      {isLoggedIn ? (
        <>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {" "}
            {user.username} is logged in
          </div>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <> </>
      )}

      <Form
        title={title}
        author={author}
        url={url}
        handleTitle={({ target }) => {
          setTitle(target.value);
          setBlog(prevState => ({ ...prevState, title }));
        }}
        handleAuthor={({ target }) => {
          setAuthor(target.value);
          setBlog(prevState => ({ ...prevState, author }));
        }}
        handleUrl={({ target }) => {
          setUrl(target.value);
          setBlog(prevState => ({ ...prevState, url }));
        }}
        handleBlogCreation={createBlog}
      />
      <div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default App;
