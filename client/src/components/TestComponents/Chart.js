import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Chart extends Component {
  state = { data: null };

  componentDidMount() {
    console.log("DATA", this.props.data);

    this.setState({ data: this.props.data });
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    console.log("this.state", this.state.data);
    let correct_count = this.state.data.correct_count;
    let incorrect_count = this.state.data.incorrect_count;
    const data = {
      labels: ["Learned Words", "Unlearned Words"],
      datasets: [
        {
          data: [correct_count, incorrect_count],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"]
        }
      ]
    };
    return <Doughnut data={data} />;
  }

  render() {
    return (
      <div>
        <h2>Learned Words</h2>
        {this.displayChart(this.state.data)}
      </div>
    );
  }
}

export default Chart;
