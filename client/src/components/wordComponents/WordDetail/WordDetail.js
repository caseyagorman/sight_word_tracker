import React from "react";
import WordStudentsPage from "./WordStudentsPage";
import WordPage from "./WordPage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
import DeleteWord from "../Forms/DeleteWord";
class WordDetail extends React.Component {
  componentDidMount() {
    if (!this.props.id || !this.props.userId) {
      return <div> loading...</div>;
    }
    const id = this.props.id;
    const userId = this.props.userId;
    this.props.wordActions.fetchWord(id, userId);
  }

  displayWord(word) {
    if (!word) {
      return <p>Loading...</p>;
    }
    return WordPage(word);
  }

  getWord(word) {
    if (!word) {
      return <p>Loading...</p>;
    }
    return word[0];
  }

  displayWordStudents(word) {
    if (!word) {
      return <p>Loading ...</p>;
    }
    return word[1].map(word => WordStudentsPage(word));
  }

  render() {
    return (
      <div>
        <br />
        <div>{this.displayWord(this.props.word)}</div>
        <br />
        <div>{this.displayWordStudents(this.props.word)}</div>
        <br />
        <div>
          <DeleteWord word={this.getWord(this.props.word)} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    wordActions: bindActionCreators(wordActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    word: state.word,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordDetail);
