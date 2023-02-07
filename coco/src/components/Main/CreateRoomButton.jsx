import React, { useState } from "react";
import ModalCreateRoom from "./ModalCreateRoom";

export default function CreateRoomButton() {
  //메인페이지의 방만들기 버튼 -  클릭시 모달창 켜지고 꺼지는 기능만.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRoomModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleRoomModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <button onClick={handleRoomModalOpen}>방만들기</button>
        {isModalOpen && <ModalCreateRoom onClose={handleRoomModalClose} />}
      </div>
    </div>
  );
}
