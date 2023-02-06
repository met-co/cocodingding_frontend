//Kakao.js
//카카로 로그인 대기중. 화면...
import React from 'react';
import { useDispatch } from 'react-redux';
// import { actionCreators as userActions } from '../Redux/Modules/User';

const Kakao = (props) => {
  const dispatch = useDispatch();

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  console.log(code);
  //   React.useEffect(async () => {
  //     await dispatch(userActions.kakaoLogin(code));
  //   }, []);

  return (
    <div>
      <div>
        <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
      </div>
    </div>
  );
};

export default Kakao;
