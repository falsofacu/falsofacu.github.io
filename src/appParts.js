import { Context } from "./App";
import React, { useState, useEffect, useContext } from "react";
import { initializeBgTextAnimation } from "./appAnimations";


//TODO: Animate the background text
//TODO: Background text not selectable
//TODO: Fine tune the animation time

const Background = () => {
  let bgTxtAnim;

  let changeColorTime = 5000;
  let colorTimeoutCode;

  let [bgTxtColor, setTxtColor] = useState("var(--color2)");

  const [clicked, setClicked] = useContext(Context);

  const changeColors = () => {
    //TODO: Is it bad to modify body like this?
    //TODO: Change this to a setInterval
    colorTimeoutCode = setTimeout(() => {
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
    }, changeColorTime);
  };

  useEffect(() => {
    bgTxtAnim = initializeBgTextAnimation("#good1", 10000);
    bgTxtAnim.start();

    //
  }, []);

  useEffect(() => {
    if (clicked === 1) {
      changeColors();
    } else if (clicked === 2) {
      console.log("cleared");
    }
  }, [clicked]);

  useEffect(() => {
    clicked === 1 && changeColors();
  }, [bgTxtColor]);

  return (
    <div id="gb-text-wrap">
      <span id="good1" className="bg-text //reveal" style={{color: bgTxtColor}}>
      ●GOOD 
      </span>
      {/* <span id="good2" className="bg-text //reveal" style={{color: bgTxtColor}}>
        GOOD
      </span>
      <span id="vibes1" className="bg-text //reveal" style={{color: bgTxtColor}}>
        VIBES
      </span>
      <span id="vibes2" className="bg-text //reveal" style={{color: bgTxtColor}}>
        VIBES
      </span> */}
    </div>
  );
};

export { Background };
