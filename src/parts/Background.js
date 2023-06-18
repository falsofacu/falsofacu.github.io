import { useState, useEffect, useContext, useRef } from "react";
import { clickedContext, loadingContext } from "../App";
import {initializeStartScrollAnim, initializeStartScrollAnimBackwards, initializeTextScrollAnim, initializeTextScrollAnimBackwards} from "./animations";
import Blobs from "./Blobs/Blobs";

const Background = () => {
  //Consts
  const colors = useRef({
    1: "var(--color1)",
    2: "var(--color2)",
    3: "var(--color3)",
    4: "var(--color4)",
    5: "var(--color5)",
    6: "var(--color6)",
    7: "var(--color7)",
    8: "var(--color8)",
  });
  //Animations
  let goodRevealAnim = useRef();
  let vibesRevealAnim = useRef();
  let good1ScrollAnim = useRef();
  let good2ScrollAnim = useRef();
  let vibes1ScrollAnim = useRef();
  let vibes2ScrollAnim = useRef();
  //Animation options
  const startDuration = useRef(1000);
  const startDelay = useRef(1500);
  const textSpeed = useRef(40000);
  const colorChangeDelay = useRef(2667); //mtmspeed * 4
  const stopAfterChanges = useRef(3);
  
  //State
  let [started, setStarted] = useState(false);
  let [color, setColor] = useState("#000");
  let [txtColor, setTxtColor] = useState(colors.current[2]);
  let [colorChangedTimes, setColorChangedTimes] = useState(0);
  let [colorsIntervalCode, setColorsIntervalCode] = useState(0);
  
  //Context
  const [clicked, setClicked] = useContext(clickedContext);
  const [isLoading, setIsLoading] = useContext(loadingContext);

  //Functions
  const initializeAnimations = () => {
    goodRevealAnim.current = initializeStartScrollAnim(
      "good-container",
      startDuration.current,
      startDelay.current
    );
    vibesRevealAnim.current = initializeStartScrollAnimBackwards(
      "vibes-container",
      startDuration.current,
      startDelay.current
    );
    good1ScrollAnim.current = initializeTextScrollAnim("good1", textSpeed.current);
    good2ScrollAnim.current = initializeTextScrollAnim("good2", textSpeed.current);
    vibes1ScrollAnim.current = initializeTextScrollAnimBackwards(
      "vibes1",
      textSpeed.current
    );
    vibes2ScrollAnim.current = initializeTextScrollAnimBackwards(
      "vibes2",
      textSpeed.current
    );
  };

  const startAnimations = () => {
    goodRevealAnim.current.start();
    vibesRevealAnim.current.start();
    good1ScrollAnim.current.start();
    good2ScrollAnim.current.start();
    vibes1ScrollAnim.current.start();
    vibes2ScrollAnim.current.start();
  };

  const changeColors = () => {
    setColor((prevColor) => {
      switch (prevColor) {
        case "#000":
          return colors.current[1];
        case colors.current[1]:
          return colors.current[3];
        case colors.current[3]:
          return colors.current[5];
        case colors.current[5]:
          return clicked >= 2 ? colors.current[7] : colors.current[1];
        case colors.current[7]:
          return colors.current[1];
        default:
          return prevColor;
      }
    });
    setTxtColor((prevTxtColor) => {
      switch (prevTxtColor) {
        case "#FFF":
          return colors.current[2];
        case colors.current[2]:
          return colors.current[4];
        case colors.current[4]:
          return colors.current[6];
        case colors.current[6]:
          return clicked >= 2 ? colors.current[8] : colors.current[2];
        case colors.current[8]:
          return colors.current[2];
        default:
          return prevTxtColor;
      }
    });
  };

  const setChangeColorsInterval = (counter = colorChangedTimes, delay = colorChangeDelay.current, stopAfter = stopAfterChanges.current) => {
    const intervalCode = setInterval(() => {
      if (counter < stopAfter) {
        changeColors();
        counter++;
        setColorChangedTimes(prevState => prevState + 1);
      }
    }, delay);
    setColorsIntervalCode(intervalCode);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading])

  useEffect(() => {
    if (started) {
      initializeAnimations();
      startAnimations();
    }
  }, [started]);

  useEffect(() => {
    if (colorChangedTimes >= stopAfterChanges.current){
      setClicked(prevState => prevState + 1)
      clearInterval(colorsIntervalCode);
    }
  }, [colorChangedTimes])

  useEffect(() => {
    switch (clicked) {
      case 0:
        break;
      case 1:
        setStarted(!started);
        setTimeout(()=> {
          setColor(colors.current[1]);
        }, 2000)
        setChangeColorsInterval();
        document.body.style.overflowY = "auto";
        break;
      case 2:
        clearInterval(colorsIntervalCode);
        break;
      default:
        changeColors();
        break;
    }
  }, [clicked]);

  return (
    <div id="background" style={{backgroundColor: color, color: txtColor}}>
      <Blobs />
      <div id="good-container">
        <span
          id="good1"
          className="bg-text non-selectable"
          style={{
            color: txtColor,
            visibility: started ? "visible" : "hidden",
          }}
        >
          ●GOOD
        </span>
        <span
          id="good2"
          className="bg-text non-selectable"
          style={{
            color: txtColor,
            visibility: started ? "visible" : "hidden",
          }}
        >
          ●GOOD
        </span>
      </div>

      <div id="vibes-container">
        <span
          id="vibes1"
          className="bg-text non-selectable"
          style={{
            color: txtColor,
            visibility: started ? "visible" : "hidden",
          }}
        >
          ●VIBES
        </span>
        <span
          id="vibes2"
          className="bg-text non-selectable"
          style={{
            color: txtColor,
            visibility: started ? "visible" : "hidden",
          }}
        >
          ●VIBES
        </span>
      </div>
    </div>
  );
};

export default Background;
