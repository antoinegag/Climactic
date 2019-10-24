import React, { useState } from "react";
import DataSummary from "../../components/DataSummary";
import { Collapse, Row, Col } from "reactstrap";

const Data = props => {
  const [collapse, setCollapse] = useState(false);
  const { stations } = props;

  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <span onClick={toggle} className="cursor-pointer">
        <h2 className="mt-2">
          <i className="fas fa-thermometer-three-quarters" /> Data{" "}
        </h2>
        <h5>
          <i className={`fas fa-caret-${collapse ? "down" : "right"} mr-2`} />
        </h5>
      </span>
      <Collapse isOpen={collapse}>
        <Row className="justify-content-md-left">
          {stations.map(station => (
            <Col md="6" key={station.id}>
              <DataSummary station={station} />
            </Col>
          ))}
        </Row>
      </Collapse>
    </>
  );
};

export default Data;
