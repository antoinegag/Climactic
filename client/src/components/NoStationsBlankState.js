import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const BlankState = props => {
  return (
    <div className="text-center">
      <h3>No registered station</h3>
      <h2>
        <Button color="success" tag={Link} to={`/stations/register/`}>
          Register new station <i className="fas fa-plus" />
        </Button>
      </h2>
    </div>
  );
};

export default BlankState;
