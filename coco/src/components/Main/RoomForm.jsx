import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateRoomButton from './CreateRoomButton';
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
      <StSearch>
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
        <StCreateRoomButton>
          <h2> 방에 참여해보세요.</h2>
          <div>
            <CreateRoomButton />
          </div>
        </StCreateRoomButton>
      </StSearch>
      <StCreateRooms>
        {filteredRooms.map((room) => (
          <StCreatedRoom key={room.id}>
            <div>{room.roomName}</div>
            <div> 닉네임</div>
            <div>#{room.category}</div>
            <div>
              <StButton
                onClick={() => {
                  navigate(`/Detail/${room.id}`);
                }}
              >
                입장하기
              </StButton>
            </div>
          </StCreatedRoom>
        ))}
      </StCreateRooms>
    </div>
  );
}
const StSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StCreateRooms = styled.div`
  display: flex;
  /* overflow: scroll; */
  overflow-y: auto;
  //   // 뭔진 모르겠는데 스크롤 숨기는 기능임...
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  white-space: nowrap;
`;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 10px;
  padding: 2rem;
  width: 250px;
  height: 200px;
  background-color: gray;
  border: solid 1px gray;
  border-radius: 3rem;
`;

const StCategorys = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  width: 65%;
  height: 35px;
  border: solid 1px black;
  border-radius: 0.5rem;
  background-color: white; ;
`;

const StButton = styled.button`
  width: 5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  width: 200px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const StCreateRoomButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;
