import { Context } from "../../App";
import {
  initializeFadeInAnimation,
  initializeFadeOutAnimation,
  initializeHeightAnimation,
} from "./textAnimations";
import React, { useState, useEffect, useContext } from "react";

//Initialize root vars

//* Name Facundo Tabárez

//? Destroyed the startblob and changed body bg color to the same color in appParts { Background }

const Name = () => {
  //Declarations
  let firstName1Animation,
    lastName1Animation,
    firstName2Animation,
    lastName2Animation;
  let presentationAnimation, reveal1Animation, reveal2Animation;
  let animationTime = 1000;

  //Context
  const [clicked, setClicked] = useContext(Context); //Activation state

  //Functions
  const initializeNameAnimations = () => {
    firstName1Animation = initializeFadeOutAnimation(
      "#first-name-1",
      animationTime
    );
    lastName1Animation = initializeFadeOutAnimation(
      "#last-name-1",
      animationTime
    );
    firstName2Animation = initializeFadeInAnimation(
      "#first-name-2",
      animationTime
    );
    lastName2Animation = initializeFadeInAnimation(
      "#last-name-2",
      animationTime
    );
  };

  const initializePresentationAnimations = () => {
    const parentElement = document.getElementById("presentation");
    presentationAnimation = initializeHeightAnimation(
      "#btn-wrap",
      (0.165 * parentElement.clientHeight), //16.5% of parent element (half)
      animationTime
    );
    reveal1Animation = initializeFadeInAnimation("#reveal1", animationTime);
    reveal2Animation = initializeFadeInAnimation("#reveal2", animationTime);
  };

  const playNameAnimations = () => {
    firstName1Animation.start();
    lastName1Animation.start();
    firstName2Animation.start();
    lastName2Animation.start();
  };

  const playPresentationAnimations = () => {
    presentationAnimation.start();
    reveal1Animation.start();
    reveal2Animation.start();
  };

  //!FOR SOME REASON I HAVE TO INITIALIZE THE ANIMATIONS IN THE SAME PLACE THAT I USE THEM IN
  //! I THINK IT'S A USEREF PROBLEM
  //Hooks
  useEffect(() => {
    initializeNameAnimations();
    initializePresentationAnimations();
    if (clicked === 1) {
      playNameAnimations();
      playPresentationAnimations();
    }
    else if(clicked === 2) {
      console.log("cleared")
    }
  }, [clicked]);

  //Render
  return (
      <div id="presentation-wrap">
        <p id="reveal1" className="cooltext reveal">
          I’m
        </p>
        <h1 id="first-name-1" className="first-name">
          FACUNDO
        </h1>
        <h1 id="last-name-1" className="last-name">
          TABÁREZ
        </h1>
        <h1 id="first-name-2" className="first-name">
          FACUNDO
        </h1>
        <h1 id="last-name-2" className="last-name">
          TABÁREZ
        </h1>
        <p id="reveal2" className="cooltext reveal">
          and I make stuff.
        </p>
      </div>
  );
};

export default Name;
