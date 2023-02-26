// FIXME: 원래 코드

import styled from 'styled-components';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { subMessage } from '../../redux/modules/socketSlice';
// import { getMessage, getChatRoom } from "./redux/modules/socketSlice";

const Chat = (props) => {
  const myEmail = localStorage.getItem('userEmail');
  const Myname = localStorage.getItem('userNickname');
  const chatRef = useRef('');

  console.log(props.nickname);

  // const navigate = useNavigate();
  // const { chatRoomId } = useParams();
  //console.log('방 id', chatRoomId);

  //프롭스로 방 id 들고옴.
  const { openviduRoomId } = useParams(); // useParams()로 라우트 매개변수 가져오기
  const chatRoomId = openviduRoomId;
  console.log(chatRoomId);

  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  // const sock = new SockJS('http://localhost:8080/ws-stomp');
  const sock = new SockJS('https://cocodingding.shop/ws-stomp');
  const client = Stomp.over(sock);

  const headers = {
    Authorization: localStorage.getItem('Authorization'),
  };

  const { chatcollect } = useSelector((state) => state.chatcollect);
  console.log(chatcollect);
  const { messages } = useSelector((state) => state.messages);

  // const users = useSelector((state) => state.chat.users);
  // const chatRoom = useSelector((state) => state.chat.chatRoom);

  // // 방정보 가져오기
  // useEffect(() => {
  //   dispatch(getChatRoom());
  // }, []);

  // // 이전 채팅 내용 가져오기
  // useEffect(() => {
  //   dispatch(getMessage());
  // }, []);

  // 채팅 엔터키/shif+enter 막기
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      window.scrollTo(0, 0);
      // sendMessage();
    }
  };

  useEffect(() => {
    // 소켓 연결
    console.log('sub연결 테스트');
    console.log(chatRoomId);
    if (chatRoomId) {
      console.log(chatcollect.chatRoomId);
      try {
        client.connect(
          {},
          () => {
            console.log(chatRoomId);
            // 채팅방 구독
            client.subscribe(`/sub/chat/room/${chatRoomId}`, (res) => {
              console.log('sub 확인');

              console.log(res.body);
              const receive = JSON.parse(res.body);
              console.log(receive);
              dispatch(subMessage(receive));
            });
          },
          {}
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [chatcollect]);

  // 채팅 전송
  const myChat = () => {
    const message = chatRef.current.value;
    if (message === '') {
      return;
    }
    client.send(
      `/pub/chat/message`,
      headers,
      JSON.stringify({
        roomId: chatRoomId,
        // userEmail: myEmail,
        sender: Myname,
        message: message,
      })
    );
    chatRef.current.value = null;
    console.log('방아이디', chatRoomId, messages);
  };
  console.log('방아이디', chatRoomId, messages);

  console.log(987, Myname);
  // console.log(789, userNickname);

  const scrollRef = useRef();
  console.log(scrollRef);

  useEffect(() => {
    // 메시지 수신 시
    // 스크롤을 가장 아래로 이동시킨다.
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  return (
    <Container>
      <ChatHeader>실시간 채팅</ChatHeader>
      <StChatBox ref={scrollRef}>
        {Myname &&
          messages.map((chating) =>
            chating.sender === Myname ? (
              <SendMessage>
                <div>
                  <h4>{chating.sender}님</h4>
                  <span>{chating.message}</span>
                  {/* <img
                        src={process.env.PUBLIC_URL + '/basic.png'}
                        alt='로고'
                      /> */}
                </div>
              </SendMessage>
            ) : (
              <ReceivedMessage>
                <div>
                  {/* <img
                        src={process.env.PUBLIC_URL + '/basic.png'}
                        alt='로고'
                      /> */}
                  <Dou>
                    <h4>{chating.sender}님</h4>
                    <span>{chating.message}</span>
                  </Dou>
                </div>
              </ReceivedMessage>
            )
          )}
      </StChatBox>
      <Footer>
        <input
          type='text'
          ref={chatRef}
          onKeyDown={handleEnterPress}
          placeholder='내용을 입력해주세요.'
        />
        <button onClick={myChat}>전송</button>
      </Footer>
    </Container>
  );
};

export default Chat;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border: 1px solid gray;
  background-color: #f0f0f0;
  font-size: 24px;
  font-weight: bold;
`;

//
const Container = styled.div`
  /* width: 500px; */
  height: 800px;
  /* border-radius: 10px; */
  background-color: #c2c1c1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  box-sizing: border-box;
  position: relative;
`;

const StChatBox = styled.div`
  /* display: flex;
  flex-direction: column-reverse; */
  /* background-color: blue; */
  /* flex-basis: 50%; */
  overflow-y: auto;
  height: 800px;
`;

const Dou = styled.div`
  /* display: flex;
  flex-direction: column;
  line-height: 10px;
  h4 {
    margin-top: 10px;
  } */
`;

const ReceivedMessage = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
  div {
    display: flex;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 5%;
    margin-top: 5px;
  }
`;

const SendMessage = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: right;
  div {
    display: flex;
    justify-content: flex-end;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 5%;
  }
`;
const ChatText = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.isMe ? '#007bff' : '#f0f0f0')};
  color: ${(props) => (props.isMe ? 'white' : 'black')};
  border-radius: ${(props) =>
    props.isMe ? '10px 0 10px 10px' : '0 10px 10px 10px'};
`;

const Footer = styled.div`
  display: flex;
  height: 80px;
  align-items: center;

  /* flex-basis: 50%; */
  /* background-color: red; */
  /* flex-direction: row; */
  /* margin-top: 140px; */
  position: relative;
  input {
    width: 460px;
    height: 60px;
    border-radius: 30px;
    outline: none;
    border: 0 solid black;
  }
  button {
    width: 55px;
    height: 55px;
    position: absolute;
    line-height: 40px;
    right: 2px;
    border-radius: 50%;
    cursor: pointer;
    border: 0 solid black;
  }
`;
