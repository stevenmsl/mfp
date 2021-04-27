import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

/*
  - why using mount?
    - the container shouldn't assume that a child is
      using a particular framework like React 
    - so mount should be generic and can't be
      a React component for example  
*/

/*
  - we are creating a React component that uses
    mount to pass in a div, where a child can 
    render itself
  - don't forget that the container is built using
    React so it's fine to define a React component
    as we still make no assumption of the framework
    used by the child  
*/

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref}></div>;
};
