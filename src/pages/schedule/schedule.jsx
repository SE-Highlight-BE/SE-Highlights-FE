import React, { useEffect, useMemo, useState } from "react";
import style from "../../style/schedule.module.css";
import Match from "./match";
import axios from "axios";

axios.defaults.withCredentials = true;

const Schedule = (props) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const lastDay = new Date(year, month, -1).getDate();
  const [data, setData] = useState();
  const [toggle, setToggle] = useState();
  function getDayOfWeek(date) {
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dayOfWeek = week[new Date(date).getDay()];

    return dayOfWeek;
  }
  const onGetDate = (date) => {
    axios
      .get(`http://localhost:3001/schedule/date/${date}`)
      .then((v) => setData(v.data))
      .catch((e) => console.log(e));
  };
  const addZero = (date) => (`${date}`.length === 1 ? `0${date}` : date);
  const dateList = useMemo(() => {
    const arr = Array.from({ length: lastDay }, (v, i) => i);
    return arr.map((elem) => (
      <div
        className={style.dateForm}
        onClick={() => {
          onGetDate(`${addZero(month)}-${addZero(elem + 1)}`);
          setToggle(elem);
        }}
      >
        <label
          className={`${style.date} ${elem === toggle ? style.activeDate : ""}`}
        >{`${addZero(month)}.${addZero(elem + 1)} (${getDayOfWeek(
          String(year) + "-" + String(month) + "-" + String(elem + 1)
        )})`}</label>
      </div>
    ));
  }, [toggle]);

  return (
    <div className={style.section}>
      <div className={style.date}>{dateList}</div>
      <div className={style.match}>
        {data && data.length !== 0 ? (
          <Match data={data} />
        ) : (
          <div className={style.noneContainer}>
            <div className={style.text}>등록된 정보가 없습니다.</div>
            <img
              className={style.img}
              src={require("../../assets/x.png")}
            ></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
