import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as soundActions from "../../../redux/actions/soundActions";
import * as authActions from "../../../redux/actions/authActions";
import { Form, Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
class AddSound extends Component {
  constructor(props) {
    super(props);
    this.state = { newSound: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
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
    const sound = this.state.newSound;
    this.props.soundActions.addSound(sound, user);
  }
  handleChange(event) {
    this.setState({ newSound: event.target.value });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="container">
          <Row form>
            <FormGroup>
              <Col lg={6}>
                <Label>
                  <h4>Add New Sounds:</h4>
                  <p>You may add multiple sounds separated by space</p>
                </Label>
                <Input
                  name="newsound"
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
            <Button color="primary">Add Sound</Button>
          </Col>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    sound: state.sound,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    soundActions: bindActionCreators(soundActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSound);
