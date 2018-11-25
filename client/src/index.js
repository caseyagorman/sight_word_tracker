import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import AppNav from "./components/AppNav";
import StudentsContainer from "./containers/StudentsContainer";
import WordsContainer from "./containers/WordsContainer";
import StudentDetail from "./components/StudentDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";

const AppRouter = () => (
  <Router>
    <div>
      <AppNav />
      <Route path="/students/" component={StudentsContainer} />
      <Route path="/words/" component={WordsContainer} />
      <Route path="/details/:id" component={StudentDetail} />
    </div>
  </Router>
);

export default AppRouter;

ReactDOM.render(<AppRouter />, document.getElementById("root"));

serviceWorker.unregister();
