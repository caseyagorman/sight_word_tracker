import React from "react";
import { Row, Col } from "react-bootstrap";
import * as wordsActions from "../../../redux/actions/wordsActions";
import UnlearnedWordsBarChart from "./UnlearnedWordsBarChart";
import LearnedWordsBarChart from "./LearnedWordsBarChart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class WordCharts extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.wordsActions.fetchWords(user);
    }
  }
  displayUnlearnedBarChart(words) {
    if (!words) {
      return <p>Loading...</p>;
    }
    words = words.words;
    return <UnlearnedWordsBarChart data={words} />;
  }
  displayLearnedBarChart(words) {
    if (!words) {
      return <p>Loading...</p>;
    }
    words = words.words;
    return <LearnedWordsBarChart data={words} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">{this.displayLearnedBarChart(this.props.words)}</Col>
        </Row>
        <Row>
          <Col lg="10">{this.displayUnlearnedBarChart(this.props.words)}</Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    words: state.words,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordsActions: bindActionCreators(wordsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordCharts);
