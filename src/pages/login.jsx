import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/login.module.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const onUserNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onSignupHandler = (event) => {
    navigate("/login/signup");
  };

  const onLoginhandler = () => {
    console.log("login clicked!");
    console.log(userName);
    console.log(password);
    axios
      .post(
        "http://localhost:3001/auth/signIn",
        {
          userName: userName,
          userPwd: password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        if (data.data.error) {
          alert(`${data.data.error}`);
        } else {
          alert(`${data.data.msg}`);

          // 로그인 성공 후 홈 화면으로
          navigate("/homepage");
        }
      })
      .catch((err) => {
        alert("로그인 실패");
      });
  };
  return (
    <div className={style.section}>
      <div className={style.login}>
        <div className={style.title}>
          <span>Sports </span>
          <span className={style.titlenow}>now</span>
        </div>
        <input
          type="text"
          className={style.input}
          placeholder="아이디"
          onChange={onUserNameHandler}
          required
        />
        <input
          type="password"
          className={style.input}
          placeholder="비밀번호"
          onChange={onPasswordHandler}
          required
        />
        <div className={style.btn}>
          <button className={style.btndetail} onClick={onLoginhandler}>
            로그인
          </button>
          <button className={style.btndetail} onClick={onSignupHandler}>
            회원 가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
