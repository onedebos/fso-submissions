const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/User');
const app = require('../App');

const api = supertest(app);
jest.setTimeout(30000);

const users = [
  { username: 'username', password: 'password', name: 'name' },
  { username: 'username1', password: 'password' },
];

let server, agent;

beforeEach((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);

    api = request.agent(server); // since the application is already listening, it should use the allocated port
    done();
  });
});

afterEach((done) => {
  return server && server.close(done);
});

beforeEach(async () => {
  await User.deleteMany({});
  let newUser = new User(users[0]);
  await newUser.save();
  newUser = new User(users[1]);
  await newUser.save();
});

describe('when there is initially one user in the db', () => {
  test('check that a user exists in the DB', async () => {
    const usersInDb = await api.get('/api/users');
    expect(usersInDb.body).toHaveLength(2);
  });

  // test('check that a new user can be created in DB', async () => {
  //   const user = {
  //     username: 'sholzy',
  //     name: 'shola',
  //     password: 'password',
  //   };
  //   await api.post('/api/users').send(user).expect(200);
  //   const usersInDb = await api.get('/api/users');
  //   expect(usersInDb.body).toHaveLength(3);
  // });

  // test('signing up with a username that already exists fails with a status code and error message', async () => {
  //   const user = {
  //     username: 'sholzy',
  //     name: 'shola',
  //     password: 'password',
  //   };

  //   const result = await api.post('api/blogs').send(user).expect(400);
  //   console.log(result);
  //   // expect(result.body.error).toContain('That username is not available');
  //   // const usersInDb = await api.get('/api/users');
  //   // expect(usersInDb.body).toHaveLength(2);
  // });
});

afterAll(async (done) => {
  await mongoose.connection.close();
  done();
});
