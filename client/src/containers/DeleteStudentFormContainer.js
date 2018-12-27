import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
import DeleteStudent from "../components/StudentComponents/Forms/DeleteStudent";
class DeleteStudentFormContainer extends Component {
  componentDidMount() {
    console.log(this.props);
    if (sessionStorage.length > 0) {
      this.props.authActions.checkUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }

  displayDeleteStudentForm() {
    if (this.props.auth.isAuthenticated === false) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <DeleteStudent
          token={this.props.auth.user.token}
          username={this.props.auth.user.username}
          studentId={this.props.studentId}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayDeleteStudentForm()}</div>;
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
)(DeleteStudentFormContainer);
