import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/AuthApp";
import Header from "./components/Header";

/*
  - avoid name collisions for production builds
*/
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

/*
  Navigation
  - the container should use browser history
  - all subapps should use memory history
*/

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Switch>
            <Route path="/auth" component={AuthApp} />
            <Route path="/" component={MarketingApp} />
          </Switch>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
