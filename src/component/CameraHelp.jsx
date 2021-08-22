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
  };

  const source = {
    1: [
      "https://dashboard.itsaazdev.ir/media/logos/bourse-Recovered.jpg",
      "https://dashboard.itsaazdev.ir/media/logos/brokerage.jpg",
    ],
    2: [
      "https://dashboard.itsaazdev.ir/media/images/shatel-sim.png",
      "https://dashboard.itsaazdev.ir/media/logos/vezarat-oloum.jpg",
    ],
    3: [
      "https://dashboard.itsaazdev.ir/media/logos/moavenat-elmi.jpg",
      "https://dashboard.itsaazdev.ir/media/logos/msy.jpg",
    ],
    4: [
      "https://dashboard.itsaazdev.ir/media/logos/avarez.jpg",
      "https://dashboard.itsaazdev.ir/media/logos/simcard.jpg",
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
            title="بعدی"
            className={arrowClass}
            onClick={previousImage}
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
            className={arrowClass}
            onClick={nextImage}
            style={styles.arrowBtn}
            title="قبلی"
          >
            {" "}
            &#10097;{" "}
          </button>
        </div>
        <button className={btnClose} onClick={() => dialog.close()}>
          {btnCloseText || "تایید"}
        </button>
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
