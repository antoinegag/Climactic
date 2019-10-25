import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Container } from "reactstrap";
import confirm from "reactstrap-confirm";
import { toast } from "react-toastify";
import RegisterStationForm from "./RegisterStationForm";
import AvailableStations from "../AvailableStations";
import { useHistory } from "react-router-dom";

const STATIONS_QUERY = gql`
  {
    stations(confirmed: false) {
      id
      name
      ip
      confirmed
      status {
        online
        version
      }
    }
  }
`;

const CONFIRM_MUTATION = gql`
  mutation confirm($id: Float!) {
    confirmStation(id: $id) {
      error
      success
    }
  }
`;

const Register = props => {
  const { loading, error, data, refetch } = useQuery(STATIONS_QUERY);
  const [confirmStation] = useMutation(CONFIRM_MUTATION);
  const history = useHistory();

  const handleAdd = async (id, name) => {
    if (
      await confirm({
        title: `Add ${name} ?`,
        message: "This device will be able to interact with the system",
        confirmText: "Add",
        confirmColor: "success"
      })
    ) {
      const res = await confirmStation({ variables: { id: id } });
      const { success, error } = res.data.confirmStation;
      if (!success) {
        toast.error("Error adding station: " + error);
      } else {
        toast.success(`Successfully added ${name}!`);
        history.push("/stations/");
      }
    }
  };

  return (
    <div>
      <Container>
        <h2>
          <i className="fas fa-wifi"></i> Register new station
        </h2>
        <RegisterStationForm />
        <hr />
        {!loading && data.stations.length !== 0 && (
          <AvailableStations
            stations={data.stations}
            onAdd={handleAdd}
            showAdd={false}
          />
        )}
      </Container>
    </div>
  );
};

Register.propTypes = {};

export default Register;
