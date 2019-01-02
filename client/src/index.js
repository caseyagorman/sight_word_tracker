// React imports

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

// Auth
import RegisterPage from "./components/UserComponents/RegisterPage";
import Login from "./components/UserComponents/Forms/Login";
import Logout from "./components/UserComponents/Forms/Logout";

// Home/Nav imports
import AppNav from "./components/AppNav";
import HomeContainer from "./containers/HomeContainer";

// Students
import StudentsContainer from "./containers/StudentsContainer";
import StudentDetailContainer from "./containers/StudentDetailContainer";
import AddStudentFormContainer from "./containers/AddStudentFormContainer";

// Words
import WordDetailContainer from "./containers/WordDetailContainer";
import WordsContainer from "./containers/WordsContainer";
import AddWordFormContainer from "./containers/AddWordFormContainer";
import WordTestStudentContainer from "./containers/WordTestStudentContainer";

// Letters
import LettersContainer from "./containers/LettersContainer";
import LetterDetailContainer from "./containers/LetterDetailContainer";
import LetterTestStudentContainer from "./containers/LetterTestStudentContainer";
import AddLetterFormContainer from "./containers/AddLetterFormContainer";

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
      <Route path="/add-letter/" component={AddLetterFormContainer} />
      <Route
        path="/test-student-words/:id"
        component={WordTestStudentContainer}
      />
      <Route path="/words/" component={WordsContainer} />
      <Route path="/details/:id" component={StudentDetailContainer} />
      <Route path="/word-detail/:id" component={WordDetailContainer} />
      <Route path="/letter-detail/:id" component={LetterDetailContainer} />
      <Route path="/letters/" component={LettersContainer} />
      <Route
        path="/test-student-letters/:id"
        component={LetterTestStudentContainer}
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
