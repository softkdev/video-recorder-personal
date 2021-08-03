import React, { useEffect, useState } from "react";
// import VideoRecorder from "react-video-recorder-persion-customize/lib";
// import AppCanvas from "./components/AppCanvas.jsx";
const FaceDetect = ({ video }) => {
  // const [start, setStart] = useState(false);

  // video("");
  // useEffect(() => {
  // console.log(video);
  //   if (start) {
  //     document.getElementById(
  //       "textInfo"
  //     ).innerHTML = `<span className="text-danger">صورت شما شناسایی نشد!</span>`;
  //   }
  // }, [start]);
  return (
    <div className="facedetect">
      {/* {start && (
        <p className="text-center font-14 mt-40 mb-3" id="textInfo">
          <span className="text-danger">صورت شما شناسایی نشد!</span>
        </p>
      )} */}
      <div className="video-face">
        {/* {start && <AppCanvas />} */}
        <div className="videp-recorder mt-30 border-22 width-100">
          {/* <VideoRecorder
            className="border-22"
            onStartRecording={() => setStart(true)}
            timeLimit={10000}
            onRecordingComplete={(videoBlob) => {
              setStart(false);
              const file = new File([videoBlob], "video.mp4", {
                type: "mp4",
              });
              video(file);
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default FaceDetect;
