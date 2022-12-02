import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/login.module.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    userPwd: "",
  });
  const data = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSignupHandler = (event) => {
    navigate("/login/signup");
  };

  const onLoginhandler = () => {
    axios
      .post("http://localhost:3001/auth/signIn", inputs, {
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.msg);
        res.data.token && navigate("/homepage");
      })
      .catch((e) => alert("회원가입 실패"));
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
          value={data.userName}
          placeholder="아이디"
          name="userName"
          onChange={onChange}
          required
        />
        <input
          type="password"
          className={style.input}
          placeholder="비밀번호"
          onChange={onChange}
          value={data.userPwd}
          name="userPwd"
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
