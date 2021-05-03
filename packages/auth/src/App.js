import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

/*
  - avoid name collisions for production builds
*/
const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

/*
  Navigation
  - the container should use browser history
  - all subapps should use memory history
*/

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn}></Signin>
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn}></Signup>
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
