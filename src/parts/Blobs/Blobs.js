import React, { useState, useEffect, useContext, useRef } from "react";
import "./Blobs.css"
import { clickedContext } from "../../App";
import {
  createBlobType1,
  createBlobType2,
  createBlobTypeS1,
  createBlobTypeS2,
  createBlobTypeS3,
} from "../../media/images/allBlobs";
import { initializeZoomAnim, initializeTweenAnim } from "../animations";

const Blobs = () => {
  
  //Blobs
  const blob1 = useRef(createBlobType1("blob1"));
  const blob2 = useRef(createBlobType1("blob2"));
  const blob3 = useRef(createBlobType2("blob3"));
  const blob4 = useRef(createBlobType2("blob4"));
  const startBlob1 = useRef(createBlobTypeS1("start-blob-1"));
  const startBlob2 = useRef(createBlobTypeS2("start-blob-2"));
  const startBlob3 = useRef(createBlobTypeS3("start-blob-3"));
  
  //Animations
  let blob1Zoom = useRef();
  let blob2Zoom = useRef();
  let blob3Zoom = useRef();
  let blob4Zoom = useRef();
  let blob1Tween = useRef();
  let blob2Tween = useRef();
  let blob3Tween = useRef();
  let blob4Tween = useRef();
  let blobStart1Zoom = useRef();
  let blobStart2Zoom = useRef();
  let blobStart3Zoom = useRef();
  let blobStart1Tween = useRef();
  let blobStart2Tween = useRef();
  let blobStart3Tween = useRef();
  //Animation options
  const zoomDuration = useRef(1200);
  const tweenDuration = useRef(500);
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
  //! This is the biggest optimization problem with the page
  const initializeAnimations = () => {
    blob1Zoom.current = initializeZoomAnim("blob1");
    blob2Zoom.current = initializeZoomAnim("blob2");
    blob3Zoom.current = initializeZoomAnim("blob3");
    blob4Zoom.current = initializeZoomAnim("blob4");
    blob1Tween.current = initializeTweenAnim("blob1-1", "blob1-2");
    blob2Tween.current = initializeTweenAnim("blob2-1", "blob2-2");
    blob3Tween.current = initializeTweenAnim("blob3-1", "blob3-2");
    blob4Tween.current = initializeTweenAnim("blob4-1", "blob4-2");
    blobStart1Zoom.current = initializeZoomAnim("start-blob-1", zoomDuration.current, 0.001, 10, 100);
    blobStart2Zoom.current = initializeZoomAnim("start-blob-2", zoomDuration.current, 0.001, 10, 50);
    blobStart3Zoom.current = initializeZoomAnim("start-blob-3", zoomDuration.current, 0.001);
    blobStart1Tween.current = initializeTweenAnim("start-blob-1-1", "start-blob-1-2", tweenDuration.current, 10);
    blobStart2Tween.current = initializeTweenAnim("start-blob-2-1", "start-blob-2-2", tweenDuration.current, 10);
    blobStart3Tween.current = initializeTweenAnim("start-blob-3-1", "start-blob-3-2", tweenDuration.current, 10);
  }

  const startPulseAnimations = () => {
    if(pulsePlayedEven.current) {
      blob1Zoom.current.start();
      blob1Tween.current.start();
      setTimeout(() => {
        blob2Zoom.current.start();
        blob2Tween.current.start();
      }, 300)
      pulsePlayedEven.current = false;
    }
    else {
      blob3Zoom.current.start();
      blob3Tween.current.start();
      setTimeout(() => {
        blob4Tween.current.start();
        blob4Zoom.current.start();
      }, 300)
      pulsePlayedEven.current = true;
    }
  }

  const startStartAnimations = () => {
    blobStart1Zoom.current.start();
    blobStart2Zoom.current.start();
    blobStart3Zoom.current.start();
    blobStart1Tween.current.start();
    blobStart2Tween.current.start();
    blobStart3Tween.current.start();
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
        <div className="blob-wrap">{blob1.current}</div>
        <div className="blob-wrap">{blob2.current}</div>
        <div className="blob-wrap">{blob3.current}</div>
        <div className="blob-wrap">{blob4.current}</div>
        <div className="start-blob-wrap blob-wrap">{startBlob3.current}</div>
        <div className="start-blob-wrap blob-wrap">{startBlob2.current}</div>
        <div className="start-blob-wrap blob-wrap">{startBlob1.current}</div>
      </div>
    )}
  </>
  );
};

export default Blobs;