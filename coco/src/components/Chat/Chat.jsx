// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components';
// import { io } from 'socket.io-client';
// import { useParams } from 'react-router-dom';
// import { addMessage, setMessages } from '../../store/chatSlice';

// const ENDPOINT = 'https://cocodingding.shop/chat';

// const StChatRoom = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
// `;

// const StChatBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: center;
//   width: 50%;
//   height: 60vh;
//   border: 1px solid black;
//   overflow-y: scroll;
// `;

// const StMessageBox = styled.div`
//   display: flex;
//   justify-content: ${(props) =>
//     props.isMine ? 'flex-end' : 'flex-start'};
//   width: 80%;
//   margin-bottom: 1rem;
// `;

// const StMessageText = styled.div`
//   display: inline-block;
//   position: relative;
//   max-width: 70%;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   background-color: ${(props) => (props.isMine ? '#b2dffc' : '#f2f2f2')};
// `;

// const StMessageInfo = styled.div`
//   font-size: 0.6rem;
//   position: absolute;
//   right: ${(props) => (props.isMine ? '0' : 'auto')};
//   bottom: 0;
// `;

// const StMessageInputForm = styled.form`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 50%;
//   height: 10vh;
// `;

// const StMessageInput = styled.input`
//   width: 80%;
//   height: 3rem;
//   font-size: 1rem;
//   padding-left: 1rem;
//   border-radius: 0.5rem;
// `;

// const StMessageSubmitButton = styled.button`
//   width: 20%;
//   height: 3rem;
//   font-size: 1rem;
//   border: none;
//   border-radius: 0.5rem;
//   background-color: #b2dffc;
//   color: white;
// `;

// export default function Chat() {
//   const dispatch = useDispatch();
//   const { roomId } = useParams();
//   const [message, setMessage] = useState('');
//   const messagesEndRef = useRef(null);
//   const messages = useSelector((state) => state.chat.messages);

//   useEffect(() => {
//     // 처음에 room id로 채팅 내역 불러오기
//     async function fetchMessages() {
//       const response = await fetch(
//         `https://cocodingding.shop/chat/rooms/${roomId}`
//       );
//       const data = await response.json();
//       dispatch(setMessages(data));
//     }
//     fetchMessages();
//   }, [roomId, dispatch]);

  // 채팅 엔터키/shif+enter 막기
  const handleEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      window.scrollTo(0, 0);
      // sendMessage();
    }
  };

  useEffect(() => {
    // 소켓 연결
    console.log(chatcollect.chatRoomId);
    if (chatcollect.chatRoomId) {
      console.log(chatcollect.chatRoomId);
      try {
        client.connect(
          {},
          () => {
            console.log(chatcollect.chatRoomId);
            // 채팅방 구독
            client.subscribe(`/sub/chats/${chatcollect.chatRoomId}`, (res) => {
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
      `/pub/chats`,
      {},
      JSON.stringify({
        chatRoomId: chatcollect.chatRoomId,
        userEmail: myEmail,
        message: message,
      })
    );
    chatRef.current.value = null;
  };
  console.log(9999, messages);

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
                      <img
                        src={process.env.PUBLIC_URL + '/basic.png'}
                        alt='로고'
                      />
                    </div>
                  </SendMessage>
                ) : (
                  <ReceivedMessage>
                    <div>
                      <img
                        src={process.env.PUBLIC_URL + '/basic.png'}
                        alt='로고'
                      />
                      <Dou>
                        <h4>{chating.userNickname}님</h4>
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
            <button>전송</button>
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
