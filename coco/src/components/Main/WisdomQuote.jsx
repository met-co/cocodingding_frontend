import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function WisdomQuote() {
  //명언기능 한번 테스트해봄.
  const wisdomList = [
    `"중요한건 꺾이지 않는 마음.".\n-  DRX 소속 프로게이머 김혁규(Deft)`,
    `"나비와 나방은 생물학적으로 크게 다를 게 없죠,하지만 사람들은 주로 밤에 보이는 나방을 나비보다 못한 것으로 생각하곤 합니다 ".\n- 3조 유현승`,
    `"우리 어린애 아니잖아요?".\n- 박응수매니저`,
    `"세잎크로버의 꽃말은 행복입니다. 우리는 왜 그동안 수많은 행복들 사이에서 행운이라는 네잎크로버를 찾는데 집중했을까요? ".\n- 4조 김지석`,
    '"야 내도 한다, 니라고 못할것 같나?" \n- 5조 전병진',
    '"그 동안 행복코딩하셨잖아요 ^^, 이젠 저희도 좀 즐길게요" \n- 5조 홍정기',
    '"지금 그렇게 유튜브 보면서 놀때 인가요??" \n- 4조 김현우',
    '"왜 이렇게 책임감없는 소릴하시죠? 잘하시면서 왜 그래요?" \n- 4조 김혜성',
    '"괜찮으신가요?? ㅠㅠ 파이팅입니다." \n- 5조 이정우',
    '"아니, 고작 이것도 못하면 다른일은 잘할수 있을것 같아요??" \n- 6조 이채정',

    '"어려움이 있으면 기회가 있다." \n- 에디슨',
  ];
  const [wisdom, setWisdom] = useState(
    wisdomList[Math.floor(Math.random() * wisdomList.length)]
  );

  useEffect(() => {
    setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
  }, []);
  return <StWisdom>{wisdom}</StWisdom>;
}
const StWisdom = styled.h3`
  white-space: pre-line;
  display: flex;
  text-align: center; // 가운데 정렬
  margin-top: 50px;
`;
