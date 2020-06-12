import React from "react";

export const Filter = ({ value, handleChange }) => {
  return (
    <div>
      filter: <input value={value} onChange={handleChange} />
    </div>
  );
};
