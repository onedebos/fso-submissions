import React, { useState } from 'react';

const Togglable = ({ buttonLabel, children }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => setVisibility(!visibility);

  // when vis == true, show div, display: ""
  const showWhenVisible = {
    display: visibility ? '' : 'none',
  };

  // when vis == true, hide div, display: 'none'
  const hideWhenVisible = { display: visibility ? 'none' : '' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Togglable;
