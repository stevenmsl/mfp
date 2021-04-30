import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

/*
  - if we are in development and in isolation,
    call mount immediately
  - if we are running through container, we 
    should export the mount function, and let
    the container calls the mount function
*/

/*
  Navigation
  - two way communication
  - use onNavigate to notify the container 
    that the path has changed
  - return a function that can be used by
    the container to notify the marketing
    subapp that the path has changed   
*/

const mount = (el, { onNavigate, defaultHistory }) => {
  /*
    - use browser history if we are in isolation mode
      - to have better development experience
    - use memory history if we are in container mode
      - to not to interfere with the container routing
  */
  const history = defaultHistory || createMemoryHistory();

  /*
    - notify the container that the path
      has changed (from the subapp up to the container) 
  */
  if (onNavigate) history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);

  /*
    - allow the container to notify the 
      marketing subapp that the path has
      changed
  */
  return {
    onParentNavigate({ pathname: nextPathname }) {
      console.log("Parent navigate to", nextPathname);
      const { pathname } = history.location;

      /*
        - avoid infinite loop
      */
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
