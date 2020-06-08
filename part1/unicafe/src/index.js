import React, { useState } from "react";
import ReactDOM from "react-dom";
// import Results from "./Results";
import Button from "./Button";
import Statistic from "./Statistic";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = (good / all) * 100;

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClick={handleGood} />
        <Button text="bad" onClick={handleBad} />
        <Button text="neutral" onClick={handleNeutral} />
      </div>
      <div>
        <h1>Statistics</h1>
        {all === 0 ? (
          <div>No feedback given </div>
        ) : (
          <>
            <Statistic text="good" value={good} />
            <Statistic text="bad" value={bad} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={`${positive}%`} />
          </>
        )}

        {/* <Results good={good} bad={bad} neutral={neutral} /> */}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
