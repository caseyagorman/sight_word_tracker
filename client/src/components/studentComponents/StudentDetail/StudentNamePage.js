import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

// Display student name

const StudentNamePage = props => {
  return (
    <Grid>
      <Row className="studentPage">
        <Col lg={8}>
          <h1>
            {props[0].fname} {props[0].lname}
          </h1>
        </Col>
      </Row>
    </Grid>
  );
};

export default StudentNamePage;
