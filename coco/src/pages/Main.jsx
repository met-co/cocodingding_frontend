import React, { useState } from 'react';
import Topbar from '../components/Main/Topbar';
import CreateRoomButton from '../components/Main/CreateRoomButton';
import { useSelector } from 'react-redux';
import RoomForm from '../components/Main/RoomForm';

function Main() {
  return (
    <div>
      <Topbar />
      <div>검색</div>
      <div>카테고리 태그</div>
      <div>방리스트..</div>
      <div>
        <CreateRoomButton />
      </div>
      <div>
        <RoomForm />
      </div>
    </div>
  );
}

export default Main;
