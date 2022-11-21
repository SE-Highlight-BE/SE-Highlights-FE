import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/login.module.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailHandler = (event) => {
    console.log(event.target.value);
    setEmail(event);
  };

  const onPasswordHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const onSignupHandler = (event) => {
    navigate("/login/signup");
  };

  // const onLoginhandler = () => {
  //   axios
  //     .post('//localhost:3000/api/users/login', {
  //       email,
  //       password
  //     })
  // }
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
          placeholder="이메일"
          onChange={onEmailHandler}
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
          <button className={style.btndetail}>로그인</button>
          <button className={style.btndetail} onClick={onSignupHandler}>
            회원 가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
