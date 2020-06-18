import React, { useState } from "react";
import blogService from "../services/blogs";

const Form = ({ user }) => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [url, setUrl] = useState();
  const [notification, setNotification] = useState("");

  const handleBlogCreation = async e => {
    setNotification(``);
    e.preventDefault();
    try {
      await blogService.createBlog(user.token, { title, author, url });
      setNotification(`a new blog ${title} added.`);
    } catch (error) {
      setNotification(`blog was not created`);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleBlogCreation}>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="enter a title"
        onChange={({ target }) => setTitle(target.value)}
      />

      <div>
        <input
          type="text"
          name="title"
          value={author}
          placeholder="enter a author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          name="url"
          value={url}
          placeholder="enter a url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>

      <div>{notification}</div>
    </form>
  );
};

export default Form;
