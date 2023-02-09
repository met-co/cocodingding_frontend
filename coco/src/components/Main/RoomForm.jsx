import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// RoomForm 컴포넌트에서 rooms state 및 rooms 데이터 가져오는 기능 구현
export default function RoomForm() {
  // rooms 상태정의, setRooms 함수 정의
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const navigate = useNavigate();

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
      <div>
        <StInput
          type='text'
          placeholder='참여하고싶은 방을 찾아보세요'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StCategorys>
          {Array.from(new Set(rooms.map((room) => room.category))).map(
            (category) => (
              <StCategory key={category}>#{category}</StCategory>
            )
          )}
        </StCategorys>
      </div>
      <StCreateRooms>
        {filteredRooms.map((room) => (
          <StCreatedRoom key={room.id}>
            <div>{room.roomName}</div>
            <div>#{room.category}</div>
            <div>
              <button
                onClick={() => {
                  navigate(`/Detail/${room.id}`);
                }}
              >
                입장하기
              </button>
            </div>
          </StCreatedRoom>
        ))}
      </StCreateRooms>
    </div>
  );
}

const StCreateRooms = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 10px;
  width: 350px;
  height: 200px;
  background-color: gray;
  border: solid 1px gray;
  border-radius: 3px;
`;

const StCategorys = styled.div`
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

const StCategory = styled.div`
  border: solid 1px black;
  border-radius: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;

  padding: 0.7rem;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const StInput = styled.input`
  position: absolute;
  top: 220px;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 30vw;
  height: 35px;
  border: solid 1px black;
  border-radius: 0.5rem;
  background-color: white; ;
`;
