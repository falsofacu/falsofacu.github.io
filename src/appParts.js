import { Context } from "./App";
import React, { useState, useEffect, useContext, useRef } from "react";
import { initializeBgTextAnimation } from "./appAnimations";

//TODO: Activate text animations when clicked
//TODO: Animate the background text
//TODO: Background text not selectable
//TODO: Fine tune the animation time

const Background = () => {
  let bgTxtAnim1 = useRef();
  let bgTxtAnim2 = useRef();
  const bgTextSpeed = 3000;

  let colorChangedTimes = useRef(0);
  const autoColorStop = useRef(3);
  let changeColorTime = 5000;
  let colorTimeoutCode = useRef(0);

  let [bgTxtColor, setTxtColor] = useState("var(--color2)");

  const [clicked, setClicked] = useContext(Context);

  const changeColors = () => {
    //TODO: Is it bad to modify body like this?
    //TODO: Change this to a setInterval
    colorTimeoutCode.current = setTimeout(() => {
      if (bgTxtColor === "var(--color2)") {
        document.getElementById("body").style.backgroundColor = "var(--color3)";
        setTxtColor("var(--color4)");
      } else if (bgTxtColor === "var(--color4)") {
        document.getElementById("body").style.backgroundColor = "var(--color5)";
        setTxtColor("var(--color6)");
      } else {
        document.getElementById("body").style.backgroundColor = "var(--color1)";
        setTxtColor("var(--color2)");
      }
      colorChangedTimes.current++;
    }, changeColorTime);
  };

  const initializeAnimations = () => {
    bgTxtAnim1.current = initializeBgTextAnimation('good1', bgTextSpeed);
    bgTxtAnim2.current = initializeBgTextAnimation("good2", bgTextSpeed);
  };

  const startAnimations = () => {
    bgTxtAnim1.current.start();
    bgTxtAnim2.current.start();
  };

  //First useEfect
  useEffect(() => {}, []);

  //Play start animations
  useEffect(() => {
    if (clicked === 1) {
      initializeAnimations();
      startAnimations();
      changeColors();
    } else if (
      clicked === 2 ||
      colorChangedTimes.current === autoColorStop.current
    ) {
      clearTimeout(colorTimeoutCode.current); //Stop color change
    }
  }, [clicked]);

  useEffect(() => {
    clicked === 1 && changeColors();
  }, [bgTxtColor]);

  return (
    <div id="bg-text-container">
      {clicked === 1 ? ( //* Change this for testing
        <>
          <span id="good1" className="bg-text" style={{ color: bgTxtColor }}>
            ●GOOD
          </span>
          <span id="good2" className="bg-text" style={{ color: bgTxtColor }}>
            ●GOOD
          </span>
        </>
      ) : null}

      {/* <span id="vibes1" className="bg-text" style={{color: bgTxtColor}}>
        VIBES
      </span>
      <span id="vibes2" className="bg-text" style={{color: bgTxtColor}}>
        VIBES
      </span> */}
    </div>
  );
};

export { Background };
