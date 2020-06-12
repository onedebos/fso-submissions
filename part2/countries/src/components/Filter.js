import React from "react";

export const Filter = ({ value, handleChange }) => {
  return (
    <div>
      find countries: <input value={value} onChange={handleChange} />
    </div>
  );
};
