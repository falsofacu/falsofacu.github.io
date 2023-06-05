import { clickedContext } from "../../App";
import {
  initializeFadeInAnimation,
  initializeFadeOutAnimation,
  initializeHeightAnimation,
  initializeSlideAnimation,
} from "../animations";
import React, { useEffect, useContext } from "react";
import facundoOutline from '../../graphics/FacundoSVG';

//* Name Facundo Tabárez
//? Destroyed the startblob and changed body bg color to the same color in appParts { Background }

const Name = () => {
  //Declarations
  let firstName1Anim,
    lastName1Anim,
    firstName2Anim,
    lastName2Anim;
  let presentationAnim, revealImAnim, revealStuffAnim;

  //Animation variables
  const slideAllUpDuration = 500;
  const slideAllUpDelay = 1000;
  const firstNameFadeDuration = 500;
  const lastNameFadeDuration = 1000;
  const firstNameFadeDelay = 1000;
  const revealDelay = 1350;


  //Context
  const [clicked] = useContext(clickedContext); //Activation state

  //Functions
  const initializeNameAnimations = () => {
    firstName1Anim = initializeFadeOutAnimation(
      "first-name-1",
      firstNameFadeDuration,
      firstNameFadeDelay
    );
    lastName1Anim = initializeFadeOutAnimation(
      "last-name-1",
      lastNameFadeDuration
    );
    firstName2Anim = initializeFadeInAnimation(
      "first-name-2",
      firstNameFadeDuration,
      firstNameFadeDelay
    );
    lastName2Anim = initializeFadeInAnimation(
      "last-name-2",
      lastNameFadeDuration
    );
  };

  const initializePresentationAnimations = () => {
    //* This part reduces the btn-wrap from 33% to 16.5%
    // Since KUTE.js doesn't work with percentages I get the parent's height in px,
    // calculate 16.5% of it and animate that size change in #btn-wrap
    const parentElement = document.getElementById("presentation"); 
    presentationAnim = initializeHeightAnimation(
      "btn-wrap",
      (0.165 * parentElement.clientHeight),
      slideAllUpDuration,
      slideAllUpDelay
    );

    //* Slide in animation when name finishes going up
    revealImAnim = initializeSlideAnimation("im-reveal", 200, revealDelay);
    revealStuffAnim = initializeSlideAnimation("stuff-reveal", 400, revealDelay);
  };

  const playNameAnimations = () => {
    firstName1Anim.start();
    lastName1Anim.start();
    firstName2Anim.start();
    lastName2Anim.start();
  };

  const playPresentationAnimations = () => {
    presentationAnim.start();
    revealImAnim.start();
    revealStuffAnim.start();
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
  }, [clicked]);

  //Render
  return (
      <div id="presentation-wrap">
        <p id="im-reveal" className="cooltext reveal">
          I’m
        </p>
        <h1 id="first-name-1" className="first-name">
          FACUNDO
        </h1>
        <h1 id="last-name-1" className="last-name">
          TABÁREZ
        </h1>
        {facundoOutline}
        {/* <h1 id="first-name-2" className="first-name non-selectable">
          FACUNDO
        </h1> */}
        <h1 id="last-name-2" className="last-name non-selectable">
          TABÁREZ
        </h1>
        <p id="stuff-reveal" className="cooltext reveal">
          and I make stuff.
        </p>
      </div>
  );
};

export default Name;
