import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as soundActions from "../../../redux/actions/soundActions";
import { Glyphicon } from "react-bootstrap";
const glyphStyle = {
  fontSize: "40px"
};
class DeleteSound extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getOptions(sound) {
    if (!sound) {
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
            Delete "{sound[0].sound}"
          </h3>
        </form>
      </div>
    );
  }

  handleSubmit() {
    const user = this.props.auth.user.token;
    const sound = this.props.sound[0].sound_id;
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
        <div className="container">{this.getOptions(this.props.sound)}</div>
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
