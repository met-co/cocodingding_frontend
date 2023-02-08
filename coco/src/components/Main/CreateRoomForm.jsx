// import axios from 'axios';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addRoom } from '../../redux/modules/roomSlice';

// function CreateRoomForm() {
//   const [roomName, setRoomName] = useState('');
//   const [category, setCategory] = useState('초기값^^');
//   const dispatch = useDispatch();

//   const handleSelectChange = (e) => {
//     setCategory(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/rooms', {
//         roomName,
//         category,
//       });
//       window.location.reload();
//       //FIXME: dispatch를 써야할지 안써도 될지 고민중..
//       // dispatch(addRoom({ roomName, category }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <h2>방이름</h2>
//         <input
//           type='text'
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//         />
//       </div>
//       <select value={category} onChange={handleSelectChange}>
//         <option>카테1</option>
//         <option>카테2</option>
//         <option>카테3</option>
//         <option>카테4</option>
//       </select>

//       <button type='submit'>Create Room</button>
//     </form>
//   );
// }
// export default CreateRoomForm;
