import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Container } from "reactstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Stats from "./pages/Stats";
import Dashboard from "./pages/Dashboard";
import Stations from "./pages/Stations";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventNotifier from "./hoc/EventNotifier";

toast.configure({ draggable: true, draggablePercent: 40 });

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <EventNotifier>
          <NavBar />
          <Container fluid className="pt-2">
            <Route exact path="/" component={Dashboard} />
            <Route path="/stats" component={Stats} />
            <Route path="/stations" component={Stations} />
          </Container>
          <ToastContainer />
        </EventNotifier>
      </BrowserRouter>
    </div>
  );
}

export default App;
