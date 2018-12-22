import React, { Component } from "react";
import { connect } from "react-redux";
import ViewStudents from "../components/studentComponents/ViewStudents";
class Students extends Component {
  componentDidMount() {
    console.log(sessionStorage);
    if (!this.props.auth.isAuthenticated) {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div>
        <ViewStudents />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Students);
