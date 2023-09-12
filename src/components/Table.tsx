import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notice, deleteFakeData } from "../requestHooks/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Table({ data }: { data: Notice[] }) {
  const checkRef = useRef<any>([]);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteFakeData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fake"]);
    },
  });

  const handleDelete = () => {
    checkRef.current.forEach((el: HTMLInputElement) => {
      if (el.checked === true && el.parentElement?.nextSibling?.textContent) {
        let data = el.parentElement?.nextSibling?.textContent;
        mutate(data);
      }
    });
  };

  let empty: Notice = {
    article_id: null,
    title: "",
    content: "",
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
                  <input
                    type="checkbox"
                    ref={(el) => (checkRef.current[idx] = el)}
                  />
                </td>
                <td>{el.article_id}</td>
                <td>
                  <Link to={`/notice/${el.article_id}`}>{el.title}</Link>
                </td>
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
          등록
        </button>
        <button className="notice_delBtn" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </>
  );
}
