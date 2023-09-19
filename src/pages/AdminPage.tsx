import React from "react";
import "../styles/pages/AdminPage.css";

export default function AdminPage() {
  return (
    <div className="adminpage_container">
      <div className="adminpage_wrapper">
        <span className="adminpage_btn_wrapper">
          <button>회원 추가</button>
        </span>
        <div className="adminpage_content_box">
          <div className="adminpage_content_box_wrapper">
            <div className="user_category">
              <div className="user_category_item">ID</div>
              <div className="user_category_item">PW</div>
              <div className="user_category_item">성명</div>
              <div className="user_category_item">등록일</div>
              <div className="user_category_item">
                로그인
                <br />
                가능 여부
              </div>
              <div className="user_category_item">삭제</div>
            </div>
            {[1, 2, 3, 4, 5].map((el) => {
              return (
                <div className="user">
                  <div className="user_item">item.ID</div>
                  <div className="user_item">item.PW</div>
                  <div className="user_item">item.name</div>
                  <div className="user_item">item.date</div>
                  <div className="user_flag_wrapper">
                    <select name="" id="">
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                  <div className="user_delBtn_wrapper">
                    <button className="user_delBtn"> 삭제 </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <span className="adminpage_pagingBtn_wrapper">
          <button> {"<"} </button> 1 <button> {">"} </button>
        </span>
      </div>
    </div>
  );
}
