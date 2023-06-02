import React from "react";
import "./Header.css";
import ColorBtn from "./headerColorBtn";
import Name from "./headerName";

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
        <section id="presentation">
          <ColorBtn />
          <Name />
        </section>
    );
  }
}

export default Header;
