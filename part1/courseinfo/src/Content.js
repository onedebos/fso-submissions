import React from "react";

export default function Content({ parts }) {
  return (
    <div>
      {parts.map(part => (
        <p>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
}
