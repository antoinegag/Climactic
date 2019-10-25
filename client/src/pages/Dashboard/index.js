import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spinner, Row, Container } from "reactstrap";

import Data from "./Data";

const DASHBOARD_QUERY = gql`
  {
    stations(confirmed: true) {
      id
      name
      ip
      confirmed
      status {
        online
        version
      }

      data {
        temp
        humidity
        pressure
      }
    }
  }
`;

const Dashboard = props => {
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);

  return (
    <Container fluid>
      <h1 className="text-center">
        <i className="fas fa-tachometer-alt" /> Dashboard
      </h1>
      <hr />
      {loading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Data stations={data.stations} />
        </>
      )}
    </Container>
  );
};

export default Dashboard;
