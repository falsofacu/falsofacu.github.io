import React, { useEffect, useContext, useRef, useState } from "react";
import { clickedContext } from "../../App";
//Audio
//Animations
import { initializeHeightAnim, initializePulseAnim } from "../animations";

const PresentationButton = () => {
  let [clicked, setClicked] = useContext(clickedContext);

  // let [timesPulsePlayed, setTimesPulsePlayed] = useState(0);
  let [pulseTimeoutCode, setPulseTimeoutCode] = useState(0);
  let [pulseIntervalCode, setPulseIntervalCode] = useState(0);
  let [buttonText, setButtonText] = useState("color.");

  // Animations
  let reduceHeightAnim = useRef();
  let pulseAnim = useRef();
  // Animation options
  const slideAllUpDuration = useRef(500);
  const slideAllUpDelay = useRef(1000);

  const handleClick = () => {
    setClicked(clicked + 1);
  };

  const initializeAnimations = () => {
      const element = document.getElementById("btn-wrap");
      reduceHeightAnim.current = initializeHeightAnim(element.id, (0.5 * element.clientHeight), slideAllUpDuration.current, slideAllUpDelay.current);
      pulseAnim.current = initializePulseAnim(element.id);
  }

  const setPulseInterval = () => {
    const timeoutCode = setTimeout(() => {
      !document.hidden && pulseAnim.current.start();
      const intervalCode = setInterval(() => {
        !document.hidden && pulseAnim.current.start();
      }, 3000);
      setPulseIntervalCode(intervalCode);
    }, 1000);
    setPulseTimeoutCode(timeoutCode);
  }

  useEffect(() => {
    switch (clicked) {
      case 0:
        initializeAnimations();
        setPulseInterval();
        break;
      case 1:
        initializeAnimations();
        clearTimeout(pulseTimeoutCode);
        clearInterval(pulseIntervalCode);
        reduceHeightAnim.current.start();
        setButtonText("stop.");
        break;
      default:
        setButtonText("next.");
        break;
    }
  }, [clicked]);

  return (
    <div id="btn-wrap">
      <button
        id="presentation-btn"
        className="reset-btn press-animation"
        onClick={handleClick}
      >
        {buttonText}
      </button>
      {clicked === 1 && (
        <button id="loading-anim" className="reset-btn press-animation">
          stop.
        </button>
      )}
    </div>
  );
};

export default PresentationButton;
