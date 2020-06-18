import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import ToggleBlogView from './ToggleBlogView';

const Blog = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
    // blogService.getAll().then((blogs) => setBlogs(blogs.blogs));
  }, [blogs]);

  const increaseLikes = (id, blog) => {
    const { title, author, url, likes } = blog;
    const blogWithLikes = {
      title,
      author,
      url,
      likes: likes + 1,
    };
    blogService.increaseLikes(id, user.token, blogWithLikes);
  };

  const deleteBlog = async id => {
    await blogService.deleteBlog(id, user.token);
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map(blog => (
        <div key={blog.id}>
          <div>
            <ToggleBlogView buttonLabel="view" title={blog.title}>
              <div>
                author:
                {blog.author}
                <br />
                likes:
                {blog.likes}
                <button
                  type="button"
                  onClick={() => increaseLikes(blog.id, blog)}
                >
                  like
                </button>
                <br />
                url:
                {blog.url}
                <br />
                <button
                  type="button"
                  onClick={() => deleteBlog(blog.id, blog.title)}
                >
                  delete blog
                </button>
              </div>
            </ToggleBlogView>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
