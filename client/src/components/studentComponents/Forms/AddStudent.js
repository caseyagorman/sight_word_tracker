import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as studentActions from "../../../redux/actions/studentActions";
import * as authActions from "../../../redux/actions/authActions";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { fname: "", lname: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log("add student props", this.props);
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
    let user = this.props.token;
    let newStudent = {
      fname: this.state.fname,
      lname: this.state.lname
    };

    this.props.studentActions.addStudent(newStudent, user);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="container">
          <Label>
            <h4>Add New Student</h4>
          </Label>
          <Row form>
            <FormGroup>
              <Col md={2}>
                <Label>First name</Label>
                <Input
                  name="fname"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </Col>
              <Col md={2}>
                <Label>Last name</Label>
                <Input
                  name="lname"
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
          <Col md={4}>
            <Button color="primary">Add student</Button>
          </Col>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    student: state.student,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentActions: bindActionCreators(studentActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent);
