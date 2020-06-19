import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './components/Blog';
import Login from './components/Login';
import Form from './components/Form';
import Togglable from './components/Togglable';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState();

  const [notification, setNotification] = useState('');

  useEffect(() => {
    const loggedInUserFromStorage = localStorage.getItem('user');
    if (loggedInUserFromStorage) {
      const userFromStorage = JSON.parse(loggedInUserFromStorage);
      setUser(userFromStorage);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    setNotification(``);
    try {
      const response = await axios.post('http://localhost:3002/api/login', {
        username,
        password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      setUser(response.data);
    } catch (error) {
      setNotification(`wrong username or password`);
    }
  };

  const handleLogOut = () => {
    setUser({});
    localStorage.clear();
  };

  if (!user) {
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
        {notification ? (
          <div style={{ fontWeight: 'bold', fontSize: '2em', color: 'green' }}>
            {notification}
          </div>
        ) : (
          <> </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {' '}
        {user.username}
        is logged in
      </div>

      <Blog user={user} />

      <Togglable buttonLabel="create blog">
        <Form user={user} />
      </Togglable>
      <div>
        <button type="button" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default App;
