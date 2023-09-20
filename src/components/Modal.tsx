import React from "react";
import "../styles/components/Modal.css";

export default function Modal({ setIsOpen }: { setIsOpen: Function }) {
  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_wrapper">
          <div className="modal_header_wrapper">
            <p>회원 추가</p>
          </div>
          <form action="/">
            <span className="form_id_inputbar">
              <label htmlFor="아이디">ID</label>
              <input type="text" name="아이디" />
            </span>
            <span className="form_pw_inputbar">
              <label htmlFor="비밀번호">PW</label>
              <input type="password" name="비밀번호" />
            </span>
            <span className="form_name_inputbar">
              <label htmlFor="이름">이름</label>
              <input type="text" name="이름" />
            </span>
          </form>
          <div className="modal_btn_wrapper">
            <button className="sub_btn">완료</button>
            <button className="quit_btn" onClick={() => setIsOpen(false)}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
