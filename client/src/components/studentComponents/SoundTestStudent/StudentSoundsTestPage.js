import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as soundTestActions from "../../../redux/actions/soundTestActions";
import { Row } from "reactstrap";
import "../../../static/TestStyle.css";
class StudentSoundsTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sounds: this.props.sounds,
      idx: 0,
      known_sounds: [],
      unknown_sounds: []
    };
  }
  displaySound(sounds) {
    if (!sounds) {
      this.createTestObject();
    }

    return <div>{sounds}</div>;
  }
  async createTestObject() {
    let results = {
      student: this.props.student[0].student_id,
      correct_sounds: this.state.known_sounds,
      incorrect_sounds: this.state.unknown_sounds
    };

    const user = this.props.user;
    this.props.soundTestActions.addSoundTest(results, user);
  }

  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
  }

  handleTestClick(e, sound, idx) {
    e.preventDefault();
    this.incrementIdx(idx);
    if (e.target.value === "yes") {
      this.setState({ known_sounds: this.state.known_sounds.concat([sound]) });
    } else if (e.target.value === "no") {
      this.setState({
        unknown_sounds: this.state.unknown_sounds.concat([sound])
      });
    }
  }

  render() {
    const sounds = this.state.sounds;
    const idx = this.state.idx;
    return (
      <div className="container">
        <div className="display-test-letter">
          {this.displaySound(sounds[idx])}
        </div>
        <Row className="text-center">
          <button
            id="yes-button"
            onClick={e => this.handleTestClick(e, sounds[idx], idx)}
            value="yes"
          >
            Yes
          </button>
          <button
            id="no-button"
            onClick={e => this.handleTestClick(e, sounds[idx], idx)}
            value="no"
          >
            No
          </button>
        </Row>
      </div>
    );
  }
}

const StudentSoundsTestPageWrapped = withRouter(StudentSoundsTestPage);

function mapStateToProps(state) {
  return {
    soundTest: state.soundTest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    soundTestActions: bindActionCreators(soundTestActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSoundsTestPageWrapped);
