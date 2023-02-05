import React from 'react';
import { useDispatch } from 'react-redux';
import { createRoom } from '../../redux/modules/roomSlice';
export default function CreateRoomForm() {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRoom({ name: roomName }));
    setRoomName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button type='submit'>Create Room</button>
    </form>
  );
}
