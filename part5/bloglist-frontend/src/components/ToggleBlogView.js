import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleBlogView = ({ title, children, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      <div>
        {title}
        <button type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>{children}</div>
    </div>
  );
};

export default ToggleBlogView;

ToggleBlogView.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
