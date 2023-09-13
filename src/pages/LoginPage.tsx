import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPersonCheckFill, BsKey } from "react-icons/bs";
import { userLogin } from "../requestHooks/request";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";
import "../styles/pages/LoginPage.css";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const inputRef = useRef<any>([]);
  const navigate = useNavigate();

  const { mutate } = useMutation(userLogin, {
    onSuccess: () => {
      setIsLogin((cur) => true);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current !== null) {
      let user = {
        user_id: inputRef.current[0].value,
        passwd: inputRef.current[1].value,
      };
      mutate(user);
    }
  };

  useEffect(() => {
    if (isLogin) {
      window.alert("이미 로그인 되었습니다");
      navigate("/");
    }
    // postUser();
  }, [isLogin]);

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
