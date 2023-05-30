import React from "react";
import KUTE from "kute.js";
import "./Header.css";
import doubleKick from "../../sounds/doubleKick.mp3";
import { blob1 } from "../../graphics/allBlobs";
import { blob2 } from "../../graphics/allBlobs";

//////////////////////////
//Color. button animations
//////////////////////////

let blob1Tween;
let blob1Zoom;
let blob2Tween;
let blob2Zoom;
let btnPulse;

//////////////////////
//Color. button sounds
//////////////////////

const kickAudio = new Audio(doubleKick);

////////////////////
//Color. button MAIN
////////////////////

export class ColorBtn extends React.Component {
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

    blob1Zoom = KUTE.fromTo(
      "#blob1",
      { transform: { scale: 0.01, translate: [-50, -50] } },
      { transform: { scale: 10, translate: [-50, -50] } },
      { duration: 1200, easing: KUTE.Easing.easingCircularIn }
      //It could be easingExponentialIn
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
      //It could be easingExponentialIn
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

    //First time (wait 1s)

    setTimeout(() => {
      if (!document.hidden) {
        blob1Zoom.start();
        btnPulse.start();
        setTimeout(() => {
          document.getElementById("blob1-1").style.display = "block";
          navigator.userActivation.hasBeenActive && kickAudio.play(); //!This doesn't work in Firefox
        }, 10);

        setTimeout(() => {
          blob2Zoom.start();
          blob2Tween.start();
          //This is kind of hacky
          //Waits "untill animations start" so blobs aren't drawn in their original scale
          setTimeout(() => {
            document.getElementById("blob2-1").style.display = "block";
          }, 10);
        }, 300);
      }
    }, 500);

    //Loop (every 3s)
    setInterval(() => {
      if (!document.hidden) {
        btnPulse.start();
        blob1Zoom.start();
        blob1Tween.start();
        document.getElementById("blob1-1").style.display = "block";
        navigator.userActivation.hasBeenActive && kickAudio.play(); //!This doesn't work in Firefox

        setTimeout(() => {
          blob2Zoom.start();
          blob2Tween.start();
          document.getElementById("blob2-1").style.display = "block";
        }, 300);
      }
    }, 3000);
  }

  handleClick() {
    if (this.state.clicked < 2) {
      this.setState({
        clicked: this.state.clicked + 1,
      });
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
        <audio id="kick-sound" src="../../sounds/kick.mp3"></audio>
      </>
    );
  }
}

//////////////////////
//Name FACUNDO TABÁREZ
//////////////////////

export class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {/* <p className="cooltext reveal">I'm</p> */}
        <div id="name-wrap">
          <h1 id="first-name">FACUNDO</h1>
          <h1 id="last-name">TABÁREZ</h1>
        </div>
        {/* <p className="cooltext reveal">and I make stuff.</p> */}
      </>
    );
  }
}
