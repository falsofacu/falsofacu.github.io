import React, { useContext, useEffect, useRef } from "react";
import { clickedContext, metronomeSpeedContext } from "../../App";
//import sounds
import metronome1 from "../../sounds/metronome1.mp3";
import metronome2 from "../../sounds/metronome2.mp3";

const mtm1 = new Audio(metronome1);
const mtm2 = new Audio(metronome2);

const Metronome = () => {
  let [clicked, setClicked] = useContext(clickedContext);
  let [mtmSpeed, setMtmSpeed] = useContext(metronomeSpeedContext);

  let timesPlayed = useRef(0);
  let intervalCode = useRef(0);

  const playSound = () => {
    mtm2.play();
    timesPlayed.current++;
    intervalCode.current = setInterval(() => {
      if (!document.hidden) {
        if (timesPlayed.current % 4 === 0) {
          mtm2.play();
          timesPlayed.current++;
        } else {
          mtm1.play();
          timesPlayed.current++;
        }
      }
    }, mtmSpeed);
  };

  useEffect(() => {
    if (clicked === 1) {
      playSound();
    } else if (clicked > 1) {
      clearInterval(intervalCode.current);
    }
  }, [clicked]);

  return null;
};

export default Metronome;
