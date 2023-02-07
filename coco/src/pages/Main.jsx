import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//컴포넌트
import Topbar from '../components/Main/Topbar';
import CreateRoomButton from '../components/Main/CreateRoomButton';
import RoomForm from '../components/Main/RoomForm';

function Main() {
  // const rooms = useSelector((state) => state.room.rooms) || [];

  return (
    <div>
      <Topbar />
      <div>검색</div>
      <div>카테고리 태그</div>

      <div>
        <CreateRoomButton />
      </div>
      <div>방리스트..</div>
      <div>
        <RoomForm />
      </div>
    </div>
  );
}

export default Main;
