import axios from 'axios';
import React, { useEffect, useState } from 'react';
// RoomForm 컴포넌트에서 rooms state 및 rooms 데이터 가져오는 기능 구현

export default function RoomForm() {
  // rooms 상태정의, setRooms 함수 정의
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      // localhost:3001/rooms에서 데이터 가져오기
      const response = await axios.get('http://localhost:3001/rooms');
      // 가져온 데이터를 rooms 상태에 넣기
      setRooms(response.data);
      console.log(response);
    }
    // 함수 호출
    fetchRooms();
  }, []);

  useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) =>
        room.roomName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, rooms]);

  return (
    <div>
      <input
        type='text'
        placeholder='Search rooms'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredRooms.map((room) => (
        <div key={room.id}>
          <div>{room.roomName}</div>
          <div>{room.category}</div>
        </div>
      ))}
    </div>
  );
}
