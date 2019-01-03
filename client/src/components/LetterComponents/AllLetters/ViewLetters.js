import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as lettersActions from "../../../redux/actions/lettersActions";
import * as authActions from "../../../redux/actions/authActions";
import AddLetterButton from "../Forms/AddLetterButton";
import Line1 from "./Line1AllLetters";
import Line2 from "./Line2AllLetters";
const headerStyle = {
  fontSize: "100px"
};

const instructionsStyle = {
  fontSize: "20px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#d3d3d3"
};
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
    return <Line1 letters={letters} />;
  }

  displayLine2(letters) {
    if (!letters) {
      return <p>loading...</p>;
    }
    letters = letters.letters[0];
    return <Line2 letters={letters} />;
  }
  displayAddLetterButton() {
    return <AddLetterButton />;
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 style={headerStyle}>All Letters</h1>
        <div style={instructionsStyle}>{this.displayInstructions()}</div>
        <br />
        <div>{this.displayAddLetterButton()}</div>
        <br />
        <div>{this.displayLine1(this.props.letters)}</div>
        <br />
        <div>{this.displayLine2(this.props.letters)}</div>
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
