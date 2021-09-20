import React, { useState } from "react";
import { isMacOs, osName } from "react-device-detect";

export const CameraCheck = () => {
  const [returnMessage, setReturnMessage] = useState("");
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
            // let streamVideo = window.URL.createObjectURL(stream);

            // document.querySelector("video") &&
            //   (document.querySelector("video").src = streamVideo);

            var mediaStreamTrack = stream.getVideoTracks()[0];

            if (typeof mediaStreamTrack != "undefined") {
              mediaStreamTrack.onended = function () {
                return "دوربین شما مشغول است";
                //for Chrome.
              };
            } else {
              return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
            }
            return true;
          },
          (e) => {
            switch (e.name) {
              case "NotFoundError":
                setReturnMessage("دوربین دستگاه شما پیدا نشد");
                break;
              case "DevicesNotFoundError":
                setReturnMessage(
                  "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                );
                break;
              case "SourceUnavailableError":
                setReturnMessage("دوربین شما مشغول است");
                break;
              case "PermissionDeniedError":
                setReturnMessage("لطفا به مرورگر خود دسترسی دوربین را بدهید!");
                break;
              case "SecurityError":
                setReturnMessage(
                  "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                );
                break;
              default:
                setReturnMessage(
                  "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                );
                break;
            }
          }
        );
        return returnMessage || true;
      } else {
        return "لطفا دسترسی مرورگر به دوربین بررسی شود! در صورت دسترسی داشتن تایید نمایید";
      }
    } else {
      return "شما در حال مشاهده سایت از یک پروتوکل نا امن هستید برخی از دسترسی هابرای شما غیر فعال شده است";
    }
  } else {
    return true;
  }
};
