import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

/*
  - avoid name collisions for production builds
*/
const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});

/*
  Navigation
  - the container should use browser history
  - all subapps should use memory history
*/

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing}></Route>
            <Route path="/" component={Landing}></Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
