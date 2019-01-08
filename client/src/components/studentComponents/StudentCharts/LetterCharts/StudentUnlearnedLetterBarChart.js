import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../../static/ChartStyle.css";
class StudentUnlearnedWordBarChart extends Component {
  componentDidMount() {
    console.log("prop", this.props);
  }
  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let letterCounts = [];
    let studentList = [];
    let letterList = [];
    for (let item in obj) {
      letterCounts.push(obj[item].unlearned_letter_count);
      letterList.push(obj[item].unlearned_letter_list);
      studentList.push(obj[item].fname);
    }
    return [letterCounts, studentList, letterList];
  }

  displayChart(dataResults) {
    console.log(dataResults);
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let letters = this.turnIntoArray(dataResults);
    let letterCounts = letters[0];
    let studentList = letters[1];
    let letterList = letters[2];

    let options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            const indice = tooltipItem.index;
            return letterList[indice];
          }
        }
      },

      responsive: true,

      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        lable: [
          {
            fontSize: 18,
            fontColor: "black"
          }
        ],
        yAxes: [
          {
            ticks: {
              fontSize: 14,
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
              fontSize: 10,
              fontColor: "black"
            }
          }
        ]
      }
    };
    const data = {
      labels: studentList,

      datasets: [
        {
          label: "Students",

          backgroundColor: "#ff3333",
          borderColor: "#ff3333",
          borderWidth: 1,
          hoverBackgroundColor: "#ff3333",
          hoverBorderColor: "#ff3333",
          data: letterCounts
        }
      ]
    };
    return <Bar data={data} options={options} />;
  }
  render() {
    return (
      <div id="chart-style">
        <h2>Unlearned Letters</h2>
        <div className="container">{this.displayChart(this.props.data)}</div>
      </div>
    );
  }
}

export default StudentUnlearnedWordBarChart;
