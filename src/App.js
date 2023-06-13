import React, { useEffect, useLayoutEffect, useState } from "react";
import Loading from './parts/Loading';
import Background from "./parts/Background";
import Projects from "./parts/Projects/Projects";
import Contact from "./parts/Contact/Contact";
import './App.css';
import Presentation from "./parts/Start/Presentation";
import NavBar from "./parts/NavBar/NavBar";

export const clickedContext = React.createContext();

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    setTimeout(() =>{
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <clickedContext.Provider value={[clicked, setClicked]}>
      {isLoading ? <Loading /> : (
      <>
        {clicked !== 0 && <NavBar />}
        <Background />
        <Presentation />
        {clicked !== 0 ? 
          <>
            <Projects />
            <Contact />
          </>
        : null}
      </>)}
    </clickedContext.Provider>
  );
}

export default App;