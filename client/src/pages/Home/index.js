import React, { useEffect, useState } from "react";
import StationAPI from "../../api/StationAPI";
import Station from "../../components/Station";
import { UncontrolledCollapse, Spinner, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Home = props => {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const stationList = await StationAPI.list();
    setStations(stationList);

    setIsLoading(false);
  }, []);

  return (
    <div>
      <h1>
        <i className="fa fa-tachometer" /> Dashboard
      </h1>
      <h2 id="toggler-stations" className="cursor-pointer">
        <i className="fa fa-thermometer-three-quarters" /> Stations
      </h2>
      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <UncontrolledCollapse toggler="#toggler-stations" defaultOpen={true}>
          <Container>
            <Row className="justify-content-md-left">
              {stations.map(station => (
                <Col className="border px-4 py-2 mx-2 my-2" md="4">
                  <Station station={station} />
                </Col>
              ))}
            </Row>
          </Container>
        </UncontrolledCollapse>
      )}
    </div>
  );
};

Home.propTypes = {};

export default Home;
