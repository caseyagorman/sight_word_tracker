import React, { Component } from "react";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);
    this.checkAuthentication = this.checkAuthentication.bind(this);
  }
  checkAuthentication(user) {
    if (!user.isAuthenticated) {
      alert("Please login");
      return this.props.history.push("/login");
    } else {
      return <h1>Welcome {user.user.username}</h1>;
    }
  }
  render() {
    console.log(localStorage);
    return (
      <div>
        <div>{this.checkAuthentication(this.props.auth)}</div>
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
