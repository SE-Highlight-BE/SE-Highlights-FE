import React, { useEffect, useState } from "react";
import style from "../style/mypage.module.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Comment from "./playvideo/comment";
import VideoForm from "../components/videoForm";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

const Mypage = (props) => {
  const [userName, setUserName] = useState("");
  const [comments, setComments] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const navigate = useNavigate();
  // const cookies = new Cookies();

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
    getMyBookmark();
  };

  const getMyBookmark = async () => {
    setComments([]);
    await axios
      .get("http://localhost:3001/bookmark/getList")
      .then((data) => {
        setUserName(data.data.userName.userName);
        setBookmark(data.data.getBookmark);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signoutHandler = (event) => {
    axios
      .get("http://localhost:3001/auth/signOut")
      .then((data) => {
        alert(data.data.msg);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAccountHandler = (event) => {
    const password = prompt("비밀번호를 입력하세요.");
    axios
      .post("http://localhost:3001/auth/deleteAccount", {
        userPwd: password,
      })
      .then((data) => {
        console.log("회원탈퇴 성공");
        console.log(data.data.error);
        if (data.data.error !== undefined) {
          alert(data.data.error);
        } else {
          alert(data.data.msg);
          cookie.remove("userID");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("회원탈퇴 실패");
        console.log(err);
      });
  };
  useEffect(() => {
    getMyBookmark();
  }, []);

  return (
    <div className={style.mypage}>
      <div className={style.usersection}>
        <div className={style.user}>
          <Avatar
            sx={{ width: 150, height: 150 }}
            className={style.avatar}
            src="/broken-image.jpg"
          />
          <div className={style.name}>{userName}</div>
        </div>
        <div className={style.options}>
          <div className={style.btn} onClick={searchMyComment}>
            내 댓글
          </div>
          <div className={style.btn} onClick={searchMyBookmark}>
            북마크한 동영상
          </div>
          <div className={style.userbtn}>
            <span className={style.signout} onClick={signoutHandler}>
              로그아웃
            </span>
            <span
              className={style.deleteAccount}
              onClick={deleteAccountHandler}
            >
              회원탈퇴
            </span>
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
