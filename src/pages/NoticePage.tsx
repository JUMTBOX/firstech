import React from "react";
import "../styles/components/Notice.css";

interface Article {
  article_id: number;
  title: string;
  author: string;
  date: string;
}

export default function NoticePage() {
  let fakeData: Article[] = [
    {
      article_id: 1,
      title: "전사 작업이란?",
      author: "관리자",
      date: "2023-09-06",
    },
    {
      article_id: 2,
      title: "전사 작업 오류 기준",
      author: "관리자",
      date: "2023-09-06",
    },
  ];

  return (
    <div className="notice_container">
      <div className="notice_wrapper">
        <table>
          공지사항
          <tbody>
            <tr style={{ backgroundColor: "#dedede" }}>
              <td width={"10%"}></td>
              <td width={"10%"}>no</td>
              <td width={"50%"}>제 목</td>
              <td width={"15%"}>작성자</td>
              <td width={"15%"}>작성일</td>
            </tr>
            {fakeData.map((el) => {
              return (
                <tr>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
