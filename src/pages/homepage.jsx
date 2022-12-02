import axios from "axios";
import React, { useState } from "react";
import { Cookies } from "react-cookie";

const Homepage = (props) => {
  const [comment, setComment] = useState({
    videoID: 1,
    comment: "abcd",
  });
  const cookies = new Cookies();
  return (
    <div>
      <button
        onClick={() => {
          console.log("comment", comment);
          console.log(cookies.get("userID"));
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
      />
    </div>
  );
};

export default Homepage;
