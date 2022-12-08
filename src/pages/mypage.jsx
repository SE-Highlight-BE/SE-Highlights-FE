import React, { useEffect, useState } from "react";
import style from "../style/mypage.module.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Comment from "./playvideo/comment";
import VideoForm from "../components/videoForm";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useUser } from "../stores/user";
const Mypage = (props) => {
  const [userName, setUserName] = useState("");
  const [comments, setComments] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const navigate = useNavigate();
  const { setLogin } = useUser();
  const cookies = new Cookies();

  const searchMyComment = () => {
    setBookmark([]);
    axios
      .get("http://localhost:3001/reply/getUserComment")
      .then((data) => {
        console.log(data);
        setComments(data.data.comments);
      })
      .catch((err) => {
        alert("내 댓글 가져오기 실패");
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
        setUserName(data.data.userNickName.userNickName);
        setBookmark(data.data.getBookmark);
      })
      .catch((err) => {
        alert("내 북마크 리스트 가져오기 실패");
      });
  };

  const signoutHandler = (event) => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      axios
        .get("http://localhost:3001/auth/signOut")
        .then(() => {
          setLogin(false);
          cookies.remove("userID");
          navigate("/");
        })
        .catch((err) => {
          alert("로그아웃 실패");
        });
    }
  };

  const deleteAccountHandler = (event) => {
    const password = prompt("비밀번호를 입력하세요.");
    axios
      .post("http://localhost:3001/auth/deleteAccount", {
        userPwd: password,
      })
      .then((data) => {
        setLogin(false);
        console.log("회원탈퇴 성공");
        if (data.data.error !== undefined) {
          alert(data.data.error);
        } else {
          alert(data.data.msg);
          cookies.remove("userID");
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
          <div className={style.btnContainer}>
            <div
              className={`${style.btn} ${
                bookmark.length !== 0 && style.activeBtn
              }`}
              onClick={searchMyBookmark}
            >
              내 북마크
            </div>
            <div
              className={`${style.btn} ${
                comments.length !== 0 && style.activeBtn
              }`}
              onClick={searchMyComment}
            >
              내 댓글
            </div>
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
            <Comment
              key={comment.id}
              data={comment}
              searchMyComment={searchMyComment}
            />
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
