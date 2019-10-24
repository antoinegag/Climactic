import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "reactstrap";
import confirm from "reactstrap-confirm";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { Link } from "react-router-dom";

const BEEP_MUTATION = gql`
  mutation beep($double: Boolean, $id: Float!) {
    beep(double: $double, stationId: $id)
  }
`;

const StationTable = props => {
  const [beep, { beepData }] = useMutation(BEEP_MUTATION);

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>IP</th>
          <th>Version</th>
          <th style={{ textAlign: "right" }}>
            <Button color="success" tag={Link} to={`/stations/register/`}>
              <i className="fas fa-plus" />
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.stations.map(station => (
          <tr scope="row" key={station.id}>
            <td>{station.name}</td>
            <td>
              {station.status.online ? (
                <span className="text-success">
                  Online <i className="fa fa-check" />
                </span>
              ) : (
                <span className="text-danger">
                  Offline <i className="fa fa-times" />
                </span>
              )}
            </td>
            <td>{station.ip}</td>
            <td>
              {station.status.version ? station.status.version : "Unknown"}
            </td>
            <td style={{ textAlign: "right" }}>
              <Button
                onClick={() =>
                  beep({ variables: { id: station.id, double: true } })
                }
                color="info"
              >
                <i className="fas fa-bell" />
              </Button>
              <Button
                onClick={() => {
                  props.onDelete(station.id, station.name);
                }}
                color="danger"
                className="ml-md-2"
              >
                <i className="fas fa-times" />
              </Button>
              <Button
                tag={Link}
                to={`/stations/edit/${station.id}`}
                className="ml-md-2"
                color="primary"
              >
                <i className="fas fa-cog" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

StationTable.propTypes = {
  onDelete: PropTypes.func.isRequired,
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ip: PropTypes.string.isRequired,
      status: PropTypes.shape({
        online: PropTypes.bool.isRequired,
        version: PropTypes.string
      }).isRequired
    }).isRequired
  ).isRequired
};

export default StationTable;
