import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/signup.module.css";

const Signup = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [nickName, setNickName] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();

  const onUserNameHandler = (event) => {
    setUserName(event.target.value);
  };
  const onNickNameHandler = (event) => {
    setNickName(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onPasswordCheckHandler = (event) => {
    setPasswordCheck(event.target.value);
  };

  const onSignupHandler = (event) => {
    // 이메일이 중복되는지 확인 코드
    // 아이디 생성 코드
    if (password !== passwordCheck) {
      alert("입력한 비밀번호가 일치하지 않습니다.");
    } else {
      console.log(userName);
      console.log(nickName);
      console.log(password);
      axios
        .post("http://localhost:3001/auth/signUp", {
          userName: userName,
          userNickName: nickName,
          userPwd: password,
          userPwdCheck: password,
        })
        .then((data) => {
          alert(`${data.data.msg}`);
          if (data.status === 201) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("회원 가입 실패");
        });
    }
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
          placeholder="아이디"
          onChange={onUserNameHandler}
          required
        />
        <input
          type="text"
          className={style.input}
          placeholder="닉네임"
          onChange={onNickNameHandler}
          required
        />
        <input
          type="password"
          className={style.input}
          placeholder="비밀번호"
          onChange={onPasswordHandler}
          required
        />
        <input
          type="password"
          className={style.input}
          placeholder="비밀번호 확인"
          onChange={onPasswordCheckHandler}
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
