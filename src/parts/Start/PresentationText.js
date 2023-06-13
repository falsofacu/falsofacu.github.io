import React, { useState, useEffect, useContext, useRef } from "react";
import { clickedContext } from "../../App";
import { initializeFadeInAnim, initializeFadeOutAnim, initializeSlideAnim } from "../animations";
import facundoOutline from '../../media/images/FacundoSVG'

const PresentationText = () => {
  let [clicked, setClicked] = useContext(clickedContext);

  //Animations
  let firstName1Anim = useRef();
  let lastName1Anim = useRef();
  let firstName2Anim = useRef();
  let lastName2Anim = useRef();
  let revealImAnim = useRef();
  let revealStuffAnim = useRef();
  //Animation variables
  const firstNameFadeDuration = useRef(500);
  const lastNameFadeDuration = useRef(1000);
  const firstNameFadeDelay = useRef(1000);
  const revealDelay = useRef(1350);
  
  const initializeAnimations = () => {
    firstName1Anim.current = initializeFadeOutAnim("first-name-1", firstNameFadeDuration.current, firstNameFadeDelay.current);
    lastName1Anim.current = initializeFadeOutAnim("last-name-1", lastNameFadeDuration.current);
    firstName2Anim.current = initializeFadeInAnim("first-name-2", firstNameFadeDuration.current, firstNameFadeDelay.current);
    lastName2Anim.current = initializeFadeInAnim("last-name-2", lastNameFadeDuration.current);
    revealImAnim.current = initializeSlideAnim("im-reveal", 200, revealDelay.current);
    revealStuffAnim.current = initializeSlideAnim("stuff-reveal", 400, revealDelay.current);
  };

  const startAnimations = () => {
    firstName1Anim.current.start();
    lastName1Anim.current.start();
    firstName2Anim.current.start();
    lastName2Anim.current.start();
    revealImAnim.current.start();
    revealStuffAnim.current.start();
  };

  useEffect(() => {
    if (clicked === 1){
      initializeAnimations();
      startAnimations();
    }
  }, [clicked])

  return (
    <div id="presentation-text-wrap">
      <p id="im-reveal" className="reveal">
        I’m
      </p>
      <h1 id="first-name-1" className="first-name">
        FACUNDO
      </h1>
      <h1 id="last-name-1" className="last-name">
        TABÁREZ
      </h1>
      {facundoOutline}
      <h1 id="last-name-2" className="last-name non-selectable reveal">
        TABÁREZ
      </h1>
      <p id="stuff-reveal" className="reveal">
        and I make stuff.
      </p>
    </div>
  );
}

export default PresentationText;