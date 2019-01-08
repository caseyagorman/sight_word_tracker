import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class SoundBarChart extends Component {
  state = { data: null, showTooltip: false };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  turnIntoArray(obj) {
    if (!obj) {
      return <p>Loading...</p>;
    }
    let soundList = [];
    let soundCounts = [];
    let studentList = [];
    for (let item in obj) {
      soundCounts.push(obj[item].count);
      soundList.push(obj[item].sound);
      studentList.push(obj[item].students);
    }

    return [soundCounts, soundList, studentList];
  }

  displayChart(dataResults) {
    if (!dataResults) {
      return <div> loading...</div>;
    }
    let sounds = this.turnIntoArray(dataResults);
    let soundCounts = sounds[0];
    let soundList = sounds[1];
    let studentList = sounds[2];

    let options = {
      tooltips: {
        fontFamily: "Niramit",
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
        lable: [{ fontFamily: "Niramit", fontSize: 24, fontColor: "black" }],
        yAxes: [
          {
            ticks: {
              fontSize: 12,
              fontColor: "black",
              beginAtZero: true,
              steps: 22,
              stepValue: 1,
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
      labels: soundList,

      datasets: [
        {
          label: "Unlearned sounds",

          backgroundColor: "#008000",
          borderColor: "#008000",
          borderWidth: 1,
          hoverBackgroundColor: "#008000",
          hoverBorderColor: "#008000",

          data: soundCounts
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

export default SoundBarChart;
