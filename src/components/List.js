import React, { useContext } from "react";
import { CountryContext } from "../App";

export default function List({ suggestion, resetState }) {
  const { setCountry } = useContext(CountryContext);

  const getStatistics = (e) => {
    resetState(e.Country);
    setCountry(e.Country);
  };
  return (
    <li className="country-name" onClick={() => getStatistics(suggestion)}>
      {suggestion.Country}
    </li>
  );
}
