// Render Prop
import React from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Alert
} from "reactstrap";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const UPDATE_MUTATION = gql`
  mutation updateStation($station: StationInput!) {
    updateStation(station: $station) {
      success
      error
    }
  }
`;

const EditStationForm = props => {
  const { onSubmit: handleSubmit, station } = props;
  const { id, name, ip } = station;
  const [update] = useMutation(UPDATE_MUTATION);
  const history = useHistory();

  return (
    <Formik
      initialValues={{ name, ip }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        const res = await update({
          variables: {
            station: {
              id: id,
              ip: values.ip,
              name: values.name
            }
          }
        });
        const { error, success } = res.data.updateStation;
        if (!success) {
          setFieldError("error", error);
          toast.error("Error saving toast configuration!");
        } else {
          toast.success("Station configuration saved!");
          history.push("/stations/");
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          {errors.error && <Alert color="danger">Error: {errors.error}</Alert>}
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Station name"
                  onChange={handleChange}
                  value={values.name}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="ip">IP address</Label>
                <Input
                  type="text"
                  name="ip"
                  id="ip"
                  placeholder="xxx.xxx.xxx.xxx"
                  onChange={handleChange}
                  value={values.ip}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" color="primary" disabled={isSubmitting}>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

EditStationForm.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired
  }).isRequired
};

export default EditStationForm;
