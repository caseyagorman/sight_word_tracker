import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordTestActions from "../../../redux/actions/wordTestActions";
import { Button, Card, CardText, Row } from "reactstrap";
const displaySoundStyle = { fontSize: "300px" };

const buttonStyle = {
  fontSize: "60px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "black",
  marginRight: "50px",
  marginLeft: "50px"
};

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

  displayWord(sounds) {
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
    this.props.wordTestActions.addWordTest(results, user);
  }

  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
  }

  handleTestClick(e, word, idx) {
    e.preventDefault();
    this.incrementIdx(idx);
    if (e.target.value === "yes") {
      this.setState({ known_sounds: this.state.known_sounds.concat([word]) });
    } else if (e.target.value === "no") {
      this.setState({
        unknown_sounds: this.state.unknown_sounds.concat([word])
      });
    }
  }

  render() {
    const sounds = this.state.sounds;
    const idx = this.state.idx;
    return (
      <div className="container">
        <Card className="text-center">
          <CardText style={displaySoundStyle}>
            {this.displayWord(sounds[idx])}
          </CardText>
          <Row className="text-center">
            <Button
              style={buttonStyle}
              size="lg"
              color="success"
              onClick={e => this.handleTestClick(e, sounds[idx], idx)}
              value="yes"
            >
              Yes
            </Button>
            <span>
              {/* {" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            </span>
            <Button
              style={buttonStyle}
              size="lg"
              color="danger"
              onClick={e => this.handleTestClick(e, sounds[idx], idx)}
              value="no"
            >
              No
            </Button>
          </Row>
        </Card>
      </div>
    );
  }
}

const StudentSoundsTestPageWrapped = withRouter(StudentSoundsTestPage);

function mapStateToProps(state) {
  return {
    test: state.test
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordTestActions: bindActionCreators(wordTestActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSoundsTestPageWrapped);