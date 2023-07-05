import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import "./Blobs.css"
import { clickedContext } from "../../App";
import { initializeZoomAnim } from "../animations";
import KUTE from "kute.js";

const Blobs = () => {
  
  //Blobs
  const blob1 = useRef(require('../../media/images/blobs/1.svg'));
  const blob2 = useRef(require('../../media/images/blobs/1.svg'));
  const blob3 = useRef(require('../../media/images/blobs/2.svg'));
  const blob4 = useRef(require('../../media/images/blobs/2.svg'));
  const startBlob1 = useRef(require('../../media/images/blobs/S1.svg'));
  const startBlob2 = useRef(require('../../media/images/blobs/S2.svg'));
  const startBlob3 = useRef(require('../../media/images/blobs/S3.svg'));
  
  //Animations
  let blob1Zoom = useRef();
  let blob2Zoom = useRef();
  let blob3Zoom = useRef();
  let blob4Zoom = useRef();
  let blobStart1Zoom = useRef();
  let blobStart2Zoom = useRef();
  let blobStart3Zoom = useRef();
  //Animation options
  const zoomDuration = useRef(2000);
  const startZoomDuration = useRef(1400);
  const killBlobsDelay = useRef(2667);
  
  //Hybrid
  let pulsePlayedEven = useRef(true);

  //State
  let [blobLife, setBlobLife] = useState(true);
  let [pulseTimeoutCode, setPulseTimeoutCode] = useState(0);
  let [pulseIntervalCode, setPulseIntervalCode] = useState(0);
  
  //Context
  let [clicked, setClicked] = useContext(clickedContext);

  //Functions
  const initializeAnimations = useCallback(() => {
    blob1Zoom.current = initializeZoomAnim("blob1", zoomDuration.current);
    blob2Zoom.current = initializeZoomAnim("blob2", zoomDuration.current, 0.01, 10, 300);
    blob3Zoom.current = initializeZoomAnim("blob3", zoomDuration.current);
    blob4Zoom.current = initializeZoomAnim("blob4", zoomDuration.current, 0.01, 10, 300);
    blobStart1Zoom.current = initializeZoomAnim("start-blob-1", startZoomDuration.current, 0.001, 10, 100, KUTE.Easing.easingExponentialIn);
    blobStart2Zoom.current = initializeZoomAnim("start-blob-2", startZoomDuration.current, 0.001, 10, 50, KUTE.Easing.easingExponentialIn);
    blobStart3Zoom.current = initializeZoomAnim("start-blob-3", startZoomDuration.current, 0.001, 10, 0, KUTE.Easing.easingExponentialIn);
  }, [])

  const startPulseAnimations = () => {
    if(pulsePlayedEven.current) {
      blob1Zoom.current.start();
      blob2Zoom.current.start();
      pulsePlayedEven.current = false;
    }
    else {
      blob3Zoom.current.start();
      blob4Zoom.current.start();
      pulsePlayedEven.current = true;
    }
  }

  const startStartAnimations = () => {
    blobStart1Zoom.current.start();
    blobStart2Zoom.current.start();
    blobStart3Zoom.current.start();
  }

  const killBlobsAfter = (time = 0) => {
    setTimeout (() => {
      setBlobLife(false);
    }, time)
  }

  const startPulseInterval = () =>{
    const timeoutCode = setTimeout(() => {
      startPulseAnimations();
      const intervalCode = setInterval(() => {
        startPulseAnimations();
      }, 3000)
      setPulseIntervalCode(intervalCode);
    }, 1000);
    setPulseTimeoutCode(timeoutCode);
  }

  useEffect(() => {
    switch(clicked) {
      case 0:
        initializeAnimations();
        startPulseInterval();
        break;
      case 1:
        clearTimeout(pulseTimeoutCode);
        clearInterval(pulseIntervalCode);
        startStartAnimations();
        killBlobsAfter(killBlobsDelay.current);
        break;
      case 2:
        setBlobLife(false);
        break;
    }
  }, [clicked])

  return (
  <>
    {blobLife && (
      <div id="blobs">
        <div className="blob-wrap">
          <div id="blob1" className="blob shapeshifter" style={{backgroundImage: `url(${blob1.current.default})`}}></div>
        </div>
        <div className="blob-wrap">
          <div id="blob2" className="blob shapeshifter" style={{backgroundImage: `url(${blob2.current.default})`}}></div>
        </div>
        <div className="blob-wrap">
          <div id="blob3" className="blob shapeshifter" style={{backgroundImage: `url(${blob3.current.default})`}}></div>
        </div>
        <div className="blob-wrap">
          <div id="blob4" className="blob shapeshifter" style={{backgroundImage: `url(${blob4.current.default})`}}></div>
        </div>
        <div className="blob-wrap">
          <div id="start-blob-3" className="blob shapeshifter" style={{backgroundImage: `url(${startBlob3.current.default})`}}></div>  
        </div>
        <div className="blob-wrap">
          <div id="start-blob-2" className="blob shapeshifter" style={{backgroundImage: `url(${startBlob2.current.default})`}}></div>  
        </div>
        <div className="blob-wrap">
          <div id="start-blob-1" className="blob shapeshifter" style={{backgroundImage: `url(${startBlob1.current.default})`}}></div>  
        </div>
      </div>
    )}
  </>
  );
};

export default Blobs;