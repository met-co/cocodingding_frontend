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
import TodoList from './TodoList';

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
    `"중요한건 꺾이지 않는 마음.".\n-  DRX 소속 프로게이머 김혁규(Deft)`,
    `"나비와 나방은 생물학적으로 크게 다를 게 없죠,하지만 사람들은 주로 밤에 보이는 나방을 나비보다 못한 것으로 생각하곤 합니다 ".\n- 3조 유현승`,
    `"우리 어린애 아니잖아요?".\n- 박응수매니저`,
    `"세잎크로버의 꽃말은 행복입니다. 우리는 왜 그동안 수많은 행복들 사이에서 행운이라는 네잎크로버를 찾는데 집중했을까요? ".\n- 4조 김지석`,
    '"야 내도 한다, 니라고 못할것 같나?" \n- 5조 전병진',
    '"그 동안 행복코딩하셨잖아요 ^^, 이젠 저희도 좀 즐길게요" \n- 5조 홍정기',
    '"지금 그렇게 유튜브 보면서 놀때 인가요??" \n- 4조 김현우',
    '"괜찮으신가요?? ㅠㅠ 파이팅입니다." \n- 5조 이정우',
    '"아니, 고작 이것도 못하면 다른일은 잘할수 있을것 같아요??" \n- 6조 이채정',
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
        <TodoList />
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
