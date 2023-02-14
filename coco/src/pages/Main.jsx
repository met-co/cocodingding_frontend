import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
//컴포넌트

import Topbar from '../components/Topbar/Topbar';
import CreateRoomButton from '../components/Main/CreateRoomButton';
import RoomForm from '../components/Main/RoomForm';
import Layout from '../components/Layout/Layout';

function Main() {
  // const rooms = useSelector((state) => state.room.rooms) || [];
  const isLoggedIn = !!localStorage.getItem('Authorization');

  return (
    <div>
      <StTopbar>
        <Topbar />
      </StTopbar>
      <Layout>
        {isLoggedIn ? (
          <>
            <StTopContainer>
              <StTitle>
                <h1>
                  안녕하세요, {localStorage.getItem('Nickname')}님! 오늘도 함께
                  공부해요.
                </h1>
              </StTitle>

              <RoomForm />
            </StTopContainer>
          </>
        ) : (
          <>
            <StTopContainer>
              <StTitle>
                <h1>오늘도 함께 공부좀해요.^^</h1>
              </StTitle>

              <RoomForm />
            </StTopContainer>
          </>
        )}

        <div>{/* 여기서 가로배치,, */}</div>
      </Layout>
    </div>
  );
}

export default Main;

const StTopbar = styled.div`
  z-index: 999;
`;

const StTopContainer = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
  z-index: -1;
`;

const StTitle = styled.div`
  margin-top: 3rem;
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
