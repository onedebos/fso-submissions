import React from "react";

function Statistic({ text, value }) {
  return (
    <div>
      <p>
        {text} {value}
      </p>
    </div>
  );
}

export default Statistic;
