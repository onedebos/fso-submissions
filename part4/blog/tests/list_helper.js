const _ = require('lodash');
const dummy = (blogs) => 1;

const sumNum = (total, num) => {
  return total + num;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  return likes.reduce(sumNum);
};

const favoriteBlog = (blogs) => {
  const blog = blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );

  const { title, author, likes } = blog;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const namesWithLikes = _.map(_.countBy(blogs, 'author'), (val, key) => ({
    author: key,
    blogs: val,
  }));
  const highestBlogCount = Math.max(
    ...namesWithLikes.map((author) => author.blogs)
  );
  return namesWithLikes.find((author) => author.blogs === highestBlogCount);
};

const mostLikes = (blogs) => {
  const reducer = (total, num) => total + num;
  const authorsWithTheirLikes = _.map(
    _.groupBy(blogs, 'author'),
    (val, key) => ({
      author: key,
      likes: val.map((v) => v.likes).reduce(reducer),
    })
  );
  const maxLikes = Math.max(
    ...authorsWithTheirLikes.map((author) => author.likes)
  );
  return _.find(authorsWithTheirLikes, (author) => author.likes === maxLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
