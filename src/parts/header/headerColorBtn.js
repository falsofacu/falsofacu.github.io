import { blob1, blob2, startBlob } from "../../graphics/allBlobs";
import { Context } from "../../App";
import doubleKick from "../../sounds/doubleKick.mp3";
import swoosh from "../../sounds/swoosh.mp3";
import {
  initializeBtnAnimations,
  initializeBlobAnimations,
  initializeStartAnimations,
} from "./btnAnimations";
import React, {
  useEffect,
  useContext,
  useCallback,
  useRef,
  useState,
} from "react";

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
  /// "Stop" state
  let blobStartTween = useRef();
  let blobStartZoom = useRef();
  /// Other declarations
  let btnIntervalCode = useRef();
  const colorBtnText = ["color.", "stop.", "next."];

  // Component Context

  const [clicked, setClicked] = useContext(Context);

  // Component Methods

  const handleClick = useCallback(() => {
    if (clicked < 2) {
      setClicked(clicked + 1);
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
      }, 2900);
      swooshAudio.play();
    }
  }, [clicked]);

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

  // Component initialization

  useEffect(() => {
    [
      blob1Zoom.current,
      blob1Tween.current,
      blob2Tween.current,
      blob2Zoom.current,
    ] = initializeBlobAnimations();
    btnPulse.current = initializeBtnAnimations();
    [blobStartTween.current, blobStartZoom.current] =
      initializeStartAnimations();

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
    </>
  );
};

export default ColorBtn;
