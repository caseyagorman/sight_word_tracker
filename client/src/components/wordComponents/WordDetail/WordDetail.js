import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as wordActions from "../../../redux/actions/wordActions";
import DeleteWord from "../Forms/DeleteWord";
import Line2 from "./Line2WordDetail";
import Line1 from "./Line1WordDetail";
import Line3 from "./Line3WordDetail";
class WordDetail extends React.Component {
  componentDidMount() {
    if (!this.props.id || !this.props.token) {
      return <div> loading...</div>;
    }
    const id = this.props.id;
    const user = this.props.token;
    this.props.wordActions.fetchWord(id, user);
  }

  displayLine1(word) {
    if (!word) {
      return <div> loading..</div>;
    }
    return <Line1 word={word[0]} />;
  }

  displayLine2(students) {
    if (!students) {
      return <div> loading..</div>;
    }
    return <Line2 students={students[1]} word={students[0]} />;
  }
  displayLine3(students) {
    if (!students) {
      return <div> loading..</div>;
    }
    return <Line3 students={students[1]} word={students[0]} />;
  }

  displayDeleteButton(word) {
    if (!word) {
      return <div>loading...</div>;
    }
    return <DeleteWord word={word} />;
  }

  render() {
    return (
      <div>
        <div>{this.displayLine1(this.props.word)}</div>
        <div>{this.displayLine2(this.props.word)}</div>
        <div>{this.displayLine3(this.props.word)}</div>
        <div>{this.displayDeleteButton(this.props.word)}</div>
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
