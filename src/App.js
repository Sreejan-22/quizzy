import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Quiz from "./pages/Quiz/Quiz.jsx";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/quiz" component={Quiz}></Route>
        <Route exact path="/">
          <Redirect to="/quiz" />
        </Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
