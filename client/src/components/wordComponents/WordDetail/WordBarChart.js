import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class WordBarChart extends Component {
  state = { data: null };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let wordList = [];
    let wordCounts = [];
    for (let key in obj) {
      wordList.push(key);
      wordCounts.push(obj[key]);
    }
    return [wordList, wordCounts];
  }
  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let wordList = this.turnIntoArray(dataResults)[0];
    let wordCounts = this.turnIntoArray(dataResults)[1];
    const data = {
      labels: wordList,
      datasets: [
        {
          label: "Unlearned Words",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: wordCounts
        }
      ]
    };
    return (
      <Bar
        data={data}
        width={100}
        height={100}
        options={{
          responsive: true,
          tooltips: {
            mode: "label"
          },
          maintainAspectRatio: false,
          aspectRatio: 5,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0
                }
              }
            ]
          }
        }}
      />
    );
  }
  render() {
    return (
      <div>
        <h2>Student Words</h2>
        <div>{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default WordBarChart;
