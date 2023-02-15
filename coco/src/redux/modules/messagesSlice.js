import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    setMessages: (state, action) => {
      return action.payload;
    },
    clearMessages: (state) => {
      return initialState;
    },
  },
});

export const { addMessage, setMessages, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
