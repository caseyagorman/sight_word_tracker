import React, { Component } from "react";
import { connect } from "react-redux";
class Home extends Component {
  componentDidMount() {
    console.log("home", this.props);
    if (!this.props.auth.isAuthenticated) {
      alert("Please login");
      return this.props.history.push("/login");
    }
  }

  displayWelcome() {
    if (!this.props.auth) {
      return <div>loading...</div>;
    }
    return <div />;
  }
  render() {
    return <div>{this.displayWelcome()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Home);
