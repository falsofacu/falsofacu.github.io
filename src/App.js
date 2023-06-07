import React, { useLayoutEffect, useState } from "react";
import Loading from "./parts/Loading";
import NavBar from "./parts/navBar/NavBar";
import Header from "./parts/header/Header";
import Projects from "./parts/projects/Projects";
import Contact from "./parts/contact/Contact";
import "./App.css";
import "./parts/customScrollBar.css";
import { Background } from "./parts/Background";

export const clickedContext = React.createContext();
export const colorContext = React.createContext();
export const metronomeSpeedContext = React.createContext();

function App() {
  //Set global App state
  const [isRendering, setIsRendering] = useState(true);
  const [clicked, setClicked] = useState(0);
  const [bgTxtColor, setBgTxtColor] = useState("var(--color2)");
  //TODO: Change the css anim duration automatically maybe change the anim to KUTE.js
  const [mtmSpeed, setMtmSpeed] = useState((60 / 90) * 1000); //Value in Beats per milisecond, change second value to change BPM

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsRendering(false);
    }, 2500);
  }, []);

  return (
    <>
      {isRendering ? (
        <Loading />
      ) : (
        <clickedContext.Provider value={[clicked, setClicked]}>
          {clicked > 0 ? <NavBar /> : null}
          <colorContext.Provider value={[bgTxtColor, setBgTxtColor]}>
            <metronomeSpeedContext.Provider value={[mtmSpeed, setMtmSpeed]}>
              <Background />
              <Header />
            </metronomeSpeedContext.Provider>
            {clicked > 0 ? (
              <>
                <Projects />
                <Contact />
              </>
            ) : null}
          </colorContext.Provider>
        </clickedContext.Provider>
      )}
    </>
  );
}

export default App;
