import React from "react";
import style from "../../style/match.module.css";
import Detail from "./detail";

const Match = ({ data }) => {
  console.log(data, "@@");
  return (
    <div className={style.section}>
      <div className={style.title}>월드컵</div>
      <ul className={style.match}>
        <li className={style.detail}>
          <span className={style.column}>시간</span>
          <span className={style.column}>경기</span>
          <span className={style.column}>경기 정보</span>
        </li>
        {/* <li className={style.detail}> */}
        {data.length !== 0
          ? data.map((elem) => <Detail data={elem} key={data.scheduleID} />)
          : ""}
        {/* </li> */}
      </ul>
    </div>
  );
};

export default Match;
