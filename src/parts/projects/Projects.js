import React, { useEffect } from "react";
import "./Projects.css";
import { initializeTranslateY } from "../animations";

const Projects = () => {

    let mountAnim;
    let windowScrollAnim;

    const initializeAnimations = () => {
        mountAnim = initializeTranslateY('projects', 1800, 800);
    }

    useEffect(() => {
        initializeAnimations();
        mountAnim.start();
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
