import React from "react";
import { useState, useEffect } from "react";
import KUTE from "kute.js";
import "./Header.css";
import doubleKick from "../../sounds/doubleKick.mp3";
import { blob1 } from "../../graphics/allBlobs";
import { blob2 } from "../../graphics/allBlobs";

const ColorBtn = () => {
  // Component declarations
  /// "Color" state
  let blob1Tween;
  let blob1Zoom;
  let blob2Tween;
  let blob2Zoom;
  let btnPulse;
  /// "Stop" state
  let blobStartTween;
  let blobStartZoom;
  /// "Next" state
  let blob;

  /// Sounds
  const kickAudio = new Audio(doubleKick);

  /// Other declarations
  let btnIntervalCode;

  // Component state
  const [btnText, setBtnText] = useState("color.");
  const [clicked, setClicked] = useState(0);

  const colorBtnText = ["color.", "stop.", "next."];

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
      console.log(blob1Zoom.start());
      if (blob1Zoom.playing)
        document.getElementById("blob1-1").style.display = "block";
      navigator.userActivation.hasBeenActive && kickAudio.play();
      setTimeout(() => {
        blob2Zoom.start();
        blob2Tween.start();
        if (blob2Zoom.playing)
          document.getElementById("blob2-1").style.display = "block";
      }, 300);
    }
  };

  // Component initialization
  useEffect(() => {
    blob1Zoom = KUTE.fromTo(
      "#blob1",
      { transform: { scale: 0.01 } },
      { transform: { scale: 10 } },
      { duration: 1200, easing: KUTE.Easing.easingCircularIn }
    );
    blob1Tween = KUTE.fromTo(
      "#blob1-1",
      { path: "#blob1-1" },
      { path: "#blob1-2" },
      { repeat: 2, duration: 500, yoyo: true }
    );
    blob2Zoom = KUTE.fromTo(
      "#blob2",
      { transform: { scale: 0.01 } },
      { transform: { scale: 10 } },
      { duration: 1200, easing: KUTE.Easing.easingCircularIn }
    );
    blob2Tween = KUTE.fromTo(
      "#blob2-1",
      { path: "#blob2-1" },
      { path: "#blob2-2" },
      { repeat: 2, duration: 500, yoyo: true }
    );

    btnPulse = KUTE.fromTo(
      "#btn-wrap",
      { transform: { scale: 1 } },
      { transform: { scale: 1.2 } },
      {
        repeat: 3,
        duration: 150,
        yoyo: true,
        easing: KUTE.Easing.easingCircularIn,
      }
    );

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

export default ColorBtn;
