import React, { Component } from "react";
import { connect } from "react-redux";
class Home extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      alert("Please login");
      return this.props.history.push("/login");
    } else {
      return <h1>Welcome {this.props.auth.user.username}</h1>;
    }
  }

  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Home);
