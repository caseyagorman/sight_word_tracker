// React imports

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
// Component imports
import AppNav from "./components/AppNav";
import StudentsContainer from "./containers/StudentsContainer";
import WordsContainer from "./containers/WordsContainer";
import StudentDetail from "./components/studentComponents/StudentDetail/StudentDetail";
import WordDetail from "./components/wordComponents/WordDetail/WordDetail";
import AddStudent from "./components/studentComponents/Forms/AddStudent";
import AddWord from "./components/wordComponents/Forms/AddWord";
import TestStudent from "./components/studentComponents/StudentTest/TestStudent";
import StudentTestResults from "./components/TestComponents/StudentTestResults";
import Home from "./components/Home";
import RegisterPage from "./components/UserComponents/RegisterPage";
// redux imports
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";

const initialState = {};
const store = configureStore(initialState);

const AppRouter = () => (
  <Router>
    <div>
      <AppNav />
      <Route path="/register/" component={RegisterPage} />
      <Route path="//" component={Home} />
      <Route path="/students/" component={StudentsContainer} />
      <Route path="/add-student/" component={AddStudent} />
      <Route path="/add-word/" component={AddWord} />
      <Route path="/test-student/:id" component={TestStudent} />
      <Route path="/words/" component={WordsContainer} />
      <Route path="/details/:id" component={StudentDetail} />
      <Route path="/word-detail/:id" component={WordDetail} />
      <Route path="/student-test-results/:id" component={StudentTestResults} />
    </div>
  </Router>
);

export default AppRouter;

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
