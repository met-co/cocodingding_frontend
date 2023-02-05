import { configureStore } from '@reduxjs/toolkit';
import roomSlice from '../modules/roomSlice';

export default configureStore({
  reducer: {
    rooms: roomSlice,
  },
});
