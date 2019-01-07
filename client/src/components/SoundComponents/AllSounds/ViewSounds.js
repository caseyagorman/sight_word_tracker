import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as soundsActions from "../../../redux/actions/soundsActions";
import * as authActions from "../../../redux/actions/authActions";
import AddSoundButton from "../Forms/AddSoundButton";
import Line1 from "./Line1AllSounds";
import Line2 from "./Line2AllSounds";
import "../../../static/SoundStyle.css";

const instructionsStyle = {
  fontSize: "20px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#d3d3d3"
};
class ViewSounds extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.soundsActions.fetchSounds(user);
    }
  }

  displayInstructions() {
    return (
      <div>
        <br /> Click sound to view students learning each sound.
      </div>
    );
  }
  displayLine1(sounds) {
    if (!sounds) {
      return <p>sploading...</p>;
    }
    return <Line1 sounds={sounds} />;
  }
  displayLine2(sounds) {
    if (!sounds) {
      return <p>sploading...</p>;
    }
    return <Line2 sounds={sounds} />;
  }
  displayAddSoundButton() {
    return <AddSoundButton />;
  }

  render() {
    return (
      <div className="container">
        <br />
        <h1 id="display-sound">All Sounds</h1>
        <div id="instructions">{this.displayInstructions()}</div>
        <br />
        <div>{this.displayAddSoundButton()}</div>
        <br />
        <div>{this.displayLine1(this.props.sounds)}</div>
        <br />
        <div>{this.displayLine2(this.props.sounds)}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sounds: state.sounds,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    soundsActions: bindActionCreators(soundsActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSounds);
