const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const User = require('../models/User');
const app = require('../App');

const api = supertest(app);
jest.setTimeout(30000);

const blogs = [
  {
    id: '5ec8ee1d95baa0535fe4d3d7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    userId: '5ed58e4396771d0780a54dd2',
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    userId: '5ed58e4396771d0780a54dd2',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(blogs[0]);
  await blogObject.save();

  blogObject = new Blog(blogs[1]);
  await blogObject.save();
});

describe('when there are blogs in the db', () => {
  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });

  test('blogs db contains React patterns blog', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].author).toContain('Michael Chan');
  });

  test('can get specific blog by ID', async () => {
    const allBlogsInDb = await api.get('/api/blogs');
    const firstBlogInDb = allBlogsInDb.body[0];
    const response = await api.get(`/api/blogs/${firstBlogInDb.id}`);
    expect(response.body.title).toContain('React patterns');
  });

  test('can delete specific blog by ID', async () => {
    // CREATE A USER
    const newUser = {
      username: 'test_user1',
      password: 'password',
    };
    await api.post('/api/users').send(newUser);

    // LOGIN THE CREATE USER
    const loggedInUser = await api.post('/api/login').send(newUser);
    const token = `Bearer ${loggedInUser.body.token}`;

    // CREATE A NEW BLOG
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'http://newurl.com',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(newBlog)
      .expect(200);

    // SELECT THE NEWLY CREATED BLOG AND DELETE IT
    let allBlogsInDb = await api.get('/api/blogs');
    const IdOfBlogToDelete = allBlogsInDb.body[2].id;
    await api
      .delete(`/api/blogs/${IdOfBlogToDelete}`)
      .set('authorization', token)
      .expect(204);

    // CHECK IF NUMBER OF BLOGS == ORIGINAL
    allBlogsInDb = await api.get('/api/blogs');
    expect(allBlogsInDb.body).toHaveLength(blogs.length);
  });
}, 10000);

// ADDING BLOG TO DB WITH AUTHENTICATED USER

describe('when adding blogs to db', () => {
  let token = '';
  beforeEach(async () => {
    try {
      await User.deleteMany({});
      const newUser = {
        username: 'test_user1',
        password: 'password',
      };
      await api.post('/api/users').send(newUser);
      const loggedInUser = await api.post('/api/login').send(newUser);
      token = `Bearer ${loggedInUser.body.token}`;
      return token;
    } catch (error) {
      return error;
    }
  }, 20000);

  test('a blog can be added by an authorized user', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'http://newurl.com',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(newBlog)
      .expect(200);

    const response = await api.get('/api/blogs');

    // verify that the new blog was added
    expect(response.body).toHaveLength(blogs.length + 1);
    expect(response.body[response.body.length - 1].author).toContain(
      'New author',
    );
  });

  test('a blog cannot be added if a user is unauthorized', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'http://newurl.com',
      likes: 10,
    };

    // no token sent
    await api.post('/api/blogs').send(newBlog).expect(401);
  });

  test('adding a blog without likes defaults to 0', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'http://newurl.com',
    };

    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(newBlog)
      .expect(200);
    const response = await api.get('/api/blogs');
    const blogWithoutLikes = response.body[response.body.length - 1];
    expect(blogWithoutLikes.likes).toEqual(0);
  });

  test('a blog without title and url responds with 400', async () => {
    const newBlog = {
      title: '',
      author: 'New author',
      url: '',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(newBlog)
      .expect(400);
  });
});

afterAll(async (done) => {
  await mongoose.connection.close();
  done();
});
