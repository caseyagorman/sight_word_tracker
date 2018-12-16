import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
class DeleteWord extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ value: this.props.word });
  }
  getOptions() {
    if (this.props.word.key === undefined) {
      return (
        <div>
          <form>
            <label>
              <button onClick={this.submit}>Delete</button>
            </label>
          </form>
        </div>
      );
    }
  }

  handleSubmit() {
    console.log("PROPS", this.props);
    let deleteWord = {
      word: this.props.word[0].word
    };
    console.log("DELETEWORD", deleteWord);
    this.props.wordActions.deleteWord(deleteWord);
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
        <div>{this.getOptions()}</div>
      </div>
    );
  }
}

const DeleteWordWrapped = withRouter(DeleteWord);

function mapStateToProps(state) {
  return {
    word: state.word
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordActions: bindActionCreators(wordActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteWordWrapped);
