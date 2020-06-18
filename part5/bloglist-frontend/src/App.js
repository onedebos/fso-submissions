import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Form from "./components/Form";
import axios from "axios";
import Togglable from "./components/Togglable";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const [notification, setNotification] = useState();

  useEffect(() => {
    const loggedInUserFromStorage = localStorage.getItem("user");
    if (loggedInUserFromStorage) {
      const userFromStorage = JSON.parse(loggedInUserFromStorage);
      setUser(userFromStorage);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
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

  if (!isLoggedIn) {
    return (
      <div>
        require('dotenv/config');
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

          <Blog user={user} />
        </>
      ) : (
        <> </>
      )}

      <Togglable buttonLabel="create blog">
        <Form user={user} />
      </Togglable>
      <div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default App;
