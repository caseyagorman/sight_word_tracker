import React, { Component } from "react";
import ViewWordsFunctional from "../components/wordComponents/WordDetail/ViewWordsFunctional";
import { connect } from "react-redux";
class Words extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div>
        <ViewWordsFunctional />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Words);
