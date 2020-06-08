import React from "react";
import _ from "lodash";

function TopVotes({ anecdotes, votes }) {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {_.max(anecdotes, "votes").anecdote}{" "}
      <strong>has {_.max(anecdotes, "votes").votes} votes</strong>
    </div>
  );
}

export default TopVotes;
