import React, { useEffect, useRef, useState } from "react";
import style from "../style/search.module.css";
import VideoForm from "../components/videoForm";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search = (props) => {
  const [videos, setVideos] = useState([]);
  const [text, setText] = useState("");

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      getVideos();
    }
  };

  const getVideos = async () => {
    await axios
      .get(`http://localhost:3001/search?videoTitle=${text}`)
      .then((data) => {
        console.log(data.data);
        setVideos(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.section}>
      <div className={style.searchbar}>
        <input
          onChange={(e) => setText(e.target.value)}
          className={style.input}
          placeholder="Search..."
          onKeyPress={onKeyDown}
        />
        <button className={style.searchbtn} onClick={getVideos}>
          <SearchIcon fontSize="large" />
        </button>
      </div>
      <div className={style.videosection}>
        {videos.map((video) => (
          <div className={style.video}>
            <VideoForm key={video.videoID} video={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
