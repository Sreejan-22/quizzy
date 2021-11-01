import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/quiz" component={Quiz} />
        <Route exact path="/" component={Home}></Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
