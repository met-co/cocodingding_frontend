import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import styled from "styled-components";

const VideoRecord = (props) => {
  return (
    <StContainer>
      {props.streamManager !== undefined ? (
        <OpenViduVideoComponent streamManager={props.streamManager} />
      ) : null}
    </StContainer>
  );
};

export default VideoRecord;

const StContainer = styled.div`
  /* width: 20px;
  height: 20px; */
  background-color: gainsboro;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
`;
