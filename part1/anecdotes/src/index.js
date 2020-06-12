import React, { useState } from "react";
import ReactDOM from "react-dom";
import anecdotes from "./Content";
import TopVotes from "./TopVotes";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(0);

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 6));
  };

  const handleVote = () => {
    anecdotes[selected].votes = anecdotes[selected].votes + 1;
    setVote(anecdotes[selected].votes + 1);
  };

  return (
    <div>
      <h1> Anecdote of the day</h1>
      <p>
        {anecdotes[selected].anecdote} with{" "}
        <strong> {anecdotes[selected].votes} votes</strong>
      </p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <TopVotes anecdotes={anecdotes} votes={vote} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
