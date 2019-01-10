import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import WordTestStudentLink from "../WordTestStudent/WordTestStudentLink";
import LetterTestStudentLink from "../LetterTestStudent/LetterTestStudentLink";
import SoundTestStudentLink from "../SoundTestStudent/SoundTestStudentLink";
import * as studentTestActions from "../../../redux/actions/studentTestActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class Line2 extends Component {
  constructor(props) {
    super(props);
    this.displayLetterTestStudentLink = this.displayLetterTestStudentLink.bind(
      this
    );
  }
  displayWordTestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return WordTestStudentLink(student);
  }

  displayLetterTestStudentLink(student, beginTest) {
    if (!student) {
      return <p>Loading test...</p>;
    }

    const beginTestHandler = this.props.studentTestActions.beginTest;
    // console.log("beginTestFn", beginTestFn);
    return LetterTestStudentLink({ student, beginTestHandler });
    // return LetterTestStudentLink(student, beginTest);
  }

  displaySoundTestStudentLink(student) {
    if (!student) {
      return <p>Loading test...</p>;
    }
    return SoundTestStudentLink(student);
  }

  render() {
    return (
      <div className="container" id="student-detail">
        <Row>
          <Col lg="4">
            {this.displayWordTestStudentLink(this.props.student)}
          </Col>
          <Col lg="4">
            {this.displayLetterTestStudentLink(this.props.student)}
          </Col>
          <Col lg="4">
            {this.displaySoundTestStudentLink(this.props.student)}
          </Col>
        </Row>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     studentTest: state.studentTest
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    studentTestActions: bindActionCreators(studentTestActions, dispatch)
  };
}

export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(Line2);
