import React from 'react';
import { useSelector } from 'react-redux';
import CreateRoomForm from '../components/Main/CreateRoomForm';

function Main() {
  const rooms = useSelector((state) => state.rooms);

  return (
    <div>
      <CreateRoomForm />
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <a href={`/${room.id}`}>{room.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
