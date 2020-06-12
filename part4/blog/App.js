const app = require('./server');
const blogRoute = require('./controller/blogRouter');
const usersRoute = require('./controller/usersRouter');
const loginRoute = require('./controller/loginRouter');

const middleware = require('./utils/middleware');

app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRoute);
app.use('/api/users', usersRoute);
app.use('/api/login', loginRoute);
app.use(middleware.unknownEndPoint);

module.exports = app;
