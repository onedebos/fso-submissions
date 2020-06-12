const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    const isUserAuthenticated = user === null ? false : isPasswordCorrect;
    if (!(user && isUserAuthenticated)) {
      return response
        .status(401)
        .json({ error: 'invalid username or password' });
    }
    const getTokenForAuthenticatedUser = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(getTokenForAuthenticatedUser, process.env.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user.id });
  } catch (error) {
    response.status(401).json({
      error: `Something went wrong while we were signing you in. ${error}`,
    });
  }
});

module.exports = loginRouter;
