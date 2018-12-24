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
import TestStudentContainer from "./containers/TestStudentContainer";
import StudentTestResultsContainer from "./containers/StudentTestResultsContainer";
import HomeContainer from "./containers/HomeContainer";
import RegisterPage from "./components/UserComponents/RegisterPage";
import Login from "./components/UserComponents/Forms/Login";
import Logout from "./components/UserComponents/Forms/Logout";
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
      <Route path="//" component={HomeContainer} />
      <Route path="/logout/" component={Logout} />

      <Route path="/students" component={StudentsContainer} />
      <Route path="/add-student/" component={AddStudentFormContainer} />
      <Route path="/add-word/" component={AddWordFormContainer} />
      <Route path="/test-student/:id" component={TestStudentContainer} />
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
