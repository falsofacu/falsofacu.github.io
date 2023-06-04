import { blob1, blob2, startBlob } from "../../graphics/allBlobs";
import { clickedContext, colorContext } from "../../App";
import doubleKick from "../../sounds/doubleKick.mp3";
import swoosh from "../../sounds/swoosh.mp3";
import {
  initializePulseAnimation,
  initializeTweenAnimation,
  initializeZoomAnimation
} from '../animations'
import React, {
  useEffect,
  useContext,
  useCallback,
  useRef,
  useState,
} from "react";
import Metronome from "./metronomeSound";

//Create audio
const kickAudio = new Audio(doubleKick);
const swooshAudio = new Audio(swoosh);

//Color button

const ColorBtn = () => {
  // Component declarations

  /// "Color" state
  let btnPulse = useRef();
  let blob1Zoom = useRef();
  let blob1Tween = useRef();
  let blob2Tween = useRef();
  let blob2Zoom = useRef();
  let [startBlobLife, setStartBlobLife] = useState(true);
  const blobLifeTime = 2500; //Less than ((60 / bpm) * 1000) * 4 (2667)
  /// "Stop" state
  let blobStartTween = useRef();
  let blobStartZoom = useRef();
  /// Other declarations
  let btnIntervalCode = useRef();
  const colorBtnText = ["color.", "stop.", "next."];

  // Component Context

  const [clicked, setClicked] = useContext(clickedContext);
  const [bgTxtColor, setTxtColor] = useContext(colorContext);

  // Component Methods

  //* In this function "clicked" context isn't updated yet
  const handleClick = useCallback(() => {
      setClicked(clicked + 1);
    if (clicked < 2) {
      clearInterval(btnIntervalCode.current);
    }
    if (clicked === 0) {
      //When button is clicked first time
      blobStartTween.current.start();
      blobStartZoom.current.start();
      //Delete blob and change bg to color
      setTimeout(() => {
        setStartBlobLife(false);
        document.getElementById("body").style.backgroundColor = "var(--color1)"
      }, blobLifeTime);
      swooshAudio.play();
    }
  });

  const playIdleAnimations = useCallback(() => {
    if (!document.hidden) {
      btnPulse.current.start();
      blob1Tween.current.start();
      blob1Zoom.current.start();
      navigator.userActivation.hasBeenActive && kickAudio.play(); //!This doesn't work on Firefox
      setTimeout(() => {
        blob2Zoom.current.start();
        blob2Tween.current.start();
      }, 300);
    }
  }, []);

  const changeColors = () => {
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
  };

  // Component initialization

  useEffect(() => {
    blob1Zoom.current = initializeZoomAnimation("blob1");
    blob2Zoom.current = initializeZoomAnimation("blob2");
    blob1Tween.current = initializeTweenAnimation("blob1-1", "blob1-2");
    blob2Tween.current = initializeTweenAnimation("blob2-1", "blob2-2");
    btnPulse.current = initializePulseAnimation("btn-wrap");
    blobStartZoom.current = initializeZoomAnimation("start-blob", 1200, 0.001)
    blobStartTween.current = initializeTweenAnimation("start-blob-1", "start-blob-2", 1000, 10)

    //First time play after 1s
    setTimeout(() => {
      playIdleAnimations();
      //Then play every 3s
      btnIntervalCode.current = setInterval(() => {
        if (!document.hidden) {
          playIdleAnimations();
        }
      }, 3000);
    }, 1000);
  }, []);

  useEffect(() => {
    if(clicked > 2){ //When button says "next."
      changeColors();
      console.log(clicked);
    }
  }, [clicked])

  //Component Render

  return (
    <>
      <div id="btn-wrap">
        <button
          id="color-btn"
          className="reset-button press-animation"
          onClick={handleClick}
        >
          {clicked > 2 ? colorBtnText[2] : colorBtnText[clicked] } 
        </button>
        {/* Loading anim */}
          {clicked === 1 ? <button id="loading-anim" className="reset-button press-animation">stop.</button> : null}
      </div>
      <div id="blob1-wrap" className="blob-wrap">
        {blob1}
      </div>
      <div id="blob2-wrap" className="blob-wrap">
        {blob2}
      </div>
      {startBlobLife && (
        <div id="start-blob-wrap" className="blob-wrap">
          {startBlob}
        </div>
      )}
      <Metronome />
    </>
  );
};

export default ColorBtn;
