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

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  /*
    - use browser history if we are in isolation mode
      - to have better development experience
    - use memory history if we are in container mode
      - to not to interfere with the container routing
  */
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

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
      console.log("marketing: parent navigate to", nextPathname);
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

/*
  - #SUBAPPTS04
  - you need to add tsconfig.json and set the include
    option so you won't see the "process" can't be found
    error:
    "include": [
      "./src"
    ] 
  - tsconfig.json  
*/

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot, {
      onNavigate: undefined,
      defaultHistory: createBrowserHistory<any>(),
      initialPath: undefined,
    });
  }
}

export { mount };
