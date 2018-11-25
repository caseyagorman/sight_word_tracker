import React from "react";
import axios from "axios";
class StudentDetail extends React.Component {
  state = {
    student: null
  };
  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/api/details/${id}`).then(student => {
      this.setState(() => ({ student }));
    });
  }
  render() {
    return <h2>hello </h2>;
  }
}

export default StudentDetail;
