import {
  createBlobType1,
  createBlobType2,
  createBlobTypeS1,
  createBlobTypeS2,
  createBlobTypeS3,
} from "../../graphics/allBlobs";
import { clickedContext, colorContext } from "../../App";
import doubleKick from "../../sounds/doubleKick.mp3";
import swoosh from "../../sounds/swoosh.mp3";
import {
  initializePulseAnimation,
  initializeTweenAnimation,
  initializeZoomAnimation,
} from "../animations";
import React, {
  useEffect,
  useContext,
  useCallback,
  useRef,
  useState,
} from "react";
import Metronome from "./metronomeSound";
import changeColors from "../changeColors";

//Create graphics
const blob1 = createBlobType1("blob1");
const blob2 = createBlobType1("blob2");
const blob3 = createBlobType2("blob3");
const blob4 = createBlobType2("blob4");
const startBlob1 = createBlobTypeS1("start-blob-1");
const startBlob2 = createBlobTypeS2("start-blob-2");
const startBlob3 = createBlobTypeS3("start-blob-3");

//Create audio
const kickAudio = new Audio(doubleKick);
const swooshAudio = new Audio(swoosh);

//Color button

const ColorBtn = () => {
  // Component declarations

  /// "Color"
  let btnPulse = useRef();
  let blob1Zoom = useRef();
  let blob2Zoom = useRef();
  let blob3Zoom = useRef();
  let blob4Zoom = useRef();
  let blob1Tween = useRef();
  let blob2Tween = useRef();
  let blob3Tween = useRef();
  let blob4Tween = useRef();
  let timesPulsePlayed = useRef(0);
  //! Has to be 2667 for 90bpm
  const blobLifeTime = useRef(2667); //2667 = (((60 / bpm) * 1000) * 4 ()
  /// "Stop"
  let blobStart1Tween = useRef();
  let blobStart1Zoom = useRef();
  let blobStart2Tween = useRef();
  let blobStart2Zoom = useRef();
  let blobStart3Tween = useRef();
  let blobStart3Zoom = useRef();
  /// Other
  let btnIntervalCode = useRef();
  let btnTimeoutCode = useRef();
  const colorBtnText = useRef(["color.", "stop.", "next."]);

  // Component state
  let [startBlobLife, setStartBlobLife] = useState(true);

  // Component context

  const [clicked, setClicked] = useContext(clickedContext);
  const [bgTxtColor, setTxtColor] = useContext(colorContext);

  // Component methods

  //* "clicked" doesn't update immediately
  const handleClick = useCallback(() => {
    setClicked(clicked + 1);
    if (clicked === 0) {
      // When button is clicked first time
      clearTimeout(btnTimeoutCode.current);
      clearInterval(btnIntervalCode.current);
      playStartAnimations();
      swooshAudio.play();
      //Delete blob and change bg to color
      setTimeout(() => {
        setStartBlobLife(false);
        //TODO: Change overflow scroll
        document.getElementById("body").style.overflowY = "scroll";
      }, blobLifeTime.current);
    }
  });

  const initializeAnimations = () => {
    btnPulse.current = initializePulseAnimation("btn-wrap");

    blob1Zoom.current = initializeZoomAnimation("blob1");
    blob2Zoom.current = initializeZoomAnimation("blob2");
    blob3Zoom.current = initializeZoomAnimation("blob3");
    blob4Zoom.current = initializeZoomAnimation("blob4");
    blob1Tween.current = initializeTweenAnimation("blob1-1", "blob1-2");
    blob2Tween.current = initializeTweenAnimation("blob2-1", "blob2-2");
    blob3Tween.current = initializeTweenAnimation("blob3-1", "blob3-2");
    blob4Tween.current = initializeTweenAnimation("blob4-1", "blob4-2");

    blobStart1Zoom.current = initializeZoomAnimation(
      "start-blob-1",
      1200,
      0.001,
      10,
      100
    );
    blobStart2Zoom.current = initializeZoomAnimation(
      "start-blob-2",
      1200,
      0.001,
      10,
      50
    );
    blobStart3Zoom.current = initializeZoomAnimation(
      "start-blob-3",
      1200,
      0.001
    );
    blobStart1Tween.current = initializeTweenAnimation(
      "start-blob-1-1",
      "start-blob-1-2",
      500,
      10
    );
    blobStart2Tween.current = initializeTweenAnimation(
      "start-blob-2-1",
      "start-blob-2-2",
      500,
      10
    );
    blobStart3Tween.current = initializeTweenAnimation(
      "start-blob-3-1",
      "start-blob-3-2",
      500,
      10
    );
  };

  const playIdleAnimations = useCallback(() => {
    if (!document.hidden) {
      btnPulse.current.start();
      navigator.userActivation.hasBeenActive && kickAudio.play(); //!This doesn't work on Firefox

      if (timesPulsePlayed.current % 2 === 0) {
        blob1Zoom.current.start();
        blob1Tween.current.start();
        timesPulsePlayed.current++;
        setTimeout(() => {
          blob2Zoom.current.start();
          blob2Tween.current.start();
        }, 300);
      } else {
        timesPulsePlayed.current++;
        blob3Zoom.current.start();
        blob3Tween.current.start();
        setTimeout(() => {
          blob4Zoom.current.start();
          blob4Tween.current.start();
        }, 300);
      }
    }
  }, []);

  const playStartAnimations = () => {
    blobStart1Tween.current.start();
    blobStart1Zoom.current.start();
    blobStart2Tween.current.start();
    blobStart2Zoom.current.start();
    blobStart3Tween.current.start();
    blobStart3Zoom.current.start();
  };

  // Component initialization

  useEffect(() => {
    initializeAnimations();
    //First time play after 1s
    btnTimeoutCode.current = setTimeout(() => {
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
    if (clicked >= 2) {
      //When button says "next."
      changeColors(bgTxtColor, setTxtColor, clicked);
      setStartBlobLife(false);
    }
  }, [clicked]);

  //Component Render

  return (
    <>
      <div id="btn-wrap">
        <button
          id="color-btn"
          className="reset-button press-animation"
          onClick={handleClick}
        >
          {clicked > 2
            ? colorBtnText.current[2]
            : colorBtnText.current[clicked]}
        </button>
        {/* Loading anim */}
        {clicked === 1 ? (
          <button id="loading-anim" className="reset-button press-animation">
            stop.
          </button>
        ) : null}
      </div>
      {startBlobLife && (
        <div id="all-blobs">
          <div className="blob-wrap">{blob1}</div>
          <div className="blob-wrap">{blob2}</div>
          <div className="blob-wrap">{blob3}</div>
          <div className="blob-wrap">{blob4}</div>
          <div className="start-blob-wrap blob-wrap">{startBlob3}</div>
          <div className="start-blob-wrap blob-wrap">{startBlob2}</div>
          <div className="start-blob-wrap blob-wrap">{startBlob1}</div>
        </div>
      )}
      {/* {startBlobLife && (
        <>
        </>
      )} */}
      <Metronome />
    </>
  );
};

export default ColorBtn;
