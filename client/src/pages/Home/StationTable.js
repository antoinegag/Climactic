import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

const StationTable = props => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>IP</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {props.stations.map(station => (
            <tr scope="row">
              <td>{station.name}</td>
              <td>
                {station.status.online ? (
                  <span className="text-success">
                    Online <i class="fa fa-check" />
                  </span>
                ) : (
                  <span className="text-danger">
                    Offline <i class="fa fa-times" />
                  </span>
                )}
              </td>
              <td>{station.ip}</td>
              <td>
                {station.status.version ? station.status.version : "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

StationTable.propTypes = {
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
