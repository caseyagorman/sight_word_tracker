import React from "react";
import StudentWordBarChart from "./StudentWordBarChart";
import StudentLetterBarChart from "./StudentLetterBarChart";
import StudentSoundBarChart from "./StudentSoundBarChart";

class Line2 extends React.Component {
  displayWordBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    console.log("Line2", students);
    return <StudentWordBarChart students={students} />;
  }
  displayLetterBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentLetterBarChart students={students} />;
  }

  displaySoundBarChart(students) {
    if (!students) {
      return <p>Loading...</p>;
    }
    return <StudentSoundBarChart students={students} />;
  }

  render() {
    return (
      <div>
        <div className="fluid">
          {this.displayWordBarChart(this.props.students)}
        </div>

        <div>{this.displayLetterBarChart(this.props.students)}</div>

        <div>{this.displaySoundBarChart(this.props.students)}</div>
      </div>
    );
  }
}

export default Line2;
