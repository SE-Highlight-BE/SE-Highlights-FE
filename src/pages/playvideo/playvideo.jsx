import React, { useEffect, useRef, useState } from "react";
import style from "../../style/playvideo.module.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { Cookies } from "react-cookie";
import Comment from "./comment";
axios.defaults.withCredentials = true;

const Playvideo = ({ videoID }) => {
  const cookies = new Cookies();
  const inputRef = useRef();
  const [replys, setReplys] = useState([]);
  const [comments, setComments] = useState({
    videoID: 1,
    comment: "hello",
  });

  console.log(replys);
  // 댓글 가져오기
  const getReplys = async () => {
    // await axios
    //   .get(`http://localhost:3001/reply/getVideoComment/${videoID}`)
    //   .then((data) => setComments(data))
    //   .catch((err) => console.log(err));

    console.log("get reply");
    // 테스트
    await axios
      .get(`http://localhost:3001/reply/getVideoComment/1`)
      .then((data) => {
        console.log(data.data);
        setReplys(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getReplys();
  }, []);

  // 북마크
  const bookmarkHandler = (event) => {
    axios
      .post(`http://localhost:3001/bookmark/1`)
      .then((data) => {
        alert(`${data.data.msg}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 추천
  const likeHandler = (event) => {
    // axios
    //   .post(`http://localhost:3001/likeVideo/${videoID}`)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // 테스트
    console.log("like button clicked");
    axios
      .post("http://localhost:3001/likeVideo/1")
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
      setComments({
        videoID: 1,
        comment: data,
      });
      addComment();
    }
  };
  // 댓글 작성
  const onClick = (event) => {
    const data = inputRef.current.value;
    setComments({
      videoID: 1,
      comment: data,
    });
    addComment();
  };

  const addComment = () => {
    axios
      .post(`http://localhost:3001/reply/comment`, comments)
      .then((data) => {
        getReplys();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.section}>
      <div className={style.detail}>
        <video className={style.video} controls poster="aaa">
          <source src="../../testvideo/video1" type="video/mp4" />
        </video>
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
      <div className={style.others}>asd</div>
    </div>
  );
};

export default Playvideo;
