import React, { useState } from "react";
import { isMacOs, osName } from "react-device-detect";

export const CameraCheck = () => {
  const [stateType, setStateType] = useState(false);
  if (osName !== "iOS" && !isMacOs) {
    console.log("1 ");
    if (window.location.protocol === "https:") {
      console.log("2 ");
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      if (navigator.getUserMedia) {
        console.log("3 ");
        if (
          "mediaDevices" in navigator &&
          "getUserMedia" in navigator.mediaDevices
        ) {
          console.log("4 ");
          navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        }
        console.log("5 ");
        navigator.getUserMedia(
          { audio: true, video: true },
          (stream) => {
            console.log("6 ");
            console.log("strem existance", stateType);
            if (stateType) {
              console.log("7 ");
              setStateType(false);
              window.location.reload();
            }
            console.log("8 ");
            document.querySelector("video").src =
              window.URL.createObjectURL(stream);
            var mediaStreamTrack = stream.getVideoTracks()[0];

            if (typeof mediaStreamTrack != "undefined") {
              console.log("9 ");
              console.log("mediaStreamTracker", mediaStreamTrack);
              mediaStreamTrack.onended = function () {
                return "دوربین شما مشغول است";
                //for Chrome.
              };
            } else {
              console.log("10");
              return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
            }
            console.log("11");
            return true;
          },
          (e) => {
            console.log("12");
            console.log("error userMedia", e.name);
            switch (e.name) {
              case "NotFoundError":
                return "دوربین دستگاه شما پیدا نشد";
              case "DevicesNotFoundError":
                return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
              case "SourceUnavailableError":
                return "دوربین شما مشغول است";
              case "PermissionDeniedError":
                return "لطفا به مرورگر خود دسترسی دوربین را بدهید!";
              case "SecurityError":
                return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
              default:
                return "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید";
            }
          }
        );
      } else {
        console.log("13");
        return "لطفا دسترسی مرورگر به دوربین بررسی شود! در صورت دسترسی داشتن تایید نمایید";
      }
    } else {
      console.log("14");
      return "شما در حال مشاهده سایت از یک پروتوکل نا امن هستید برخی از دسترسی هابرای شما غیر فعال شده است";
    }
  } else {
    console.log("15");
    return true;
  }
  console.log("16");
};
