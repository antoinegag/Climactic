import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import EditStationForm from "./EditStationForm";
import { Container, Spinner } from "reactstrap";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";

const STATION_QUERY = gql`
  query getStation($id: Float!) {
    station(id: $id) {
      id
      name
      ip
    }
  }
`;

const Edit = props => {
  const { params } = useRouteMatch();
  const { id } = params;

  const { data, loading } = useQuery(STATION_QUERY, {
    variables: { id: parseInt(id) }
  });

  return (
    <div>
      <Container>
        <h2>
          <i className="fas fa-wrench"></i> Configure station - #{id}
        </h2>
        {loading ? (
          <Spinner color="primary" />
        ) : (
          <EditStationForm station={data.station} />
        )}
      </Container>
    </div>
  );
};

Edit.propTypes = {};

export default Edit;
