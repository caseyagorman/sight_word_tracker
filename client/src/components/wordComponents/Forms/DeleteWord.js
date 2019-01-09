import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
import { Glyphicon } from "react-bootstrap";
import "../../../static/WordStyle.css";
class DeleteWord extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions(word) {
    console.log("delete word", word);
    if (!word) {
      return <div>loading...</div>;
    }
    return (
      <form>
        <Glyphicon
          glyph="glyphicon glyphicon-trash"
          onClick={this.submit}
          id="trash-can"
        />
      </form>
    );
  }

  handleSubmit() {
    const user = this.props.auth.user.token;
    const word = this.props.wordAlt.word_id;
    this.props.wordActions.deleteWord(word, user);
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
    return <b>{this.getOptions(this.props.wordAlt)}</b>;
  }
}

function mapStateToProps(state) {
  return {
    word: state.word,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordActions: bindActionCreators(wordActions, dispatch)
  };
}
const DeleteWordWrapped = withRouter(DeleteWord);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteWordWrapped);
