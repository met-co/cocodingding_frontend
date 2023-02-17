import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

//컴포넌트
import { KAKAO_AUTH_URL } from '../../shared/OAuth';

// window.Kakao.init('2630b13acd7d87daf981d810de94858f');
export default function MyPage({ onClose }) {
  const [userNickname, setUserNickname] = useState(
    localStorage.getItem('userNickname')
  );
  const navigate = useNavigate();

  const handleUserNicknameChange = (event) => {
    setUserNickname(event.target.value);
  };

  // handleUserNicknameUpdate 함수: 사용자가 프로필 닉네임을 수정하는 경우 호출되는 함수입니다. Axios 라이브러리를 이용하여 서버에 닉네임을 업데이트하고, 성공적으로 업데이트되었다면 localStorage에 저장된 닉네임 값도 같이 변경하고 페이지를 새로고침합니다.
  const handleUserNicknameUpdate = () => {
    axios
      .put(
        `https://cocodingding.shop/user/info/${localStorage.getItem(
          'userNickname'
        )}`,
        {
          userNickname: userNickname,
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem('userNickname', userNickname);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Access');
    localStorage.removeItem('Refresh');
    navigate('/');
    window.location.reload();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <StContainer>
      <StHeader>
        <div>마이페이지</div>
        <button onClick={closeModal}>X</button>
      </StHeader>
      <StDivider />
      <StProfile>
        <div>닉네임: {localStorage.getItem('userNickname')}</div>
        <div>
          <input
            type='text'
            value={userNickname}
            onChange={handleUserNicknameChange}
          />
        </div>
        <button onClick={handleUserNicknameUpdate}>변경하기</button>
      </StProfile>

      <StProfile>
        <div>회원탈퇴</div>
        <div></div>
        <button onClick={handleLogout}>로그아웃</button>
      </StProfile>
    </StContainer>
  );
}

const StContainer = styled.div`
  /* 모달창 크기 */
  width: 300px;
  height: 200px;

  /* 최상단 위치 */
  z-index: 9999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 350%;
  left: 80%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #ece9e9;
  border: 1px solid #ece9e9;
  border-radius: 8px;
  padding: 2rem;
  /* 내부 박스 배치 */
  /* display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center; */
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 1rem 0px 1rem;
`;

const StDivider = styled.hr`
  border: 0;
  border-top: 1px solid gray;
  margin: 20px 0 40px 0;
`;

const StProfile = styled.div`
  display: flex;
  justify-content: space-around;
`;
