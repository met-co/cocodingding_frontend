import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdRefresh } from 'react-icons/md';

export default function WisdomQuote() {
  //명언기능 한번 테스트해봄.
  const wisdomList = [
    `"성공은 준비된 기회에 대한 만남이다." \n\n - 밥 프랭클린`,
    `"성공을 이루기 위해서는 꿈을 꾸어야 한다. 그리고 그 꿈을 이루기 위해 행동해야 한다." \n\n - 제임스 앨런`,
    `"성공의 비밀은 어떤 일이든 최선을 다하는 것이다." \n\n - 헨리 포드`,
    `"누구나 성공을 희망하지만, 그것을 위해서 희생과 노력을 해야 한다." \n\n - 헤이그 웰치`,
    `"우리가 성공하기 위해 필요한 것은 단지 자신의 능력을 믿는 것뿐이다." \n\n - 월트 디즈니`,
    `"성공은 내가 목표를 세우고 그것을 달성하기 위해 끊임없이 노력한 결과이다." \n\n - 소피아 로렌`,
    `"성공은 계속해서 노력하고 발전하는 것이다." \n\n - 존 C. 맥스웰`,
    `"성공은 용기와 인내의 결합체이다." \n\n - 나폴레옹 힐`,
    `"성공은 기회를 찾아내고 그것을 이용하는 것이다." \n\n - 로버트 커신`,
    `"성공의 열쇠는 자신감, 열심힘, 인내이다." \n\n - 토마스 에디슨`,
    `"성공은 잘한 일들의 연속이다." \n\n - 콜린 파월`,
    `"성공은 좋은 계획과 실행력의 결합체이다." \n\n - 나르시스 로젠버그`,
    `"성공은 자신의 능력을 인식하고 그것을 극대화하는 것이다." \n\n - 브루스 리`,
    `"성공은 실패를 극복하는 데 있어서 자신감을 잃지 않는 것이다." \n\n - 윈스턴 처칠`,
    `"성공을 위해서는 많은 시행착오와 실패를 경험해야 한다." \n\n - 마이클 조던`,
    `"성공은 자신이 할 수 있는 최선을 다하고 더 나은 것을 원하는 것이다." \n\n - 시드니 로우`,
    `"성공은 인내심과 저항력의 결합체이다." \n\n - 보일러마커`,
    `"성공은 자신이 믿는 것을 추구하는 것이다." \n\n - 존 우든`,
    `"성공은 자신을 믿고 자신의 목표를 이루기 위해 노력하는 것이다." \n\n - 로이 T. 베넷`,
  ];
  const [wisdom, setWisdom] = useState(
    wisdomList[Math.floor(Math.random() * wisdomList.length)]
  );

  useEffect(() => {
    setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
  }, []);

  const handleButtonClick = () => {
    setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
  };
  return (
    <StContainer>
      <StRefreshButton onClick={handleButtonClick}>
        <MdRefresh />
      </StRefreshButton>
      <StWisdom>
        <div>{wisdom}</div>
      </StWisdom>
    </StContainer>
  );
}

const StContainer = styled.div`
  background-color: #ececec;
  height: 300px;
  border-radius: 30px;
`;

const StRefreshButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 33px;
  color: gray;
  padding: 30px;
  background-color: transparent;
  border: none;
  /* border-radius: 5px; */
  cursor: pointer;
  :hover {
    color: #3498db;
  }
`;

const StWisdom = styled.h3`
  padding: 0 30px 0 30px;
  white-space: pre-line;
  display: flex;
  text-align: center; // 가운데 정렬
  justify-content: center;
  align-items: center;
`;
