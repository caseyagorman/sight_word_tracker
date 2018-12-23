import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import AddStudent from "../components/StudentComponents/Forms/AddStudent";
class AddStudentFormContainer extends Component {
  componentDidMount() {
    console.log("add student form container", this.props);
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayAddStudentForm() {
    if (this.props.auth.isAuthenticated === false) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <AddStudent
          userId={this.props.auth.user.userId}
          username={this.props.auth.user.username}
          id={this.props.match.params.id}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayAddStudentForm()}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudentFormContainer);
