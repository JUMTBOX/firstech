import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetOneFakeData } from "../requestHooks/request";
import { useQueryClient } from "@tanstack/react-query";
export default function NoticeContent() {
  const [isModifiable, setIsModifiable] = useState<boolean>(true);
  const params = useParams();
  const { data } = useGetOneFakeData(params.id);

  const queryClient = useQueryClient();

  const handleModify = () => {
    setIsModifiable((cur) => false);
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
                readOnly={isModifiable}
                defaultValue={data?.title}
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
                justifyContent: "space-around",
              }}
            >
              <input type="file" className="file_input" readOnly={true} />
            </td>
          </tr>
          <tr style={{ height: "65%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>내용</td>
            <td>
              <textarea
                style={{ width: "90%", height: "85%", resize: "none" }}
                readOnly={isModifiable}
                defaultValue={data?.content}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn_wrapper">
        <button className="noticeWrite_subBtn" onClick={handleModify}>
          수정
        </button>
        <button>취소</button>
      </div>
    </div>
  );
}
