import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/navigationBar.module.css";
const NavigationBar = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState("homepage");

  const goToHomepage = (event) => {
    setState("homepage");
    navigate("/homepage");
  };
  const goToSchedule = (event) => {
    setState("schedule");
    navigate("/schedule");
  };
  const goToSearch = (event) => {
    setState("search");
    navigate("/search");
  };
  const goToMypage = (event) => {
    setState("mypage");
    navigate("/mypage");
  };
  useEffect(() => {
    setState(window.location.pathname.split("/")[1]);
  }, []);
  return (
    <div className={style.section}>
      <div
        onClick={() => {
          navigate("/homepage");
        }}
        className={style.logo}
      >
        <span className={style.logo_front}>Sports </span>
        <span className={style.logo_back}>now</span>
      </div>
      <span
        className={`${style.navbar} ${state === "homepage" && style.active}`}
        onClick={goToHomepage}
      >
        홈
      </span>
      <span
        className={`${style.navbar} ${state === "schedule" && style.active}`}
        onClick={goToSchedule}
      >
        일정
      </span>
      <span
        className={`${style.navbar} ${state === "search" && style.active}`}
        onClick={goToSearch}
      >
        검색
      </span>
      <span
        className={`${style.navbar} ${state === "mypage" && style.active}`}
        onClick={goToMypage}
      >
        내 정보
      </span>
    </div>
  );
};

export default NavigationBar;
