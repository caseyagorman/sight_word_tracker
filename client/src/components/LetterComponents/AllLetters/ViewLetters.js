import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as lettersActions from "../../../redux/actions/lettersActions";
import * as authActions from "../../../redux/actions/authActions";
import AddLetterButton from "../Forms/AddLetterButton";
import Line1 from "./Line1AllLetters";
import "../../../static/LetterStyle.css";
import ViewChartsButton from "../Forms/ViewCharts";

class ViewLetters extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.lettersActions.fetchLetters(user);
    }
  }

  displayInstructions() {
    return (
      <div>
        <br /> Click letter to view students learning each letter.
      </div>
    );
  }
  displayLine1(letters) {
    if (!letters) {
      return <p>loading...</p>;
    }
    return <Line1 token={this.props.token} letters={letters} />;
  }

  displayAddLetterButton() {
    return <AddLetterButton />;
  }
  displayViewChartsButton() {
    return <ViewChartsButton />;
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 id="display-letter">All Letters</h1>
        <div id="instructions">{this.displayInstructions()}</div>
        <br />
        <div>
          {this.displayAddLetterButton()}
          {this.displayViewChartsButton()}
        </div>
        <br />
        <div>{this.displayLine1(this.props.letters)}</div>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    letters: state.letters,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lettersActions: bindActionCreators(lettersActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLetters);
