import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

//컴포넌트

import Topbar from '../components/Topbar/Topbar';
import CreateRoomButton from '../components/Main/CreateRoomButton';
import RoomForm from '../components/Main/RoomForm';
import Layout from '../components/Layout/Layout';
import BottomBar from '../components/BottomBar/BottomBar';
import __getRoom from '../redux/modules/roomSlice';
import SearchBar from '../components/Main/SearchBar';
import WisdomQuote from '../components/Main/WisdomQuote';
import TodoList from '../components/Main/TodoList';

const Main = () => {
  // const rooms = useSelector((state) => state.room.rooms) || [];
  const dispatch = useDispatch();
  //검색기능 프롭스 전달
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { rooms } = useSelector((state) => state.room);

  const filteredRooms = rooms
    .filter((room) =>
      room.roomTitle.toLowerCase().includes(search.toLowerCase())
    )
    .filter((room) => (category ? room.category === category : true));

  //로그인 여부
  const isLoggedIn = !!localStorage.getItem('Authorization');

  return (
    <div>
      <StTopbar>
        <Topbar />
      </StTopbar>

      {/* <Layout> */}
      {isLoggedIn ? (
        <>
          <StTopContainer>
            <StBackground>
              <StTitle>
                <h1>
                  안녕하세요, {localStorage.getItem('userNickname')}님! 오늘도
                  함께 공부해요.
                </h1>
              </StTitle>
              <SearchBar
                search={search}
                setSearch={setSearch}
                setCategory={setCategory}
                rooms={rooms}
              />
            </StBackground>

            <Layout>
              <StMidBoxs>
                <StWisdom>
                  <h2>오늘의 한마디</h2>
                  <WisdomQuote />
                </StWisdom>
                <StTodoList>
                  <h2>오늘의 할일</h2>
                  <TodoList>투두리스트</TodoList>
                </StTodoList>
              </StMidBoxs>
              <RoomForm
                search={search}
                setSearch={setSearch}
                setCategory={setCategory}
                rooms={rooms}
              />
            </Layout>
          </StTopContainer>
        </>
      ) : (
        <>
          <StTopContainer>
            <StBackground>
              <StTitle>
                <h1>함께 공부좀하시죠?</h1>
              </StTitle>
              <SearchBar
                search={search}
                setSearch={setSearch}
                setCategory={setCategory}
                rooms={rooms}
              />
            </StBackground>
            <Layout>
              <StMidBoxs>
                <StWisdom>
                  <h2>오늘의 한마디</h2>
                  <WisdomQuote />
                </StWisdom>
                <StTodoList>
                  <h2>오늘의 할일</h2>
                  <TodoList>투두리스트</TodoList>
                </StTodoList>
              </StMidBoxs>
              <RoomForm
                // rooms={filteredRooms}
                search={search}
                setSearch={setSearch}
                Category={setCategory}
                rooms={rooms}
              />
            </Layout>
          </StTopContainer>
        </>
      )}
      {/* </Layout> */}

      <StBottom>{/* <BottomBar>여기서 가로배치,,</BottomBar> */}</StBottom>
    </div>
  );
};

export default Main;

const StTopbar = styled.div`
  z-index: 999;
`;

const StBackground = styled.div`
  background-color: #ffe45c;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StTopContainer = styled.div`
  /* margin-left: 2rem;
  margin-right: 2rem; */
  /* display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 10px; */

  /* background-color: yellow; */
`;

const StTitle = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StMidBoxs = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const StWisdom = styled.div`
  flex-basis: 30%;
  margin-right: 100px;
`;

const StTodoList = styled.div`
  flex-basis: 70%;
`;

const StBottom = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
