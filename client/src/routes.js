import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import StudentsContainer from "./containers/StudentsContainer";
import WordsContainer from "./containers/WordsContainer";

export default (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/students" component={StudentsContainer} />
    <Route path="/words" component={WordsContainer} />
  </Router>
);
