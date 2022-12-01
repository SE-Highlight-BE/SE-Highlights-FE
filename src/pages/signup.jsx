import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/signup.module.css";
import axios from "axios";
const Signup = (props) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    userNickName: "",
    userPwd: "",
    userPwdCheck: "",
  });
  const data = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSignupHandler = (e) => {
    if (data.userPwd !== data.userPwdCheck) {
      alert("비밀번호 불일치");
      return;
    }
    axios
      .post("http://localhost:3001/auth/signUp", inputs)
      .then((res) => console.log(res))
      .catch((e) => alert("회원가입 실패"));
  };
  const onCancleHandler = (event) => {
    navigate("/");
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
          name="userName"
          placeholder="이름"
          onChange={onChange}
          required
        />
        <input
          type="text"
          className={style.input}
          placeholder="아이디"
          name="userNickName"
          value={data.userNickName}
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
        <input
          type="password"
          className={style.input}
          placeholder="비밀번호 확인"
          value={data.userPwdCheck}
          name="userPwdCheck"
          onChange={onChange}
          required
        />
        <div className={style.btn}>
          <button className={style.btndetail} onClick={onSignupHandler}>
            회원 가입
          </button>
          <button className={style.btndetail} onClick={onCancleHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
