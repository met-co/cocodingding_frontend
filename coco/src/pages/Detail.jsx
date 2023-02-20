import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import Topbar from "../components/Topbar/Topbar";
import styled from "styled-components";
// import { OpenVidu } from 'openvidu-browser';
import { OpenVidu } from "openvidu-browser";
import { useLocation } from "react-router-dom";
// import VideoRecord from "../components/videoRecord/VideoRecord";
import VideoRecord from "../components/VideoRecord/VideoRecord";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import Chat from "../components/Chat/Chat";
import UserVideoComponent from "../components/VideoRecord/UserVideoComponent";
// import UserVideoComponent from "../components/VideoRecord/UserVideoComponent";
import { __getRoomInfo } from "../redux/modules/roomSlice";

export default function Detail() {
  const location = useLocation();
  console.log(location.state);
  const dispatch = useDispatch();
  const { openviduRoomId } = useParams();
  console.log(openviduRoomId);

  //오픈비듀
  const [session, setSession] = useState(undefined);
  const [OV, setOV] = useState();
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [checkMyScreen, setCheckMyScreen] = useState("");
  const [isConnect, setIsConnect] = useState(false); // 커넥팅 체크
  // const [role,setRole] = useState(location.state.role) // 역할군

  ////////////////////////////////////////////////////////////////////
  const nickname = localStorage.getItem("nickname");
  const roomData = useSelector((state) => state.room.roomInfo);
  // const accessToken = localStorage.getItem("Authorization");
  const [roomTitle, setRoomTitle] = useState(null);
  const [keyToken, setKeyToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [nicknames, setNickNames] = useState(null);

  useEffect(() => {
    dispatch(__getRoomInfo(openviduRoomId));
  }, []);

  // get한 데이터가 들어왔을 때 useState로 관리
  useEffect(() => {
    setRoomTitle(roomData.roomTitle);
    setKeyToken(roomData.keyToken);
    setSessionId(roomData.sessionId);
  }, [roomData]);

  // 오픈 비듀
  const deleteSubscriber = (streamManagerId) => {
    try {
      setSubscribers((current) =>
        current.filter(
          (sub) => sub.stream.connection.connectionId !== streamManagerId
        )
      ); //e.stream.session.options.sessionId
      setCheckMyScreen(false);
    } catch (error) {}
  };

  // 브라우저 새로고침, 종료, 라우트 변경
  // const leaveload = async () => {
  //   let accessToken2 = localStorage.getItem("accessToken")
  //   try{
  //     if(role === "master"){
  //       setCheckMyScreen(false)
  //       const getOutRoomMaster = await axios.delete(`/room/${location.state.sessionId}`,{headers:{"authorization":accessToken2,"refreshtoken":refreshtoken}})
  //       leaveSession();
  //     }else if(role === "user"){
  //       setCheckMyScreen(false)
  //       const getOutRoomUser = await axios.post(`/room/${location.state.sessionId}/member`,{},{headers:{"authorization":accessToken2,"refreshtoken":refreshtoken}})
  //     }
  //   }catch(error){
  //   }
  // };

  // '나가기' 버튼 연결하기
  // const leaveSession = () => {
  //   setSubscribers([])
  //   setOV(undefined)
  //   setPublisher(null)
  //   setMainStreamManager(undefined)
  // }

  const joinSession = () => {
    // openvidu 세션 생성하기
    // 1. openvidu 객체 생성
    const newOV = new OpenVidu();
    // 2. initSesison 생성
    const newsession = newOV.initSession();
    setSession(newsession);
    // JSON.parse(JSON.stringify(newSession))
    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(newOV);
    // 4. session에 connect하는 과정
    newsession.on("streamCreated", (e) => {
      const newSubscriber = newsession.subscribe(e.stream, undefined);
      setSubscribers(() => [...subscribers, newSubscriber]);
      setIsConnect(true);
    });
    // 1-2 session에서 disconnect한 사용자 삭제
    newsession.on("streamDestroyed", (e) => {
      if (e.stream.typeOfVideo === "CUSTOM") {
        deleteSubscriber(e.stream.connection.connectionId);
      } else {
        // setCheckMyScreen(true);
      }
    });
    // 1-3 예외처리
    newsession.on("exception", (exception) => {});

    newsession
      .connect(keyToken, { clientData: nickname })
      .then(async () => {
        await newOV
          .getUserMedia({
            audioSource: false,
            videoSource: undefined,
            resolution: "380x240",
            frameRate: 10,
          })
          .then((mediaStream) => {
            let videoTrack = mediaStream.getVideoTracks()[0];

            let newPublisher = newOV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default audio input
              videoSource: videoTrack, // The source of video. If undefined default video input
              publishAudio: true, // Whether you want to start the publishing with audio unmuted or muted
              publishVideo: true, // Whether you want to start the publishing with video enabled or disabled
              // resolution: '1280x720',  // The resolution of your video
              // frameRate: 10,   // The frame rate of your video
              insertMode: "APPEND", // How the video will be inserted according to targetElement
              mirror: true, // Whether to mirror your local video or not
            });
            // 4-b user media 객체 생성
            newPublisher.once("accessAllowed", () => {
              newsession.publish(newPublisher);
              setPublisher(newPublisher);
            });

            // Obtain the current video device in use
            let devices = newOV.getDevices();
            let videoDevices = devices.filter(
              (device) => device.kind === "videoinput"
            );
            let currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            setCurrentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            // Set the main video in the page to display our webcam and store our Publisher
            setMainStreamManager(publisher);
            // setPublisher = publisher;
          });
      })
      .catch((error) => {
        console.warn(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  };

  // 유저 계속 갱신
  // const getUserName = async () => {
  //   setNickNames(null)
  //   try{
  //     const repo = await axios.get(`/report?sessionID=${location.state.sessionId}`,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
  //     setNickNames(repo.data.data)
  //   }catch(error){
  //   }
  // }

  // 유저 갱신 useEffect
  // useEffect(() => {
  //   getUserName()
  // },[publisher,subscribers]);

  // 브라우저 삭제 및 새로고침 시 leave
  // window.onbeforeunload=function(){
  //   leaveload()
  // }

  // 리프레시 토큰
  // const reIssue = async () => {
  //   try{
  //     let refreshtoken = localStorage.getItem("refreshtoken")
  //     let accessToken = localStorage.getItem("accessToken")
  //     const repo = await axios.get(`/member/reissue`,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
  //     localStorage.removeItem("accessToken");
  //     localStorage.setItem("accessToken",repo.headers.authorization)
  //   }catch(error){
  //   }
  // }

  // 리프레시 토큰 셋인터벌로 관리
  // setInterval(()=>{
  //   reIssue()
  // },60000 * 10)

  useEffect(() => {}, [subscribers]);

  useEffect(() => {
    joinSession();
    return () => {};
  }, []);

  return (
    <>
      <Layout>
        <StTitle>
          <h1>Welcome ! (방이름) 방 입니다.</h1>
        </StTitle>
        <StContainer>
          {/* <StVideoContainer><UserVideoComponent /></StVideoContainer> */}
          <StVideoContainer>
            {/* <UserVideoComponent /> */}
            <div className="video-chat">
              {session !== undefined ? (
                <div className="room-video">
                  {/* 메인스트림매니저가 있을 때 */}
                  {mainStreamManager !== undefined ? (
                    <div className="pub">
                      <VideoRecord
                        streamManager={mainStreamManager}
                        // role={location.state.role}
                        // nicknames={nicknames}
                      ></VideoRecord>
                    </div>
                  ) : null}

                  {/* 퍼블리셔가 있을 때 */}
                  {publisher !== null ? (
                    <div className="sub">
                      <VideoRecord
                        streamManager={publisher}
                        // role={location.state.role}
                      ></VideoRecord>
                      {subscribers.length > 0
                        ? subscribers.map((sub, index) => {
                            return (
                              <VideoRecord
                                streamManager={sub}
                                key={index}
                                // role={location.state.role}
                              ></VideoRecord>
                            );
                          })
                        : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </StVideoContainer>

          <StChatContainer>{/* <Chat /> */}</StChatContainer>
        </StContainer>
      </Layout>
    </>
  );
}

const StTitle = styled.div`
  margin-top: 40px;
`;

const StContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 70vh;
  margin-top: 50px;
  display: flex;
`;

const StVideoContainer = styled.div`
  width: 70%;
  height: 100%;
  background-color: aliceblue;
`;

const StChatContainer = styled.div`
  width: 30%;
`;
