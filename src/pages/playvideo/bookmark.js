import React from "react";
import Bookmarklist from "./bookmarklist";

const Bookmark = (props) => {
  console.log("start");
  return (
    <div>
      <div>{props.user.getBookmark}</div>
      <div>{props.user.getBookmark.Video.videoTitle}</div>
    </div>
  );
};

export default Bookmark;
