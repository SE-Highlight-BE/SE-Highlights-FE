import React, { useState } from "react";
import style from "../../style/comment.module.css";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

const Comment = ({ data, getReplys, searchMyComment }) => {
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
          searchMyComment();
        } else {
          alert(data.data.error);
        }
        getReplys();
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
      <button className={style.delete} onClick={deleteHandler}>
        <DeleteOutlineIcon className={style.icon} />
      </button>
    </div>
  );
};

export default Comment;
