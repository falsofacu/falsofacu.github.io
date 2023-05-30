import React from "react";
import "./Header.css";
import { ColorBtn, Name } from "./headerParts";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "color",
      clicked: 0,
    };
  }

  render() {
    return (
      <header>
        <ColorBtn />
        <Name />
      </header>
    );
  }
}

export default Header;
