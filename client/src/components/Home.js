import React, { Component } from "react";
import { connect } from "react-redux";
class Home extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      alert("Please login");
      this.props.history.push("/login");
    }
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Welcome {this.props.auth.user.username}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Home);
