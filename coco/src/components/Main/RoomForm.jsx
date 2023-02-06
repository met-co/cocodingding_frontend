import React from 'react';
import { useSelector } from 'react-redux';

export default function RoomForm() {
  const rooms = useSelector((state) => state.room.rooms) || [];

  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>{room.name}</div>
      ))}
    </div>
  );
}
