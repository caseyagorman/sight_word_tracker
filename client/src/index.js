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
import StudentChartsContainer from "./containers/StudentChartsContainer";
import StudentDetailContainer from "./containers/StudentDetailContainer";
import AddStudentFormContainer from "./containers/AddStudentFormContainer";
import TestStudentContainer from "./containers/TestStudentContainer";

// Words
import WordDetailContainer from "./containers/WordDetailContainer";
import WordChartsContainer from "./containers/WordChartsContainer";
import WordsContainer from "./containers/WordsContainer";
import AddWordFormContainer from "./containers/AddWordFormContainer";

// Letters
import LettersContainer from "./containers/LettersContainer";
import LetterChartsContainer from "./containers/LetterChartsContainer";
import LetterDetailContainer from "./containers/LetterDetailContainer";
import AddLetterFormContainer from "./containers/AddLetterFormContainer";

// Sounds
import SoundDetailContainer from "./containers/SoundDetailContainer";
import SoundChartsContainer from "./containers/SoundChartsContainer";
import SoundsContainer from "./containers/SoundsContainer";
import AddSoundFormContainer from "./containers/AddSoundFormContainer";

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
      <Route path="/student-charts/" component={StudentChartsContainer} />
      <Route path="/add-student/" component={AddStudentFormContainer} />
      <Route path="/add-word/" component={AddWordFormContainer} />
      <Route path="/add-letter/" component={AddLetterFormContainer} />
      <Route path="/add-sound/" component={AddSoundFormContainer} />
      <Route path="/words/" component={WordsContainer} />
      <Route path="/word-charts/" component={WordChartsContainer} />
      <Route path="/details/:id" component={StudentDetailContainer} />
      <Route path="/word-detail/:id" component={WordDetailContainer} />
      <Route path="/letter-detail/:id" component={LetterDetailContainer} />
      <Route path="/letters/" component={LettersContainer} />
      <Route path="/letter-charts/" component={LetterChartsContainer} />
      <Route path="/sound-detail/:id" component={SoundDetailContainer} />
      <Route path="/sounds/" component={SoundsContainer} />
      <Route path="/sound-charts/" component={SoundChartsContainer} />
      <Route path="/test-student/:id" component={TestStudentContainer} />
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
