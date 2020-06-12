import React from "react";

export const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      <h1>Numbers</h1>
      {persons.map((person, i) => (
        <div key={i}>
          <li>
            {person.name} &nbsp;
            <span>{person.number}</span>
            <span>
              <button onClick={() => handleDelete(person._id)}>delete</button>
            </span>
          </li>
        </div>
      ))}
    </div>
  );
};
