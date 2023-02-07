import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* Action Type */
export const actionType = {
  room: {
    POST_ROOM: "POST_ROOM",
  },
};

/* 방 만들기 POST */
export const __createRoom = createAsyncThunk(
  actionType.room.POST_ROOM,
  async (payload, thunkAPI) => {
    try {
      const result = await axios.post(`/upload`, payload, {});
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* initial state */
const initialState = {
  rooms: [],
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
      })
      .addCase(__createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fileData = action.payload;
      })
      .addCase(__createRoom.rejected, (state, action) => {
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
