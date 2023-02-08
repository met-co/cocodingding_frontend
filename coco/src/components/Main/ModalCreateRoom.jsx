import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/modules/roomSlice';

function ModalCreateRoom({ onClose }) {
  const closeModal = () => {
    onClose();
  };

  const [roomName, setRoomName] = useState('');
  const [category, setCategory] = useState('초기값^^');
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
  };

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
    <StContainer>
      <StHeader>
        <StTitle>방만들기</StTitle>
        <StCloseButton onClick={closeModal}>×</StCloseButton>
      </StHeader>
      {/* 상단바.. */}
      <StDivider />
      {/* 방이름,  카테고리, 방만들기,취소하기 버튼. 컴포넌트 */}
      {/* <CreateRoomForm /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <h3>방이름</h3>
          <input
            type='text'
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <h3>카테고리</h3>
        <select value={category} onChange={handleSelectChange}>
          <option>카테1</option>
          <option>카테2</option>
          <option>카테3</option>
          <option>카테4</option>
        </select>
        <div>
          <button onClick={closeModal}>취소하기</button>
          <button type='submit'>방만들기</button>
        </div>
      </form>
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
