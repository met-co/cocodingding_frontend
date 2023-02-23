// import { useRef, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import * as StompJs from '@stomp/stompjs';
// // import instance from '../../utils/axiosConfig';

// export default function Chat() {
//   const [chatList, setChatList] = useState([]);
//   const [chat, setChat] = useState('');

//   // const { chatRoomId } = useParams();
//   const client = useRef({});

//   const { openviduRoomId } = useParams(); // useParams()로 라우트 매개변수 가져오기
//   const chatRoomId = openviduRoomId;
//   console.log(chatRoomId);

//   const connect = () => {
//     client.current = new StompJs.Client({
//       brokerURL: 'ws://cocodingding.shop/ws',
//       onConnect: () => {
//         console.log('success');
//         subscribe();
//       },
//       connectHeaders: {
//         // 이 부분 새로 추가
//         Authorization: window.localStorage.getItem('authorization'),
//       },
//     });
//     client.current.activate();
//   };

//   const publish = (chat) => {
//     if (!client.current.connected) return;

//     client.current.publish({
//       destination: '/pub/chat/message',
//       body: JSON.stringify({
//         chatRoomId: chatRoomId,
//         chat: chat,
//       }),
//     });

//     setChat('');
//   };

//   const subscribe = () => {
//     client.current.subscribe('/sub/chat/message' + chatRoomId, (body) => {
//       const json_body = JSON.parse(body.body);
//       setChatList((_chat_list) => [..._chat_list, json_body]);
//     });
//   };

//   const disconnect = () => {
//     client.current.deactivate();
//   };

//   const handleChange = (event) => {
//     // 채팅 입력 시 state에 값 설정
//     setChat(event.target.value);
//   };

//   const handleSubmit = (event, chat) => {
//     // 보내기 버튼 눌렀을 때 publish
//     event.preventDefault();

//     publish(chat);
//   };

//   useEffect(() => {
//     connect();

//     return () => disconnect();
//   }, []);

//   return (
//     <div>
//       <div className={'chat-list'}>{chatList}</div>
//       <form onSubmit={(event) => handleSubmit(event, chat)}>
//         <div>
//           <input
//             type={'text'}
//             name={'chatInput'}
//             onChange={handleChange}
//             value={chat}
//           />
//         </div>
//         <input type={'submit'} value={'의견 보내기'} />
//       </form>
//     </div>
//   );
// }

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
    <div>
      <Container>
        <StFont>실시간채팅</StFont>
        <Down>
          <div ref={scrollRef} style={{ overflow: 'auto', height: '500px' }}>
            {Myname &&
              messages.map((chating) =>
                chating.userNickname === Myname ? (
                  <SendMessage>
                    <div>
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
                        <h4>{Myname}님</h4>
                        <span>{chating.message}</span>
                      </Dou>
                    </div>
                  </ReceivedMessage>
                )
              )}
          </div>
          <Footer>
            <input
              type='text'
              ref={chatRef}
              onKeyDown={handleEnterPress}
              placeholder='내용을 입력해주세요.'
            />
            <button onClick={myChat}>전송</button>
          </Footer>
        </Down>
      </Container>
    </div>
  );
};

export default Chat;

const Container = styled.div`
  width: 500px;
  height: 700px;
  border-radius: 10px;
  background-color: #c2c1c1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  box-sizing: border-box;
  position: relative;
`;
const StFont = styled.p`
  position: absolute;
  font-weight: 700;
  font-size: 1.5em;
  color: #fff;
  left: 20px;
`;

const Dou = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 10px;
  h4 {
    margin-top: 10px;
  }
`;

const Down = styled.div`
  width: 500px;
  height: 500px;
  overflow-y: scroll;
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

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 140px;
  position: relative;
  input {
    width: 490px;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: 0 solid black;
  }
  button {
    width: 55px;
    height: 52px;
    position: absolute;
    top: 0px;
    right: 5px;
    border-radius: 50%;
    cursor: pointer;
    border: 0 solid black;
  }
`;
