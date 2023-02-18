import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import CreateRoomButton from './CreateRoomButton';
import Topbar from '../Topbar/Topbar';
import { useDispatch, useSelector } from 'react-redux';
import { __getRoom } from '../../redux/modules/roomSlice';
import { __postVideoRoom } from '../../redux/modules/roomSlice';

// RoomForm 컴포넌트에서 rooms state 및 rooms 데이터 가져오는 기능 구현
export default function RoomForm() {
  const APPLICATION_SERVER_URL = 'https://cocodingding.shop/';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getRoom());
  }, [dispatch]);

  const { rooms } = useSelector((state) => state.room);
  console.log(rooms);

  // rooms 상태정의, setRooms 함수 정의
  const [search, setSearch] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    setFilteredRooms(
      rooms.filter((room) =>
        room.roomName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, rooms]);

  const selectCategory = (category) => {
    setFilteredRooms(rooms.filter((room) => room.category === category));
    // 검색어 상태(search) 초기화
    setSearch('');
  };

  //로그인여부
  const isLoggedIn = !!localStorage.getItem('Authorization');

  const [sessionid, setSessionid] = useState(null);
  const [token, setToken] = useState(null);

  const handleEnter = () => {
    getToken();
  };

  const getToken = async () => {
    const sessionId = await createSession();
    return await createToken(sessionId);
  };

  const createSession = async () => {
    const sessionResponse = await axios.post(
      APPLICATION_SERVER_URL + 'detail/room',
      { headers: { 'Content-Type': 'application/json' } },
      { withCredentials: true }
    );
    setSessionid(sessionResponse.data);
    return sessionResponse.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const tokenResponse = await axios.post(
      APPLICATION_SERVER_URL + 'detail/room/' + sessionId,
      { headers: { 'Content-Type': 'application/json' } },
      { withCredentials: true }
    );
    setToken(tokenResponse.data);
    return tokenResponse.data; // The token
  };

  console.log(sessionid);
  console.log(token);

  //명언기능 한번 테스트해봄.
  const wisdomList = [
    `"세잎크로버의 꽃말은 행복입니다. 우리는 왜 그동안 수많은 행복들 사이에서 행운이라는 네잎크로버를 찾는데 집중했을까요? ".\n- 키아.. 김지석 미쳤다.`,
    '"인생은 될 대로 되는것이 아니라 생각대로 되는것이다."\n- 조엘오스틴',
    '"성공을 거둬야 한다면 실패를 거둬야 한다. 실패를 두려워하지 마라." \n- 존 우든',
    '"자신감이란 태도다. 성공에 필요한 것은 자신감이다." \n- 트루먼 카포티"',
    '"어려움이 있으면 기회가 있다." \n- 에디슨',
  ];
  const [wisdom, setWisdom] = useState(
    wisdomList[Math.floor(Math.random() * wisdomList.length)]
  );

  useEffect(() => {
    setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
  }, []);

  return (
    <div>
      <StSearch>
        <StBackground>
          <StInput
            type='text'
            placeholder='참여하고싶은 방을 찾아보세요'
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
        </StBackground>

        {/* 명언 */}
        <StWisdom>{wisdom}</StWisdom>
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
            <div>{room.roomName}</div>
            <div>
              <StButton
                onClick={() => {
                  if (isLoggedIn) {
                    navigate(`/detail/${room.id}`);
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

const StBackground = styled.div`
  background-color: #ffe45c;
  width: 100.7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StWisdom = styled.h3`
  white-space: pre-line;
  display: flex;
  text-align: center; // 가운데 정렬
  margin-top: 50px;
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
  background-color: gray;
  border: solid 1px gray;
  border-radius: 3rem;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;
