import React, { useEffect, useState } from "react";
import style from "../style/homepage.module.css";
import axios from "axios";
import { Cookies } from "react-cookie";
import VideoForm from "../components/videoForm";

axios.defaults.withCredentials = true;

const Homepage = () => {
  return (
    <div className={style.fill}>
      <div className={style.container}>
        <VideoForm />
        <VideoForm />
        <VideoForm />
        <VideoForm />
        <VideoForm />
        <VideoForm />
        <VideoForm />
        <VideoForm />
      </div>
    </div>
  );
};

export default Homepage;
