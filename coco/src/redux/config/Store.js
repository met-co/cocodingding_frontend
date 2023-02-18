//컨피그 스토어 임포트
import { configureStore } from '@reduxjs/toolkit';
//리덕스 툴킷 모듈 임포트(계속 추가시킴...)
import room from '../modules/roomSlice';
import LoginSlice from '../modules/LoginSlice';
// import kakaoList from '../modules/kakaoSlice';

import chatcollect from '../modules/chatSlice';
import socket from '../modules/socketSlice';
import messages from '../modules/socketSlice';
import chatSlice from '../modules/chatSlice';

const store = configureStore({
  reducer: {
    room,
    LoginSlice,
    chatcollect,
    socket,
    messages,
    chatSlice,
    // kakaoList,
  },
});

export default store;
