import { blob1, blob2, startBlob } from "../../graphics/allBlobs";
import { Context } from "../../App";
import doubleKick from "../../sounds/doubleKick.mp3";
import swoosh from "../../sounds/swoosh.mp3";
import "./Header.css";
import {
  initializeBtnAnimations,
  initializeBlobAnimations,
  initializeStartAnimations,
} from "./btnAnimations";
import { initializeFadeInAnimation, initializeFadeOutAnimation } from "./nameAnimations";
import React, { useState, useEffect, useContext } from "react";

//Color button

const ColorBtn = () => {
  // Component declarations

  /// "Color" state
  let btnPulse, blob1Zoom, blob1Tween, blob2Tween, blob2Zoom;
  /// "Stop" state
  let blobStartTween, blobStartZoom;
  /// Other declarations
  let btnIntervalCode;
  const colorBtnText = ["color.", "stop.", "next."];
  const kickAudio = new Audio(doubleKick);
  const swooshAudio = new Audio(swoosh);

  // Component Context

  const [clicked, setClicked] = useContext(Context);

  // Component Methods

  const handleClick = () => {
    if (clicked < 2) {
      setClicked(clicked + 1);
      clearInterval(btnIntervalCode);
    }
    if (clicked === 0) {
      blobStartTween.start();
      blobStartZoom.start();
      swooshAudio.play();
    }
  };

  const playIdleAnimations = () => {
    if (!document.hidden) {
      btnPulse.start();
      blob1Tween.start();
      blob1Zoom.start();
      navigator.userActivation.hasBeenActive && kickAudio.play(); //!This doesn't work in Firefox
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
    [blobStartTween, blobStartZoom] = initializeStartAnimations();

    //First time play after 1s
    setTimeout(() => {
      playIdleAnimations();
      //Then play every 3s
      btnIntervalCode = setInterval(() => {
        if (!document.hidden) {
          playIdleAnimations();
        }
      }, 3000);
    }, 1000);

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
      <div id="blob1-wrap" className="blob-wrap">
        {blob1}
      </div>
      <div id="blob2-wrap" className="blob-wrap">
        {blob2}
      </div>
      <div id="start-blob-wrap" className="blob-wrap">
        {startBlob}
      </div>
    </>
  );
};

//Name Facundo Tabárez

const Name = () => {

  let firstNameAnimation, lastNameAnimation, firstName2Animation, lastName2Animation;

  const [clicked, setClicked] = useContext(Context);

  useEffect(()=> {
    firstNameAnimation = initializeFadeOutAnimation('#first-name-1', 1000);
    lastNameAnimation = initializeFadeOutAnimation('#last-name-1', 1000);
    firstName2Animation = initializeFadeInAnimation('#first-name-2', 1000);
    lastName2Animation = initializeFadeInAnimation('#last-name-2', 1000);
    if(clicked === 1){
      firstNameAnimation.start();
      lastNameAnimation.start();
      firstName2Animation.start();
      lastName2Animation.start();
    }
  }, [clicked])

  return (
    <>
      <p className="cooltext hidden">I'm</p>
      <div id="name-wrap">
        <h1 id="first-name-1">FACUNDO</h1>
        <h1 id="last-name-1">TABÁREZ</h1>
        <h1 id="first-name-2">FACUNDO</h1>
        <h1 id="last-name-2">TABÁREZ</h1>
      </div>
      <p className="cooltext hidden">and I make stuff.</p>
    </>
  );
};

export { ColorBtn, Name };
