import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
class LetterBarChart extends Component {
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
      letterCounts.push(obj[item].count);
      letterList.push(obj[item].letter);
      studentList.push(obj[item].students);
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
          label: "Unlearned letters",

          backgroundColor: "rgba(255,99,132,1)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: letterCounts
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

export default LetterBarChart;
