// Render Prop
import React from "react";
import { Formik } from "formik";
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

const REGISTER_MUTATION = gql`
  mutation registerStation($ip: String!, $name: String!) {
    registerStation(ip: $ip, name: $name) {
      success
      error
    }
  }
`;

const RegisterStationForm = props => {
  const [register] = useMutation(REGISTER_MUTATION);
  const history = useHistory();

  return (
    <Formik
      initialValues={{ name: "", ip: "" }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        const res = await register({
          variables: {
            ip: values.ip,
            name: values.name
          }
        });
        const { error, success } = res.data.registerStation;
        if (!success) {
          setFieldError("error", error);
          toast.error("Error registering station!");
        } else {
          toast.success("Station registration success!");
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
                  required
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
                  required
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterStationForm;
