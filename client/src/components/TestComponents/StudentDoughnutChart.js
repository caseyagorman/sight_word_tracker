import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentDoughnutChart extends Component {
  state = { data: null };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    const divStyle = { height: "25px", align: "center" };

    console.log(dataResults);
    let correct_count = this.state.data.correct_count;
    let incorrect_count = this.state.data.incorrect_count;
    let learning_count = this.state.data.learning_count;
    const data = {
      labels: ["Learned Words", "Unlearned Words", "Learning"],
      datasets: [
        {
          data: [correct_count, incorrect_count, learning_count],
          backgroundColor: ["#229954", "#E74C3C", "#2E86C1"],
          hoverBackgroundColor: ["#229954", "#E74C3C", "#2E86C1"]
        }
      ]
    };
    return (
      <div style={divStyle}>
        <h2>Learned Words</h2>
        <Doughnut data={data} />
      </div>
    );
  }
  d;
  render() {
    return <div>{this.displayChart(this.state.data)}</div>;
  }
}

export default StudentDoughnutChart;
