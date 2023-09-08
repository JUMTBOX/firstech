import React from "react";
import { useNavigate } from "react-router-dom";
import { Notice } from "../requestHooks/request";

export default function Table({ data }: { data: Notice[] }) {
  const navigate = useNavigate();

  let empty: Notice = {
    article_id: null,
    title: "",
    author: "",
    date: "",
  };

  return (
    <>
      <table border={1}>
        <tbody>
          <tr style={{ backgroundColor: "#dedede" }}>
            <td width={"10%"}></td>
            <td width={"10%"}>no</td>
            <td width={"50%"}>제 목</td>
            <td width={"15%"}>작성자</td>
            <td width={"15%"}>작성일</td>
          </tr>
          {data.map((el, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{el.article_id}</td>
                <td>{el.title}</td>
                <td>{el.author}</td>
                <td>{el.date}</td>
              </tr>
            );
          })}
          {data.length < 5
            ? Array(5 - data.length)
                .fill(empty)
                .map((el, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <input
                          type="checkbox"
                          style={{ visibility: "hidden" }}
                        />
                      </td>
                      <td>{el.article_id}</td>
                      <td>{el.title}</td>
                      <td>{el.author}</td>
                      <td>{el.date}</td>
                    </tr>
                  );
                })
            : null}
        </tbody>
      </table>
      <div className="btn_wrapper">
        <button
          className="notice_subBtn"
          onClick={() => navigate("/notice/write")}
        >
          글쓰기
        </button>
        <button className="notice_delBtn">삭제</button>
      </div>
    </>
  );
}
