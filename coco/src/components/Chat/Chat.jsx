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

//   useEffect(() => {
//     // 실시간으로 채팅 내역을 받아오는 기능
//     const socket = io(ENDPOINT, { path: '/chat/socket.io' });
//     socket.on('connect', () => {
//       socket.emit('joinRoom', { roomId });
//     });
//     socket.on('chatMessage', (message) => {
//       dispatch(addMessage(message));
//       scrollToBottom();
//     });
//     return () => {
//       socket.disconnect();
//     };
//   },
