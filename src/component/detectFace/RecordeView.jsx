import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import CountdownTimer from "react-component-countdown-timer";

export const RecordView = ({ setVideo, time, className }) => {
  let recordingTimeMS = time;

  const [preview, setPreview] = useState("");
  const [videoWebCam, setVideoWebCam] = useState("");
  const [state, setState] = useState(1);
  const [showButton, setShowButton] = useState(true);
  const [showButtonReset, setShowButtonReset] = useState(false);

  useEffect(() => {
    console.log("heare me recorder");
    setPreview(document.getElementById("preview"));
    setVideoWebCam(document.getElementById("videoWebCam"));
  }, []);

  const handleStopVideo = () => {
    setState(2);
    setShowButtonReset(true);
  };

  const handleResetVideo = () => {
    setVideo("");
    setShowButton(true);
    setShowButtonReset(false);
    setState(1);
  };

  const handleStart = () => {
    setShowButton(false);
    const sUsrAg = navigator.userAgent;
    let videoStream;
    if (sUsrAg.indexOf("Firefox") > -1) {
      videoStream = videoWebCam.mozCaptureStream();
    } else {
      videoStream = videoWebCam.captureStream();
    }
    let mediaRecorder = new MediaRecorder(videoStream);
    let chunks = [];
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = function (e) {
      var blob = new Blob(chunks, { type: "video/mp4" });
      chunks = [];
      var videoURL = URL.createObjectURL(blob);
      preview.src = videoURL;
      setVideo(blob);
    };
    mediaRecorder.start();
    setTimeout(() => {
      handleStopVideo();
      mediaRecorder.stop();
    }, [recordingTimeMS]);
  };

  const handleClass = (num) => {
    return `videoFilm ${state === num ? "" : "hidden"}`;
  };

  return (
    <div className={className || ""}>
      <div className="left">
        <Webcam
          id="videoWebCam"
          mirrored={true}
          audio={false}
          className={handleClass(1)}
          mirrored="true"
          screenshotFormat="image/jpeg"
        />

        <video
          className={handleClass(2)}
          id="preview"
          autoPlay
          muted
          loop
        ></video>
        {!showButton && !showButtonReset && (
          <div className="timer">
            <span className="d-inline-block">S</span>
            <CountdownTimer
              className="text-center mt-5 d-inline"
              count={recordingTimeMS / 1000}
              hideDay
              hideHours
              backgroundColor={"inherit"}
              color={"inherit"}
            />{" "}
          </div>
        )}
        <div className="button-recorde">
          {showButton && (
            <button onClick={handleStart} className="btn-video-recorder">
              ضبط ویدیو
            </button>
          )}
          {showButtonReset && (
            <button onClick={handleResetVideo} className="btn-video-recorder">
              ضبط دوباره فیلم
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
