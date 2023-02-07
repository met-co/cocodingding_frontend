import React from 'react';
import styled from 'styled-components';

//컴포넌트
import { KAKAO_AUTH_URL } from '../shared/OAuth';

// window.Kakao.init('2630b13acd7d87daf981d810de94858f');
export default function Login({ onClose }) {
  const closeModal = () => {
    onClose();
  };
  return (
    <StContainer>
      <a href={KAKAO_AUTH_URL}>
        <img
          src={`${process.env.PUBLIC_URL}/img/kakao_login_medium_wide.png`}
        ></img>
        {/* <span>카카오계정 로그인</span> */}
      </a>
      <button onClick={closeModal}>X</button>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 700px;
  height: 500px;

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

  /* 내부 박스 배치 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

// 1/GET방식으로 주소로 요청시 인증코드 받을수있음.
// /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.1
// Host: kauth.kakao.com

// 네이티브 앱 키	ccfd1fdfe04eae4b041410d5339ad6fc
// JavaScript 키	2630b13acd7d87daf981d810de94858f
// Admin 키	cc4118a45b2a37afa0712038d75c26e7

// REST API 키	306c476f21776ce73e2df07d1ca45995
// Redirect URI
// http://localhost:3000/user/login

// "https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code"
