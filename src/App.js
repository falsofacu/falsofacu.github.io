import React, { useState } from "react";
import Header from "./parts/header/Header";
import "./App.css";
import { Background } from "./appParts";

export const clickedContext = React.createContext();
export const colorContext = React.createContext();
export const metronomeSpeedContext = React.createContext();

function App() {
  //Set global App state
  const [clicked, setClicked] = useState(0);
  const [bgTxtColor, setBgTxtColor] = useState("var(--color2)");
  //TODO: Change the css anim duration automatically maybe change the anim to KUTE.js
  const [mtmSpeed, setMtmSpeed] = useState((60 / 90) * 1000); //Value in Beats per milisecond, change second value to change BPM

  return (
    <clickedContext.Provider value={[clicked, setClicked]}>
      <colorContext.Provider value={[bgTxtColor, setBgTxtColor]}>
        <metronomeSpeedContext.Provider value={[mtmSpeed, setMtmSpeed]}>
          <Background />
          <Header />
        </metronomeSpeedContext.Provider>
      </colorContext.Provider>
    </clickedContext.Provider>
  );
}

export default App;
