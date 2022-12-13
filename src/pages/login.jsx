import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/login.module.css";
import { useUser } from "../stores/user";
import { Cookies } from "react-cookie";

const Login = (props) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    userPwd: "",
  });
  const data = inputs;
  const { setLogin, login } = useUser();
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("userID")) setLogin(true);
    if (login === true || cookies.get("userID")) navigate("/homepage");
  }, []);
  const onSignupHandler = (event) => {
    navigate("/login/signup");
  };

  const onLoginhandler = () => {
    axios
      .post("http://localhost:3001/auth/signIn", inputs, {
        withCredentials: true,
      })
      .then((res) => {
        // 로그인 실패
        if (typeof res.data.msg == "undefined") {
          alert(res.data.error);
        } else {
          alert(res.data.msg);
          setLogin(true);
          res.data.token && navigate("/homepage");
        }
      })
      .catch((e) => {
        console.log("e : ", e);
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
