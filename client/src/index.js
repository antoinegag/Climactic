import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { WSProvider } from "./hooks/useWS/WSProvider";
const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  },
  mutate: {
    errorPolicy: "all"
  }
};
const client = new ApolloClient({});
client.defaultOptions = defaultOptions;

const wsUrl = new URL("/ws", window.location.href);
wsUrl.protocol = wsUrl.protocol.replace("http", "ws");
wsUrl.port = 8080;
const ws = new WebSocket(wsUrl);

ReactDOM.render(
  <WSProvider client={ws}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </WSProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
