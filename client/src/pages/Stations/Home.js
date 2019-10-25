import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Spinner } from "reactstrap";
import StationTable from "./StationTable";
import PropTypes from "prop-types";
import confirm from "reactstrap-confirm";
import BlankState from "../../components/NoStationsBlankState";
import { toast } from "react-toastify";
import AvailableStations from "./AvailableStations";
import RegistredStations from "./RegistredStations";

const STATIONS_QUERY = gql`
  {
    stations {
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

const DELETE_MUTATION = gql`
  mutation deleteStation($id: Float!) {
    deleteStation(id: $id) {
      success
      error
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

const Home = props => {
  const { loading, error, data, refetch } = useQuery(STATIONS_QUERY);
  const [remove, { removeData }] = useMutation(DELETE_MUTATION);
  const [confirmStation, { confirmData }] = useMutation(CONFIRM_MUTATION);

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
      console.log(res);
      const { success, error } = res.data.confirmStation;
      if (!success) {
        toast.error("Error adding station: " + error);
      } else {
        toast.success(`Successfully added ${name}!`);
        refetch();
      }
    }
  };

  if (loading) return <Spinner color="primary" />;

  const confirmed = data.stations.filter(station => station.confirmed);
  const available = data.stations.filter(station => !station.confirmed);

  return (
    <div className="overflow-auto">
      <RegistredStations stations={confirmed} onDelete={handleDelete} />

      <AvailableStations
        stations={available}
        showAdd={false}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Home;
