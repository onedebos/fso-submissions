import React, { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { ShowCountries } from "./components/ShowCountries";
import Service from "./services/countries";

export const App = () => {
  const [word, setWord] = useState("");
  const [countries, setCountries] = useState([]);
  const [filterDisplay, setFilterDisplay] = useState();

  useEffect(() => {
    Service.getAll()
      .then(response => {
        setCountries(response.data);
      })
      .catch(console.log("there was an error"));
  }, []);

  const handleChange = e => {
    setWord(e);

    let oldList = countries.map(country => {
      return {
        name: country.name,
        capital: country.capital,
        population: country.population,
        languages: country.languages,
        flag: country.flag
      };
    });
    if (word !== "") {
      let newList = [];
      newList = oldList.filter(country =>
        country.name.toLowerCase().includes(word.toLowerCase())
      );

      setFilterDisplay(newList);
    } else {
      setFilterDisplay(countries);
    }
  };

  return (
    <div>
      <Filter value={word} handleChange={e => handleChange(e.target.value)} />
      <ShowCountries
        countries={word.length > 1 ? filterDisplay : countries}
        words={word}
      />
    </div>
  );
};

export default App;
