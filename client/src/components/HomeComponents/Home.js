import React, { Component } from "react";
import { connect } from "react-redux";
import ViewStudentsButton from "./ViewStudentsButton";
import ViewWordsButton from "./ViewWordsButton";
import ViewLettersButton from "./ViewLettersButton";
import ViewSoundsButton from "./ViewSoundsButton";
import "../../static/HomeStyle.css";

class Home extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      alert("Please login");
      return this.props.history.push("/login");
    }
  }
  displayWelcome() {
    if (!this.props.auth) {
      return <div>loading...</div>;
    }
    return <div id="welcome">Welcome, {this.props.auth.user.username}!</div>;
  }
  displayViewStudentsButton() {
    return <ViewStudentsButton />;
  }
  displayViewWordsButton() {
    return <ViewWordsButton />;
  }

  displayViewLettersButton() {
    return <ViewLettersButton />;
  }
  displayViewSoundsButton() {
    return <ViewSoundsButton />;
  }
  displayInstructions() {
    return (
      <div id="instructions">
        Getting started:
        <br /> Click view students to view list of students and see student
        details.
        <br />
        Click view words to view list of words and see word details.
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>{this.displayWelcome()}</div>
          {this.displayViewStudentsButton()}
          {this.displayViewWordsButton()}
          {this.displayViewLettersButton()}
          {this.displayViewSoundsButton()}
        </div>
        <div className="container">{this.displayInstructions()}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Home);
