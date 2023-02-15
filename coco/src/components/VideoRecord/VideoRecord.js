import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

const VideoRecord = (props) => {
  return (
    <div>
      {props.streamManager !== undefined ? (
        <OpenViduVideoComponent streamManager={props.streamManager} />
      ) : null}
    </div>
  );
};

export default VideoRecord;
