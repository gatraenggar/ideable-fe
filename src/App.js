import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import EmailVerification from './Pages/EmailVerification';
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <Route exact path="/email-verification/:authToken" component={EmailVerification} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
