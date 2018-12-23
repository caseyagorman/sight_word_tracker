// React imports

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
// Component imports
import AppNav from "./components/AppNav";
import StudentsContainer from "./containers/StudentsContainer";
import WordsContainer from "./containers/WordsContainer";
import StudentDetailContainer from "./containers/StudentDetailContainer";
import WordDetailContainer from "./containers/WordDetailContainer";
import AddStudentFormContainer from "./containers/AddStudentFormContainer";
import AddWordFormContainer from "./containers/AddWordFormContainer";
import TestStudent from "./components/studentComponents/StudentTest/TestStudent";
import StudentTestResultsContainer from "./containers/StudentTestResultsContainer";
import Home from "./components/Home";
import RegisterPage from "./components/UserComponents/RegisterPage";
import Login from "./components/UserComponents/Forms/Login";
import history from "./history";
// redux imports
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";

const initialState = {};
const store = configureStore(initialState);
// const history = createBrowserHistory();
const AppRouter = () => (
  <Router history={history}>
    <div>
      <AppNav />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login/" component={Login} />
      <Route path="//" component={Home} />

      <Route path="/students" component={StudentsContainer} />
      <Route path="/add-student/" component={AddStudentFormContainer} />
      <Route path="/add-word/" component={AddWordFormContainer} />
      <Route path="/test-student/:id" component={TestStudent} />
      <Route path="/words/" component={WordsContainer} />
      <Route path="/details/:id" component={StudentDetailContainer} />
      <Route path="/word-detail/:id" component={WordDetailContainer} />
      <Route
        path="/student-test-results/:id"
        component={StudentTestResultsContainer}
      />
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
