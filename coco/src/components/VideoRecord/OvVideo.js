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
      <video autoPlay={true} ref={videoRef} />
    </StContainer>
  );
};

export default OpenViduVideoComponent;

const StContainer = styled.div`
  /* width: 30px;
  height: 30px; */
`;
