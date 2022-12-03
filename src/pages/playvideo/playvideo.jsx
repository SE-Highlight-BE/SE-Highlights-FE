import React, { useEffect, useRef, useState } from "react";
import style from "../../style/playvideo.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import Comment from "./comment";
import VideoForm from "../../components/videoForm";
import { useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

const Playvideo = () => {
  const { state } = useLocation();
  const inputRef = useRef();
  const [replys, setReplys] = useState([]);
  const [videos, setVideos] = useState([]);

  // video 가져오기
  const getVideos = async () => {
    await axios
      .get("http://localhost:3001/random")
      .then((data) => {
        setVideos(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //단순히 콘솔에 출력을 위한 코드(확인하고 지우면됩니다.)
  useEffect(() => {
    console.log(state);
    getReplys();
    getVideos();
  }, [state]);

  // 댓글 가져오기
  const getReplys = async () => {
    // await axios
    //   .get(`http://localhost:3001/reply/getVideoComment/${videoID}`)
    //   .then((data) => setComments(data))
    //   .catch((err) => console.log(err));

    // 테스트
    await axios
      .get(`http://localhost:3001/reply/getVideoComment/${state}`)
      .then((data) => {
        setReplys(data.data);
      })
      .catch((err) => console.log(err));
  };

  // 북마크
  const bookmarkHandler = (event) => {
    axios
      .post(`http://localhost:3001/bookmark/${state}`)
      .then((data) => {
        alert(`${data.data.msg}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 추천
  const likeHandler = (event) => {
    console.log("like button clicked");
    axios
      .post(`http://localhost:3001/likeVideo/${state}`)
      .then((data) => {
        alert(`${data.data.msg}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 엔터 입력 시
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      const data = inputRef.current.value;
      addComment(data);
    }
  };
  // 댓글 작성
  const onClick = (event) => {
    const data = inputRef.current.value;
    addComment(data);
  };

  const addComment = (data) => {
    axios
      .post(`http://localhost:3001/reply/comment`, {
        videoID: state,
        comment: data,
      })
      .then((data) => {
        getReplys();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.section}>
      <div className={style.detail}>
        <div>
          <iframe
            src="https://drive.google.com/file/d/1VofpJrf6nXl_VREW2cSNStAYoIuVqlyc/preview"
            width="100%"
            height="480"
            allow="autoplay"
          />
        </div>
        <a href="test.test">원본 영상</a>
        <div className={style.options}>
          <div className={style.title}>영상 제목</div>
          <div className={style.info}>
            <span className={style.date}>2022.12.02</span>
            <div className={style.btn}>
              <button className={style.optionbtn} onClick={bookmarkHandler}>
                <AddCircleOutlineIcon />
                <span>북마크</span>
              </button>
              <button className={style.optionbtn} onClick={likeHandler}>
                <ThumbUpOffAltIcon />
                <span>추천</span>
              </button>
            </div>
          </div>
        </div>
        <div className={style.comment}>
          <Avatar className={style.avatar} src="/broken-image.jpg" />
          <input
            type="text"
            ref={inputRef}
            className={style.input}
            onKeyPress={onKeyDown}
            placeholder="  Comment.."
          />
          <button className={style.inputbtn} onClick={onClick}>
            댓글 작성
          </button>
        </div>
        <div className={style.datas}>
          {replys.map((element) => (
            <Comment key={element.id} data={element} />
          ))}
        </div>
      </div>
      <div className={style.others}>
        {videos.map((video) => (
          <VideoForm key={video.videoID} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Playvideo;
