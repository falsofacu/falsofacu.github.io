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
            {/* <div id="p1" className="proj"><iframe src="falsofacu.github.io" height="500" width="800"/></div> */}
            <div id="p1" className="proj">PROJ 1</div>
            <div id="p2" className="proj">PROJ 2</div>
            <div id="p3" className="proj">PROJ 3</div>
            <div id="p4" className="proj">PROJ 4</div>
            <div id="p5" className="proj">PROJ 5</div>
            <div id="p6" className="proj">PROJ 6</div>
        </section>
    );
}

export default Projects;
