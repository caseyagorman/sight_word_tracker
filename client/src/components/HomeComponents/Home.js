import React, { Component } from "react";
import { connect } from "react-redux";
import ViewStudentsButton from "./ViewStudentsButton";
import ViewWordsButton from "./ViewWordsButton";
import ViewLettersButton from "./ViewLettersButton";
import ViewSoundsButton from "./ViewSoundsButton";
import "./Home.css";
// const welcomeStyle = { fontSize: "100px" };
const buttonStyle = {
  display: "inline-block",
  marginRight: "30px",
  marginLeft: "30px"
};

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
      <div>
        Getting started:
        <br /> Click <strong>view students</strong> to view list of students and
        see student details.
        <br />
        Click <strong>view words </strong>to view list of words and see word
        details.
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div>{this.displayWelcome()}</div>
        <div style={buttonStyle}>
          {this.displayViewStudentsButton()} <span />
          {this.displayViewWordsButton()}
          <span> </span>
          {this.displayViewLettersButton()}
          <span> </span>
          {this.displayViewSoundsButton()}
        </div>
        <br />
        <br />
        <div id="instructions">{this.displayInstructions()}</div>
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
