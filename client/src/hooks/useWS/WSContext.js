import React from "react";

let wsContext;

export function getWSContext() {
  if (!wsContext) {
    wsContext = React.createContext({});
  }
  return wsContext;
}

export function resetWSContext() {
  wsContext = React.createContext({});
}
