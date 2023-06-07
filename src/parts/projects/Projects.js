import React, { useEffect } from "react";
import { clickedContext } from "../../App";
import "./Projects.css";
import { initializeTranslateY } from "../animations";
import App from "../../App";

const Projects = () => {

    let mountAnimation;

    const initializeAnimations = () => {
        mountAnimation = initializeTranslateY('projects', 1000)
    }

    useEffect(() => {
        initializeAnimations();
        mountAnimation.start();
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
            <div id="proj6" className="project-wrap">PROJ 6</div>
            <h1 className="under-construction">Under construction</h1>
        </section>
    );
}

export default Projects;
