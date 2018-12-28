import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as studentWordsActions from "../../redux/actions/studentWordsActions";
import StudentDoughnutChart from "./StudentDoughnutChart";
import { connect } from "react-redux";

class ViewClassChart extends Component {
  componentDidMount() {
    console.log("view class chart", this.props);
    const user = this.props.user;
    this.props.studentWordsActions.fetchStudentWords(user);
  }

  displayChart(studentWords) {
    console.log("view class chart", studentWords);
    if (!studentWords) {
      return <p> loading...</p>;
    }
    return <StudentDoughnutChart dataResults={studentWords} />;
  }

  render() {
    return <div>{this.displayChart(this.props.studentWords)}</div>;
  }
}

function mapStateToProps(state) {
  return {
    studentWords: state.studentWords
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentWordsActions: bindActionCreators(studentWordsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewClassChart);
