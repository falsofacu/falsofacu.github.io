import React, { useState } from "react";
import Header from "./parts/header/Header";
import "./App.css";

export const Context = React.createContext();

function App() {
  //Set global App state

  const [clicked, setClicked] = useState(0);

  return (
    <Context.Provider value={[clicked, setClicked]}>
      <Header />
    </Context.Provider>
  );
}

export default App;
