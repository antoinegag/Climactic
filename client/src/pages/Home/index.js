import React from "react";
import Station from "../../components/Station";
import { UncontrolledCollapse, Spinner, Container, Row, Col } from "reactstrap";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const STATION_QUERY = gql`
  {
    stations {
      id
      name
      ip
      status {
        online
        version
      }
    }
  }
`;

const Home = props => {
  const { loading, error, data } = useQuery(STATION_QUERY);

  return (
    <div>
      <h1>
        <i className="fa fa-tachometer" /> Dashboard
      </h1>
      <h2 id="toggler-stations" className="cursor-pointer">
        <i className="fa fa-thermometer-three-quarters" /> Stations
      </h2>
      {loading ? (
        <Spinner color="primary" />
      ) : (
        <UncontrolledCollapse toggler="#toggler-stations" defaultOpen={true}>
          <Container>
            <Row className="justify-content-md-left">
              {data.stations.map(station => (
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
