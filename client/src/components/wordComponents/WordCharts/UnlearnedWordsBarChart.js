import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class UnlearnedWordsBarChart extends Component {
  state = { data: null, showTooltip: false };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  turnIntoArray(obj) {
    console.log("obj", obj);
    if (!obj) {
      return <p>Loading...</p>;
    }
    let wordList = [];
    let wordCounts = [];
    let studentList = [];
    for (let item in obj) {
      console.log(obj[item]);
      wordCounts.push(obj[item].unlearned_count);
      wordList.push(obj[item].word);
      studentList.push(obj[item].unlearned_students);
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
        fontFamily: "Niramit",
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
        lable: [{ fontFamily: "Niramit", fontSize: 24, fontColor: "black" }],
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
          label: "Unlearned Words",

          backgroundColor: "#ff3333",
          borderColor: "#ff3333",
          borderWidth: 1,
          hoverBackgroundColor: "#ff3333",
          hoverBorderColor: "#ff3333",
          data: wordCounts
        }
      ]
    };
    return <Bar data={data} width={200} height={400} options={options} />;
  }
  render() {
    return (
      <div id="bar-chart">
        <h4>Students are learning:</h4>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default UnlearnedWordsBarChart;
