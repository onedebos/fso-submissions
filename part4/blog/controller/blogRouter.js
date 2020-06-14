const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const logger = require('../utils/logger');

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('userId', {
      username: 1,
      name: 1,
    });
    if (process.env.NODE_ENV !== 'test') {
      logger.info('getting blog posts');
    }

    response.json(blogs);
  } catch (error) {
    response.json({ error: 'something went wrong getting the blogs' });
  }
});

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id.toString();

  try {
    const findBlogWithId = await Blog.findById(id);
    response.json(findBlogWithId);
  } catch (error) {
    response.json({ error: 'There is no blog with that ID.' });
  }
});

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  console.log(title, author, url, request.token);
  if (request.token === undefined || request.token === null) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (decodedToken.id === undefined || request.token === null) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  // console.log(user);

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    userId: decodedToken.id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    user.save();
    response.json(savedBlog.toJSON()).status(201);
  } catch (error) {
    response
      .status(400)
      .json({ error: 'There was a problem saving that blog.' + error });
  }
});

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const blog = await Blog.findById(id.toString());

  if (blog.userId.toString() !== decodedToken.id.toString()) {
    return response.json({
      error: 'You cannot delete blogs not created by you.',
    });
  }
  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).json({ message: 'blog deleted!' });
  } catch (error) {
    response.json({ error: 'The blog could not be deleted.' });
  }
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params.id;

  const { likes, title, author, url } = request.body;
  const updatedBlog = { likes, title, author, url };

  try {
    const updatedBlogInDb = await Blog.findByIdAndUpdate(id, updatedBlog, {
      useFindAndModify: false,
    });
    console.log(updatedBlogInDb);
    response.json(updatedBlogInDb);
  } catch (error) {
    response
      .status(400)
      .json({ error: 'There was a problem updating that blog' });
  }
});

module.exports = blogRouter;
