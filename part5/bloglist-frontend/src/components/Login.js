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
        id="username"
        value={username}
        placeholder="enter a username"
        onChange={handleUsername}
      />
      <div>
        <label htmlFor="password">password: </label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="enter a password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit" onClick={handleLogin} id="submit-btn">
        Login
      </button>
    </div>
  );
};

export default Login;
