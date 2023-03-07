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
    console.log(scrollRef.current);
  });

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
                    <h4>{chat.sender}</h4>
                    <SendMessage>{chat.message}</SendMessage>
                  </StSendBox>
                </div>
              ) : (
                <div key={chat.id}>
                  <StReceiveBox>
                    <h4>{chat.sender}</h4>
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
const ChatBoxWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const StChatBox = styled.div`
  overflow-y: auto;
  height: calc(100% - 170px); // Footer와 ChatHeader 높이만큼 뺀 값
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

  text-align: left;
  border-radius: 30px 0 30px 30px;
`;

const ReceivedMessage = styled(ChatBubble)`
  background-color: #dcdcdc;
  text-align: right;
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
