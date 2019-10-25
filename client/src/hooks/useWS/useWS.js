import React from "react";
import { getWSContext } from "./WSContext";

/**
 * @returns {WebSocket} client
 */
export function useWS() {
  const { client } = React.useContext(getWSContext());

  return client;
}
