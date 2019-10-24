import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Container } from "reactstrap";
import RegisterStationForm from "./RegisterStationForm";

const Register = props => {
  return (
    <div>
      <Container>
        <h2>
          <i className="fas fa-wifi"></i> Register new station
        </h2>
        <RegisterStationForm />
      </Container>
    </div>
  );
};

Register.propTypes = {};

export default Register;
