import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class UnlearnedWordsBarChart extends Component {
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
          label: function(tooltipItem) {
            const indice = tooltipItem.index;
            return studentList[indice];
          }
        }
      },

      responsive: true,

      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        lable: [
          {
            fontFamily: "Niramit",
            fontSize: 24,
            fontColor: "black"
          }
        ],
        yAxes: [
          {
            ticks: {
              fontFamily: "Niramit",
              fontSize: 24,
              fontColor: "black",
              beginAtZero: true,
              min: 0,
              max: 22
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontFamily: "Niramit",
              fontSize: 24,
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
          label: "Learned Words",

          backgroundColor: "#008000",
          borderColor: "#008000",
          borderWidth: 1,
          hoverBackgroundColor: "#008000",
          hoverBorderColor: "#008000",
          data: wordCounts
        }
      ]
    };
    return <Bar data={data} width={200} height={400} options={options} />;
  }
  render() {
    return (
      <div id="bar-chart">
        <h4>Students have learned:</h4>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default UnlearnedWordsBarChart;
