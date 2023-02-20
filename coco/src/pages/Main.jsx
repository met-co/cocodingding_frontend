import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BsBroadcast } from 'react-icons/bs';
//컴포넌트

import Topbar from '../components/Topbar/Topbar';
import CreateRoomButton from '../components/Main/CreateRoomButton';
import RoomForm from '../components/Main/RoomForm';
import Layout from '../components/Layout/Layout';
import BottomBar from '../components/BottomBar/BottomBar';
import __getRoom from '../redux/modules/roomSlice';

const Main = () => {
  // const rooms = useSelector((state) => state.room.rooms) || [];
  const dispatch = useDispatch();

  const isLoggedIn = !!localStorage.getItem('Authorization');

  return (
    <div>
      <StTopbar>
        <Topbar />
      </StTopbar>

      {/* <Layout> */}
      {isLoggedIn ? (
        <>
          <StTopContainer>
            <StBackground>
              <StTitle>
                <h1>
                  안녕하세요, {localStorage.getItem('userNickname')}님! 오늘도
                  함께 공부해요.
                </h1>
              </StTitle>
            </StBackground>
            <Layout>
              <RoomForm />
            </Layout>
          </StTopContainer>
        </>
      ) : (
        <>
          <StTopContainer>
            <StBackground>
              <StTitle>
                <h1>함께 공부좀하시죠?</h1>
              </StTitle>
            </StBackground>
            <Layout>
              <RoomForm />
            </Layout>
          </StTopContainer>
        </>
      )}
      {/* </Layout> */}

      <StBottom>{/* <BottomBar>여기서 가로배치,,</BottomBar> */}</StBottom>
    </div>
  );
};

export default Main;

const StTopbar = styled.div`
  z-index: 999;
`;

const StBackground = styled.div`
  background-color: #ffe45c;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StTopContainer = styled.div`
  /* margin-left: 2rem;
  margin-right: 2rem; */
  /* display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 10px; */

  /* background-color: yellow; */
`;

const StTitle = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  h2 {
    font-weight: 700;
  }

  margin-top: 120px;
  padding: 4rem;
`;

const StBottom = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
