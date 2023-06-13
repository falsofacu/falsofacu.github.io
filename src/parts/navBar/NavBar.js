import React from "react";
import "./NavBar.css";
import logo from "../../media/images/logo.png";

const NavBar = () => {
  return (
    <nav>
      <a id="nav-logo" href="https://falsofacu.github.io">
        <img src={logo} height="30px"></img>
      </a>
      <div>
        <a href="#presentation"><span>Start</span> &gt; </a>
        <a href="#projects"><span>Projects</span> &gt; </a>
        <a href="#contact"><span>Contact</span> &gt; </a>
      </div>
    </nav>
  );
};

export default NavBar;
