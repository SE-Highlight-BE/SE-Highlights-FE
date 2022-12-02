import React from "react";
import style from "../style/videoForm.module.css";

export default function videoForm() {
  return (
    <>
      <div className={style.cardForm}>
        <div className={style.card}></div>
        <div className={style.textForm}>
          <div className={style.title}>대한민국 vs 가나</div>
          <div className={style.date}>일시 : 2022-11-30</div>
          <div className={style.recom}>추천 수 : 23</div>
        </div>
      </div>
    </>
  );
}
