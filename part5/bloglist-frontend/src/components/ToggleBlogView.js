import React, { useState } from 'react';

const ToggleBlogView = ({ title, author, children, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      <div id="title-author">
        {title} by {author}
        <button type="button" onClick={toggleVisibility} id="view-more">
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} id="togglable-child">
        {children}
      </div>
    </div>
  );
};

export default ToggleBlogView;
