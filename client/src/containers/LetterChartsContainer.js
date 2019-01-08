import React, { Component } from "react";
import LetterCharts from "../components/LetterComponents/LetterCharts/LetterCharts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../redux/actions/authActions";
class LetterChartsContainer extends Component {
  componentDidMount() {
    if (!sessionStorage.token) {
      alert("Please log in");
      this.props.history.push("/login");
    } else if (sessionStorage.token) {
      this.props.authActions.checkUser(sessionStorage);
    }
  }

  displayLetterCharts() {
    if (!this.props.auth.isAuthenticated) {
      return <div>loading</div>;
    }
    return (
      <div>
        <LetterCharts
          token={this.props.auth.user.token}
          username={this.props.auth.user.username}
        />
      </div>
    );
  }

  render() {
    return <div>{this.displayLetterCharts()}</div>;
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
)(LetterChartsContainer);
