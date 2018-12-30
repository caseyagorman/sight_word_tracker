import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
// const divStyle = { height: "100px" };
class WordBarChart extends Component {
  state = { data: null, showTooltip: false };

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
    let options = {
      tooltips: {
        enabled: false,
        custom: ""
      },
      responsive: true,

      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        lable: [
          {
            fontSize: 40,
            fontColor: "black"
          }
        ],
        yAxes: [
          {
            ticks: {
              fontSize: 40,
              fontColor: "black",
              beginAtZero: true,
              min: 0,
              userCallback: function(label) {
                if (Math.floor(label) === label) {
                  return label;
                }
              }
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontSize: 40,
              fontColor: "black"
            }
          }
        ]
      }
    };
    let words = this.turnIntoArray(dataResults.words[1]);
    let wordList = words[0];
    let wordCounts = words[1];
    const data = {
      labels: wordList,
      datasets: [
        {
          label: "Unlearned Words",

          backgroundColor: "rgba(255,99,132,1)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: wordCounts
        }
      ]
    };
    return <Bar data={data} width={200} height={400} options={options} />;
  }
  render() {
    return (
      <div>
        <h2>Students are learning:</h2>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default WordBarChart;
