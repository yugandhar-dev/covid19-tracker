import React, { useContext, useEffect, useState } from "react";

import { CountryContext } from "../App";

export default function GetData() {
  const { country } = useContext(CountryContext);
  const [backgroundurl, setBackgroundurl] = useState(
    `url(${require(`../flags/white.png`)})`
  );
  const [statistics, setStatistics] = useState({
    Country: "",
    TotalConfirmed: "",
    TotalDeaths: "",
    TotalRecovered: "",
  });

  useEffect(() => {
    getStatistics();
  }, [country]);

  const getStatistics = async () => {
    const response = await fetch("https://api.covid19api.com/summary");
    const data = await response.json();
    const selected = await data.Countries.filter(
      (row) => row.Country === country
    );
    console.log(selected);
    setStatistics({
      Country: selected[0].Country,
      TotalConfirmed: selected[0].TotalConfirmed,
      TotalDeaths: selected[0].TotalDeaths,
      TotalRecovered: selected[0].TotalRecovered,
      CountryCode: selected[0].CountryCode.toLowerCase(),
    });
    setBackgroundurl(
      `url(${require(`../flags/${selected[0].CountryCode.toLowerCase()}.png`)})`
    );
  };

  return (
    <div
      className="data-box"
      style={{
        backgroundImage: `${backgroundurl}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {console.log(statistics.CountryCode)}
      <h1 className="row-country">{statistics.Country}</h1>
      <p className="row-country">{`Total Confirmed Cases: ${statistics.TotalConfirmed}`}</p>
      <p className="row-country">{`Total Deaths: ${statistics.TotalDeaths}`}</p>
      <p className="row-country">{`Total Recovered Cases: ${statistics.TotalRecovered}`}</p>
    </div>
  );
}
