import React from "react";
import style from "../../style/detail.module.css";

const Detail = ({ data }) => {
  console.log(data, "@");
  return (
    <li className={style.detail}>
      <div className={style.dateForm}>
        <span className={style.column}>{data.scheduleDate}</span>
        <span className={style.column}>{data.scheduleTime}</span>
      </div>
      <span className={style.column}>{data.scheduleTitle}</span>

      <span className={style.column}>{data.category}</span>
    </li>
  );
};

export default Detail;
