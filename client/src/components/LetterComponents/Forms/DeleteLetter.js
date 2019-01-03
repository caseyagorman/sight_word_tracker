import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as letterActions from "../../../redux/actions/letterActions";
import { Glyphicon } from "react-bootstrap";
const glyphStyle = {
  fontSize: "40px"
};
class DeleteLetter extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions(letter) {
    if (!letter) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <form>
          <h3>
            <Glyphicon
              style={glyphStyle}
              glyph="glyphicon glyphicon-trash"
              onClick={this.submit}
            />
            <span> </span>
            Delete {letter[0].letter}
          </h3>
        </form>
      </div>
    );
  }

  handleSubmit() {
    const user = this.props.auth.user.token;
    const letter = this.props.letter[0].letter_id;
    this.props.letterActions.deleteLetter(letter, user);
  }

  submit = event => {
    event.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: event => this.handleSubmit()
        },
        {
          label: "No",
          onClick: () => console.log("no")
        }
      ]
    });
  };

  render() {
    return (
      <div>
        <div className="container">{this.getOptions(this.props.letter)}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    letter: state.letter,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    letterActions: bindActionCreators(letterActions, dispatch)
  };
}
const DeleteLetterWrapped = withRouter(DeleteLetter);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteLetterWrapped);
