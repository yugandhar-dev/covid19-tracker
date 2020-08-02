import React, { createContext, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import GetData from "./components/GetData";

export const CountryContext = createContext();

function App() {
  const [country, dispatch] = useState("");

  return (
    <CountryContext.Provider value={{ country: country, setCountry: dispatch }}>
      <div className="App">
        <Header />
        <Form />
        {country !== "" ? <GetData /> : null}
      </div>
    </CountryContext.Provider>
  );
}

export default App;
