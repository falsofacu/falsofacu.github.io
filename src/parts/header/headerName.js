import { Context } from "../../App";
import "./Header.css";
import {
  initializeFadeInAnimation,
  initializeFadeOutAnimation,
} from "./nameAnimations";
import React, { useState, useEffect, useContext } from "react";

//Initialize root vars

const color1 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color1"
);
const color2 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color2"
);
const color3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color3"
);
const color4 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color4"
);
const color5 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color5"
);
const color6 = getComputedStyle(document.documentElement).getPropertyValue(
  "--color6"
);

//Name Facundo Tabárez

//TODO: Color pallet change (how to change blob color?)
//The color of the start blob is editable like html
//If I could get the fill of #start-blob-1 to change to vars
//TODO: Reveal I'm and i make stuff
//TODO: Animate Facundo Tabarez a bit up (Also button)
//TODO: Fine tune the animation time
//TODO: Include background text
//TODO: Animate the background text
//TODO: Background text not selectable

// --color1: #faaf1f;
// --color2: #e64360;
// --color3: #1f36fa;
// --color4: #43dce6;
// --color5: #fa1fe5;
// --color6: #6d43e6;

const Name = () => {
  //Declarations
  let firstName1Animation,
    lastName1Animation,
    firstName2Animation,
    lastName2Animation;
  let animationTime = 1000;
  let changeColorTime = 5000;
  let colorIntervalCode;

  //State
  let [bgColor, setBgColor] = useState(color1);
  let [txtColor, setTxtColor] = useState(color2);

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

  const playNameAnimations = () => {
    firstName1Animation.start();
    lastName1Animation.start();
    firstName2Animation.start();
    lastName2Animation.start();
  };

//Esto va a tener que cambiar, no se actualiza, necesito que lo haga cada 3s pero no lo hace
//Al parecer tengo que usar un useEffect para esto
  const changeColors = () => {
    //TODO: eventually change to bgColor
    //TODO: Eventually change this to a setInterval
    setTimeout (() => {
    if (txtColor === color2) {
      document.getElementById("body").style.backgroundColor = "var(--color3)"
      setTxtColor(color4);
    } else if (txtColor === color4) {
      document.getElementById("body").style.backgroundColor = "var(--color5)"
      setTxtColor(color6);
    } else {
      document.getElementById("body").style.backgroundColor = "var(--color1)"
      setTxtColor(color2);
    }}, changeColorTime)
  };

  //!FOR SOME REASON I HAVE TO INITIALIZE THE ANIMATIONS IN THE SAME PLACE THAT I USE THEM IN
  //! I THINK IT'S A USEREF PROBLEM

  //Hooks
  useEffect(() => {
    initializeNameAnimations();
    if (clicked === 1) {
      playNameAnimations();
      changeColors();
    }
  }, [clicked]);

  useEffect(() => {
    clicked === 1 && changeColors();;
  }, [txtColor])

  //Render
  return (
    <>
      <p className="cooltext hidden">I'm</p>
      <div id="name-wrap">
        <h1 id="first-name-1">FACUNDO</h1>
        <h1 id="last-name-1">TABÁREZ</h1>
        <h1 id="first-name-2">FACUNDO</h1>
        <h1 id="last-name-2">TABÁREZ</h1>
      </div>
      <p id="tt" style={{ color: txtColor }}>
        test text
      </p>
      <p className="cooltext hidden">and I make stuff.</p>
    </>
  );
};

export default Name;
