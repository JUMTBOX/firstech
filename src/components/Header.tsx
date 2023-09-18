import React from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";
import { Link } from "react-router-dom";
import "../styles/components/Header.css";

export default function Header() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  return (
    <div className="header_container">
      <div className="headerwrapper">
        <div className="logo">
          <Link to={"/"}>
            <p>Text Trade Tool</p>
          </Link>
        </div>
        {isLogin ? (
          <nav className="menu_nav">
            <Link to={"/"}>
              <AiOutlineHome size={"2em"} />
            </Link>
            <Link to={"/notice"}>
              <AiOutlineQuestionCircle size={"2em"} />
            </Link>
            <Link
              to={"/login"}
              onClick={() => {
                setIsLogin((cur) => false);
              }}
            >
              <FiLogOut size={"2em"} />
            </Link>
          </nav>
        ) : (
          <nav className="menu_nav">
            <Link to={"/"}>
              <AiOutlineHome size={"2em"} />
            </Link>
            <Link to={"/login"}>
              <CgProfile size={"2em"} />
            </Link>
            <Link to={"/notice"}>
              <AiOutlineQuestionCircle size={"2em"} />
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
