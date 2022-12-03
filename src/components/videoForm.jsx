import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Playvideo from "../pages/playvideo/playvideo";
import style from "../style/videoForm.module.css";
import { useVideo } from "../stores/video";

export default function VideoForm(onClickVideo) {
  const navigate = useNavigate();
  const { videoID, setVideo } = useVideo();

  const goToPlay = (id) => {
    setVideo(id);
    navigate("/playvideo");
  };

  //단순히 콘솔에 출력을 위한 코드(확인하고 지우면됩니다.)
  useEffect(() => {
    console.log("클릭한 동영상 ID : ", videoID);
  }, [videoID]);
  return (
    <>
      <div className={style.cardForm} onClick={goToPlay}>
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
