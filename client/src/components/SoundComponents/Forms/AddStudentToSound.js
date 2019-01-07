import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as soundStudentsActions from "../../../redux/actions/soundStudentsActions";
import * as unknownSoundStudentsActions from "../../../redux/actions/unknownSoundStudentsActions";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
const divStyle = { fontSize: "24px" };
class AddStudentSoundForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
    const id = this.props.sound.sound_id;
    const user = this.props.auth.user.token;
    this.props.unknownSoundStudentsActions.fetchUnknownSoundStudents(id, user);
  }

  getIds(students) {
    let studentIds = [];
    let allStudents = this.props.unknownSoundStudents;
    for (let i = 0; i < allStudents.length; i++) {
      for (let j = 0; j < students.length; j++)
        if (allStudents[i].student === students[j]) {
          studentIds.push(allStudents[i].student_id);
        }
    }
    return studentIds;
  }

  handleSubmit(event) {
    event.preventDefault();
    let studentIds = this.getIds(this.state.value);
    let newSoundStudents = {
      sound: this.props.sound.sound_id,
      students: studentIds
    };

    let user = this.props.auth.user.token;
    console.log("new sound students", newSoundStudents);
    this.props.soundStudentsActions.addSoundStudents(newSoundStudents, user);
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

  getOptions() {
    console.log("props", this.props);
    if (!this.props.unknownSoundStudents) {
      return <div>Loading!</div>;
    }
    let studentList = this.props.unknownSoundStudents;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>
            <h3>Assign students to "{this.props.sound.sound}"</h3>
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
                <option key={student.student_id}>{student.student}</option>
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
    unknownSoundStudentsActions: bindActionCreators(
      unknownSoundStudentsActions,
      dispatch
    ),
    soundStudentsActions: bindActionCreators(soundStudentsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    unknownSoundStudents: state.unknownSoundStudents,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentSoundForm);
