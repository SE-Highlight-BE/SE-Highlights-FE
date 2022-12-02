import React, { useEffect, useRef, useState } from "react";
import style from "../style/search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search = (props) => {
  const inputRef = useRef();
  const [videos, setVideos] = useState([]);

  console.log(videos);
  const onClick = () => {
    handleSearch();
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    getVideos();
  };

  const getVideos = async () => {
    const data = inputRef.current.value;
    await axios
      .get("http://localhost:3001/search", {
        videoTitle: data,
      })
      .then((data) => {
        setVideos(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div className={style.section}>
      <div className={style.searchbar}>
        <input
          ref={inputRef}
          className={style.input}
          placeholder="Search..."
          onKeyPress={onKeyDown}
        />
        <button className={style.searchbtn} onClick={onClick}>
          <SearchIcon fontSize="large" />
        </button>
      </div>

      <div className={style.videosection}>videos</div>
    </div>
  );
};

export default Search;
