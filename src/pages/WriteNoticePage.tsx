import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { postFakeData } from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import "../styles/pages/WriteNoticePage.css";

export default function WriteNoticePage() {
  const [isFile, setIsFile] = useState<string>("");
  const tableRef = useRef<any>([]);
  const spanRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  //react-query hook
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(postFakeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fake"]);
      navigate("/notice");
    },
  });
  //파일 업로드
  const handleUpload = () => {
    if (tableRef.current !== null) {
      tableRef.current[1].click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files?.[0].name !== null) {
      setIsFile(e.target.files?.[0].name);
    }
  };

  const deleteFile = () => {
    tableRef.current[1].value = "";
  };

  const handleSubmit = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDay();

    const data = {
      article_id: 3,
      title: tableRef.current[0].value,
      author: "관리자",
      content: tableRef.current[2].value,
      file: tableRef.current[1].value,
      date: `${year}-${month}-${day}`,
    };
    mutateAsync(data);
  };

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <div className="writeNotice_container">
      <table border={1} style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr style={{ height: "10%" }}>
            <td width={"30%"} style={{ backgroundColor: "#d1cfcf" }}>
              제목
            </td>
            <td width={"70%"}>
              <input
                type="text"
                className="title_input"
                ref={(el) => (tableRef.current[0] = el)}
              />
            </td>
          </tr>
          <tr style={{ height: "10%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>작성자</td>
            <td>관리자</td>
          </tr>
          <tr style={{ height: "15%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>첨부파일</td>
            <td
              style={{
                display: "flex",
                height: "100%",
                border: "none",
                alignItems: "center",
                justifyContent: "center",
                gap: "2em",
              }}
            >
              <div className="file_input_wrapper">
                <span onClick={handleUpload} ref={spanRef}>
                  {isFile === "" ? (
                    <AiOutlinePlusCircle size={"1.2em"} />
                  ) : (
                    isFile
                  )}
                </span>
                <input
                  type="file"
                  multiple
                  className="file_input"
                  onChange={handleChange}
                  ref={(el) => (tableRef.current[1] = el)}
                />
              </div>
              <button className="delfile_btn" onClick={deleteFile}>
                <BsTrash size={"1.5em"} />
              </button>
            </td>
          </tr>
          <tr style={{ height: "65%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>내용</td>
            <td>
              <input
                type="text"
                className="content_input"
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
