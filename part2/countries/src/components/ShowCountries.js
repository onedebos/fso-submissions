import React, { useState } from "react";

export const ShowCountries = ({ countries, words }) => {
  const [clicked, setClicked] = useState(false);
  const [countryArr, setCountryArr] = useState([]);

  let displayCountries;

  const handleClick = country => {
    setClicked(true);
    const countryA = [];
    countryA.push(country);
    setCountryArr(countryA);
    console.log(countryA, countryArr);
  };

  const toggleClick = () => {
    setClicked(false);
  };
  const displayAllCountries = countries.map((country, i) => (
    <div key={i}>
      <li name={country.name}>
        {country.name} &nbsp;
        <button onClick={() => handleClick(country)}>show</button>
      </li>
    </div>
  ));

  const showOneCountry = c =>
    c.map((country, i) => (
      <div key={i}>
        <h1>
          {country.name}{" "}
          <button onClick={() => toggleClick()}>Back to countries</button>
        </h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>

        <ul>
          <h1>Languages</h1>
          {country.languages.map((language, i) => (
            <li key={i}>{language.name}</li>
          ))}
        </ul>
        <img
          alt="flag"
          src={country.flag}
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    ));

  const runCountries = () => {
    if (countries.length === 1) {
      displayCountries = showOneCountry(countries);
    } else if (clicked) {
      displayCountries = showOneCountry(countryArr);
    } else {
      displayCountries = displayAllCountries;
    }
  };

  runCountries();

  const tooManyMatches = <div>Too many matches, specify another filter</div>;
  return (
    <div>
      <h1>countries</h1>
      {words.length > 1 && countries.length > 10
        ? tooManyMatches
        : displayCountries}
    </div>
  );
};
