import React from "react";

export default function Total({ parts }) {
  const exercises = parts.map(part => part.exercises);
  const total = exercises.reduce((acc, cur) => acc + cur);
  return (
    <div>
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </div>
  );
}
