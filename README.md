<br />
<p align="center">
  <a href="https://github.com/antoinegag/climactic">
    <img src="logo-96.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Climactic</h3>

  <p align="center">
    Over the air environmental data collection and statistics
    <br />
    <!-- <a href="https://github.com/antoinegag/climactic"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://www.youtube.com/watch?v=fq074l-mFFE">View Demo</a>
    ·
    <a href="https://github.com/antoinegag/climactic/issues">Report Bugs</a>
    ·
    <a href="https://github.com/antoinegag/climactic/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
  - [Stations](#stations)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [License](#license)
- [Contact](#contact)

## About The Project

Climactic is a system that lets you monitor real time environmental data from "stations" anywhere on your network as well as visualize historical data and statistics.

### Stations

Stations are network enabled devices that provide environmental data.

You can have as many stations as you want and assign them names.

Stations currently measure 3 different environmental data

- Temperature
- Humidity
- Pressure

Read more about them at [antoinegag/climactic-stations](https://github.com/antoinegag/climactic-station)

### Built With

- [NodeJS](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/) and [Apollo GraphQL](https://www.apollographql.com/)
- [Express](https://expressjs.com/)
- [reactstrap](https://reactstrap.github.io/)
- [Font Awesome](https://fontawesome.com)
- [Formik](https://jaredpalmer.com/formik/)
- ... and more!

## Getting Started

**WARNING: this project is still in early development phase, if you want to work on it consider contacting me first by opening an issue or on twitter @antoinegag_dev**

To get a local copy up and running follow these simple steps.

### Prerequisites

- Yarn or NPM

### Installation

1. Clone the repo

```sh
git clone https:://github.com/antoinegag/climactic.git
```

2. Install the dependencies

Since we have two modules here, you will need to go into both and install the deps.

You can run this command to download all packages

```sh
yarn && cd client && yarn && cd ../server && yarn && cd ..
```

or if you use npm

```sh
npm i && cd client && npm i && cd ../server && npm i && cd ..
```

3. Start the server with `yarn dev` or `npm run dev`

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Twitter: [@antoinegag_dev](https://twitter.com/antoinegag_dev)

Project Link: [https://github.com/antoinegag/climactic](https://github.com/antoinegag/climactic)
