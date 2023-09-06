import React, { useState } from "react";
import InputForm from "../components/InputForm";
import "../styles/pages/WorkPage.css";

export default function WorkPage() {
  const [result, setResult] = useState<string>("");

  return (
    <div className="WorkPage_container">
      <div className="WorkPage_wrapper">
        <InputForm setResult={setResult} />
        <div className="WorkPage_contentBox">
          <textarea value={result} />
        </div>
      </div>
    </div>
  );
}
