import React from 'react';

export default function LoginForm() {
  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        {/* <img src="">logo 이미지</img> */}
        <div className='container'>
          <img alt='' className='logo' />
          <div className='login-box'>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='abc123@email.com'
            />

            <input
              type='password'
              id='password'
              name='password'
              placeholder='password'
            />
          </div>
          <div className='btn'>
            <button type='submit'>로그인</button>
            <button type='button'>이메일로 회원가입하기</button>
          </div>
          <span>소셜 계정으로 빠르게 로그인 하기</span>
          <div className='social-btn'>
            <button type='button' className='google'>
              google 로그인
            </button>
            <button type='button' className='kakao'>
              kakao 로그인
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
