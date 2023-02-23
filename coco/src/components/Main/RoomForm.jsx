import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CreateRoomButton from './CreateRoomButton';
import { __getRoom } from '../../redux/modules/roomSlice';
import { __postVideoToken } from '../../redux/modules/roomSlice';

// RoomForm 컴포넌트에서 rooms state 및 rooms 데이터 가져오는 기능 구현
export default function RoomForm({ rooms, search, category }) {
  const APPLICATION_SERVER_URL = 'https://cocodingding.shop/';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getRoom());
  }, []);

  const filteredRooms = rooms
    .filter((room) =>
      room.roomTitle.toLowerCase().includes(search.toLowerCase())
    )
    .filter((room) => (category ? room.category === category : true));

  //로그인여부
  const isLoggedIn = !!localStorage.getItem('Authorization');

  const handleSubmit = (id) => {
    console.log(id);
    dispatch(__postVideoToken(id));
  };

  return (
    <div>
      <StSearch>
        {/* <StBackground>
          <StInput
            type="text"
            placeholder="참여하고싶은 방을 찾아보세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <StCategorys>
            {Array.from(new Set(rooms.map((room) => room.category))).map(
              (category) => (
                <StCategory
                  key={category}
                  onClick={() => selectCategory(category)}
                >
                  #{category}
                </StCategory>
              )
            )}
          </StCategorys>
        </StBackground> */}

        <StCreateRoomButton>
          <div>
            <h2> 방에 참여해보세요.</h2>
          </div>
          <div>
            <CreateRoomButton />
          </div>
        </StCreateRoomButton>
      </StSearch>
      <StCreateRooms>
        {filteredRooms.map((room) => (
          <StCreatedRoom key={room.id}>
            <div>
              <div> 닉네임</div>
              <div>#{room.category}</div>
            </div>
            <div>{room.roomTitle}</div>
            <div>
              <StButton
                onClick={() => {
                  handleSubmit(room.openviduRoomId);
                  if (isLoggedIn) {
                    navigate(`/detail/${room.openviduRoomId}`);
                  } else {
                    alert('로그인이 필요한 기능입니다.');
                  }
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
  flex-wrap: wrap;
`;

const StCreatedRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 40px;
  padding: 2rem;
  width: 250px;
  height: 200px;
  background-color: white;
  border: solid 1px white;
  border-radius: 3rem;
  box-shadow: 4px 5px 15px rgba(0, 0, 0, 0.3);
`;

const StCategorys = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const StCategory = styled.div`
  border: solid 1px gray;
  border-radius: 1.5rem;
  background-color: #fff1ad;
  margin-left: 1rem;
  margin-right: 1rem;

  padding: 0.7rem;
  cursor: pointer;
  &:hover {
    /* background-color: black; */
    color: black;
    border: 2px solid #3d8afd;
    margin-bottom: -2px;
  }
`;

const StInput = styled.input`
  width: 25%;
  height: 43px;
  border: solid 1px gray;
  border-radius: 10px;
  background-color: white; ;
`;

const StButton = styled.button`
  width: 5rem;
  border: solid 1px gray;
  border-radius: 0.5rem;
  background-color: #fff1ad;
  width: 200px;
  height: 40px;
  cursor: pointer;
  &:hover {
    border: 2px solid #3d8afd;
  }
`;

const StCreateRoomButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;
