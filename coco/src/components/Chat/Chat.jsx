// FIXME: 원래 코드
import styled from 'styled-components';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { subMessage } from '../../redux/modules/socketSlice';
// import { getMessage, getChatRoom } from "./redux/modules/socketSlice";
import { FiSend } from 'react-icons/fi';

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
          messages
            .filter((chat) => chat.roomId == chatRoomId)
            ?.map((chat) =>
              chat.sender === Myname ? (
                <div key={chat.id}>
                  <StSendBox>
                    {chat.roomId}
                    룸아이디
                    {chatRoomId}
                    <h4>{chat.sender}님</h4>
                    <SendMessage>{chat.message}</SendMessage>
                  </StSendBox>
                </div>
              ) : (
                <div key={chat.id}>
                  <StReceiveBox>
                    <h4>{chat.sender}님</h4>
                    <ReceivedMessage>{chat.message}</ReceivedMessage>
                  </StReceiveBox>
                </div>
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
        <button onClick={myChat}>
          <FiSend />
        </button>
      </Footer>
    </Container>
  );
};

export default Chat;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  height: 100px;
  border-radius: 0px 15px 0px 0px;
  border-bottom: 1px solid #c2c1c1;
  background-color: #ffe45c;
  font-size: 15px;
  font-weight: bold;
`;

//
const Container = styled.div`
  width: 100%;
  height: 700px;

  border-left: 1px solid #c2c1c1;
  /* border-radius: 10px; */
  /* background-color: #c2c1c1; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  margin: auto;
  box-sizing: border-box;
  position: relative;
`;

const StChatBox = styled.div`
  overflow-y: auto;
  height: 800px;
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const StSendBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StReceiveBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatBubble = styled.div`
  display: block;
  width: fit-content;
  max-width: 60%;
  margin: -10px 20px 10px 20px;
  padding: 15px;
  border-radius: 10px;
  color: black;
  font-size: 16px;
`;

const SendMessage = styled(ChatBubble)`
  background-color: #fff5c1;

  text-align: right;
  border-radius: 30px 0 30px 30px;
`;

const ReceivedMessage = styled(ChatBubble)`
  background-color: #dcdcdc;
  text-align: left;
  border-radius: 0 30px 30px 30px;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  margin: 20px 0px 20px 0px;
  /* background-color: gray; */
  position: relative;
  input {
    width: 360px;
    height: 70px;
    margin: 0px 20px 0px 20px;
    border-radius: 30px;
    outline: none;
    border: 1px solid #e3e3e3;
  }
  button {
    width: 55px;
    height: 55px;
    position: absolute;
    line-height: 40px;
    right: 25px;
    border-radius: 50%;
    color: #777777;
    background-color: #ffe45c;

    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0 solid black;

    :hover {
      background-color: #c6ddff;
      color: white;
      transition: 0.1s ease;
    }
  }
`;

// const StInput = styled.input`
//   width: 360px;
//   height: 70px;
//   margin: 0px 20px 0px 20px;
//   border-radius: 30px;
//   outline: none;
//   border: 1px solid #e3e3e3;
// `;

// const StSendButton = styled.div`
//   width: 55px;
//   height: 55px;
//   position: absolute;
//   line-height: 40px;
//   right: 25px;
//   border-radius: 50%;
//   color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 30px;
//   cursor: pointer;
//   border: 0 solid black;
//   background-color: #ffe45c;
//   :hover {
//     background-color: #c6ddff;
//     color: white;
//     transition: 0.1s ease;
//   }
// `;

//FIXME: 6조코드
// import styled from 'styled-components';
// import { React, useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import { subMessage } from '../../redux/modules/socketSlice';
// // import { getMessage, getChatRoom } from "./redux/modules/socketSlice";
// import { FiSend } from 'react-icons/fi';

// // import {
// //   __getChatListThunk,
// //   __postChatopenThunk,
// // } from '../../redux/modules/chattingSlice';
// // import Layout from '../../components/Layout';

// const Chat = () => {
//   const { roomId } = useParams();
//   console.log(roomId);
//   const dispatch = useDispatch();

//   //이전채팅 불러오기 및 채팅필요데이터
//   // useEffect(() => {
//   //   dispatch(__getChatListThunk(roomId));
//   // }, [roomId]);

//   const chatRef = useRef('');

//   // 소켓 백엔드 서버가져오기

//   const socket = new SockJS('https://cocodingding.shop/ws-stomp');
//   const client = Stomp.over(socket);

//   //토큰 얻어오기
//   const headers = {
//     Authorization: sessionStorage.getItem('accessToken'),
//   };

//   const { chatcollect } = useSelector((state) => state.chatcollect);
//   const Myname = chatcollect[0]?.informDto?.nickname;
//   const MyEmail = chatcollect[0]?.informDto?.email;

//   const { messages } = useSelector((state) => state.messages);

//   // 채팅 엔터키/shif+enter 막기
//   const handleEnterPress = (e) => {
//     if (e.keyCode === 13 && e.shiftKey == false) {
//       e.preventDefault();
//       window.scrollTo(0, 0);
//       // sendMessage();
//     }
//   };

//   useEffect(() => {
//     let subscription;

//     // 소켓 연결
//     const socket = new SockJS('https://cocodingding.shop/ws-stomp');
//     const client = Stomp.over(socket);

