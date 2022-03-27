import React, { Component } from "react";
import LandingBackground from "../styles/LandingBackground";

class Home extends Component {
  render() {
    return (
      <LandingBackground>
        <div className="parallax-1"></div>
        <div className="intro">
          A marketplace for baked goods. We specialize in
          all sorts of cookies for a sweet, relaxing treat.
        </div>
        <div className="parallax-2"></div>
      </LandingBackground>
    );
  }
}

export default Home;
