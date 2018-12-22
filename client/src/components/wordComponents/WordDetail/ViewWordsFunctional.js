import React from "react";
import Word from "./Word";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordsActions from "../../../redux/actions/wordsActions";
import * as authActions from "../../../redux/actions/authActions";
import ViewWordsPresentation from "./ViewWordsPresentation";
import WordBarChart from "./WordBarChart";

class ViewWordsFunctional extends React.Component {
  componentDidMount() {
    console.log("Words container");
    if (sessionStorage.length > 0) {
      this.props.authActions.setUser(sessionStorage);
    } else {
      alert("Please log in");
      this.props.history.push("/login");
    }
  }
  getWords() {
    if (!this.props.auth.isAuthenticated) {
      console.log("get words");
      return <div />;
    } else {
      console.log("we set the user", this.props);
      // const user = this.props.auth.user.user_id;
      // console.log("user", user);
      // this.props.wordsActions.fetchWords(user);
    }
  }

  displayWords(words) {
    if (!words) {
      return <p>Loading words...</p>;
    }
    let wordList = words[0];
    return wordList.map(word => Word(word));
  }

  displayChart(words) {
    if (!words) {
      return <p>loading...</p>;
    }
    return <WordBarChart data={words[1]} word_id={words[0]} />;
  }

  render() {
    return (
      <div>
        <div>{this.getWords()}</div>
        <div>
          <ViewWordsPresentation
            style={this.divStyle}
            words={this.displayWords(this.props.words)}
          />
        </div>
        {this.displayChart(this.props.words)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    words: state.words,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wordsActions: bindActionCreators(wordsActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWordsFunctional);
