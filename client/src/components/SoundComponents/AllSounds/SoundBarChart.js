import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
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
      labels: soundList,

      datasets: [
        {
          label: "Unlearned sounds",

          backgroundColor: "rgba(255,99,132,1)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          // data: [0, 2, 1, 2, 1, 1, 1, 1, 0]
          data: soundCounts
        }
      ]
    };
    return <Bar data={data} width={200} height={400} options={options} />;
  }
  render() {
    return (
      <div>
        <h2>Students are learning:</h2>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default SoundBarChart;
