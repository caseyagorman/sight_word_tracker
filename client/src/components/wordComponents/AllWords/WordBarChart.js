import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
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
    let studentList = [];
    for (let item in obj) {
      wordCounts.push(obj[item].count);
      wordList.push(obj[item].word);
      studentList.push(obj[item].students);
    }

    return [wordCounts, wordList, studentList];
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let words = this.turnIntoArray(dataResults);
    let wordCounts = words[0];
    let wordList = words[1];
    let studentList = words[2];

    let options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            const indice = tooltipItem.index;
            return data.labels[indice] + ":" + studentList[indice];
          }
        }
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
    const data = {
      labels: wordList,

      datasets: [
        {
          label: "Unlearned Words",

          backgroundColor: "#ff3333",
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
      <div id="bar-chart">
        <h2>Students are learning:</h2>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default WordBarChart;
