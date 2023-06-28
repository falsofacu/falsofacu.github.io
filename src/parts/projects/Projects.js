import React, { useCallback, useEffect, useRef, useState } from "react";
import { initializeTranslateYAnim, initializeDimensionAnim, initializeZoomAnim, initializeFadeInAnim, initializeFadeOutAnim } from "../animations";
import projectsJSON from "./Projects.json";
import "./Projects.css";
import { act } from "react-dom/test-utils";

const Projects = () => {
  //Information 
  const initialProjCardWidth = useRef(330);
  const activeProjCardWidth = useRef(750);


  const projAmount = useRef(projectsJSON.length - 1);
  const initialAnim = useRef();
  const projAnim = useRef();

  let [focusedProj, setFocusedProj] = useState(1);
  let [activeProj, setActiveProj] = useState(-1);

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

  //TODO: Complete this
  const handleProjCardBtnClick = (event) => {
    //! window.open(url, "_blank");
    //TODO: Only change state of element if focused
    const projNumber = Number(event.currentTarget.parentNode.dataset.projNumber);
    if (projNumber === focusedProj) {
      mountIframe(projNumber);
    }
  };

  const handleIframeCloseClick = (event) => {
    unmountIframe();
  } 

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
  }, [projectsJSON, modifySliderFocusedStatus]);

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
    projAnim.current = initializeDimensionAnim("proj-" + focusedProj, 200, [0, activeProjCardWidth.current]);
    projAnim.current.start();
  };

  const playProjCardShrinkAnim = () => {
    projAnim.current = initializeDimensionAnim("proj-" + activeProj, 200, [0, initialProjCardWidth.current]);
    projAnim.current.start();
  };

  const playIframeMountAnim = () => {
    projAnim.current = initializeFadeInAnim("active-proj-iframe", 500);
    projAnim.current.start();
  };

  useEffect(() => {
    playInitialAnima();
  }, []);

  useEffect(() => {
    console.log("focused changed")
    console.log(activeProj)
    if (activeProj !== -1 ){
      unmountIframe();
    }
  }, [focusedProj]);

  useEffect(() => {
    activeProj != -1 && playIframeMountAnim();
  }, [activeProj])

  //TODO: Conditional rendering active proj
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

//TODO: BETTER ANIMATION
