import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
import * as authActions from "../../../redux/actions/authActions";
import { Form, Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
class AddWord extends Component {
  constructor(props) {
    super(props);
    this.state = { newWord: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log("add word props", this.props);
    if (sessionStorage.token) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    const user = this.props.token;
    const word = this.state.newWord;
    this.props.wordActions.addWord(word, user);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="container">
          <Row form>
            <FormGroup>
              <Col lg={6}>
                <Label>
                  <h4>Add New Words:</h4>
                  <p>You may add multiple words separated by space</p>
                </Label>
                <Input
                  name="newWord"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </Row>
        </div>
        <br />
        <div className="container">
          <Col lg={4}>
            <Button color="primary">Add Word</Button>
          </Col>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    word: state.word,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordActions: bindActionCreators(wordActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWord);
