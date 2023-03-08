import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <StContainer>
      <Layout>
        <StWrapBox>
          <StStudy
            onClick={() => {
              navigate(`/`);
              window.location.reload();
            }}
          >
            <img src={`${process.env.PUBLIC_URL}/img/logo_1x.png`}></img>
          </StStudy>
          <div>공지사항</div>
          <div>팀소개</div>
        </StWrapBox>
      </Layout>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */

  /* background-color: #fafafa;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem; */
  /* position: sticky; */
  bottom: 0;
  backdrop-filter: blur(30px);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  margin-top: 50px;
  height: 150px;
  align-items: center;
`;

const StImg = styled.img`
  position: absolute;
  top: 270%;
  left: 85%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
`;

const StWrapBox = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const StStudy = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
`;
