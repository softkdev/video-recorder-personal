import React from "react";
import { isMacOs, osName } from "react-device-detect";
import { CustomDialog } from "react-st-modal";
export const CameraCheck = ({ customMessage } = "") => {
  let stateType = false;
  const MessageAlert = (message) => {
    return (
      <div className="body-modal">
        <h5 className="title-modal text-center">خطا در دسترسی دوربین </h5>
        <hr />
        <p className="description-modal">
          جهت احراز هویت رعایت کردن موارد زیر
          <span className="text-error-color">الزامیست</span>
        </p>
        <ul className="modal-list">
          <li className="li-modal text-danger">{message}</li>
          <br />
          <div className="text-bottom">
            <li className="li-modal">دسترسی دوربین را چک کنید</li>
            <li className="li-modal">
              در صورت هرگونه مشکل در فرایند احراز با پشتیبانی تماس بگیرید
              91002190-021
            </li>
          </div>
        </ul>
        <p className="custom-message">{customMessage || ""}</p>
      </div>
    );
  };
  const callMessage = (message) => {
    // setStateType(true);
    stateType = true;
    CustomDialog(MessageAlert(message), {
      showCloseIcon: true,
      isCanClose: true,
      class: "modal-video",
    });
  };

  const check = () => {
    if (osName !== "iOS" && !isMacOs) {
      if (window.location.protocol === "https:") {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
          if (
            "mediaDevices" in navigator &&
            "getUserMedia" in navigator.mediaDevices
          ) {
            navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          }
          navigator.getUserMedia(
            { audio: true, video: true },
            (stream) => {
              if (stateType) {
                // setStateType(false);
                stateType = false;
                window.location.reload();
              }
              document.querySelector("video").src =
                window.URL.createObjectURL(stream);
              var mediaStreamTrack = stream.getVideoTracks()[0];

              if (typeof mediaStreamTrack != "undefined") {
                mediaStreamTrack.onended = function () {
                  callMessage("دوربین شما مشغول است");
                  //for Chrome.
                };
              } else
                callMessage(
                  "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                );
            },
            (e) => {
              switch (e.name) {
                case "NotFoundError":
                  callMessage("دوربین دستگاه شما پیدا نشد");
                  break;
                case "DevicesNotFoundError":
                  callMessage(
                    "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                  );
                  break;
                case "SourceUnavailableError":
                  // openSnackbar(, [3000]);
                  callMessage("دوربین شما مشغول است");
                  break;
                case "PermissionDeniedError":
                  // openSnackbar("لطفا به مرورگر خود دسترسی دوربین را بدهید!", [
                  //   5000,
                  // ]);
                  callMessage("لطفا به مرورگر خود دسترسی دوربین را بدهید!");
                  break;
                case "SecurityError":
                  callMessage(
                    "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                  );
                  break;
                default:
                  callMessage(
                    "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                  );
              }
            }
          );
        } else {
          callMessage(
            <p>
              لطفا دسترسی مرورگر به دوربین بررسی شود!
              <br /> در صورت دسترسی داشتن تایید نمایید
            </p>
          );
        }
      } else {
        callMessage(
          <p>
            شما در حال مشاهده سایت از یک پروتوکل نا امن هستید برخی از دسترسی ها
            برای شما غیر فعال شده است
          </p>
        );
      }
    }
  };
  check();
};
