//컨피그 스토어 임포트
import { configureStore } from "@reduxjs/toolkit";
//리덕스 툴킷 모듈 임포트(계속 추가시킴...)
import room from "../modules/roomSlice";
import kakao from "../modules/kakaoSlice";

const store = configureStore({
  reducer: { room, kakao },
});

export default store;
