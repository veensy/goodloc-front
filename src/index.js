import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";
import reducers from "./reducers";
import Feature from "./components/Feature";
import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";
import ForgotPassword from "./components/auth/ForgotPassword";

import { INITIAL_STATE } from "./reducers/auth";
import ResetPassword from "./components/auth/ResetPassword";

const store = createStore(
  reducers,
  {
    auth: { ...INITIAL_STATE, authenticated: localStorage.getItem("token") }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature" component={Feature} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/resetpassword/:newToken" component={ResetPassword} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
