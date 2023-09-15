import { BsFillPersonCheckFill, BsKey } from "react-icons/bs";
import "./LoginForm.css";

interface LoginProps {
  boxShadow?: string;
  backgroundColor?: string;
  id?: string;
  pw?: string;
  onClick?: () => {};
}

export const LoginForm = ({
  boxShadow = "none",
  backgroundColor = "white",
  id = "",
  pw = "",
  ...props
}: LoginProps) => {
  return (
    <div className="login_container">
      <div className="login_wrapper">
        <form
          action="/"
          style={{ backgroundColor: backgroundColor, boxShadow: boxShadow }}
        >
          <label style={{ fontWeight: "600" }}>로그인</label>
          <div className="id_inputbar">
            <span className="id_icon">
              <BsFillPersonCheckFill size={"1.5em"} />
            </span>
            <input type="text" value={id} />
          </div>
          <div className="password_inputbar">
            <span className="password_icon">
              <BsKey size={"1.5em"} />
            </span>
            <input type="password" value={pw} />
          </div>
          <button className="login_btn" {...props}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};
