import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Results from "./pages/Results/Results.jsx";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/results" component={Results} />
        <Route exact path="/" component={Home}></Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
