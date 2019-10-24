import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Button } from "reactstrap";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";

const BEEP_MUTATION = gql`
  mutation beep($double: Boolean, $id: Float!) {
    beep(double: $double, stationId: $id)
  }
`;

const StationSummary = props => {
  const { id, name, ip, status } = props.station;
  const { online, version } = status;
  const [beep, { data }] = useMutation(BEEP_MUTATION);

  return (
    <div className="border px-4 py-2 my-2">
      <Row>
        <h4>{name} </h4>
      </Row>
      <Row>
        <span>Status: </span>
        <div className={online ? "text-success" : "text-danger"}>
          {online ? (
            <span className="ml-1">
              Online <i className="fas fa-check" />
            </span>
          ) : (
            <span className="ml-1">
              Offline <i className="fas fa-times" />
            </span>
          )}
        </div>
      </Row>
      <Row>
        {ip} - v.{version ? version : " ?"}
      </Row>
      <Row className="justify-content-end">
        <Button
          color="info"
          onClick={() => {
            beep({ variables: { id, double: true } });
            toast.info(`Rang station ${name}`);
          }}
        >
          <i className="fa fa-bell" />
        </Button>
      </Row>
    </div>
  );
};

StationSummary.propTypes = {
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

export default StationSummary;
