import styled from 'styled-components';
import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// import { getMessage, getChatRoom } from "./redux/modules/socketSlice";

import { subMessage } from '../redux/modules/socketSlice';

const Detail = () => {
  const myEmail = localStorage.getItem('userEmail');
  const Myname = localStorage.getItem('userNickname');
  const chatRef = useRef('');

  // const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const dispatch = useDispatch();
  console.log(chatRoomId);

  const [message, setMessage] = useState('');

  const sock = new SockJS('https://iamhyunjun.shop/ws-stomp');
  const client = Stomp.over(sock);

  const headers = {
    Authorization: localStorage.getItem('token'),
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

export default Detail;

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

// import React, { useState, useEffect, useCallback } from 'react';
// import Layout from '../components/Layout/Layout';
// import Topbar from '../components/Topbar/Topbar';
// import styled from 'styled-components';
// import { OpenVidu } from 'openvidu-browser';
// import { useLocation } from 'react-router-dom';
// // import VideoRecord from "../components/videoRecord/VideoRecord";
// import axios from 'axios';

// export default function Detail() {
//   const APPLICATION_SERVER_URL = 'http://localhost:5000/';
//   const location = useLocation();
//   let nickname = localStorage.getItem('nickname');
//   let tokenStuff = location.state.token;
//   let refreshtoken = localStorage.getItem('refreshtoken');
//   let accessToken = localStorage.getItem('accessToken');
//   // 오픈비듀 관련
//   const [session, setSession] = useState(undefined);
//   const [OV, setOV] = useState();
//   const [publisher, setPublisher] = useState(null);
//   const [subscribers, setSubscribers] = useState([]);
//   const [checkMyScreen, setCheckMyScreen] = useState('');
//   const [isConnect, setIsConnect] = useState(false); // 커넥팅 체크
//   const [role, setRole] = useState(location.state.role); // 역할군
//   const [chat, setChat] = useState(true); // 채팅창

//   // 브라우저 새로고침, 종료, 라우트 변경
//   const leaveload = async () => {
//     // let accessToken2 = localStorage.getItem("accessToken")
//     const accessToken2 = '';
//     try {
//       if (role === 'master') {
//         setCheckMyScreen(false);
//         const getOutRoomMaster = await axios.delete(
//           `/room/${location.state.sessionId}`,
//           {
//             headers: {
//               authorization: accessToken2,
//               refreshtoken: refreshtoken,
//             },
//           }
//         );
//         leaveSession();
//       } else if (role === 'user') {
//         setCheckMyScreen(false);
//         const getOutRoomUser = await axios.post(
//           `/room/${location.state.sessionId}/member`,
//           {},
//           {
//             headers: {
//               authorization: accessToken2,
//               refreshtoken: refreshtoken,
//             },
//           }
//         );
//       }
//     } catch (error) {}
//   };
//   const leaveSession = () => {
//     setSubscribers([]);
//     setOV(undefined);
//     setPublisher(null);
//   };
//   const joinSession = () => {
//     // openvidu 세션 생성하기
//     // 1. openvidu 객체 생성
//     const newOV = new OpenVidu();
//     // 2. initSesison 생성
//     const newsession = newOV.initSession();
//     setSession(newsession);
//     // JSON.parse(JSON.stringify(newSession))
//     // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
//     setOV(newOV);
//     // 4. session에 connect하는 과정
//     newsession.on('streamCreated', (e) => {
//       const newSubscriber = newsession.subscribe(e.stream, undefined);
//       setSubscribers((current) => [...current, newSubscriber]);
//       setIsConnect(true);
//     });
//     // 1-2 session에서 disconnect한 사용자 삭제
//     newsession.on('streamDestroyed', (e) => {
//       if (e.stream.typeOfVideo === 'CUSTOM') {
//         deleteSubscriber(e.stream.connection.connectionId);
//       } else {
//         // setCheckMyScreen(true);
//       }
//     });
//     // 1-3 예외처리
//     newsession.on('exception', (exception) => {});
//     newsession
//       .connect(tokenStuff, { clientData: nickname })
//       .then(async () => {
//         await newOV
//           .getUserMedia({
//             audioSource: false,
//             videoSource: undefined,
//             resolution: '380x240',
//             frameRate: 10,
//           })
//           .then((mediaStream) => {
//             let videoTrack = mediaStream.getVideoTracks()[0];
//             let newPublisher = newOV.initPublisher(undefined, {
//               audioSource: undefined, // The source of audio. If undefined default audio input
//               videoSource: videoTrack, // The source of video. If undefined default video input
//               publishAudio: true, // Whether you want to start the publishing with audio unmuted or muted
//               publishVideo: true, // Whether you want to start the publishing with video enabled or disabled
//               // resolution: '1280x720',  // The resolution of your video
//               // frameRate: 10,   // The frame rate of your video
//               insertMode: 'APPEND', // How the video will be inserted according to targetElement
//               mirror: true, // Whether to mirror your local video or not
//             });
//             // 4-b user media 객체 생성
//             newPublisher.once('accessAllowed', () => {
//               newsession.publish(newPublisher);
//               setPublisher(newPublisher);
//             });
//           });
//       })
//       .catch((error) => {
//         console.warn(
//           'There was an error connecting to the session:',
//           error.code,
//           error.message
//         );
//       });
//   };
//   return (
//     <>
//       <Topbar />
//       <Layout>
//         <StTitle>
//           <h1>Welcome ! (방이름) 방 입니다.</h1>
//         </StTitle>
//         <StContainer>
//           <div>
//             <VideoRecord
//               streamManager={publisher}
//               role={location.state.role}
//               nicknames={nicknames}
//             ></VideoRecord>
//             {subscribers.length > 0
//               ? subscribers.map((sub, index) => {
//                   return (
//                     <VideoRecord
//                       streamManager={sub}
//                       key={index}
//                       role={location.state.role}
//                     ></VideoRecord>
//                   );
//                 })
//               : null}
//           </div>
//         </StContainer>
//       </Layout>
//     </>
//   );
// }

// useEffect(() => {
//   // 시작과 종료를 알리는
//   joinSession();
//   return () => {};
// }, []);

// const StTitle = styled.div`
//   margin-top: 40px;
// `;

// const StContainer = styled.div`
//   border: 1px solid black;
//   border-radius: 10px;
//   width: 100%;
//   height: 70vh;
//   margin-top: 50px;
// `;
