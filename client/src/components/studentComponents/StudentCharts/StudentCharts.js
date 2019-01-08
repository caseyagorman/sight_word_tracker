import React from "react";
import { Row, Col } from "react-bootstrap";
import * as studentsActions from "../../../redux/actions/studentsActions";
import StudentLetterBarChart from "./StudentLetterBarChart";
import StudentWordBarChart from "./StudentWordBarChart";
import StudentSoundBarChart from "./StudentSoundBarChart";
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

  displayStudentWordBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    students = students.students;
    return <StudentWordBarChart data={students} />;
  }
  displayStudentLetterBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    students = students.students;
    return <StudentLetterBarChart data={students} />;
  }

  displayStudentSoundBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    students = students.students;
    return <StudentSoundBarChart data={students} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">
            {this.displayStudentWordBarChart(this.props.students)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayStudentLetterBarChart(this.props.students)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayStudentSoundBarChart(this.props.students)}
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
