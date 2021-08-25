import React, { useEffect, useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import { isAndroid, isChrome, isFirefox, isIOS } from "react-device-detect";
export const CameraHelp = (props) => {
  const {
    children,
    btnClass,
    modalClass,
    arrowClass,
    imgClass,
    btnClose,
    btnCloseText,
  } = props;

  const [typeBrowser, setTypeBrowser] = useState(0);

  const styles = {
    parent: {
      display: "flex",
      width: "100%",
    },
    arrowBtn: {
      width: "",
    },
    img: {
      flex: 1,
    },
    btn: {
      width: "100%",
      textAlign: "center",
    },
  };

  const source = {
    1: [
      "https://upload.itsaaz.ir/camera/ios01.png",
      "https://upload.itsaaz.ir/camera/ios02.png",
      "https://upload.itsaaz.ir/camera/ios03.png",
    ],
    2: ["https://upload.itsaaz.ir/camera/android.png"],
    3: [
      "https://upload.itsaaz.ir/camera/chrome01.jpg",
      "https://upload.itsaaz.ir/camera/chrome02.jpg",
    ],
    4: [
      "https://upload.itsaaz.ir/camera/firefox01.png",
      "https://upload.itsaaz.ir/camera/firefox02.png",
    ],
  };

  useEffect(() => {
    isIOS
      ? setTypeBrowser(1)
      : isAndroid
      ? setTypeBrowser(2)
      : isChrome
      ? setTypeBrowser(3)
      : isFirefox
      ? setTypeBrowser(4)
      : setTypeBrowser(0);
  }, []);

  const CustomDialogContent = () => {
    const dialog = useDialog();
    const [imgStep, setImgStep] = useState(0);

    const nextImage = () => {
      if (imgStep + 1 < source[typeBrowser].length) {
        setImgStep(imgStep + 1);
      }
    };
    const previousImage = () => {
      if (imgStep > 0) {
        setImgStep(imgStep - 1);
      }
    };

    return (
      <>
        <div style={styles.parent}>
          <button
            type="button"
            className={arrowClass}
            onClick={previousImage}
            title="قبلی"
            style={styles.arrowBtn}
          >
            {" "}
            &#10096;{" "}
          </button>
          <div className={imgClass} style={styles.img}>
            <img src={source[typeBrowser][imgStep]} alt="عکس راهنما" />
          </div>
          <button
            type="button"
            title="بعدی"
            className={arrowClass}
            onClick={nextImage}
            style={styles.arrowBtn}
          >
            {" "}
            &#10097;{" "}
          </button>
        </div>
        <div style={styles.btn}>
          <button className={btnClose} onClick={() => dialog.close()}>
            {btnCloseText || "تایید"}
          </button>
        </div>
      </>
    );
  };

  const handleHelp = () => {
    CustomDialog(<CustomDialogContent />, {
      showCloseIcon: false,
      isCanClose: true,
      className: modalClass,
    });
  };

  return (
    typeBrowser > 0 && (
      <button
        type="button"
        className={btnClass}
        title="راهنما"
        onClick={handleHelp}
      >
        {children || "راهنما"}
      </button>
    )
  );
};
