import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { Row, Col, Container, Button } from "react-bootstrap";
import Bookmarklist from './playvideo/bookmarklist'
import Commentlist from './playvideo/commentlist'
import { Avatar} from '@mui/material';
import style from "../style/homepage.module.css";

const Mypage = () => {
  const [user,setUser] = useState();
  const [comment,setCommet] = useState();
  
    const getuser = async() => {
      const res = await axios.get("http://localhost:3001/bookmark/getList")
      console.log(res.data)
      setUser(res.data)
    }
    const getcomment = async() => {
      const res = await axios.get("http://localhost:3001/reply/getUserComment")
      console.log(res.data)
      setCommet(res.data)
    }
    // useEffect(() => {
    //   console.log("랜더링후")
    // },[])
  return (
    <div>
      <Container>
        <Row>
          <Col>
          <Avatar>M</Avatar>
          <div>{user?.userName.userName}</div>
          <div><Button variant="text" onClick={getuser}>북마크 목록 보기</Button></div>
          <div><Button variant="text" onClick={getcomment}>댓글 목록 보기</Button></div>
          </Col>
          {/* <Col className='list-box'>
          <Bookmarklist user = {user}/>
          <Commentlist comment = {comment}/>
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}



export default Mypage;

