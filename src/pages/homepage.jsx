import React, { useEffect, useState } from "react";
import style from "../style/homepage.module.css";
import axios from "axios";
import VideoForm from "../components/videoForm";

axios.defaults.withCredentials = true;

const Homepage = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    await axios
      .get("http://localhost:3001/")
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
    <div className={style.fill}>
      <div className={style.container}>
        {videos.map((video) => (
          <>
            <VideoForm key={video.videoID} video={video} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
