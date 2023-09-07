import React from "react";
import Header from "./components/Header";
import Router from "./Router";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Router />
      </div>
    </div>
  );
}

export default App;
