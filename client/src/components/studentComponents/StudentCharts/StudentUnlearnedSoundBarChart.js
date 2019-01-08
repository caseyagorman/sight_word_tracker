import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class StudentUnlearnedWordBarChart extends Component {
  componentDidMount() {
    console.log("prop", this.props);
  }
  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let soundCounts = [];
    let studentList = [];
    let soundList = [];
    for (let item in obj) {
      soundCounts.push(obj[item].unlearned_sound_count);
      soundList.push(obj[item].unlearned_sound_list);
      studentList.push(obj[item].fname);
    }
    return [soundCounts, studentList, soundList];
  }

  displayChart(dataResults) {
    console.log(dataResults);
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let sounds = this.turnIntoArray(dataResults);
    let soundCounts = sounds[0];
    let studentList = sounds[1];
    let soundList = sounds[2];

    let options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            const indice = tooltipItem.index;
            return soundList[indice];
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
          data: soundCounts
        }
      ]
    };
    return <Bar data={data} options={options} />;
  }
  render() {
    return (
      <div id="chart-style">
        <h2>Unlearned sounds</h2>
        <div className="container">{this.displayChart(this.props.data)}</div>
      </div>
    );
  }
}

export default StudentUnlearnedWordBarChart;