//     const headers = {
//       Authorization: sessionStorage.getItem('accessToken'),
//     };
//     try {
//       client.connect({}, () => {
//         console.log(roomId);
//         // 채팅방 구독
//         subscription = client.subscribe(`/sub/chat/room/${roomId}`, (res) => {
//           const receive = JSON.parse(res.body);
//           dispatch(subMessage(receive));
//         });
//       });
//     } catch (e) {
//       console.log(e);
//     }

//     return () => {
//       // 소켓 연결 종료 및 구독해제
//       if (subscription) {
//         subscription.unsubscribe();
//       }
//       client.disconnect(() => {
//         console.log(`Disconnected from WebSocket for room ${roomId}`);
//       });
//     };
//   }, [roomId]);

//   //메시지 보내기
//   //여기에 있는 값을 모아야합니다 / 정기
//   const myChat = () => {
//     const message = chatRef.current.value;

//     client.send(
//       `/pub/chat/message`,
//       headers,
//       JSON.stringify({
//         roomId: roomId,
//         sender: MyEmail, // 보내는 사용자의 이름 설정
//         message: message,
//       })
//     );
//     chatRef.current.value = '';
//   };

//   const scrollRef = useRef();

//   useEffect(() => {
//     // 메시지 초기화시 스크롤 이동
//     scrollRef.current.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//       inline: 'nearest',
//     });
//   }, [messages]);

//   return (
//     <div>
//       <StyledChatWindow>
//         <Header />
//         <div>
//           <BeforeChatHistory>
//             {chatcollect[0]?.chats?.map((list, index) =>
//               list.userNickname === Myname ? (
//                 <div key={index}>
//                   <MessageList
//                     messageLength={list.message.length}
//                     isMine={true} // 내가 보내는 메시지
//                   >
//                     <span>{list?.message}</span>
//                   </MessageList>
//                 </div>
//               ) : (
//                 <ReceivedMessage>
//                   <h4>{list?.userNickname}</h4>
//                   <MessageList
//                     messageLength={list.message.length}
//                     isMine={false} // 상대방이 보내는 메시지
//                   >
//                     <span>{list?.message}</span>
//                   </MessageList>
//                 </ReceivedMessage>
//               )
//             )}
//           </BeforeChatHistory>
//           <ChatHistory>
//             {roomId && (
//               <div ref={scrollRef}>
//                 {messages.map((message) =>
//                   message.userNickname === Myname ? (
//                     <MessageList
//                       messageLength={message.message.length}
//                       isMine={true} // 내가 보내는 메시지
//                     >
//                       <span>{message.message}</span>
//                     </MessageList>
//                   ) : (
//                     <ReceivedMessage>
//                       <h4>{message.userNickname}</h4>
//                       <MessageList
//                         messageLength={message.message.length}
//                         isMine={false} // 상대방이 보내는 메시지
//                       >
//                         <span>{message.message}</span>
//                       </MessageList>
//                     </ReceivedMessage>
//                   )
//                 )}
//               </div>
//             )}
//           </ChatHistory>
//         </div>
//         <ChatInput>
//           <form onSubmit={(e) => e.preventDefault()}>
//             <Input type='text' ref={chatRef} onKeyDown={handleEnterPress} />
//             <button onClick={myChat}>전송</button>
//           </form>
//         </ChatInput>
//       </StyledChatWindow>
//     </div>
//   );
// };

// export default Chat;

// const StyledChatWindow = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: white;
//   border-radius: 10px;
//   width: 355px;
//   max-height: 620px;
// `;

// const Header = styled.header`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const MessageList = styled.div`
//   margin: 5px 0;
//   padding: 10px;
//   border-radius: 5px;
//   max-width: 40%;
//   word-break: break-all;
//   display: flex;
//   text-align: left;
//   /* 글자 수에 따라 스타일 조정 */
//   ${({ messageLength }) =>
//     messageLength > 10 &&
//     `
//     height: auto;
//     padding: 10px;
//     white-space: pre-wrap;
//   `}
//   /* 내가 보내는 메시지 스타일 */
//   ${({ isMine }) =>
//     isMine
//       ? `
//       align-self: flex-end;
//       background-color: #b2d8ff;
//       color: #333;
//       margin-left: auto;
//     `
//       : `
//       /* 상대방이 보내는 메시지 스타일 */
//       align-self: flex-start;
//       background-color: #f5f5f5;
//       color: #333;
//       margin-right: auto;
//     `}
// `;
// const ChatInput = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 20px;
// `;
// const ChatHistory = styled.div`
//   display: flex;
//   width: 100%;
//   flex-direction: column-reverse;
//   height: calc(100% - 200px);
//   overflow-y: scroll;
//   padding: 10px;
// `;
// const Input = styled.input`
//   font-size: 18px;
//   padding: 10px;
//   border-radius: 10px;
//   border: 1px solid #333;
//   margin-right: 10px;
//   transition: height 0.2s;
// `;

// const ReceivedMessage = styled.div`
//   display: inline-block;
//   width: 100%;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   text-align: left;
//   div {
//     display: flex;
//   }
// `;

// const BeforeChatHistory = styled.div`
//   display: flex;
//   width: 300px;
//   max-height: 6000px;
//   flex-direction: column;
//   /* height: calc(100% - 200px); */
//   /* overflow-y: scroll; */
//   padding: 10px;
// `;
