import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const OpenViduVideoComponent = (props) => {
  const videoRef = useRef();

  useEffect(() => {
    if (props.streamManager && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    return () => {};
  }, [props.streamManager, videoRef]);

  return (
    <StContainer>
      <StNickname>
        {props.streamManager.stream.connection.data.split("%")[2]}
      </StNickname>
      <video
        autoPlay={true}
        ref={videoRef}
        style={{ width: "200px", borderRadius: "10px" }}
      />
    </StContainer>
  );
};

export default OpenViduVideoComponent;

const StContainer = styled.div`
  /* width: 30px;
  height: 30px; */
`;

const StNickname = styled.div`
  width: 50px;
`;
