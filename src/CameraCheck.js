import React from "react";
import { isMacOs, osName } from "react-device-detect";

export const CameraCheck = () => {
    let stateType = false;
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
                        stateType = false;
                        window.location.reload();
                    }
                    document.querySelector("video").src =
                    window.URL.createObjectURL(stream);
                    var mediaStreamTrack = stream.getVideoTracks()[0];

                    if (typeof mediaStreamTrack != "undefined") {
                        mediaStreamTrack.onended = function () {
                        stateType = true;
                        return("دوربین شما مشغول است");
                        //for Chrome.
                    };
                    } else {
                        stateType = true;  
                        return("دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید");
                    }
                },
                (e) => {
                    switch (e.name) {
                    case "NotFoundError":
                        stateType = true;  
                        return("دوربین دستگاه شما پیدا نشد");
                        break;
                    case "DevicesNotFoundError":
                        stateType = true;  
                        return(
                        "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                        );
                        break;
                    case "SourceUnavailableError":
                        stateType = true;
                        return("دوربین شما مشغول است");
                        break;
                    case "PermissionDeniedError":
                        stateType = true;
                        return("لطفا به مرورگر خود دسترسی دوربین را بدهید!");
                        break;
                    case "SecurityError":
                        stateType = true;  
                        return(
                        "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                        );
                        break;
                    default:
                        stateType = true;  
                        return(
                        "دسترسی دوربین در دستگاه شما غیر فعال است. لطفا آن را فعال کنید"
                        );
                    }
                }
            );
        } else {
            stateType = true;
            return("لطفا دسترسی مرورگر به دوربین بررسی شود! در صورت دسترسی داشتن تایید نمایید");
            }
        } else {
            stateType = true;
            return("شما در حال مشاهده سایت از یک پروتوکل نا امن هستید برخی از دسترسی هابرای شما غیر فعال شده است");
        } 
        return true
    }
    return true
    
};