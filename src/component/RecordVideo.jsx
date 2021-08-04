import React, { useEffect, useState } from "react";
import FaceDetect from "./detectFace/faceDetect.jsx";
import { RecordView } from "./detectFace/RecordeView.jsx";
import { osName } from "react-device-detect";
// import videoHelp from "./../../assets/video/video.mp4";
import { CustomDialog, useDialog } from "react-st-modal";
// import reload from "./../../assets/images/reload.svg";
export const RecordVideo = ({ setVideo, videoHelp, reload, time }) => {
  let timeOut = time || 10000;
  useEffect(() => {
    if (osName === "iOS") {
      CustomDialog(<CustomDialogContentVideo />, {
        title: "شرایط ضبط ویدیو",
        showCloseIcon: false,
        isCanClose: false,
      });
    } else {
      CustomDialog(<CustomDialogContent />, {
        title: "شرایط ضبط ویدیو",
        showCloseIcon: false,
        isCanClose: false,
        className: "modal-video",
      });
    }
  }, []);

  const CustomDialogContent = () => {
    const dialog = useDialog();
    const [showbutton, setshowbutton] = useState(false);

    const load = () => {
      document.getElementById("video").load();
      setshowbutton(false);
    };

    return (
      <div className="text-center">
        <div className="d-flex video-file">
          <video
            src={videoHelp}
            className=""
            id="video"
            autoPlay
            muted
            onEnded={() => setshowbutton(true)}
          ></video>
          {showbutton && (
            <button className="video-reload" onClick={load}>
              <img src={reload} alt="reload" />
            </button>
          )}
        </div>
        <p className="alert-text text-center">
          لطفا مشابه ویدیو نمونه سر خود را از سمت چپ به راست بچرخانید.
        </p>
        <div className="mx-auto w-25">
          <button
            className="button-primery mt-20 mb-30"
            onClick={() => {
              dialog.close();
            }}
            disabled={!showbutton}
          >
            متوجه شدم
          </button>
        </div>
      </div>
    );
  };
  const CustomDialogContentVideo = () => {
    const dialog = useDialog();

    return (
      <div>
        <p className="text-5 font-bold pt-5">
          راهنمای
          <span className="text-error-color"> دوربین</span>
        </p>
        <div className="px-2 text-center text-4">
          <p className="alert-text text-right">
            <ul className="list-item">
              <li className="text-red-600">
                {" "}
                <p>
                  لطفا از مرورگر Safari استفاده نمایید
                  <br />و به مرورگر خود دسترسی دوربین را بدهید
                </p>
              </li>
              <br />
              <div className="pr-6 pt-4">
                <li className="font-14">دسترسی دوربین را چک کنید</li>
                <li className="font-14">
                  در صورت هرگونه مشکل در فرایند احراز با پشتیبانی تماس بگیرید
                  91002190-021
                </li>
              </div>
            </ul>
          </p>
        </div>
        <div className="text-center mb-5 mt-10">
          <button
            className="bg-black p-3 rounded-full text-4 text-white"
            onClick={() => {
              dialog.close();
            }}
          >
            متوجه شدم
          </button>
        </div>
      </div>
    );
  };
  return osName !== "iOS" ? (
    <RecordView setVideo={setVideo} time={timeOut} />
  ) : (
    <FaceDetect video={setVideo} time={timeOut} />
  );
};
