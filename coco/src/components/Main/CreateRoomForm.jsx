import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/modules/roomSlice';

function CreateRoomForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRoom({ title, category }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
