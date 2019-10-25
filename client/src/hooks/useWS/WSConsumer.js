import React from "react";
import { getWSContext } from "./WSContext";

export const WSConsumer = props => {
  const WSContext = getWSContext();
  return (
    <WSContext.Consumer>
      {context => {
        return props.children(context.client);
      }}
    </WSContext.Consumer>
  );
};
