import React, { useState } from "react";
import style from "../../style/schedule.module.css";
import Match from "./match";

const Schedule = (props) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const [target, setTarget] = useState();

  // 경기 일정 local data
  const temp_date1 = [
    {
      time: "02:00",
      play: "A:B",
      detail: "중계 종료",
    },
    {
      time: "04:00",
      play: "C:D",
      detail: "중계 예약",
    },
  ];
  const temp_date2 = [
    {
      time: "02:00",
      play: "A:B",
      detail: "중계 종료",
    },
    {
      time: "04:00",
      play: "C:D",
      detail: "중계 예약",
    },
  ];
  const league = [temp_date1, temp_date2];

  const transDay = (day) => {
    switch (day) {
      case 0:
        return "일";
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
    }
  };

  const setValue = (event) => {
    // target : 날짜(며칠인지)
    setTarget(date + Number(event.target.id));
  };
  return (
    <div className={style.section}>
      <div className={style.date} onChange={setValue}>
        <input type="radio" name="day" className={style.day} id="-2" />
        <label htmlFor="-2">
          {month}.{date - 2}({transDay(day - 2)})
        </label>

        <input type="radio" name="day" className={style.day} id="-1" />
        <label htmlFor="-1">
          {month}.{date - 1}({transDay(day - 1)})
        </label>

        <input type="radio" name="day" className={style.day} id="0" />
        <label htmlFor="0">
          {month}.{date}({transDay(day)})
        </label>

        <input type="radio" name="day" className={style.day} id="+1" />
        <label htmlFor="+1">
          {month}.{date + 1}({transDay(day + 1)})
        </label>

        <input type="radio" name="day" className={style.day} id="+2" />
        <label htmlFor="+2">
          {month}.{date + 2}({transDay(day + 2)})
        </label>
      </div>
      <div className={style.match}>
        {league.map((element) => (
          <Match game={element} />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
