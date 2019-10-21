import React, { useState, useEffect } from "react";
import "./App.css";

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

  console.log(apiRes);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          API:{" "}
          {isLoading ? "Loading..." : apiRes ? "OK" : "Error connecting to API"}
        </h1>
      </header>
    </div>
  );
}

export default App;
