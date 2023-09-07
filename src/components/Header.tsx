import React from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "../styles/components/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header_container">
      <div className="headerwrapper">
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
      </div>
    </div>
  );
}
