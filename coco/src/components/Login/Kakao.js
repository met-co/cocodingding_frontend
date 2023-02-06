//Kakao.js
//카카로 로그인 대기중. 화면...
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Kakao = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  console.log(code);
  useEffect(() => {
    const sendCodeToSever = async () => {
      try {
        const response = await axios
          .post('http://localhost:3000/user/kakao', {
            code,
          })
          .then((res) => {
            localStorage.setItem(
              'Authorization',
              res.headers.get('Authorization')
            );
            console.log(res);
            const nickname = res.data.nickname;
            console.log(nickname);
            localStorage.setItem('nickname', nickname);
          });
        navigate(`/`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    sendCodeToSever();
  }, []);

  return (
    <div>
      <div>
        <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
      </div>
    </div>
  );
};

export default Kakao;
