import React from "react";
import Total from "./Total";

export default function Course({ course }) {
  return (
    <div>
      <h1>{course.name}</h1>

      {course.parts.map(course => (
        <p id={course.id}>
          {course.name} {course.exercises}
        </p>
      ))}
      <Total parts={course.parts} />
    </div>
  );
}
