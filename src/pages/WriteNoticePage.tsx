import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import "../styles/pages/WriteNoticePage.css";

export default function WriteNoticePage() {
  const tableRef = useRef<any>([]);
  const navigate = useNavigate();

  const deleteFile = () => {
    tableRef.current[1].value = "";
  };

  const handleSubmit = () => {
    // const title = tableRef.current[0].value;
    // const file = tableRef.current[1].value;
    // const content = tableRef.current[2].value;
    //글 등록 비동기 요청
  };

  return (
    <div className="writeNotice_container">
      <table border={1} style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr style={{ height: "10%" }}>
            <td width={"30%"} style={{ backgroundColor: "#d1cfcf" }}>
              제목
            </td>
            <td width={"70%"}>
              <textarea
                className="title_input"
                ref={(el) => (tableRef.current[0] = el)}
              />
            </td>
          </tr>
          <tr style={{ height: "10%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>작성자</td>
            <td>관리자</td>
          </tr>
          <tr style={{ height: "10%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>첨부파일</td>
            <td
              style={{
                display: "flex",
                height: "100%",
                border: "none",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <input
                type="file"
                className="file_input"
                ref={(el) => (tableRef.current[1] = el)}
                readOnly={true}
              />
              <button className="delfile_btn" onClick={deleteFile}>
                <BsTrash size={"1.5em"} />
              </button>
            </td>
          </tr>
          <tr style={{ height: "70%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>내용</td>
            <td>
              <textarea
                style={{ width: "90%", height: "85%", resize: "none" }}
                ref={(el) => (tableRef.current[2] = el)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn_wrapper">
        <button className="noticeWrite_subBtn" onClick={handleSubmit}>
          등록
        </button>
        <button
          className="noticeWrite_quitBtn"
          onClick={() => navigate("/notice")}
        >
          취소
        </button>
      </div>
    </div>
  );
}
