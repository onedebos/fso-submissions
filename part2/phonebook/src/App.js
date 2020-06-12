import React, { useState, useEffect } from "react";
import Phonebook from "./components/Phonebook";
import { Filter } from "./components/Filter";
import { Numbers } from "./components/Numbers";
import Service from "./services/person";

export const App = () => {
  const [name, setName] = useState("");
  const [word, setWord] = useState("");
  const [number, setNumber] = useState("");
  const [persons, setPerson] = useState([]);
  const [filterDisplay, setFilterDisplay] = useState([]);

  useEffect(() => {
    Service.getAll()
      .then(response => {
        setPerson(response.data);
        console.log(response.data);
      })
      .catch(console.log("there was an error"));
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    const person = persons.filter(person => person.name === name);
    if (person.length > 0) {
      const updatedPerson = { name: name, number: number };
      const response = window.confirm(
        `${name} already exists, Do you want to update the number?`
      );
      if (response) {
        Service.update(updatedPerson, person[0]._id).then(() => {
          const oldPersons = [...persons];
          const newPersonState = oldPersons.map(person => {
            if (person.name === updatedPerson.name) {
              person.number = updatedPerson.number;
            }
            return person;
          });
          setPerson(newPersonState);
        });
      }
    } else {
      const personObject = {
        name,
        number
      };
      Service.create(personObject).then(response => {
        setPerson(persons.concat(response.data));
      });
    }

    setName("");
    setNumber("");
  };

  const handleChange = e => {
    setWord(e);
    let oldList = persons.map(person => {
      return { name: person.name, number: person.number };
    });

    if (word !== "") {
      let newList = [];

      newList = oldList.filter(person =>
        person.name.toLowerCase().includes(word.toLowerCase())
      );

      setFilterDisplay(newList);
    } else {
      setFilterDisplay(persons);
    }
  };

  const handleDelete = id => {
    console.log(id);
    const person = persons.find(person => person._id === id);
    const result = window.confirm(`Do you want to delete ${person.name}?`);
    if (result) {
      Service.deleted(id);
      const newList = persons.filter(person => person._id !== id);
      setPerson(newList);
    }
  };

  return (
    <div>
      <Filter value={word} handleChange={e => handleChange(e.target.value)} />
      <Phonebook
        name={name}
        number={number}
        onChangeName={e => setName(e.target.value)}
        onChangeNumber={e => setNumber(e.target.value)}
        onSubmit={handleSubmit}
      />
      <Numbers
        persons={word.length < 1 ? persons : filterDisplay}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
