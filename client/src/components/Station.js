import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Badge } from "reactstrap";
import StationAPI from "../api/StationAPI";

const Station = props => {
  const { id, name, ip, status } = props.station;
  const { online, version } = status;

  return (
    <Container>
      <Row>
        <h4>{name} </h4>
      </Row>
      <Row>
        <span>Status: </span>
        <div className={online ? "text-success" : "text-danger"}>
          {online ? (
            <span className="ml-1">
              Online <i className="fa fa-check" />
            </span>
          ) : (
            <span className="ml-1">
              Offline <i className="fa fa-times" />
            </span>
          )}
        </div>
      </Row>
      <Row>
        {ip} - v.{version ? version : "Unknown"}
      </Row>
      <Row className="justify-content-end">
        <i
          class="fa fa-bell cursor-pointer ml-2"
          onClick={() => StationAPI.locate(id, true)}
        />
        <i
          class="fa fa-cog cursor-pointer ml-2"
          onClick={() => StationAPI.locate(id, true)}
        />
      </Row>
    </Container>
  );
};

Station.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
    status: PropTypes.shape({
      online: PropTypes.bool.isRequired,
      version: PropTypes.string
    }).isRequired
  }).isRequired
};

export default Station;
