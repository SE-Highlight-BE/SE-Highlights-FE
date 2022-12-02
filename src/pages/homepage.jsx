import React, { useEffect, useState } from "react";
import style from "../style/homepage.module.css";
import axios from "axios";
import { Cookies } from "react-cookie";
const Homepage = () => {
  const [comment, setComment] = useState({
    videoID: 1,
    comment: "dqdw",
  });
  const cookies = new Cookies();
  return (
    <div className={style.fill}>
      <div>dwdwd</div>
      <button
        onClick={() => {
          axios
            .post("http://localhost:3001/reply/comment", comment, {
              headers: {
                Authorization: `Bearer ${cookies.get("userID")}`,
              },
            })
            .then((v) => {
              //백엔드 response값
              console.log(v);
            })
            .catch((e) => {
              console.log("error", e);
            });
        }}
      >
        버튼
      </button>
    </div>
  );
};

export default Homepage;
