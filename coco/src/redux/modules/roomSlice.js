import { createSlice } from '@reduxjs/toolkit';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: [],
  reducers: {
    createRoom(state, action) {
      state.push({ id: state.length + 1, name: action.payload.name });
    },
  },
});

export const { createRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
