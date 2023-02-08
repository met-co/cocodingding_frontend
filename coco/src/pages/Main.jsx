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

  return (
    <div>
      <Topbar />
      <Layout>
        <StTopContainer>
          <StTitle>
            <h1>안녕하세요, (nickname)님! 오늘도 함께 공부해요.</h1>
          </StTitle>
        </StTopContainer>
        <StRoomContainer>
          <h2>직접 방을 만들어주세요!</h2>
          <div>
            {/* 여기서 가로배치,, */}
            <RoomForm />
            <StCreateRoom>
              <CreateRoomButton />
            </StCreateRoom>
          </div>
        </StRoomContainer>
      </Layout>
    </div>
  );
}

export default Main;

const StTopContainer = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StTitle = styled.div`
  margin-top: 3rem;
`;

const StRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2 {
    font-weight: 700;
  }
  padding: 4rem;
`;

const StCreateRoom = styled.div`
  display: flex;
  justify-content: center;

  width: 350px;
  height: 200px;

  background-color: gray;

  border: solid 1px gray;
  border-radius: 3px;
`;
