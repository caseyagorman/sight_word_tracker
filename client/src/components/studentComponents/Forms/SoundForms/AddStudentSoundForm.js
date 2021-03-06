import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentSoundsActions from "../../../../redux/actions/studentSoundsActions";
import * as unknownSoundsActions from "../../../../redux/actions/unknownSoundsActions";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../../../static/StudentStyle.css";
const divStyle = { fontSize: "24px" };
class AddStudentsoundForm extends Component {
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
    this.props.unknownSoundsActions.fetchUnknownSounds(id, user);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newStudentSounds = {
      student: this.props.student[0].student_id,
      sounds: this.state.value
    };

    let user = this.props.auth.user.token;
    this.props.studentSoundsActions.addStudentSounds(newStudentSounds, user);
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
    let soundList = [];
    for (let key in obj) {
      let soundObj = obj[key];
      soundList.push(soundObj.sound);
    }
    return soundList;
  }

  getOptions() {
    if (!this.props.unknownSounds) {
      return <div>Loading!</div>;
    }
    let soundList = this.turnIntoArray(this.props.unknownSounds);
    if (soundList.length === 0) {
      soundList = ["No sounds to display"];
    }
    return (
      <form onSubmit={this.handleSubmit} id="add-to-student-form">
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>
            <h3>Assign sounds to {this.props.student[0].fname}</h3>
            <p>Press shift and click to add multiple letters </p>
          </ControlLabel>
          <strong>
            <FormControl
              id="detail-form-control"
              componentClass="select"
              multiple
              value={this.state.value}
              onChange={this.handleChange}
            >
              {soundList.map(sound => (
                <option key={sound}>{sound}</option>
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
    unknownSoundsActions: bindActionCreators(unknownSoundsActions, dispatch),
    studentSoundsActions: bindActionCreators(studentSoundsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    unknownSounds: state.unknownSounds,
    studentSounds: state.studentSounds,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentsoundForm);
