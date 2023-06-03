import { colorContext, clickedContext } from "./App";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  initializeStartScroll,
  initializeStartScrollBackwards,
  initializeTextScroll,
  initializeTextScrollBackwards,
} from "./appAnimations";

//TODO: Fine tune the animation time

//Primera vez que apreto click tengo que mover
// horizontalmente Good container para que entre en pantalla

const Background = () => {
  //Animation options
  const revealDuration = 1000;
  const revealDelay = 1500;
  const bgTextSpeed = 7500;
  const changeColorTime = 5000; //Can't be less because start blob doesn't get destroyed, to change, make blob faster or destroy earlier
  const autoColorStop = useRef(3); //Stop automatic color change after num

  let timesColorChanged = useRef(0);
  let goodRevealAnim = useRef();
  let vibesRevealAnim = useRef();
  let good1ScrollAnim = useRef();
  let good2ScrollAnim = useRef();
  let vibes1ScrollAnim = useRef();
  let vibes2ScrollAnim = useRef();

  let colorTimeoutCode = useRef(0);

  let [showBgText, setShowBgText] = useState(false);

  const [clicked, setClicked] = useContext(clickedContext);
  let [bgTxtColor, setBgTxtColor] = useContext(colorContext);

  const changeColors = () => {
    //TODO: Make this a function in another file so I can reuse in color btn
    //TODO: Is it bad to modify body like this?
    //TODO: Change this to a setInterval
    colorTimeoutCode.current = setTimeout(() => {
      if (bgTxtColor === "var(--color2)") {
        document.getElementById("body").style.backgroundColor = "var(--color3)";
        setBgTxtColor("var(--color4)");
      } else if (bgTxtColor === "var(--color4)") {
        document.getElementById("body").style.backgroundColor = "var(--color5)";
        setBgTxtColor("var(--color6)");
      } else {
        document.getElementById("body").style.backgroundColor = "var(--color1)";
        setBgTxtColor("var(--color2)");
      }
      timesColorChanged.current = timesColorChanged.current + 1;
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
      changeColors();
    } else if (
      clicked === 2 ||
      timesColorChanged.current === autoColorStop.current
    ) {
      clearTimeout(colorTimeoutCode.current); //Stop color change
    }
  }, [clicked]);

  useEffect(() => {
    clicked === 1 && changeColors();
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
