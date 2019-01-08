import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentLettersActions from "../../../../redux/actions/studentLettersActions";
import * as unknownLettersActions from "../../../../redux/actions/unknownLettersActions";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../../../static/StudentStyle.css";
class AddStudentLetterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    const id = this.props.student[0].student_id;
    const user = this.props.auth.user.token;
    this.props.unknownLettersActions.fetchUnknownLetters(id, user);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newStudentLetters = {
      student: this.props.student[0].student_id,
      letters: this.state.value
    };
    let user = this.props.auth.user.token;
    this.props.studentLettersActions.addStudentLetters(newStudentLetters, user);
  }

  handleChange(e) {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ value: value });
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let letterList = [];
    for (let key in obj) {
      let letterObj = obj[key];
      letterList.push(letterObj.letter);
    }
    return letterList;
  }

  getOptions() {
    if (!this.props.unknownLetters) {
      return <div>Loading!</div>;
    }
    let letterList = this.turnIntoArray(this.props.unknownLetters);
    return (
      <form onSubmit={this.handleSubmit} id="add-to-student-form">
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>
            <h3>Add Letter to {this.props.student[0].fname}</h3>
          </ControlLabel>
          <strong>
            <FormControl
              id="detail-form-control"
              componentClass="select"
              multiple
              value={this.state.value}
              onChange={this.handleChange}
            >
              {letterList.map(letter => (
                <option key={letter}>{letter}</option>
              ))}
            </FormControl>
          </strong>
        </FormGroup>
        <button id="add-to-student-button" type="submit">
          Submit
        </button>
      </form>
    );
  }

  render() {
    return <div>{this.getOptions()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    unknownLettersActions: bindActionCreators(unknownLettersActions, dispatch),
    studentLettersActions: bindActionCreators(studentLettersActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    unknownLetters: state.unknownLetters,
    studentLetters: state.studentLetters,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentLetterForm);
