import React from "react";
import PropTypes from "prop-types";
import StationTable from "./StationTable";
import BlankState from "../../components/NoStationsBlankState";

const RegistredStations = props => {
  return (
    <div>
      <h4>Registred stations</h4>
      {props.stations.length === 0 ? (
        <BlankState />
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
RegistredStations.defaultProps = {
  onAdd: noop,
  onDelete: noop,
  showAdd: true
};

RegistredStations.propTypes = {
  stations: PropTypes.array.isRequired,
  showAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func
};

export default RegistredStations;
