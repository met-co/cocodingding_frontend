import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  joinRoom,
  leaveRoom,
  receiveMessage,
  selectChatRoom,
  sendMessage,
  addMessage,
} from '../../redux/modules/chatSlice';

import Topbar from '../Topbar/Topbar';

export default function ChatRoom() {
  const chatRoom = useSelector(selectChatRoom);
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [userList, setUserList] = useState([]);

  // 스크롤 다운을 위한 useRef
  const chatBodyRef = useRef();

  useEffect(() => {
    if (chatRoom.id) {
      dispatch(joinRoom(chatRoom.id));
    }
    return () => {
      dispatch(leaveRoom());
    };
  }, [chatRoom.id, dispatch]);

  useEffect(() => {
    if (chatRoom.id) {
      dispatch(receiveMessage());
    }
    return () => {
      dispatch(leaveRoom());
    };
  }, [chatRoom.id, dispatch]);

  useEffect(() => {
    if (chatRoom.users) {
      setUserList(chatRoom.users);
    }
  }, [chatRoom]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      return;
    }
    dispatch(sendMessage({ message }));
    setMessage('');
  };

  // 채팅 메시지를 위한 렌더링 함수
  const renderChatMessages = () => {
    if (chatRoom.messages) {
      return chatRoom.messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.author}:</strong> {msg.content}
        </div>
      ));
    }
    return <div>No messages yet.</div>;
  };

  // 유저 리스트를 위한 렌더링 함수
  const renderUserList = () => {
    if (userList) {
      return userList.map((user, index) => (
        <div key={index}>{user.username}</div>
      ));
    }
    return <div>No users in the room.</div>;
  };

  // 스크롤이 최하단으로 내려가도록 하는 함수
  const scrollDown = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollDown();
  });

  const handleLeaveRoom = () => {
    dispatch(leaveRoom());
  };

  return (
    <StWrapper>
      <Topbar />
      <StChatContainer>
        <StSidebar>
          <StRoomList>
            <StRoomHeader>
              <StRoomTitle>{chatRoom?.name}</StRoomTitle>
              <StLeaveRoomButton onClick={handleLeaveRoom}>
                Leave Room
              </StLeaveRoomButton>
            </StRoomHeader>
            <StMessageList ref={chatBodyRef}>
              {renderChatMessages()}
            </StMessageList>
            <StMessageInput>
              <StInput
                type='text'
                placeholder='Type a message'
                value={message}
                onChange={handleMessageChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              <StSendButton onClick={handleSubmit}>Send</StSendButton>
            </StMessageInput>
          </StRoomList>
          <StUserList>{renderUserList()}</StUserList>
        </StSidebar>
        <StVideoChat>{/* <VideoChat /> */}</StVideoChat>
      </StChatContainer>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StChatContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: white;
`;

const StSidebar = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`;

const StRoomList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #ccc;
  background-color: #f6f6f6;
`;

const StRoomHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
`;

const StRoomTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StLeaveRoomButton = styled.button`
  font-size: 16px;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

const StMessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const StMessageInput = styled.div`
  padding: 10px;
  display: flex;
`;

const StInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
`;

const StSendButton = styled.button`
  font-size: 16px;
  color: #fff;
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #27ae60;
  }
`;

const StVideoChat = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4 1 0;
`;

const StVideoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StRemoteVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StLocalVideo = styled.video`
  width: 300px;
  height: 225px;
  border-radius: 5px;
`;

const StControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const StControlButton = styled.button`
  font-size: 16px;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

const StUsername = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const StUserList = styled.div`
  flex: 0 0 200px;
  padding: 10px;
`;
