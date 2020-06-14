import React from "react";

const Form = ({
  title,
  author,
  url,
  handleBlogCreation,
  handleTitle,
  handleAuthor,
  handleUrl
}) => {
  return (
    <form onSubmit={handleBlogCreation}>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="enter a title"
        onChange={handleTitle}
      />

      <div>
        <input
          type="text"
          name="title"
          value={author}
          placeholder="enter a author"
          onChange={handleAuthor}
        />
      </div>
      <div>
        <input
          type="text"
          name="url"
          value={url}
          placeholder="enter a url"
          onChange={handleUrl}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default Form;
