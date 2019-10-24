import React from "react";
import PropTypes from "prop-types";
import { Table, Badge, Button } from "reactstrap";
import Plot from "react-plotly.js";

const randomData = (max, min) => {
  const data = [];
  for (let i = 1; i <= 24; i++) {
    const random = (Math.random() * (+max - +min) + +min).toFixed(2);
    data.push(random);
  }

  return data;
};

function DataPlot() {
  const time = [];
  for (let i = 1; i <= 24; i++) {
    time.push(`${i}:00`);
  }

  return (
    <Plot
      className="border"
      data={[
        {
          name: "Temperature",
          x: time,
          y: randomData(27, 18),
          type: "scatter",
          mode: "lines+points",
          marker: { color: "red" }
        },
        {
          name: "Humidity",
          x: time,
          y: randomData(40, 25),
          type: "scatter",
          mode: "lines+points",
          marker: { color: "blue" }
        }
      ]}
      layout={{ title: "Last 24h" }}
    />
  );
}

const DataSummary = props => {
  const { id, name, ip, data, status } = props.station;

  return (
    <div className="border px-4 py-2 my-2">
      <h4>
        {name} <small className="text-muted">{ip}</small>
        <span className="float-right">
          <Badge color={status.online ? "success" : "danger"}>
            {status.online ? "Online" : "Offline"}
          </Badge>
        </span>
      </h4>
      <Table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Pressure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data ? data.temp : "?"} &deg;C</td>
            <td>{data ? data.humidity : "?"} %</td>
            <td>{data ? data.pressure : "?"} pa</td>
          </tr>
        </tbody>
      </Table>
      <span className="text-muted">
        v.{status.version ? status.version : " ?"}
      </span>
    </div>
  );
};

DataSummary.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
    data: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired
    }),
    status: PropTypes.shape({
      online: PropTypes.bool.isRequired,
      version: PropTypes.string
    }).isRequired
  }).isRequired
};
export default DataSummary;
