import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../../static/ChartStyle.css";
class StudentUnlearnedWordBarChart extends Component {
  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let wordCounts = [];
    let studentList = [];
    let wordList = [];
    for (let item in obj) {
      wordCounts.push(obj[item].unlearned_word_count);
      wordList.push(obj[item].unlearned_word_list);
      studentList.push(obj[item].fname);
    }
    return [wordCounts, studentList, wordList];
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let words = this.turnIntoArray(dataResults);
    let wordCounts = words[0];
    let studentList = words[1];
    let wordList = words[2];

    let options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            const indice = tooltipItem.index;
            return wordList[indice];
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
          data: wordCounts
        }
      ]
    };
    return <Bar data={data} options={options} />;
  }
  render() {
    return (
      <div id="chart-style">
        <h2>Unlearned Words</h2>
        <div className="container">{this.displayChart(this.props.data)}</div>
      </div>
    );
  }
}

export default StudentUnlearnedWordBarChart;
