import React from "react";
// import FaceDetect from "./detectFace/faceDetect.jsx";
import { RecordView } from "./detectFace/RecordeView.jsx";
// import { osName } from "react-device-detect";

export const RecordVideo = ({ setVideo }) => {
  // console.log(setVideo)
  // return osName !== "iOS" ? (
  //   <RecordView setVideo={setVideo} time={10000} />
  // ) : (
  //   <FaceDetect video={setVideo} />
  // );
  return <RecordView setVideo={setVideo} time={10000} />;
};
