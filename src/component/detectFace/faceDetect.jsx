import React, { useEffect, useState } from "react";
import VideoRecorder from "react-video-recorder";
// import AppCanvas from "./components/AppCanvas.jsx";
const FaceDetect = ({ video }) => {
  const [start, setStart] = useState(false);

  // video("");
  // useEffect(() => {
  //   // console.log(video);
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
            // onStartRecording={() => setStart(true)}
            timeLimit={10000}
            onRecordingComplete={(videoBlob) => {
              setStart(false);
              const file = new File([videoBlob], "video.mp4", {
                type: "mp4",
              });
              video(file);
            }}
          /> */}
          <VideoRecorder
            renderLoadingView={() => {
              return <div style={{ color: "black" }}>لطفا صبر نمایید ...</div>;
            }}
            renderUnsupportedView={() => {
              return (
                <div style={{ color: "black" }}>
                  مرورگر شما از دوربین پشتیبانی نمی کند!
                </div>
              );
            }}
            t={(e) => {
              if (e === "Turn my camera ON") {
                return <div style={{ color: "black" }}>فعال کردن دوربین</div>;
              }
              if (e === "Use another video") {
                return (
                  <div style={{ color: "black" }}>یک بار دیگر ضبط کنید</div>
                );
              }
              if (e === "REC") {
                return <div style={{ color: "black" }}>ضبط نمایید</div>;
              }
            }}
            renderErrorView={() => {
              return (
                <div style={{ color: "black" }}>
                  لطفا به مرورگر خود دسترسی دوربین را بدهید
                </div>
              );
            }}
            className="border-22"
            timeLimit={10000}
            onRecordingComplete={(videoBlob) => {
              const file = new File([videoBlob], "video.mp4", {
                type: "mp4",
              });
              video(file);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FaceDetect;
