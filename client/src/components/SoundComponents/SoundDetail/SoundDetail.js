import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as soundActions from "../../../redux/actions/soundActions";
import DeleteSound from "../Forms/DeleteSound";
import Line2 from "./Line2SoundDetail";
import Line1 from "./Line1SoundDetail";
import Line3 from "./Line3SoundDetail";
class SoundDetail extends React.Component {
  componentDidMount() {
    if (!this.props.id || !this.props.token) {
      return <div> loading...</div>;
    }
    const id = this.props.id;
    const user = this.props.token;
    this.props.soundActions.fetchsound(id, user);
  }

  displayLine1(sound) {
    if (!sound) {
      return <div> loading..</div>;
    }
    return <Line1 sound={sound[0]} />;
  }

  displayLine2(students) {
    if (!students) {
      return <div> sploading..</div>;
    }
    return <Line2 students={students[1]} sound={students[0]} />;
  }

  displayLine3(students) {
    if (!students) {
      return <div> sploading..</div>;
    }
    return <Line3 students={students[1]} sound={students[0]} />;
  }

  displayDeleteButton(sound) {
    if (!sound) {
      return <div>loading...</div>;
    }
    return <DeleteSound sound={sound} />;
  }

  render() {
    return (
      <div>
        <div>{this.displayLine1(this.props.sound)}</div>
        <div>{this.displayLine2(this.props.sound)}</div>
        <div>{this.displayLine3(this.props.sound)}</div>
        <div>{this.displayDeleteButton(this.props.sound)}</div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    soundActions: bindActionCreators(soundActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    sound: state.sound,
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundDetail);
