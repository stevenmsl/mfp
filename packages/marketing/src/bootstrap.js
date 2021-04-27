import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/*
  - if we are in development and in isolation,
    call mount immediately
  - if we are running through container, we 
    should export the mount function, and let
    the container calls the mount function
*/

const mount = (el) => {
  ReactDOM.render(<App />, el);
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
