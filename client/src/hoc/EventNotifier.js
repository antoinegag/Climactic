import React from "react";
import { useWS } from "../hooks/useWS/useWS";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const EventNotifier = props => {
  const client = useWS();

  client.onmessage = ev => {
    const { event } = JSON.parse(ev.data);

    if (event === "discover") {
      toast.info(({ closeToast }) => (
        <>
          <Button color="primary" className="mr-2" tag={Link} to="/stations/">
            View
          </Button>
          New device found!
        </>
      ));
    }
  };

  return props.children;
};

EventNotifier.propTypes = {};

export default EventNotifier;
