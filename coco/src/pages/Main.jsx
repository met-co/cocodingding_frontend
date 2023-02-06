import React, { useState } from 'react';
import ModalCreateRoom from '../components/Main/ModalCreateRoom';

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>탑바,,로그인, 마이페이지</div>
      <div>검색</div>
      <div>카테고리 태그</div>
      <div>방리스트..</div>
      <div>
        <div>
          <button onClick={handleModalOpen}>방만들기</button>
          {isModalOpen && <ModalCreateRoom onClose={handleModalClose} />}
        </div>
      </div>
    </div>
  );
}

export default Main;
