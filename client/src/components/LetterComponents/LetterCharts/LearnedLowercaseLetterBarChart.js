import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "../../../static/ChartStyle.css";
class LearnedLowercaseLetterBarChart extends Component {
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
        lable: [
          {
            fontFamily: "Niramit",
            fontSize: 24,
            fontColor: "black"
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
              fontFamily: "Niramit",
              fontSize: 24,
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
          label: "Learned lowercase letters",

          backgroundColor: "#008000",
          borderColor: "#008000",
          borderWidth: 1,
          hoverBackgroundColor: "#008000",
          hoverBorderColor: "#008000",
          data: letterCounts
        }
      ]
    };
    return (
      <Bar
        id="chart-div"
        data={data}
        width={200}
        height={300}
        options={options}
      />
    );
  }
  render() {
    return (
      <div id="chart-div">
        <h4>Students have learned:</h4>
        <div className="container">{this.displayChart(this.state.data)}</div>
      </div>
    );
  }
}

export default LearnedLowercaseLetterBarChart;
