import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Table } from "reactstrap";
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
  const { name, data } = props.station;

  return (
    <div className="border px-4 py-2 my-2">
      <h4>{name} </h4>
      <Table>
        <thead>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Pressure</th>
        </thead>
        <tbody>
          <th>{data ? data.temp : "?"} &deg;C</th>
          <th>{data ? data.humidity : "?"} %</th>
          <th>{data ? data.pressure : "?"} pa</th>
        </tbody>
      </Table>
      {/* <DataPlot /> */}
    </div>
  );
};

DataSummary.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired
    })
  }).isRequired
};
export default DataSummary;
