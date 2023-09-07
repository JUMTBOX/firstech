import React, { useState } from "react";
import InputForm from "../components/InputForm";
import Header from "../components/Header";
import "../styles/pages/WorkPage.css";
// import Notice from "../components/Notice";
import Router from "../Router";

export default function WorkPage() {
  const [page, setPage] = useState<number>(1);

  return (
    <div className="WorkPage_container">
      <div className="WorkPage_wrapper">
        <InputForm />
      </div>
    </div>
  );
}
