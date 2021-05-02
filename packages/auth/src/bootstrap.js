import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    /*
      - if you don't provide an initial value to 
        the memory history it will default to "/"
      - this will be a problem because the 
        container's browser history will be 
        /auth/signin when the login button 
        in the container is clicked
      - but in the auth subapp it still thinks the
        path is "/", and hence it will render nothing
        as there is no home page in the auth subapp
      - the solution is to let the container tell you
        what the current path is, and the auth subapp
        can use that as the initial value    
        
    */

    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      console.log("auth: parent navigate to", nextPathname);
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
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
