import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Container } from "reactstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Stats from "./pages/Stats";
import Home from "./pages/Home";

function App() {
  const [apiRes, setApiRes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/`)
      .then(res => res.json())
      .then(response => {
        setApiRes(response.success);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Container className="pt-2">
          <Route exact path="/" component={Home} />
          <Route path="/stats" component={Stats} />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
