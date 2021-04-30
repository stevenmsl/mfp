import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

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

export default () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/pricing" component={Pricing}></Route>
            <Route path="/" component={Landing}></Route>
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
};
