import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/modules/roomSlice';
import { __createRoom } from '../../redux/modules/roomSlice';
import { useNavigate } from 'react-router-dom';

function ModalCreateRoom({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    onClose();
  };

  const [post, setPost] = useState({
    category: '',
    title: '',
  });

  const handleChange = (evnet) => {
    const { name, value } = evnet.target;
    setPost({ ...post, [name]: value });
  };

  console.log(post);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(__createRoom(post));
    navigate('/');
  };

  // const handleSelectChange = (e) => {
  //   setCategory(e.target.value);
  // };

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
          <StInput
            type='text'
            placeholder='여기에 입력합니다.'
            value={post.title}
            name='title'
            onChange={handleChange}
          />
        </div>

        <h3>카테고리</h3>
        <StSelect value={post.category} name='category' onChange={handleChange}>
          <option>코딩</option>
          <option>수학</option>
          <option>심리학</option>
          <option>철학</option>
          <option>뇌과학</option>
        </StSelect>
        <StButtons>
          <StButton onClick={closeModal}>취소하기</StButton>
          <StButton type='submit'>방만들기</StButton>
        </StButtons>
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
  z-index: 50;
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

const StInput = styled.input`
  display: flex;
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 0.5rem;
  background-color: #a7a7a7;
`;

const StSelect = styled.select`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 0.5rem;
  background-color: #a7a7a7;
`;

const StButtons = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
`;

const StButton = styled.button`
  width: 5rem;
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
