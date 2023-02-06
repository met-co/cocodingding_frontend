import React from 'react';

//컴포넌트
import { KAKAO_AUTH_URL } from '../shared/OAuth';

// window.Kakao.init('2630b13acd7d87daf981d810de94858f');
export default function Login() {
  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <img src={`${process.env.PUBLIC_URL}/img/kakaoLogin.png`}></img>
        {/* <span>카카오계정 로그인</span> */}
      </a>
    </div>
  );
}

// 1/GET방식으로 주소로 요청시 인증코드 받을수있음.
// /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.1
// Host: kauth.kakao.com

// 네이티브 앱 키	ccfd1fdfe04eae4b041410d5339ad6fc
// REST API 키	306c476f21776ce73e2df07d1ca45995
// JavaScript 키	2630b13acd7d87daf981d810de94858f
// Admin 키	cc4118a45b2a37afa0712038d75c26e7

// Redirect URI
// http://localhost:3000/user/login

// "https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code"
