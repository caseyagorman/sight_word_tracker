import React, { Component } from "react";
import { connect } from "react-redux";
import * as wordsActions from "../../redux/actions/wordsActions";
import { bindActionCreators } from "redux";
import WordBarChart from "./WordBarChart";
import ViewStudentsButton from "./ViewStudentsButton";
import ViewWordsButton from "./ViewWordsButton";
const welcomeStyle = { fontSize: "100px" };
const buttonStyle = {
  display: "inline-block",
  marginRight: "30px",
  marginLeft: "30px"
};
const instructionsStyle = {
  fontSize: "20px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "black",
  marginLeft: "30px"
};
class Home extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      alert("Please login");
      return this.props.history.push("/login");
    }
    const user = this.props.token;
    this.props.wordsActions.fetchWords(user);
  }

  displayChart(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    return <WordBarChart data={words} />;
  }
  displayWelcome() {
    if (!this.props.auth) {
      return <div>loading...</div>;
    }
    return <div>Welcome, {this.props.auth.user.username}!</div>;
  }
  displayViewStudentsButton() {
    return <ViewStudentsButton />;
  }
  displayViewWordsButton() {
    return <ViewWordsButton />;
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
        <div style={welcomeStyle}>{this.displayWelcome()}</div>
        <div>{this.displayChart(this.props.words)}</div>
        <div style={buttonStyle}>
          {this.displayViewStudentsButton()} <span />
          {this.displayViewWordsButton()}
        </div>
        <br />
        <br />
        <div style={instructionsStyle}>{this.displayInstructions()}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    words: state.words,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordsActions: bindActionCreators(wordsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
