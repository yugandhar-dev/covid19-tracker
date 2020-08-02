import React, { useState, useEffect } from "react";
import List from "./List";

export default function Form() {
  const [country, setCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const response = await fetch("https://api.covid19api.com/countries");
    const data = await response.json();
    setCountries(data);
  };

  const filterCountries = async (e) => {
    const userInput = e.target.value;
    if (userInput === "") {
      setSuggestions([]);
      setCountry("");
    } else {
      setCountry(userInput);
      const filtered = await countries.filter((row) =>
        row.Country.toUpperCase().startsWith(userInput.toUpperCase())
      );
      setSuggestions(filtered);
    }
  };

  const resetState = (selected) => {
    setSuggestions([]);
    setCountry(selected);
  };

  return (
    <form className="form">
      <input
        type="text"
        className="input-form"
        placeholder="Enter Country Name..."
        value={country}
        onChange={filterCountries}
      />
      <ul className="country-list">
        {suggestions.map((suggesstion) => (
          <List
            key={suggesstion.ISO2}
            suggestion={suggesstion}
            resetState={resetState}
          />
        ))}
      </ul>
    </form>
  );
}
