import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as studentWordsActions from "../../../redux/actions/studentWordsActions";
import StudentWordDoughnutChart from "../../StudentWordTestResultsComponents/StudentWordDoughnutChart";
import { connect } from "react-redux";

class DoughnutChart extends Component {
  componentDidMount() {
    const user = this.props.user;
    this.props.studentWordsActions.fetchStudentWords(user);
  }

  displayChart(studentWords) {
    if (!studentWords) {
      return <p> loading...</p>;
    }
    return <StudentWordDoughnutChart dataResults={studentWords} />;
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
)(DoughnutChart);
