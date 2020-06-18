import React from 'react';

const Login = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleLogin,
}) => {
  return (
    <div>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        value={username}
        placeholder="enter a username"
        onChange={handleUsername}
      />
      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          value={password}
          placeholder="enter a password"
          onChange={handlePassword}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
