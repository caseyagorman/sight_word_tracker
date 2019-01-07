import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class WordBarChart extends Component {
  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let wordCounts = [];
    let studentList = [];
    for (let item in obj) {
      wordCounts.push(obj[item].word_count);
      studentList.push(obj[item].fname);
    }
    return [wordCounts, studentList];
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let words = this.turnIntoArray(dataResults);
    let wordCounts = words[0];
    let studentList = words[1];

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

          backgroundColor: "#008000",
          borderColor: "#008000",
          borderWidth: 1,
          hoverBackgroundColor: "#008000",
          hoverBorderColor: "#008000",
          data: wordCounts
        }
      ]
    };
    return <Bar data={data} options={options} />;
  }
  render() {
    return (
      <div id="chart-style">
        <h2>Words</h2>
        <div className="container">
          {this.displayChart(this.props.students)}
        </div>
      </div>
    );
  }
}

export default WordBarChart;
