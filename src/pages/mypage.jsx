import { Button } from "@mui/material";
import React from "react";

const Mypage = (props) => {
  return (
    <Button
      variant="outlined"
      disabled
      onClick={() => {
        alert("clicked!");
      }}
    />
  );
};

export default Mypage;
