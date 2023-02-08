import React, { useState } from 'react';
import styled from 'styled-components';
import ModalCreateRoom from './ModalCreateRoom';

export default function CreateRoomButton() {
  //메인페이지의 방만들기 버튼 -  클릭시 모달창 켜지고 꺼지는 기능만.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRoomModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleRoomModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <StButton onClick={handleRoomModalOpen}>방만들기</StButton>
        {isModalOpen && <ModalCreateRoom onClose={handleRoomModalClose} />}
      </div>
    </div>
  );
}

// const StTitle = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   margin: 0;
// `;

const StButton = styled.button`
  position: relative;
  top: 130px;
  width: 4rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  width: 200px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
