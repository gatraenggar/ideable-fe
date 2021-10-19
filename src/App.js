import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login}>
          <Redirect to="/" />
        </Route>
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
