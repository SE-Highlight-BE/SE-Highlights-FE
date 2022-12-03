import React, { useState } from "react";
import style from "../style/mypage.module.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Comment from "./playvideo/comment";
import VideoForm from "../components/videoForm";

const Mypage = (props) => {
  const [comments, setComments] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const searchMyComment = () => {
    setBookmark([]);
    axios
      .get("http://localhost:3001/reply/getUserComment")
      .then((data) => {
        console.log(data);
        setComments(data.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchMyBookmark = () => {
    setComments([]);
    axios
      .get("http://localhost:3001/bookmark/getList")
      .then((data) => {
        setBookmark(data.data.getBookmark);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.mypage}>
      <div className={style.usersection}>
        <div className={style.user}>
          <Avatar
            sx={{ width: 150, height: 150 }}
            className={style.avatar}
            src="/broken-image.jpg"
          />
          <div className={style.name}>유저 이름</div>
        </div>
        <div className={style.options}>
          <div className={style.btn} onClick={searchMyComment}>
            내 댓글
          </div>
          <div className={style.btn} onClick={searchMyBookmark}>
            북마크한 동영상
          </div>
        </div>
      </div>
      <div className={style.datasection}>
        <div className={style.comment}>
          {comments.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
        </div>

        <div className={style.bookmark}>
          {bookmark.map((data) => (
            <VideoForm key={data.Video.videoID} video={data.Video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
