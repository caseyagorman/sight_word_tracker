import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  state = { data: null };

  componentDidMount() {
    // const data = {
    //   labels: ["January", "February", "March", "April", "May", "June", "July"],
    //   datasets: [
    //     {
    //       label: "My First dataset",
    //       fill: false,
    //       lineTension: 0.1,
    //       backgroundColor: "rgba(75,192,192,0.4)",
    //       borderColor: "rgba(75,192,192,1)",
    //       borderCapStyle: "butt",
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       borderJoinStyle: "miter",
    //       pointBorderColor: "rgba(75,192,192,1)",
    //       pointBackgroundColor: "#fff",
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 5,
    //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //       pointHoverBorderColor: "rgba(220,220,220,1)",
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 1,
    //       pointHitRadius: 10,
    //       data: [65, 59, 80, 81, 56, 55, 40]
    //     }
    //   ]
    // };
    // this.setState({ data: data });
  }

  // displayChart(data) {
  //   if (!data) {
  //     return <div>loading...</div>;
  //   }
  //   return (
  //     <div>
  //       <h3>Student tests over time</h3>
  //       <Line data={data} />
  //     </div>
  //   );
  // }

  render() {
    return <div />;
    // return <div>{this.displayChart(this.state.data)}</div>;
  }
}

export default LineChart;
