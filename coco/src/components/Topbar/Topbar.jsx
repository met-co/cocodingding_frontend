import React, { useState } from 'react';
import styled from 'styled-components';
//페이지컴포넌트
import Login from '../../pages/Login';

export default function Topbar() {
  //로그인 버튼 클릭시.
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <StContainer>
      <StStudy>스터디윗미 (마이페이지)</StStudy>
      <StRight>
        <StLoginButton onClick={handleLoginModalOpen}>로그인</StLoginButton>
        {isLoginModalOpen && <Login onClose={handleLoginModalClose} />}
      </StRight>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */

  background-color: #fafafa;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StStudy = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const StRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const StLoginButton = styled.button`
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
