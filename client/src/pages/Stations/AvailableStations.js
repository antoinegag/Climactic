import React from "react";
import PropTypes from "prop-types";
import StationTable from "./StationTable";

const AvailableStations = props => {
  return (
    <div>
      <h5>
        <i className="fas fa-wifi" /> Available stations
      </h5>
      {props.stations.length === 0 ? (
        <>
          <span className="text-muted ">No stations available</span>
        </>
      ) : (
        <StationTable
          stations={props.stations}
          showAdd={false}
          onAdd={props.onAdd}
          onDelete={props.onDelete}
        />
      )}
    </div>
  );
};

const noop = () => {};
AvailableStations.defaultProps = {
  onAdd: noop,
  onDelete: noop,
  showAdd: true
};

AvailableStations.propTypes = {
  stations: PropTypes.array.isRequired,
  showAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func
};

export default AvailableStations;
