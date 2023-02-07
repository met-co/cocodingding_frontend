import { createSlice } from "@reduxjs/toolkit";

/* initialState*/
const initialState = {};

/* slice */
export const kakaoSlice = createSlice({
  name: "kakao",
  initialState,
  reducers: {
    setKakaoAPIKey: (state, action) => {
      // ...
    },
    // ...
  },
});

export const { setKakaoAPIKey } = kakaoSlice.actions;
export default kakaoSlice.reducer;
