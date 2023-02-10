import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//컴포넌트
import { KAKAO_AUTH_URL } from '../shared/OAuth';

// window.Kakao.init('2630b13acd7d87daf981d810de94858f');
export default function Login({ onClose }) {
  const closeModal = () => {
    onClose();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // Client-side validation- 둘 중 하나가 공란일 때
    if (!email || !password) {
      setError('이메일과 패스워드를 모두 입력해주세요!');
      return;
    }
    try {
      // 서버에 email, password를 보내서 요청

      await axios
        .post('https://cocodingding.shop/user/login', {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem(
            'Authorization',
            res.headers.get('Authorization')
          );
          console.log(res);
          const nickname = res.data.nickname;
          console.log(nickname);
          localStorage.setItem('Nickname', nickname);
        });
      navigate(`/StoreList`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('아이디/비밀번호가 올바르지 않습니다.');
      }
    }
  }

  return (
    <StContainer>
      <button onClick={closeModal}>X</button>
      <div>
        {/* 로컬로그인 부분 */}

        <form onSubmit={handleSubmit}>
          <input
            // required
            autoFocus
            placeholder='이메일 주소 입력(필수)'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            // required
            type='password'
            placeholder='비밀번호 입력(필수)'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type='submit'
            // onClick={() => {
            //   navigate(`/StoreList`);
            // }}
          >
            로그인
          </button>
          <div>
            <span className='error'>{error}</span>
          </div>
          <div>
            <button
              onClick={() => {
                navigate('/SignUp');
              }}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
      <div>로그인후에 이용해주세요</div>
      <h1>SNS계정 간편 로그인</h1>
      <div>
        <a href={KAKAO_AUTH_URL}>
          <img
            src={`${process.env.PUBLIC_URL}/img/kakao_login_medium_wide.png`}
          ></img>
          {/* <span>카카오계정 로그인</span> */}
        </a>
      </div>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 700px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 9999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 700%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;

  /* 내부 박스 배치 */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
