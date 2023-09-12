import React from "react";
import InputForm from "../components/InputForm";
import History from "../components/History";
import "../styles/pages/WorkPage.css";

export default function WorkPage() {
  return (
    <div className="WorkPage_container">
      <div className="WorkPage_wrapper">
        <InputForm />
        <History />
      </div>
    </div>
  );
}
