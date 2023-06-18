import React, { useEffect, useState } from "react";
import LoadingScreen from './parts/LoadingScreen';
import Background from "./parts/Background";
import Projects from "./parts/Projects/Projects";
import Contact from "./parts/Contact/Contact";
import './App.css';
import Presentation from "./parts/Start/Presentation";
import NavBar from "./parts/NavBar/NavBar";

export const clickedContext = React.createContext();
export const loadingContext = React.createContext();

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(0);

  return (
    <clickedContext.Provider value={[clicked, setClicked]}>
      {isLoading ? <LoadingScreen /> : null}
      <loadingContext.Provider value={[isLoading, setIsLoading]}>
        <Background />
      </loadingContext.Provider>
      {clicked !== 0 && <NavBar />}
      <Presentation />
      {clicked !== 0 ? 
        <>
          <Projects />
          <Contact />
        </>
      : null}
    </clickedContext.Provider>
  )
}

export default App;