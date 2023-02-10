//Kakao.js
//카카로 로그인 대기중. 화면...
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { __kakaologin } from '../../redux/modules/LoginSlice';

const Kakao = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const href = window.location.href;
  let params = new URL(href).searchParams;
  let code = params.get('code');
  console.log('인가코드', code);

  // 6조 코드 그대로 들고옴.. 이거 안되면 내 잘못 아님 ㅇㅇ
  useEffect(() => {
    dispatch(__kakaologin(code));
  });

  // useEffect(() => {
  //   const sendCodeToSever = async () => {
  //     try {
  //       console.log(code);
  //       const response = await axios
  //         .post('https://cocodingding.shop/user/kakao', { code })
  //         .then((res) => {
  //           console.log(res);
  //           localStorage.setItem(
  //             'Authorization',
  //             res.headers.get('Authorization')
  //           );
  //           console.log(res);
  //           const nickname = res.data.nickname;
  //           console.log(nickname);
  //           localStorage.setItem('nickname', nickname);
  //         });
  //       navigate(`/`);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   sendCodeToSever();
  // }, []);

  return (
    <div>
      <div>
        <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
      </div>
    </div>
  );
};

export default Kakao;
