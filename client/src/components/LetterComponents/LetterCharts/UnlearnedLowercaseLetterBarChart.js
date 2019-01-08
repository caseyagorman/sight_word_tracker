import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class UnlearnedLowercaseLetterBarChart extends Component {
  state = { data: null, showTooltip: false };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let letterList = [];
    let letterCounts = [];
    let studentList = [];
    for (let item in obj) {
      letterCounts.push(obj[item].unlearned_count);
      letterList.push(obj[item].letter);
      studentList.push(obj[item].unlearned_students);
    }
    return [letterCounts, letterList, studentList];
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let letters = this.turnIntoArray(dataResults);
    let letterCounts = letters[0];
    let letterList = letters[1];
    let studentList = letters[2];

    let options = {
      fontFamily: "Niramit",
      tooltips: {
        fontFamily: "Niramit",
        callbacks: {
          label: function(tooltipItem, data) {
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
            fontSize: 24,
            fontColor: "black",
            fontFamily: "Niramit"
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
              fontSize: 24,
              fontColor: "black",
              fontFamily: "Niramit"
            }
          }
        ]
      }
    };
    const data = {
      fontFamily: "Niramit",
      labels: letterList,

      datasets: [
        {
          fontFamily: "Niramit",
          label: "Unlearned lowercase letters",

          backgroundColor: "#ff3333",
          borderColor: "#ff3333",
          borderWidth: 1,
          hoverBackgroundColor: "#ff3333",
          hoverBorderColor: "#ff3333",
          data: letterCounts
        }
      ]
    };
    return <Bar data={data} width={200} height={400} options={options} />;
  }
  render() {
    return (
      <div id="chart-div">
        <h4>Students are learning:</h4>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default UnlearnedLowercaseLetterBarChart;
