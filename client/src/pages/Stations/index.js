import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";
import Register from "./Register";

const Stations = props => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <h1 className="text-center">
        <i className="fa fa-thermometer-three-quarters" /> Stations
      </h1>
      <hr />
      <Switch>
        <Route exact path={path} component={Home}></Route>
        <Route path={`${path}/edit/:id`} component={Edit}></Route>
        <Route path={`${path}/register`} component={Register}></Route>
      </Switch>
    </>
  );
};

export default Stations;
