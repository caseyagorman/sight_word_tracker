import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
import { Glyphicon } from "react-bootstrap";
const glyphStyle = {
  fontSize: "40px"
};
class DeleteWord extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions(word) {
    if (!word) {
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
            Delete {word[0].word}
          </h3>
        </form>
      </div>
    );
  }

  handleSubmit() {
    const user = this.props.auth.user.token;
    const word = this.props.word[0].word_id;
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
    return (
      <div>
        <div className="container">{this.getOptions(this.props.word)}</div>
      </div>
    );
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
