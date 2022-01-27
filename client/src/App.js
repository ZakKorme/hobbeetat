import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";
import Registration from "./containers/Registration/Registration";
import EmailConfirmation from "./components/EmailConfirmation/EmailConfirmation.js";
import AuthLayout from "./layout/auth";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/email-confirmation" component={EmailConfirmation} />
            <ProtectedRoute
              path="/home"
              render={props => <AuthLayout {...props} />}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
