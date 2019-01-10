import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as letterActions from "../../../redux/actions/letterActions";
import "../../../static/LetterStyle.css";
import { Glyphicon } from "react-bootstrap";

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
      <form id="trash-can">
        <Glyphicon glyph="glyphicon glyphicon-trash" onClick={this.submit} />
      </form>
    );
  }

  handleSubmit() {
    const user = this.props.token;
    const letter = this.props.letterAlt.letter_id;
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
    return <b>{this.getOptions(this.props.letterAlt)}</b>;
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
