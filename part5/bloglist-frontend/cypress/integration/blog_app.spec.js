const user = {
  name: 'user2',
  username: 'user2',
  password: 'password',
};

describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3002/reset');

    cy.request('POST', 'http://localhost:3002/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Username');
    cy.contains('password');
    cy.contains('Login');
  });

  it('user can login', function () {
    cy.get('#username').type('user2');
    cy.get('#password').type('password');
    cy.get('#submit-btn').click();
    cy.contains('user2is logged in');
  });

  it('a user cannot login with a wrong pasword', function () {
    cy.get('#username').type('user2');
    cy.get('#password').type('1password');
    cy.get('#submit-btn').click();
    cy.contains('wrong username or password');

    cy.get('html').should('not.contain', 'user2is logged in');
  });
});

describe('when logged in', function () {
  beforeEach(function () {
    // cy.visit('http://localhost:3000');
    // cy.get('#username').type('user2');
    // cy.get('#password').type('password');
    // cy.get('#submit-btn').click();
    // cy.contains('user2is logged in');

    cy.login({ username: 'user2', password: 'password' });
  });

  it('tests that logged in users can create blogs', function () {
    cy.visit('http://localhost:3000');
    cy.contains('create blog').click();
    cy.get('#blog-title').type('a new blog');
    cy.get('#blog-author').type('Dan Brown');
    cy.get('#blog-url').type('www.example.com');
    cy.get('#create-blog').click();
    cy.contains('a new blog added');
  });

  //   it.only('tests that a user can like a blog', function () {
  //     cy.get('#view-more').click();
  //     cy.get('.like-count').then(likes => {
  //       const currLikes = likes[0].innerText;
  //       cy.get(currLikes).contains(currLikes);

  //       //   cy.contains('like').click();
  //       //   const newLikes = parseInt(currLikes) + 1;
  //       //   cy.get(currLikes).should('contain', newLikes);
  //     });

  //     // cy.get('.like-count').contains(`${currLikes} + 1`);
  //   });

  it.only('tests that only a user that created a blog can delete it', function () {
    cy.get('#view-more').click();
    cy.get('#user2');
    // cy.get('#delete-blog').click();
    cy.get('#sorted-blogs').then(blog => {
      cy.get(blog).should('not.contain', blog[1]);
    });
  });

  it.only('tests that blogs are sorted by likes', function () {});
});
