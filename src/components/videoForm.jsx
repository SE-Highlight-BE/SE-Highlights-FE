import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/videoForm.module.css";
import { useVideo } from "../stores/video";

export default function VideoForm({ video }) {
  const navigate = useNavigate();
  const { videoID, setVideo } = useVideo();

  const goToPlay = () => {
    console.log(`클릭된 videoID = ${video.videoID}`);

    // clicked 된 videoID 넘겨주기
    setVideo(video.videoID);
    console.log(videoID);
    navigate("/playvideo");
  };

  return (
    <>
      <div className={style.cardForm} onClick={goToPlay}>
        <div className={style.card}></div>
        <div className={style.textForm}>
          <div className={style.title}>{video.videoTitle}</div>
          <div className={style.date}>{video.videoDate}</div>
          <div className={style.recom}>
            추천 수 : {video.videoRecommendRate}
          </div>
        </div>
      </div>
    </>
  );
}
