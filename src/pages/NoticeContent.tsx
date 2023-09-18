import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetOneFakeData,
  modifyFakeData,
  Mod,
} from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atoms";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Loader from "../components/Loader";

export default function NoticeContent() {
  const [isModifiable, setIsModifiable] = useState<boolean>(false);
  const tableRef = useRef<any>([]);
  const params = useParams();
  const navigate = useNavigate();

  //recoil hook
  const isLogin = useRecoilValue(loginState);

  //react-query hook
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetOneFakeData(params.id);

  const { mutateAsync } = useMutation(
    (arg: Mod) => modifyFakeData(arg, params.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fakeOne"]);
        setIsModifiable((cur) => false);
      },
    }
  );
  //파일 업로드
  const handleUpload = () => {
    if (tableRef.current !== null) {
      tableRef.current[1].click();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0].name);
  };

  //수정 후 제출
  const handleModify = () => {
    if (tableRef.current !== null) {
      let data: Mod = {
        title: tableRef.current[0].value,
        content: tableRef.current[2].value,
      };
      mutateAsync(data);
    }
  };
  //첨부 파일 지우기
  const deleteFile = () => {
    if (tableRef.current !== null) {
      tableRef.current[1].value = "";
    }
  };

  useEffect(() => {
    // 컴포넌트가 언마운트 될 때 "fakeOne"쿼리를 삭제
    // invalidateQueries를 사용하면 원하던 결과가 안나옴
    // <짐작>
    // 컴포넌트가 언마운트 되면서 stale상태로 만들면, 곧바로 refetching하기 때문에
    // useGetOneFakeData에 인자로 들어가는 params는 처음 마운트 시킬 때의 params와 똑같다
    // 따라서 캐싱되어 있는 공지 글 데이터는 stale 시키기 전 상태와 같다
    // 그래서 다른 글 제목을 클릭하여, 다시 이 컴포넌트가 마운트 되고 params가 바뀌더라도
    // invalidate 시키고 refetching하는 시점은 지금이 아니기 때문에 캐싱된 데이터를 사용한다
    // 그래서 params가 바뀌어도 화면에 지난 글과 동일한 데이터가 나온다.
    return () => {
      queryClient.removeQueries(["fakeOne"]);
    };
  }, []);

  if (isLoading) {
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
                justifyContent: "center",
                gap: "2em",
              }}
            >
              {isModifiable ? (
                <div className="file_input_wrapper">
                  <span onClick={handleUpload}>
                    <AiOutlinePlusCircle size={"1.2em"} />
                  </span>
                  <input
                    type="file"
                    multiple
                    className="file_input"
                    onChange={handleChange}
                    ref={(el) => (tableRef.current[1] = el)}
                    readOnly
                  />
                </div>
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
        {isModifiable ? null : (
          <button
            className="noticeWrite_quitBtn"
            id="to_list"
            onClick={() => navigate("/notice")}
          >
            목록으로
          </button>
        )}
      </div>
    </div>
  );
}
