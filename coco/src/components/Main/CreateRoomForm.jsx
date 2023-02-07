import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/modules/roomSlice';

function CreateRoomForm() {
  const [roomName, setRoomName] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/rooms', {
        roomName,
        category,
      });
      window.location.reload();
      //FIXME: dispatch를 써야할지 안써도 될지 고민중..
      // dispatch(addRoom({ roomName, category }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type='text'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type='submit'>Create Room</button>
    </form>
  );
}
export default CreateRoomForm;
