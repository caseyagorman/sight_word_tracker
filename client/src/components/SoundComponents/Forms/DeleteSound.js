import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as soundActions from "../../../redux/actions/soundActions";
import "../../../static/SoundStyle.css";
import { Glyphicon } from "react-bootstrap";

class DeleteSound extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions(sound) {
    console.log("sound", sound);
    if (!sound) {
      return <div>loading...</div>;
    }
    return (
      <form id="trash-can">
        <Glyphicon glyph="glyphicon glyphicon-trash" onClick={this.submit} />
      </form>
    );
  }

  handleSubmit() {
    const user = this.props.auth.user.token;
    const sound = this.props.soundAlt.sound_id;
    console.log("user", user, "sound", sound);
    this.props.soundActions.deleteSound(sound, user);
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
        <div className="container">
          {this.getOptions(this.props.soundAlt, this.props.auth)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sound: state.sound,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    soundActions: bindActionCreators(soundActions, dispatch)
  };
}
const DeleteSoundWrapped = withRouter(DeleteSound);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteSoundWrapped);
