import React from "react";
import { RecoilRoot } from "recoil";
import Header from "./components/Header";
import Router from "./Router";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Header />
        <div className="main">
          <Router />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
