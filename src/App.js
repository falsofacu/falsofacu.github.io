import React from "react";
import Header from "./parts/header/Header";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
    };
  }
  render() {
    return (
      <>
        <Header />
      </>
    );
  }
}

export default App;
