import React from 'react';
import styled from 'styled-components';
import CreateRoomForm from './CreateRoomForm';

function ModalCreateRoom({ onClose }) {
  const closeModal = () => {
    onClose();
  };

  return (
    <StContainer>
      <StHeader>
        <StTitle>방만들기</StTitle>
        <StCloseButton onClick={closeModal}>×</StCloseButton>
      </StHeader>
      {/* 상단바.. */}
      <StDivider />
      {/* 방이름,  카테고리, 방만들기,취소하기 버튼. 컴포넌트 */}
      <CreateRoomForm />
    </StContainer>
  );
}
export default ModalCreateRoom;

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 40vw;
  height: 40vh;
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
  background-color: #ece9e9;
  border: 1px solid #ece9e9;
  border-radius: 8px;
  padding: 3rem;
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 2rem 0px 2rem;
`;

const StTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const StCloseButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const StDivider = styled.hr`
  border: 0;
  border-top: 1px solid gray;
  margin: 20px 0 40px 0;
`;
