import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import {
  useGetOneFakeData,
  modifyFakeData,
  Mod,
} from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atoms";
import { BsTrash } from "react-icons/bs";
export default function NoticeContent() {
  const isLogin = useRecoilValue(loginState);
  const [isModifiable, setIsModifiable] = useState<boolean>(false);
  const tableRef = useRef<any>([]);
  const params = useParams();
  const { data } = useGetOneFakeData(params.id);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(
    (arg: Mod) => modifyFakeData(arg, params.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fakeOne"]);
        setIsModifiable((cur) => false);
      },
    }
  );

  const handleModify = () => {
    if (tableRef.current !== null) {
      let data: Mod = {
        title: tableRef.current[0].value,
        content: tableRef.current[2].value,
      };
      mutateAsync(data);
    }
  };

  const deleteFile = () => {
    if (tableRef.current !== null) {
      tableRef.current[1].value = "";
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["fakeOne"]);
    };
  }, []);

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
                readOnly={!isModifiable}
                defaultValue={data?.title}
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
                justifyContent: "space-around",
              }}
            >
              {isModifiable ? (
                <input
                  type="file"
                  multiple
                  className="file_input"
                  readOnly={true}
                  ref={(el) => (tableRef.current[1] = el)}
                />
              ) : (
                <input type="text" value={"파일"} readOnly />
              )}
              {isModifiable ? (
                <button className="delfile_btn" onClick={deleteFile}>
                  <BsTrash size={"1.5em"} />
                </button>
              ) : null}
            </td>
          </tr>
          <tr style={{ height: "65%" }}>
            <td style={{ backgroundColor: "#d1cfcf" }}>내용</td>
            <td>
              <textarea
                className="content_input"
                readOnly={!isModifiable}
                defaultValue={data?.content}
                ref={(el) => (tableRef.current[2] = el)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn_wrapper">
        {isModifiable ? (
          <>
            <button className="noticeWrite_subBtn" onClick={handleModify}>
              등록
            </button>
            <button onClick={() => setIsModifiable((cur) => false)}>
              취소
            </button>
          </>
        ) : isLogin ? (
          <button
            className="noticeWrite_subBtn"
            onClick={() => setIsModifiable((cur) => true)}
          >
            수정
          </button>
        ) : null}
      </div>
    </div>
  );
}
