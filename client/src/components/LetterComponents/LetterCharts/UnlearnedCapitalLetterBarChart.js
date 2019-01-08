import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class UnlearnedCapitalLetterBarChart extends Component {
  state = { data: null, showTooltip: false };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  turnIntoArray(obj) {
    console.log(obj);
    if (!obj) {
      return <p>Loading...</p>;
    }
    let letterList = [];
    let letterCounts = [];
    let studentList = [];
    for (let item in obj) {
      console.log("obj", obj[item].letter);
      letterCounts.push(obj[item].unlearned_count);
      letterList.push(obj[item].letter);
      studentList.push(obj[item].unlearned_students);
    }
    console.log("letter counts", letterCounts);
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
      labels: letterList,

      datasets: [
        {
          label: "Unlearned capital letters",

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
      <div id="bar-chart">
        <h2>Students are learning:</h2>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default UnlearnedCapitalLetterBarChart;
