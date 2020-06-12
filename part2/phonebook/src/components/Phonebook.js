import React from "react";

const Phonebook = ({
  name,
  number,
  onSubmit,
  onChangeName,
  onChangeNumber
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Add names</h1>
        name:{" "}
        <input type="text" value={name} name="name" onChange={onChangeName} />
        <div>
          number:{" "}
          <input
            type="text"
            value={number}
            name="number"
            onChange={onChangeNumber}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Phonebook;
