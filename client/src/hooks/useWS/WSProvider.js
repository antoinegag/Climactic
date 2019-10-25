import React from "react";

import { getWSContext } from "./WSContext";

export const WSProvider = ({ client, children }) => {
  const WSContext = getWSContext();
  return (
    <WSContext.Consumer>
      {(context = {}) => {
        if (client && context.client !== client) {
          context = Object.assign({}, context, { client });
        }

        return (
          <WSContext.Provider value={context}>{children}</WSContext.Provider>
        );
      }}
    </WSContext.Consumer>
  );
};
