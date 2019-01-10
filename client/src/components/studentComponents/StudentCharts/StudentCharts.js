import React from "react";
import { Row, Col } from "react-bootstrap";
import * as studentsActions from "../../../redux/actions/studentsActions";
import StudentLearnedLetterBarChart from "./LetterCharts/StudentLearnedLetterBarChart";
import StudentLearnedWordBarChart from "./WordCharts/StudentLearnedWordBarChart";
import StudentLearnedSoundBarChart from "./SoundCharts/StudentLearnedSoundBarChart";
import StudentUnlearnedWordBarChart from "./WordCharts/StudentUnlearnedWordBarChart";
import StudentUnlearnedLetterBarChart from "./LetterCharts/StudentUnlearnedLetterBarChart";
import StudentUnlearnedSoundBarChart from "./SoundCharts/StudentUnlearnedSoundBarChart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class StudentCharts extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.studentsActions.fetchStudents(user);
    }
  }

  displayStudentLearnedWordBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentLearnedWordBarChart data={students} />;
  }
  displayStudentLearnedLetterBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }

    return <StudentLearnedLetterBarChart data={students} />;
  }

  displayStudentLearnedSoundBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentLearnedSoundBarChart data={students} />;
  }
  displayStudentUnlearnedWordBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentUnlearnedWordBarChart data={students} />;
  }
  displayStudentUnlearnedLetterBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentUnlearnedLetterBarChart data={students} />;
  }
  displayStudentUnlearnedSoundBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentUnlearnedSoundBarChart data={students} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">
            {this.displayStudentLearnedWordBarChart(this.props.students)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayStudentLearnedLetterBarChart(this.props.students)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayStudentLearnedSoundBarChart(this.props.students)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayStudentUnlearnedWordBarChart(this.props.students)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayStudentUnlearnedLetterBarChart(this.props.students)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayStudentUnlearnedSoundBarChart(this.props.students)}
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    students: state.students,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentsActions: bindActionCreators(studentsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCharts);
