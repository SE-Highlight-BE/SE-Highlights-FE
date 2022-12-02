import React from "react";
import style from "../style/playvideo.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Playvideo = ({ videoID }) => {
  return (
    <div className={style.section}>
      <div className={style.detail}>
        <video className={style.video} autoplay controls poster="aaa">
          <source src="../../testvideo/video1" type="video/mp4" />
        </video>
        <a href="test.test">원본 영상</a>
        <div className={style.options}>
          <div className={style.title}>영상 제목</div>
          <div className={style.info}>
            <span className={style.date}>2022.12.02</span>
            <div className={style.btn}>
              <button>
                <AddCircleOutlineIcon />
                <span>북마크</span>
              </button>

              <button>
                <ThumbUpOffAltIcon />
                <span>추천</span>
              </button>
            </div>
          </div>
        </div>
        <div className={style.comment}>
          <Avatar className={style.avatar} src="/broken-image.jpg" />
          <input type="text" className={style.input} placeholder="댓글 추가" />
        </div>
      </div>
      <div className={style.others}>asd</div>
    </div>
  );
};

export default Playvideo;
