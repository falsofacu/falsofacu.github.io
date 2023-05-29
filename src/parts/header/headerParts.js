import React from "react";
import KUTE from "kute.js";
import "./Header.css";
import kick from "../../sounds/kick.mp3";

//////////////////////////
//Color. button animations
//////////////////////////

const blob1 = (
  <svg
    id="blob1"
    viewBox="0 0 900 600"
    width="900"
    height="600"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
    version="1.1"
  >
    <g transform="translate(460.29784679709246 337.0436893755699)">
      <path
        id="blob1-1"
        d="M112.1 -206.4C136.5 -180 141.4 -132.3 169.5 -94.3C197.6 -56.3 248.8 -28.2 248.4 -0.3C247.9 27.7 195.8 55.3 161.3 82.2C126.8 109 109.9 135.1 86 146.2C62 157.4 31 153.7 -1.1 155.6C-33.2 157.5 -66.3 164.9 -106.9 163.3C-147.5 161.7 -195.4 151.1 -228.2 122.4C-260.9 93.7 -278.5 46.8 -263.7 8.5C-249 -29.8 -202 -59.7 -174.4 -97.3C-146.8 -135 -138.7 -180.5 -112.8 -206.1C-87 -231.7 -43.5 -237.3 0.2 -237.6C43.8 -237.9 87.7 -232.8 112.1 -206.4"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
      ></path>
    </g>
    <g
      transform="translate(452.63165255407944 316.6262176021794)"
      className="hidden"
    >
      <path
        id="blob1-2"
        d="M101.3 -186.3C133.7 -156.8 163.8 -134.4 181.2 -104.5C198.7 -74.7 203.3 -37.3 214.3 6.3C225.3 50 242.5 100 227.5 134.1C212.5 168.1 165.3 186.3 122 200.6C78.7 214.9 39.3 225.5 -2.9 230.5C-45.2 235.6 -90.3 235.1 -112 208.3C-133.6 181.5 -131.8 128.2 -155.7 89.1C-179.6 50 -229.3 25 -237.4 -4.7C-245.5 -34.3 -211.9 -68.7 -188.8 -109.1C-165.6 -149.5 -152.8 -196 -123.1 -227C-93.3 -258 -46.7 -273.5 -6.1 -263C34.5 -252.4 69 -215.8 101.3 -186.3"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
      ></path>
    </g>
  </svg>
);

let blob1Tween;
let blob1Zoom;

/////////////////////
//Color. button sound
/////////////////////

const kickAudio = new Audio(kick);
const kickAudio2 = new Audio(kick);

////////////////////
//Color. button MAIN
////////////////////

const colorBtnJSXs = [
  <>
    <span id="c">c</span>
    <span id="o">o</span>
    <span id="l">l</span>
    <span id="o2">o</span>
    <span id="r">r</span>
    <span>.</span>
  </>,
  <>stop.</>,
  <>next.</>,
];

export class ColorBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    blob1Zoom = KUTE.fromTo(
      "#blob1",
      { transform: { scale: 0.01 } },
      { transform: { scale: 10 } },
      { duration: 1200, easing: KUTE.Easing.easingExponentialIn }
      //It could be easingCircularIn
    );
    blob1Tween = KUTE.fromTo(
      "#blob1-1",
      { path: "#blob1-1" },
      { path: "#blob1-2" },
      { repeat: 10, duration: 500, yoyo: true }
    );
  }

  handleClick() {
    if (this.state.clicked < 2) {
      this.setState({
        clicked: this.state.clicked + 1,
      });
    }
    blob1Zoom.start();
    blob1Tween.start();
    kickAudio.play();
    setTimeout(() => {
      kickAudio2.play();
    }, 300);
    document.getElementById("blob1-1").style.display = "block";
  }

  render() {
    return (
      <>
        <button
          id="color-btn"
          className="reset-button press-animation"
          onClick={this.handleClick}
        >
          {colorBtnJSXs[this.state.clicked]}
        </button>
        <div id="blobs-wrap">{blob1}</div>
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
        <p className="cooltext reveal">I'm</p>
        <div id="name-wrap">
          <h1 id="first-name">FACUNDO</h1>
          <h1 id="last-name">TABÁREZ</h1>
        </div>
        <p className="cooltext reveal">and I make stuff.</p>
      </>
    );
  }
}
