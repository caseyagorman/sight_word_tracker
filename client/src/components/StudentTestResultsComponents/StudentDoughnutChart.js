import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class StudentDoughnutChart extends Component {
  state = { data: null };

  componentDidMount() {
    this.setState({ data: this.props });
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    console.log("dataResults", dataResults);
    const divStyle = { height: "25px", align: "center" };

    let learned = dataResults.dataResults.learned;
    let unlearned = dataResults.dataResults.unlearned;
    const data = {
      labels: ["Learned Words", "Unlearned Words"],
      datasets: [
        {
          data: [learned, unlearned],
          backgroundColor: ["#229954", "#E74C3C"],
          hoverBackgroundColor: ["#229954", "#E74C3C"]
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
