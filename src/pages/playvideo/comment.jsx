import React, { useState } from "react";
import style from "../../style/comment.module.css";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { useUser } from "../../stores/user";
import dayjs from "dayjs";
const Comment = ({ data, getReplys, searchMyComment }) => {
  const { userID } = useUser();
  const deleteHandler = (event) => {
    axios
      .delete("http://localhost:3001/reply/comment", {
        data: {
          commentID: data.id,
        },
      })
      .then((data) => {
        console.log(data.data.msg);
        if (data.data.msg) {
          alert(data.data.msg);
          searchMyComment && searchMyComment();
          getReplys && getReplys();
        } else {
          alert(data.data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.section}>
      <div className={style.user}>
        <Avatar className={style.avatar} src="/broken-image.jpg" />
      </div>
      <div className={style.comment}>
        <div className={style.id}>{data.userNickName}</div>
        <div className={style.data}>{data.comment}</div>
      </div>
      {userID === data.userID && (
        <button className={style.delete} onClick={deleteHandler}>
          <DeleteOutlineIcon className={style.icon} />
        </button>
      )}
      <div className={style.date}>
        {dayjs(data.created_at).format("YYYY.MM.DD HH:mm:ss")}
      </div>
    </div>
  );
};

export default Comment;
