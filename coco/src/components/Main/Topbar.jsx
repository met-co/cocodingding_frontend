import React, { useState } from 'react';
import Login from '../../pages/Login';

export default function Topbar() {
  //로그인 버튼 클릭시.
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <div>
      <div>
        스터디윗미 (마이페이지)
        <button onClick={handleLoginModalOpen}>로그인</button>
        {isLoginModalOpen && <Login onClose={handleLoginModalClose} />}
      </div>
    </div>
  );
}
