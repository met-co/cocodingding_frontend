import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const ENDPOINT = 'https://cocodingding.shop/';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatRoom: null,
    messages: [],
  },
  reducers: {
    setChatRoom: (state, action) => {
      state.chatRoom = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setChatRoom } = chatSlice.actions;

export const selectChatRoom = (state) => state.chat.chatRoom;

export default chatSlice.reducer;

export const joinRoom = (roomId) => (dispatch, getState) => {
  const socket = io(ENDPOINT);
  dispatch(setChatRoom({ id: roomId, socket }));
  const { chatRoom } = getState().chat;
  if (chatRoom.socket) {
    chatRoom.socket.connect();
    chatRoom.socket.emit('join', roomId);
  }
};

export const leaveRoom = () => (dispatch, getState) => {
  const { chatRoom } = getState().chat;
  if (chatRoom.socket) {
    chatRoom.socket.emit('leave');
    chatRoom.socket.disconnect();
  }
  dispatch(setChatRoom(null));
};

export const receiveMessage = () => (dispatch, getState) => {
  const { chatRoom } = getState().chat;
  if (chatRoom.socket) {
    chatRoom.socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
  }
};

export const sendMessage = (data) => (dispatch, getState) => {
  const { chatRoom } = getState().chat;
  if (chatRoom.socket) {
    chatRoom.socket.emit('message', data.message);
  }
};
