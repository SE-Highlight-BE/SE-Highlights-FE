import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/navigationBar.module.css";

const NavigationBar = (props) => {
  const navigate = useNavigate();

  const goToHomepage = (event) => {
    navigate("/homepage");
  };
  const goToSchedule = (event) => {
    navigate("/schedule");
  };
  const goToSearch = (event) => {
    navigate("/search");
  };
  const goToMypage = (event) => {
    navigate("/mypage");
  };
  return (
    <div className={style.section}>
      <div className={style.logo}>
        <span className={style.logo_front}>Sports </span>
        <span className={style.logo_back}>now</span>
      </div>
      <span className={style.navbar} onClick={goToHomepage}>
        홈
      </span>
      <span className={style.navbar} onClick={goToSchedule}>
        일정
      </span>
      <span className={style.navbar} onClick={goToSearch}>
        검색
      </span>
      <span className={style.navbar} onClick={goToMypage}>
        내 정보
      </span>
    </div>
  );
};

export default NavigationBar;
