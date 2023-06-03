import React, { useState } from "react";
import Header from "./parts/header/Header";
import "./App.css";
import { Background } from "./appParts";

export const clickedContext = React.createContext();
export const colorContext = React.createContext();

function App() {
  //Set global App state
  const [clicked, setClicked] = useState(0);
  const [bgTxtColor, setBgTxtColor] = useState("var(--color2)");

  return (
    <clickedContext.Provider value={[clicked, setClicked]}>
      <colorContext.Provider value={[bgTxtColor, setBgTxtColor]}>
        <Background />
        <Header />
      </colorContext.Provider>
    </clickedContext.Provider>
  );
}

export default App;
