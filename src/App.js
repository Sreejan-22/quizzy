import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Results from "./pages/Results/Results.jsx";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import "./App.css";
import { isAuthenticated } from "./utils/auth.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          {isAuthenticated() ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route path="/login">
          {isAuthenticated() ? <Redirect to="/" /> : <Login />}
        </Route>
        <PrivateRoute path="/quiz" component={Quiz} />
        <PrivateRoute path="/results" component={Results} />
        <PrivateRoute exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
