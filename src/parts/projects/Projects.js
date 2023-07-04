import React, { useCallback, useEffect, useRef, useState } from "react";
import { initializeTranslateYAnim, initializeDimensionAnim, initializeZoomAnim, initializeFadeInAnim, initializeFadeOutAnim } from "../animations";
import projectsJSON from "./Projects.json";
import "./Projects.css";

//* Responsive sizes
//1
// height: 495px;
// width: 330px;
//2 1130px
// height: 375px;
// width: 250px;
//3 830px
// height: 495px;
// width: 90vw;

const Projects = () => {
  //Information
  const initialProjCardWidth = useRef(330);
  const initialProjCardHeight = useRef(495);
  const activeProjCardWidth = useRef(750);
  const activeProjCardHeight = useRef(495);

  const projAmount = useRef(projectsJSON.length - 1);
  const initialAnim = useRef();
  const projAnim = useRef();

  let [focusedProj, setFocusedProj] = useState(1);
  let [activeProj, setActiveProj] = useState(-1);
  let [isSmall, setIsSmall] = useState(false);

  const initializeComponent = () => {
    const observer = new ResizeObserver(changeActiveProjDimensions);
    observer.observe(document.body);
  };

  const changeActiveProjDimensions = () => {
    if (document.body.clientWidth <= 830) {
      initialProjCardWidth.current = window.innerWidth * 0.9;
      initialProjCardHeight.current = 495;
    } else if (document.body.clientWidth <= 1130) {
      initialProjCardWidth.current = 250;
      initialProjCardHeight.current = 375;
    } else {
      initialProjCardWidth.current = 330;
      initialProjCardHeight.current = 495;
    }

    document.body.clientWidth <= 830 ? setIsSmall(true) : setIsSmall(false);
  };

  const disablePrevBtn = () => {
    return focusedProj === 0 ? " disabled" : "";
  };

  const disableNextBtn = () => {
    return focusedProj === projAmount.current ? " disabled" : "";
  };

  const handleSliderBtnClick = (event) => {
    if (event.currentTarget.id === "prev-btn") {
      focusedProj > 0 && setFocusedProj((prevState) => prevState - 1);
    } else {
      focusedProj < projAmount.current && setFocusedProj((prevState) => prevState + 1);
    }
  };

  const handleProjCardClick = (event) => {
    setFocusedProj(Number(event.currentTarget.dataset.projNumber));
  };

  const handleProjCardBtnClick = (event) => {
    const projNumber = Number(event.currentTarget.parentNode.dataset.projNumber);
    isSmall 
    ? window.open(projectsJSON[projNumber].url, "_blank") 
    : projNumber === focusedProj 
    && mountIframe(projNumber);
  };

  const handleIframeCloseClick = (event) => {
    unmountIframe();
  };

  const modifySliderFocusedStatus = (projNum) => {
    switch (true) {
      case projNum > 0 && projNum - 1 === focusedProj:
        return "after";
      case projNum + 1 === focusedProj:
        return "before";
      case projNum === focusedProj:
        return "focused";
      case projNum > focusedProj:
        return "hidden-right";
      default:
        return "hidden-left";
    }
  };

  const generateProjectCards = useCallback(() => {
    let elements = [];
    for (let i = 0; i < projectsJSON.length; i++) {
      elements.push(
        <div
          key={`proj-${i}`}
          id={`proj-${i}`}
          data-proj-number={i}
          data-status={modifySliderFocusedStatus(i)}
          data-url={projectsJSON[i].url}
          className="proj-card"
          onClick={handleProjCardClick}
        >
          <img src={require(`../../media/images/projects/${projectsJSON[i].img}`)} className="proj-img" alt={projectsJSON[i].alt}></img>
          <h3 className="proj-title">{projectsJSON[i].title}</h3>
          <p className="proj-description">{projectsJSON[i].description}</p>
          <button className="proj-button reset-btn" onClick={handleProjCardBtnClick}>
            Try it out!
          </button>
        </div>
      );
    }
    return elements;
  }, [projectsJSON, modifySliderFocusedStatus, isSmall]);

  const mountIframe = (projNumber) => {
    setActiveProj(projNumber);
    playProjCardStretchAnim(projNumber);
  };

  const unmountIframe = () => {
    setActiveProj(-1);
    playProjCardShrinkAnim();
  };

  const playInitialAnima = () => {
    initialAnim.current = initializeTranslateYAnim("projects-section", 1800, 800);
    initialAnim.current.start();
  };

  const playProjCardStretchAnim = () => {
    projAnim.current = initializeDimensionAnim("proj-" + focusedProj, 200, [activeProjCardHeight.current, activeProjCardWidth.current]);
    projAnim.current.start();
  };

  const playProjCardShrinkAnim = () => {
    projAnim.current = initializeDimensionAnim("proj-" + activeProj, 200, [initialProjCardHeight.current, initialProjCardWidth.current]);
    projAnim.current.start();
  };

  const playIframeMountAnim = () => {
    projAnim.current = initializeFadeInAnim("active-proj-iframe", 500);
    projAnim.current.start();
  };

  useEffect(() => {
    initializeComponent();
    playInitialAnima();
  }, []);

  useEffect(() => {
    if (activeProj !== -1) {
      unmountIframe();
    }
  }, [focusedProj]);

  useEffect(() => {
    activeProj != -1 && playIframeMountAnim();
  }, [activeProj]);

  useEffect(() => {
    changeActiveProjDimensions();
  }, [document.body.clientWidth]);

  return (
    <section id="projects-section">
      <>
        <div id="proj-slider">
          <button id="prev-btn" className={"slider-btn reset-btn" + disablePrevBtn()} onClick={handleSliderBtnClick}>
            <i className={"arrow left" + disablePrevBtn()}></i>
          </button>
          {generateProjectCards()}
          {activeProj === -1 ? null : (
            <>
              <button id="close-btn" className="reset-btn" onClick={handleIframeCloseClick}>
                <i className="cross"></i>
              </button>
              <iframe id="active-proj-iframe" src={projectsJSON[activeProj].url}></iframe>
            </>
          )}
          <button id="next-btn" className={"slider-btn reset-btn" + disableNextBtn()} onClick={handleSliderBtnClick}>
            <i className={"arrow right" + disableNextBtn()}></i>
          </button>
        </div>
      </>
    </section>
  );
};

export default Projects;
