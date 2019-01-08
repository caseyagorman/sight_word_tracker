import React from "react";
import { Row, Col } from "react-bootstrap";
import * as lettersActions from "../../../redux/actions/lettersActions";
import UnlearnedCapitalLetterBarChart from "./UnlearnedCapitalLetterBarChart";
import LearnedCapitalLetterBarChart from "./LearnedCapitalLetterBarChart";
import UnlearnedLowercaseLetterBarChart from "./UnlearnedLowercaseLetterBarChart";
import LearnedLowercaseLetterBarChart from "./LearnedLowercaseLetterBarChart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class LetterCharts extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else if (this.props.auth.isAuthenticated) {
      const user = this.props.token;
      this.props.lettersActions.fetchLetters(user);
    }
  }
  displayUnlearnedCapitalLetterBarChart(letters) {
    console.log(letters);
    if (!letters) {
      return <p>Loading...</p>;
    }
    letters = letters.letters[1];
    return <UnlearnedCapitalLetterBarChart data={letters} />;
  }

  displayLearnedCapitalLetterBarChart(letters) {
    if (!letters) {
      return <p>Loading...</p>;
    }
    letters = letters.letters[1];
    return <LearnedCapitalLetterBarChart data={letters} />;
  }

  displayUnlearnedLowercaseLetterBarChart(letters) {
    console.log(letters);
    if (!letters) {
      return <p>Loading...</p>;
    }
    letters = letters.letters[0];
    return <UnlearnedLowercaseLetterBarChart data={letters} />;
  }
  displayLearnedLowercaseLetterBarChart(letters) {
    console.log(letters);
    if (!letters) {
      return <p>Loading...</p>;
    }
    letters = letters.letters[0];
    return <LearnedLowercaseLetterBarChart data={letters} />;
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col lg="10">
            <h1 className="chart-heading">Capital Letters</h1>
            {this.displayLearnedCapitalLetterBarChart(this.props.letters)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayUnlearnedCapitalLetterBarChart(this.props.letters)}
          </Col>
        </Row>
        <Row>
          <h1 className="chart-heading">Lowercase Letters</h1>
          <Col lg="10">
            {this.displayLearnedLowercaseLetterBarChart(this.props.letters)}
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            {this.displayUnlearnedLowercaseLetterBarChart(this.props.letters)}
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    letters: state.letters,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lettersActions: bindActionCreators(lettersActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterCharts);
