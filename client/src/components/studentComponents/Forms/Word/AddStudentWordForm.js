import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentWordsActions from "../../../../redux/actions/studentWordsActions";
import * as unknownWordsActions from "../../../../redux/actions/unknownWordsActions";
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
    const id = this.props.student[0].student_id;
    const user = this.props.auth.user.token;
    this.props.unknownWordsActions.fetchUnknownWords(id, user);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newStudentWords = {
      student: this.props.student[0].student_id,
      words: this.state.value
    };

    let user = this.props.auth.user.token;
    console.log(newStudentWords);
    this.props.studentWordsActions.addStudentWords(newStudentWords, user);
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
    let wordList = [];
    for (let key in obj) {
      let wordObj = obj[key];
      wordList.push(wordObj.word);
    }
    return wordList;
  }

  getOptions() {
    if (!this.props.unknownWords) {
      return <div>Loading!</div>;
    }
    let wordList = this.turnIntoArray(this.props.unknownWords);
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>
            <h3>Add Word to {this.props.student[0].fname}</h3>
          </ControlLabel>
          <strong>
            <FormControl
              style={divStyle}
              componentClass="select"
              multiple
              value={this.state.value}
              onChange={this.handleChange}
            >
              {wordList.map(word => (
                <option key={word}>{word}</option>
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
    unknownWordsActions: bindActionCreators(unknownWordsActions, dispatch),
    studentWordsActions: bindActionCreators(studentWordsActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    unknownWords: state.unknownWords,
    studentWords: state.studentWords,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentWordForm);
