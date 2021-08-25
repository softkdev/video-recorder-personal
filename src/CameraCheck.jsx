import React, { useState } from "react";
import { isMacOs, osName } from "react-device-detect";

export const CameraCheck = () => {
  const [stateType, setStateType] = useState(false);
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
          console.log("convert true all media", navigator.mediaDevices);
        }
        navigator.getUserMedia(
          { audio: true, video: true },
          (stream) => {
            console.log("strem existance", stateType);
            if (stateType) {
              setStateType(false);
              window.location.reload();
            }
            document.querySelector("video").src =
              window.URL.createObjectURL(stream);
            var mediaStreamTrack = stream.getVideoTracks()[0];

            if (typeof mediaStreamTrack != "undefined") {
              console.log("mediaStreamTracker", mediaStreamTrack);
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
            console.log("error userMedia", e.name);
            switch (e.name) {
              case "NotFoundError":
                return "دوربین دستگاه شما پیدا نشد";
                break;
              case "DevicesNotFoundError":
                return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
                break;
              case "SourceUnavailableError":
                return "دوربین شما مشغول است";
                break;
              case "PermissionDeniedError":
                return "لطفا به مرورگر خود دسترسی دوربین را بدهید!";
                break;
              case "SecurityError":
                return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
                break;
              default:
                return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
            }
          }
        );
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
