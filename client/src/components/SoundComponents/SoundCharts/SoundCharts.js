import React from "react";
import { Row, Col } from "react-bootstrap";
import * as soundsActions from "../../../redux/actions/soundsActions";
import UnlearnedSoundBarChart from "./UnlearnedSoundBarChart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SoundChart extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.soundsActions.fetchSounds(user);
    }
  }
  displayBarChart(sounds) {
    if (!sounds) {
      return <p>Loading...</p>;
    }
    sounds = sounds.sounds[0];
    return <UnlearnedSoundBarChart data={sounds} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">{this.displayBarChart(this.props.sounds)}</Col>
        </Row>
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
    soundsActions: bindActionCreators(soundsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundChart);
