import React, { Component } from "react";
import SoundCharts from "../components/SoundComponents/SoundCharts/SoundCharts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
class SoundChartsContainer extends Component {
  componentDidMount() {
    if (!sessionStorage.token) {
      alert("Please log in");
      this.props.history.push("/login");
    } else if (sessionStorage.token) {
      this.props.authActions.checkUser(sessionStorage);
    }
  }

  displaySoundCharts() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading</div>;
    }
    return (
      <div>
        <SoundCharts
          token={this.props.auth.user.token}
          username={this.props.auth.user.username}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displaySoundCharts()}</div>;
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
)(SoundChartsContainer);
