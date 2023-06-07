import React from "react";
import "./NavBar.css";
import logo from "../../graphics/logo.png";

const NavBar = () => {
  return (
    <nav>
      <img src={logo} height="30px"></img>
      <div>
        <a href="#presentation"><span>Start</span> &gt; </a>
        <a href="#projects"><span>Projects</span> &gt; </a>
        <a href="#contact"><span>Contact</span> &gt; </a>
      </div>
    </nav>
  );
};

export default NavBar;
