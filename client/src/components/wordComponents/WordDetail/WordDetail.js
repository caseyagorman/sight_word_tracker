import React from "react";
import WordStudentsPage from "./WordStudentsPage";
import WordPage from "./WordPage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";

import DeleteWord from "../Forms/DeleteWord";
class WordDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.wordActions.fetchWord({ id: id });
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
    word: state.word
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordDetail);
