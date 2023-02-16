import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout/Layout';
import Topbar from '../components/Topbar/Topbar';
import styled from 'styled-components';
// import { OpenVidu } from 'openvidu-browser';
import { useLocation } from 'react-router-dom';
// import VideoRecord from "../components/videoRecord/VideoRecord";
import axios from 'axios';
// import Chat from '../components/Chat/Chat';
import ChatRoom from '../components/Chat/ChatRoom';
export default function Detail() {
  return (
    <>
      <Topbar />
      <Layout>
        <StTitle>
          <h1>Welcome ! (방이름) 방 입니다.</h1>
        </StTitle>
        <StContainer>
          {/* <Chat /> */}
          <ChatRoom />
        </StContainer>
      </Layout>
    </>
  );
}

const StTitle = styled.div`
  margin-top: 40px;
`;

const StContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 70vh;
  margin-top: 50px;
`;
