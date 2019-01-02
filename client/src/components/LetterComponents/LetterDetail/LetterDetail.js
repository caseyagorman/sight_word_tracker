import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as letterActions from "../../../redux/actions/letterActions";
// import DeleteLetter from "../Forms/DeleteLetter";
import Line2 from "./Line2LetterDetail";
import Line1 from "./Line1LetterDetail";
class LetterDetail extends React.Component {
  componentDidMount() {
    if (!this.props.id || !this.props.token) {
      return <div> loading...</div>;
    }
    console.log("letter detail", this.props.id, this.props);
    const id = this.props.id;
    const user = this.props.token;
    this.props.letterActions.fetchLetter(id, user);
  }

  displayLine1(letter) {
    if (!letter) {
      return <div> loading..</div>;
    }
    return <Line1 letter={letter[0]} />;
  }

  displayLine2(students) {
    if (!students) {
      return <div> loading..</div>;
    }
    return <Line2 students={students[1]} letter={students[0]} />;
  }

  //   displayDeleteButton(letter) {
  //     if (!letter) {
  //       return <div>loading...</div>;
  //     }
  //     return <DeleteLetter letter={letter} />;
  //   }

  render() {
    return (
      <div>
        <div>{this.displayLine1(this.props.letter)}</div>
        <div>{this.displayLine2(this.props.letter)}</div>
        {/* <div>{this.displayDeleteButton(this.props.letter)}</div> */}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    letterActions: bindActionCreators(letterActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    letter: state.letter,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterDetail);
