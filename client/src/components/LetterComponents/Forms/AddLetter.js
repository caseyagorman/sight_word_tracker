import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as letterActions from "../../../redux/actions/letterActions";
import * as authActions from "../../../redux/actions/authActions";
import { Form, Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
class AddLetter extends Component {
  constructor(props) {
    super(props);
    this.state = { newLetter: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log("add letter props", this.props);
    if (sessionStorage.token) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.newLetter);
    const user = this.props.token;
    const letter = this.state.newLetter;
    this.props.letterActions.addLetter(letter, user);
    event.target.reset();
  }
  handleChange(event) {
    this.setState({ newLetter: event.target.value });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="container">
          <Row form>
            <FormGroup>
              <Col lg={6}>
                <Label>
                  <h4>Add New Letters:</h4>
                  <p>You may add multiple letters separated by space</p>
                </Label>
                <Input
                  name="newletter"
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
            <Button color="primary">Add Letter</Button>
          </Col>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    letter: state.letter,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    letterActions: bindActionCreators(letterActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLetter);
