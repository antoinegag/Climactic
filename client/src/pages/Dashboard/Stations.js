import React, { useState } from "react";
import StationSummary from "../../components/StationSummary";
import { Collapse, Row, Col } from "reactstrap";

function Overview(props) {
  const { stations } = props;

  let online = 0;

  stations.forEach(station => {
    if (station.status.online) {
      online++;
    }
  });

  return (
    <>
      Online: {online} | Offline: {stations.length - online} | Total:{" "}
      {stations.length}
    </>
  );
}

const Stations = props => {
  const [collapse, setCollapse] = useState(false);
  const { stations } = props;

  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <span onClick={toggle} className="cursor-pointer">
        <h2 className="mt-2">
          <i className="fas fa-thermometer-three-quarters" /> Stations{" "}
        </h2>
        <h5 onClick={toggle}>
          <i className={`fas fa-caret-${collapse ? "down" : "right"} mr-2`} />
          <Overview stations={stations} />
        </h5>
      </span>
      <Collapse isOpen={collapse}>
        <Row className="justify-content-md-left">
          {stations.map(station => (
            <Col md="4" key={station.id}>
              <StationSummary station={station} />
            </Col>
          ))}
        </Row>
      </Collapse>
    </>
  );
};

export default Stations;
