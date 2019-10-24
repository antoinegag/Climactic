import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spinner } from "reactstrap";
import StationTable from "./StationTable";
import PropTypes from "prop-types";

const STATIONS_QUERY = gql`
  {
    stations {
      id
      name
      ip
      status {
        online
        version
      }
    }
  }
`;

const Home = props => {
  const { loading, error, data } = useQuery(STATIONS_QUERY);

  return (
    <div className="overflow-auto">
      {loading ? (
        <Spinner color="primary" />
      ) : (
        <StationTable stations={data.stations} />
      )}
    </div>
  );
};

export default Home;
