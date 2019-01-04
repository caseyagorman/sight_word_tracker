import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as letterTestActions from "../../../redux/actions/letterTestActions";
import { Button, Card, CardText, Row } from "reactstrap";
const displayletterstyle = { fontSize: "300px" };

const buttonStyle = {
  fontSize: "60px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "black",
  marginRight: "50px",
  marginLeft: "50px"
};

class StudentLetterTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: this.props.letters,
      idx: 0,
      known_letters: [],
      unknown_letters: []
    };
  }

  displayLetter(letters) {
    console.log(letters);
    if (!letters) {
      this.createTestObject();
    }

    return <div>{letters}</div>;
  }
  async createTestObject() {
    console.log("creating test object");
    let results = {
      student: this.props.student[0].student_id,
      correct_letters: this.state.known_letters,
      incorrect_letters: this.state.unknown_letters
    };
    console.log(results);
    const user = this.props.user;
    this.props.letterTestActions.addLetterTest(results, user);
  }

  incrementIdx(idx) {
    let new_idx = idx + 1;
    this.setState({ idx: new_idx });
  }

  handleTestClick(e, letter, idx) {
    e.preventDefault();
    this.incrementIdx(idx);
    if (e.target.value === "yes") {
      this.setState({
        known_letters: this.state.known_letters.concat([letter])
      });
    } else if (e.target.value === "no") {
      this.setState({
        unknown_letters: this.state.unknown_letters.concat([letter])
      });
    }
  }

  render() {
    const letters = this.state.letters;
    const idx = this.state.idx;
    return (
      <div className="container">
        <Card className="text-center">
          <CardText style={displayletterstyle}>
            {this.displayLetter(letters[idx])}
          </CardText>
          <Row className="text-center">
            <Button
              style={buttonStyle}
              size="lg"
              color="success"
              onClick={e => this.handleTestClick(e, letters[idx], idx)}
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
              onClick={e => this.handleTestClick(e, letters[idx], idx)}
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

const StudentLetterTestPageWrapped = withRouter(StudentLetterTestPage);

function mapStateToProps(state) {
  return {
    letterTest: state.letterTest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    letterTestActions: bindActionCreators(letterTestActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentLetterTestPageWrapped);
