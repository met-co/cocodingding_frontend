import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
//컴포넌트
import Topbar from '../components/Topbar/Topbar';
import CreateRoomButton from '../components/Main/CreateRoomButton';
import RoomForm from '../components/Main/RoomForm';

function Main() {
  // const rooms = useSelector((state) => state.room.rooms) || [];

  return (
    <div>
      <Topbar />
      <StBody>
        <div>
          <h1>안녕하세요, (nickname)님! 오늘도 함께 공부해요.</h1>
        </div>

        <div>카테고리 태그</div>

        <div>방리스트..</div>
        <div>
          <RoomForm />
          <StCreateRoom>
            <CreateRoomButton />
          </StCreateRoom>
        </div>
      </StBody>
    </div>
  );
}

export default Main;

const StBody = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
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
