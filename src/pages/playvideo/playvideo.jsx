import React, { useEffect, useRef, useState } from "react";
import style from "../../style/playvideo.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import Comment from "./comment";
import VideoForm from "../../components/videoForm";
import { useLocation } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
axios.defaults.withCredentials = true;

const Playvideo = () => {
  const { state } = useLocation();
  const inputRef = useRef();
  const [replys, setReplys] = useState([]);
  const [video, setVideo] = useState([]);
  const [videos, setVideos] = useState([]);
  const [mark, setMark] = useState(null);
  const [recommend, setRecommend] = useState(null);
  // video 가져오기
  const getVideos = () => {
    axios
      .get(`http://localhost:3001/random?num=${4}`)
      .then((data) => {
        setVideos(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStateBookmark = async () => {
    const response = await axios.get(
      `http://localhost:3001/bookmark/stateBookmark?videoID=${state}`
    );
    response.data.stateMark === null ? setMark(false) : setMark(true);
  };
  useEffect(() => {
    getReplys();
    getVideos();
    getVideo();
    getStateBookmark();
  }, []);
  const getVideo = () => {
    axios
      .get(`http://localhost:3001/one?videoID=${state}`)
      .then((data) => {
        recommend === null && setRecommend(data.data.recommend);
        setVideo(data.data);
      })
      .catch((err) => console.log(err));
  };
  // 댓글 가져오기

  const getReplys = () => {
    axios
      .get(`http://localhost:3001/reply/getVideoComment/${state}`)
      .then((data) => {
        setReplys(data.data.sort((a, b) => b.id - a.id));
      })
      .catch((err) => console.log(err));
  };

  // 북마크
  const bookmarkHandler = (event) => {
    axios
      .post(`http://localhost:3001/bookmark/${state}`)
      .then((data) => {
        alert(`${data.data.msg}`);
        mark === true ? setMark(false) : setMark(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 추천
  const onLike = (event) => {
    axios
      .post(`http://localhost:3001/likeVideo/${state}`)
      .then((data) => {
        setRecommend(data.data.state);
        alert(`${data.data.msg}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const likeHandler = () => {
    onLike();
    setTimeout(() => getVideo(), 2000);
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
    if (inputRef.current.value === "") return;
    const data = inputRef.current.value;
    inputRef.current.value = "";
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
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log("북마크 state ", mark);
  }, [mark]);
  return (
    <div className={style.section}>
      <div className={style.detail}>
        <div>
          <iframe
            src="https://drive.google.com/file/d/1VofpJrf6nXl_VREW2cSNStAYoIuVqlyc/preview"
            width="95%"
            height="480"
            allow="autoplay"
          />
        </div>
        {/* <a href="test.test">원본 영상</a> */}
        <div className={style.options}>
          <div className={style.titleContainer}>
            {video.data && (
              <div className={style.title}>{video.data.videoTitle}</div>
            )}
            <div className={style.recom}>
              추천 수 : {video.data && video.data.videoRecommendRate}
            </div>
          </div>
          <div className={style.info}>
            <span className={style.date}>
              {video.data && video.data.videoDate}
            </span>
            <div className={style.btn}>
              <button className={style.optionbtn} onClick={bookmarkHandler}>
                {mark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                <span>북마크</span>
              </button>
              <button className={style.optionbtn} onClick={likeHandler}>
                {recommend ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
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
            placeholder="Comment.."
          />
          <button className={style.inputbtn} onClick={onClick}>
            댓글 작성
          </button>
        </div>
        <div className={style.datas}>
          {replys.map((element) => (
            <Comment key={element.id} data={element} getReplys={getReplys} />
          ))}
        </div>
      </div>
      <div className={style.others}>
        {videos &&
          videos.map((video) => (
            <VideoForm key={video.videoID} video={video} />
          ))}
      </div>
    </div>
  );
};

export default Playvideo;
