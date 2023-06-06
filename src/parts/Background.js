import { colorContext, clickedContext, metronomeSpeedContext } from "../App";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  initializeStartScroll,
  initializeStartScrollBackwards,
  initializeTextScroll,
  initializeTextScrollBackwards,
} from "./animations";
import changeColors from "./changeColors";

const Background = () => {

  const [clicked, setClicked] = useContext(clickedContext);
  let [bgTxtColor, setTxtColor] = useContext(colorContext);
  const [mtmSpeed] = useContext(metronomeSpeedContext);

  //Animation options
  const revealDuration = 1000;
  const revealDelay = 1500;
  const bgTextSpeed = 40000;
  const changeColorTime = (mtmSpeed * 4);
  const autoColorStop = useRef(3);
  let timesColorChanged = useRef(0);
  let goodRevealAnim = useRef();
  let vibesRevealAnim = useRef();
  let good1ScrollAnim = useRef();
  let good2ScrollAnim = useRef();
  let vibes1ScrollAnim = useRef();
  let vibes2ScrollAnim = useRef();

  let colorTimeoutCode = useRef(0);

  let [showBgText, setShowBgText] = useState(false);
  
  const changeColorsAtTime = () => {
    colorTimeoutCode.current = setTimeout(() => {
      changeColors(bgTxtColor, setTxtColor, clicked);
      timesColorChanged.current++;
    }, changeColorTime);
  };

  const initializeAnimations = () => {
    goodRevealAnim.current = initializeStartScroll(
      "good-container",
      revealDuration,
      revealDelay
    );
    vibesRevealAnim.current = initializeStartScrollBackwards(
      "vibes-container",
      revealDuration,
      revealDelay
    );
    good1ScrollAnim.current = initializeTextScroll("good1", bgTextSpeed);
    good2ScrollAnim.current = initializeTextScroll("good2", bgTextSpeed);
    vibes1ScrollAnim.current = initializeTextScrollBackwards(
      "vibes1",
      bgTextSpeed
    );
    vibes2ScrollAnim.current = initializeTextScrollBackwards(
      "vibes2",
      bgTextSpeed
    );
  };

  const startAnimations = () => {
    goodRevealAnim.current.start();
    vibesRevealAnim.current.start();
    good1ScrollAnim.current.start();
    good2ScrollAnim.current.start();
    vibes1ScrollAnim.current.start();
    vibes2ScrollAnim.current.start();
  };

  //Play start animations
  useEffect(() => {
    if (clicked === 1) {
      setShowBgText(true);
      initializeAnimations();
      startAnimations();
      changeColorsAtTime();
    } 
    else if (clicked === 2) {
      clearTimeout(colorTimeoutCode.current);
    }
  }, [clicked]);

  useEffect(() => {
    if(clicked === 1) {
      clicked === 1 && changeColorsAtTime();
      if (timesColorChanged.current >= autoColorStop.current ) {
        clearTimeout(colorTimeoutCode.current);
        setClicked(clicked + 1)
        console.log(clicked);
      }
    }
  }, [bgTxtColor]);

  return (
    <>
      <div id="good-container">
        <span
          id="good1"
          className="bg-text non-selectable"
          style={{
            color: bgTxtColor,
            visibility: showBgText ? "visible" : "hidden",
          }}
        >
          ●GOOD
        </span>
        <span
          id="good2"
          className="bg-text non-selectable"
          style={{
            color: bgTxtColor,
            visibility: showBgText ? "visible" : "hidden",
          }}
        >
          ●GOOD
        </span>
      </div>

      <div id="vibes-container">
        <span
          id="vibes1"
          className="bg-text non-selectable"
          style={{
            color: bgTxtColor,
            visibility: showBgText ? "visible" : "hidden",
          }}
        >
          ●VIBES
        </span>
        <span
          id="vibes2"
          className="bg-text non-selectable"
          style={{
            color: bgTxtColor,
            visibility: showBgText ? "visible" : "hidden",
          }}
        >
          ●VIBES
        </span>
      </div>
    </>
  );
};

export { Background };
