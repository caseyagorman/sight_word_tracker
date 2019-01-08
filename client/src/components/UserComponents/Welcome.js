import React, { Component } from "react";
import "../../static/WelcomeStyle.css";
import { Link } from "react-router-dom";
class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        Welcome to the Early Literacy Tracker App!
        <br />
        <div id="welcome-text">
          The early literacy tracker is an app that allows you to test and track
          your student's sight words, letters, and sounds.
          <br />
          <br />
          Login below if you already have an account. If you don't have an
          account,
          <Link to={`/register`} className="link">
            {" "}
            register{" "}
          </Link>
          to sign up for one.
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Welcome;
