import React, { useEffect, useRef } from "react";
import "./Projects.css";
import { initializeTranslateYAnim } from "../animations";

const Projects = () => {

  const mountAnim = useRef();

  const initializeAnimations = () => {
      mountAnim.current = initializeTranslateYAnim('projects', 1800, 800);
  }

  useEffect(() => {
      initializeAnimations();
      mountAnim.current.start();
  }, [])

  return (
      <section id="projects" className="glass">
          {/* <div id="proj1" className="project-wrap">
              <iframe src="https://falsofacu.github.io" height="230" width="230"/>
          </div> */}
          <div id="proj1" className="project-wrap">PROJ 1</div>
          <div id="proj2" className="project-wrap">PROJ 2</div>
          <div id="proj3" className="project-wrap">PROJ 3</div>
          <div id="proj4" className="project-wrap">PROJ 4</div>
          <div id="proj5" className="project-wrap">PROJ 5</div>
          <h1 className="under-construction">Under construction</h1>
      </section>
  );
}

export default Projects;