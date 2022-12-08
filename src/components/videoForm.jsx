import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/videoForm.module.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";

export default function VideoForm({ video }) {
  const navigate = useNavigate();
  const [mark, setMark] = useState(null);
  const goToPlay = () => {
    navigate("/playvideo", { state: video.videoID });
  };
  const bookmarkHandler = (event) => {
    axios
      .post(`http://localhost:3001/bookmark/${video.videoID}`)
      .then((data) => {
        alert(`${data.data.msg}`);
        mark === true ? setMark(false) : setMark(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStateBookmark = async () => {
    const response = await axios.get(
      `http://localhost:3001/bookmark/stateBookmark?videoID=${video.videoID}`
    );
    response.data.stateMark === null ? setMark(false) : setMark(true);
  };
  useEffect(() => {
    getStateBookmark();
  }, []);
  return (
    <>
      <div className={style.cardForm}>
        <div className={style.card} onClick={goToPlay}>
          <iframe
            className="video"
            src={video.videoLink}
            width="100%"
            height="100%"
            // allow="autoplay"
          />
        </div>
        <div className={style.textForm}>
          <div className={style.title}>{video.videoTitle}</div>
          <div className={style.subTextForm}>
            {/* <div> */}
            <button onClick={bookmarkHandler}>
              {mark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </button>
            {/* </div> */}
            <div>
              <p className={style.date}>{video.videoDate}</p>
              <p className={style.recom}>
                추천 수 : {video.videoRecommendRate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
