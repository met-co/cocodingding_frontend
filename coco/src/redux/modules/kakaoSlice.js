import { createSlice } from '@reduxjs/toolkit';

const kakaoSlice = createSlice({
  name: 'kakao',
  initialState: [],
  reducers: {
    kakaoUser(state, action) {
      state.push({ id: state.length + 1, name: action.payload.name });
    },
  },
});

export const { kakaoUser } = kakaoSlice.actions;

export default kakaoSlice.reducer;
