import React from "react";
import "../styles/pages/WriteNoticePage.css";

export default function WriteNoticePage() {
  return (
    <div className="writeNotice_container">
      <table border={1} style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr style={{ height: "10%" }}>
            <td width={"30%"}></td>
            <td width={"70%"}></td>
          </tr>
          <tr style={{ height: "10%" }}>
            <td></td>
            <td></td>
          </tr>
          <tr style={{ height: "15%" }}>
            <td></td>
            <td></td>
          </tr>
          <tr style={{ height: "65%" }}>
            <td></td>
            <td>
              <textarea
                style={{ width: "90%", height: "85%", resize: "none" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
