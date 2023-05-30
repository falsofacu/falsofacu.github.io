import React from "react";
import KUTE from "kute.js";
import "./Header.css";
import doubleKick from "../../sounds/doubleKick.mp3";
import { blob1 } from "../../graphics/allBlobs";
import { blob2 } from "../../graphics/allBlobs";

//////////////
//COLOR BUTTON
//////////////

//Color. button animation declarations

  //Color. state
let blob1Tween;
let blob1Zoom;
let blob2Tween;
let blob2Zoom;
let btnPulse;
  //Stop. state
let blobStartTween;
let blobStartZoom;
  //Next. state
let blob;

//Color. button sounds

const kickAudio = new Audio(doubleKick);

//Color. button other declarations
let btnIntervalCode;

//Color. button MAIN

//export
class ColorBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: "color.",
      clicked: 0,
    };
    this.colorBtnText = ["color.", "stop.", "next."];
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //I need to initialize animations here so they find the IDs
    blob1Zoom = KUTE.fromTo(
      "#blob1",
      { transform: { scale: 0.01} },
      { transform: { scale: 10} },
      { duration: 1200, easing: KUTE.Easing.easingCircularIn }
    );
    blob1Tween = KUTE.fromTo(
      "#blob1-1",
      { path: "#blob1-1" },
      { path: "#blob1-2" },
      { repeat: 2, duration: 500, yoyo: true }
    );
    blob2Zoom = KUTE.fromTo(
      "#blob2",
      { transform: { scale: 0.01 } },
      { transform: { scale: 10 } },
      { duration: 1200, easing: KUTE.Easing.easingCircularIn }
    );
    blob2Tween = KUTE.fromTo(
      "#blob2-1",
      { path: "#blob2-1" },
      { path: "#blob2-2" },
      { repeat: 2, duration: 500, yoyo: true }
    );

    btnPulse = KUTE.fromTo(
      "#btn-wrap",
      { transform: { scale: 1 } },
      { transform: { scale: 1.2 } },
      {
        repeat: 3,
        duration: 150,
        yoyo: true,
        easing: KUTE.Easing.easingCircularIn,
      }
    );

    //Play animations

    //First time (wait 1s)
    setTimeout(() => {
      if (!document.hidden) {
        this.playIdleAnimations();
      }
    }, 500);
    //Then loop (every 3s)
    btnIntervalCode = setInterval(() => { //Save interval code for when btn state changes
      if (!document.hidden) {
        this.playIdleAnimations();
      }
    }, 3000);
  }

  handleClick() {
    if (this.state.clicked < 2) {
      this.setState({
        clicked: this.state.clicked + 1,
      });
      clearInterval(btnIntervalCode);
      //TODO: Play state 2 animations
    }
  }

  playIdleAnimations() {
    if (!document.hidden) {
      btnPulse.start();
      blob1Tween.start();
      blob1Zoom.start();
      console.log(blob1Zoom.start());
      if(blob1Zoom.playing) document.getElementById("blob1-1").style.display = "block";
      navigator.userActivation.hasBeenActive && kickAudio.play(); //!This doesn't work in Firefox
      setTimeout(() => {
        blob2Zoom.start();
        blob2Tween.start();
        if(blob2Zoom.playing) document.getElementById("blob2-1").style.display = "block";
      }, 300);
    }
  }

  render() {
    return (
      <>
        <div id="btn-wrap">
          <button
            id="color-btn"
            className="reset-button press-animation"
            onClick={this.handleClick}
          >
            {this.colorBtnText[this.state.clicked]}
          </button>
        </div>
        <div id="blob1-wrap">{blob1}</div>
        <div id="blob2-wrap">{blob2}</div>
      </>
    );
  }
}

//////////////////////
//NAME FACUNDO TABÁREZ
//////////////////////

export class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {/* <p className="cooltext hidden">I'm</p> */}
        <div id="name-wrap">
          <h1 id="first-name">FACUNDO</h1>
          <h1 id="last-name">TABÁREZ</h1>
        </div>
        {/* <p className="cooltext hidden">and I make stuff.</p> */}
      </>
    );
  }
}
