import React, { useRef } from "react";
import { BsFillPersonCheckFill, BsKey } from "react-icons/bs";
import "../styles/pages/LoginPage.css";

export default function LoginPage() {
  const inputRef = useRef<any>([]);

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current !== null) {
      const id = inputRef.current[0].value;
      const password = inputRef.current[1].value;
      window.alert(`로그인 요청 보냄, ${id}, ${password}`);
    }
    //로그인 비동기처리 로직
  };

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <form action="/">
          <label style={{ fontWeight: "600" }}>로그인</label>
          <div className="id_inputbar">
            <span className="id_icon">
              <BsFillPersonCheckFill size={"1.5em"} />
            </span>
            <input type="text" ref={(el) => (inputRef.current[0] = el)} />
          </div>
          <div className="password_inputbar">
            <span className="password_icon">
              <BsKey size={"1.5em"} />
            </span>
            <input type="password" ref={(el) => (inputRef.current[1] = el)} />
          </div>
          <button className="login_btn" onClick={handleLogin}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
