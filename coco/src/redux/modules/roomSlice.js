import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* Action Type */
export const actionType = {
  room: {
    POST_ROOM: "POST_ROOM",
  },
};

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoaSIsImF1dGgiOiJVU0VSIiwiZXhwIjoxNjc1ODQ3NjcxLCJpYXQiOjE2NzU4NDU4NzF9.lQ3prUwHeKg9Lhk4cU1Fv2SRIh83rkEvvpdVJGBYurg";

/* 방 만들기 POST */
export const __createRoom = createAsyncThunk(
  actionType.room.POST_ROOM,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.post(
        `http://15.164.232.210/main/rooms`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
        { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* initial state */
const initialState = {
  rooms: [],
  error: null,
  isSuccess: false,
  isLoading: false,
};

/* slice */
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 방 추가하기
      .addCase(__createRoom.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(__createRoom.fulfilled, (state, action) => {
        console.log("byebye");
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(__createRoom.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// const roomSlice = createSlice({
//   name: 'room',
//   initialState,
//   reducers: {
//     addRoom: (state, action) => {
//       state.rooms.push(action.payload);
//     },
//   },
// });

export const { addRoom } = roomSlice.actions;

export default roomSlice.reducer;
