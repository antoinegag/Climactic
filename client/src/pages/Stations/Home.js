import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spinner } from "reactstrap";
import StationTable from "./StationTable";
import PropTypes from "prop-types";
import confirm from "reactstrap-confirm";

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

const DELETE_MUTATION = gql`
  mutation deleteStation($id: Float!) {
    deleteStation(id: $id) {
      success
      error
    }
  }
`;

const Home = props => {
  const { loading, error, data, refetch } = useQuery(STATIONS_QUERY);
  const [remove, { removeData }] = useMutation(DELETE_MUTATION);

  const handleDelete = async (id, name) => {
    if (
      await confirm({
        title: `Delete ${name} ?`,
        message: "Note: data collected from this station will stay available",
        confirmText: "Delete",
        confirmColor: "danger"
      })
    ) {
      await remove({ variables: { id: id } });
      refetch();
    }
  };

  return (
    <div className="overflow-auto">
      {loading ? (
        <Spinner color="primary" />
      ) : (
        <StationTable stations={data.stations} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
