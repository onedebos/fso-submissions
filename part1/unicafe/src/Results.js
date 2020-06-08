import React from "react";

function Results({ good, neutral, bad }) {
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = (good / all) * 100;
  return (
    <div>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {average}</p>
          <p>positiive {positive}%</p>
        </div>
      )}
    </div>
  );
}

export default Results;
