import React, { useEffect, useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import { isAndroid, isChrome, isFirefox, isIOS } from "react-device-detect";
export const CameraHelp = (props) => {
  const { children, btnClass, modalClass, arrowClass, imgClass, btnClose } =
    props;

  const [typeBrowser, setTypeBrowser] = useState(0);
  const [imgStep, setImgStep] = useState(0);

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

    const nextImage = () => {
      if (imgStep < source[typeBrowser].length) {
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
          <div
            className={arrowClass}
            onClick={previousImage}
            style={styles.arrowBtn}
          >
            {" "}
            &#10097;{" "}
          </div>
          <div className={imgClass} style={styles.img}>
            <img
              loading="lazy"
              src={source[typeBrowser][imgStep]}
              alt="عکس راهنما"
            />
          </div>
          <div
            className={arrowClass}
            onClick={nextImage}
            style={styles.arrowBtn}
          >
            {" "}
            &#10096;{" "}
          </div>
        </div>
        <button className={btnClose} onClick={() => dialog.close()}>
          متوجه شدم
        </button>
      </>
    );
  };

  const handleHelp = () => {
    console.log(typeBrowser);

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
