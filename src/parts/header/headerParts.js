import { blob1, blob2 } from "../../graphics/allBlobs";
import doubleKick from "../../sounds/doubleKick.mp3";
import "./Header.css";
import {
  initializeBtnAnimations,
  initializeBlobAnimations,
} from "./btnAnimations";
import React, { useState, useEffect } from "react";

//Color button

const ColorBtn = () => {
  // Component declarations

  /// "Color" state
  let btnPulse, blob1Zoom, blob1Tween, blob2Tween, blob2Zoom;
  /// "Stop" state
  let blobStartTween, blobStartZoom;
  /// "Next" state
  let blob;
  /// Other declarations
  let btnIntervalCode;
  const colorBtnText = ["color.", "stop.", "next."];
  const kickAudio = new Audio(doubleKick);

  // Component State

  const [clicked, setClicked] = useState(0);

  // Component Methods

  const handleClick = () => {
    if (clicked < 2) {
      setClicked(clicked + 1);
      clearInterval(btnIntervalCode);
      // TODO: Play state 2 animations
    }
  };

  const playIdleAnimations = () => {
    if (!document.hidden) {
      btnPulse.start();
      blob1Tween.start();
      blob1Zoom.start();
      navigator.userActivation.hasBeenActive && kickAudio.play();
      setTimeout(() => {
        blob2Zoom.start();
        blob2Tween.start();
      }, 300);
    }
  };

  // Component initialization

  useEffect(() => {
    [blob1Zoom, blob1Tween, blob2Tween, blob2Zoom] = initializeBlobAnimations();
    btnPulse = initializeBtnAnimations();

    setTimeout(() => {
      if (!document.hidden) {
        playIdleAnimations();
      }
    }, 500);

    btnIntervalCode = setInterval(() => {
      if (!document.hidden) {
        playIdleAnimations();
      }
    }, 3000);

    return () => {
      clearInterval(btnIntervalCode);
    };
  }, []);

  //Component Render

  return (
    <>
      <div id="btn-wrap">
        <button
          id="color-btn"
          className="reset-button press-animation"
          onClick={handleClick}
        >
          {colorBtnText[clicked]}
        </button>
      </div>
      <div id="blob1-wrap">{blob1}</div>
      <div id="blob2-wrap">{blob2}</div>
    </>
  );
};

//Name Facundo Tabárez

const Name = () => {
  return (
    <>
      {/* <p className="cooltext hidden">I'm</p> */}
      <div id="name-wrap">
        <h1 id="first-name">FACUNDO</h1>
        <h1 id="last-name">TABÁREZ</h1>
      </div>
      {/* <p className="cooltext hidden">and I make stuff.</p> */}
    </>
  );
};

export { ColorBtn, Name };
