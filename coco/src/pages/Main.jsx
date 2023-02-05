import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateRoomForm from '../components/Main/CreateRoomForm';

function Main() {
  // rooms 데이터를 가져옴
  const rooms = useSelector((state) => state.rooms);
  // 모달 상태를 관리하는 showModal state 선언
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* 버튼 클릭시 setShowModal(true) 실행 */}
      <button onClick={() => setShowModal(true)}>방만들기</button>
      {/* showModal 값이 true 일 때 CreateRoomForm 컴포넌트 렌더링 */}
      {showModal && <CreateRoomForm onClose={() => setShowModal(false)} />}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <a href={`${room.id}`}>{room.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
