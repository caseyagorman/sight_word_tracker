import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordStudentsActions from "../../../redux/actions/wordStudentsActions";
import * as unknownWordStudentsActions from "../../../redux/actions/unknownWordStudentsActions";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
const divStyle = { fontSize: "24px" };
class AddStudentWordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
    const id = this.props.word.word_id;
    const user = this.props.auth.user.token;
    this.props.unknownWordStudentsActions.fetchUnknownWordStudents(id, user);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newWordStudents = {
      word: this.props.word.word_id,
      students: this.state.value
    };

    let user = this.props.auth.user.token;
    console.log(newWordStudents);
    this.props.wordStudentsActions.addWordStudents(newWordStudents, user);
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
    console.log("obj", obj);
    if (!obj) {
      return <p>Loading...</p>;
    }
    let studentList = [];
    for (let key in obj) {
      let studentObj = obj[key];
      studentList.push(studentObj.student);
    }
    return studentList;
  }

  getOptions() {
    if (!this.props.unknownWordStudents) {
      return <div>Loading!</div>;
    }
    let studentList = this.turnIntoArray(this.props.unknownWordStudents);
    console.log("student list", studentList);
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>
            <h3>Assign students to "{this.props.word.word}"</h3>
          </ControlLabel>
          <strong>
            <FormControl
              style={divStyle}
              componentClass="select"
              multiple
              value={this.state.value}
              onChange={this.handleChange}
            >
              {studentList.map(student => (
                <option key={student}>{student}</option>
              ))}
            </FormControl>
          </strong>
        </FormGroup>
        <button className="btn btn-primary btn-md" type="submit">
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
    unknownWordStudentsActions: bindActionCreators(
      unknownWordStudentsActions,
      dispatch
    ),
    wordStudentsActions: bindActionCreators(wordStudentsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    unknownWordStudents: state.unknownWordStudents,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentWordForm);
