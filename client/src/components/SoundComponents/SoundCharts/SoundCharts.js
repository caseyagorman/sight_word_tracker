import React from "react";
import { Row, Col } from "react-bootstrap";
import * as soundsActions from "../../../redux/actions/soundsActions";
import UnlearnedSoundBarChart from "./UnlearnedSoundBarChart";
import LearnedSoundBarChart from "./LearnedSoundBarChart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../../static/ChartStyle.css";
class SoundChart extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.soundsActions.fetchSounds(user);
    }
  }
  displayUnlearnedSoundBarChart(sounds) {
    if (!sounds) {
      return <p>Loading...</p>;
    }
    sounds = sounds.sounds;
    return <UnlearnedSoundBarChart data={sounds} />;
  }

  displayLearnedSoundBarChart(sounds) {
    console.log("sounds", sounds);
    if (!sounds) {
      return <p>Loading...</p>;
    }
    sounds = sounds.sounds;
    return <LearnedSoundBarChart data={sounds} />;
  }

  render() {
    return (
      <div className="container" id="chart-div">
        <h1 className="chart-heading">Sounds</h1>
        <Row>
          <Col lg="10">
            {this.displayLearnedSoundBarChart(this.props.sounds)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayUnlearnedSoundBarChart(this.props.sounds)}
          </Col>
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
