import React from 'react';
import styled from 'styled-components';
import CreateRoomForm from './CreateRoomForm';

function ModalCreateRoom({ onClose }) {
  const closeModal = () => {
    onClose();
  };

  return (
    <StContainer>
      <button onClick={closeModal}>X</button>
      <CreateRoomForm />
    </StContainer>
  );
}
export default ModalCreateRoom;

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 300px;
  height: 200px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
`;
