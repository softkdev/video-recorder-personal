import React, { Component } from "react";
import { Canvas, useFrame, useThree, useUpdate } from "react-three-fiber";
import "./customStyle.css";
// import main script and neural network model from Jeeliz FaceFilter NPM package
import { JEELIZFACEFILTER, NN_4EXPR } from "facefilter";
import JEELIZFACEFILTERGEN from "facefilter/dist/jeelizFaceFilter.module.js";
import { JeelizCanvas2DHelper } from "./JeelizCanvas2DHelper.jsx";
// import THREE.js helper, useful to compute pose
// The helper is not minified, feel free to customize it (and submit pull requests bro):
import { JeelizThreeFiberHelper } from "../contrib/faceFilter/JeelizThreeFiberHelper.jsx";
import person from "./../../../../assets/images/new.png";
import bibSound from "./../../../../assets/video/bib.mp3";

const _maxFacesDetected = 1; // max number of detected faces
const _faceFollowers = new Array(_maxFacesDetected);
let _timerResize = null;
let rotationY = 0;
// This mesh follows the face. put stuffs in it.
// Its position and orientation is controlled by Jeeliz THREE.js helper
const FaceFollower = (props) => {
  // This reference will give us direct access to the mesh
  const objRef = useUpdate((threeObject3D) => {
    _faceFollowers[props.faceIndex] = threeObject3D;
  });
  // if (document.getElementById("textInfo")) {
  const textInfo = document.getElementById("textInfo");
  // console.log(textInfo.innerText);
  // }
  const detect = (bol) => {
    if (textInfo.innerText !== "عملیات با موفقیت تمام شد!") {
      if (!bol) {
        textInfo.innerHTML = `<span className="text-danger">صورت شما شناسایی نشد!</span>`;
      } else if (
        textInfo.innerText !==
          "لطفا صورت خود را به آرامی به سمت چپ بچرخانید!" &&
        document.getElementById("myBar").parentNode.childNodes.length === 1
      ) {
        textInfo.innerHTML = `<span className="text-warning">لطفا صورت خود را به آرامی به سمت راست بچرخانید!</span>`;
      } else if (
        textInfo.innerText !==
          "لطفا صورت خود را به آرامی به سمت راست بچرخانید!" &&
        document.getElementById("myBar").parentNode.childNodes.length === 1
      ) {
        textInfo.innerHTML = `<span className="text-warning">لطفا صورت خود را به آرامی به سمت چپ بچرخانید!</span>`;
      }
    }
  };

  const finish = (elem, side) => {
    const closeAudio = new Audio(bibSound);
    const parent = elem.parentNode;
    if (parent.childNodes.length === 1) {
      if (side === "right") {
        if (
          document.getElementById("myBar").parentNode.childNodes.length === 1
        ) {
          textInfo.innerHTML = `<span className="text-warning">لطفا صورت خود را به آرامی به سمت چپ بچرخانید!</span>`;
        }
      } else if (
        document.getElementById("myb").parentNode.childNodes.length === 1
      ) {
        console.log("left Detect!");
        textInfo.innerHTML = `<span className="text-warning">لطفا صورت خود را به آرامی به سمت راست بچرخانید!</span>`;
      } else {
        textInfo.innerHTML = `<span className="text-success">عملیات با موفقیت تمام شد!</span>`;
      }
      const para = document.createElement("div");
      para.classList.add("width-progress");
      const note = document.createTextNode("✔️");
      closeAudio.play();
      para.appendChild(note);
      parent.appendChild(para);
    } else if (
      textInfo.innerText ===
        "لطفا صورت خود را به آرامی به سمت راست بچرخانید!" &&
      document.getElementById("myBar").parentNode.childNodes.length > 1
    ) {
      textInfo.innerHTML = `<span className="text-success">عملیات با موفقیت تمام شد!</span>`;
    }
  };

  if (objRef.current) {
    const va = objRef.current;
    if (va.visible) {
      detect(true);
      rotationY = objRef.current.rotation.y;
      if (rotationY < 0) {
        const elem = document.getElementById("myb");
        let width = rotationY.toFixed(2);
        if (width <= -0.7) {
          finish(elem, "right");
        } else {
          let newW = (width * -100).toFixed(0);
          elem.style.width = newW + "%";
          elem.innerHTML = newW + "%";
        }
      } else if (rotationY > 0) {
        const elem = document.getElementById("myBar");
        let width = rotationY.toFixed(2);
        if (width >= 0.7) {
          finish(elem, "left");
        } else {
          let newW = (width * 100).toFixed(0);
          elem.style.width = newW + "%";
          elem.innerHTML = newW + "%";
        }
      }
    } else {
      detect(false);
    }
  }
  return <object3D ref={objRef}></object3D>;
};

// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
let _threeFiber = null;
const DirtyHook = (props) => {
  _threeFiber = useThree();
  useFrame(
    JeelizThreeFiberHelper.update_camera.bind(
      null,
      props.sizing,
      _threeFiber.camera
    )
  );
  return null;
};

const compute_sizing = () => {
  // compute  size of the canvas:
  const height = 300;
  const wWidth = window.innerWidth;
  const width = Math.min(wWidth, height);

  // compute position of the canvas:
  const top = 0;
  const left = (wWidth - width) / 2;
  return { width, height, top, left };
};

class AppCanvas extends Component {
  constructor(props) {
    super(props);

    // init state:
    const expressions = [];
    for (let i = 0; i < _maxFacesDetected; ++i) {
      expressions.push({
        mouthOpen: 0,
        mouthSmile: 0,
        eyebrowFrown: 0,
        eyebrowRaised: 0,
      });
    }
    this.state = {
      sizing: compute_sizing(),
      expressions,
    };

    // handle resizing / orientation change:
    this.handle_resize = this.handle_resize.bind(this);
    this.do_resize = this.do_resize.bind(this);
    window.addEventListener("resize", this.handle_resize);
    window.addEventListener("orientationchange", this.handle_resize);

    // bind this:
    this.callbackReady = this.callbackReady.bind(this);
    this.callbackTrack = this.callbackTrack.bind(this);
  }
  handle_resize() {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize);
    }
    _timerResize = setTimeout(this.do_resize, 200);
  }

  do_resize() {
    _timerResize = null;
    const newSizing = compute_sizing();
    this.setState({ sizing: newSizing }, () => {
      if (_timerResize) return;
      JEELIZFACEFILTER.resize();
    });
  }

  callbackReady(errCode, spec) {
    if (errCode) {
      console.log("AN ERROR HAPPENS. ERR =", errCode);
      return;
    }

    // console.log("INFO: JEELIZFACEFILTER IS READY");
    // there is only 1 face to track, so 1 face follower:
    JeelizThreeFiberHelper.init(spec, _faceFollowers, this.callbackDetect);
  }

  callbackTrack(detectStatesArg) {
    // if 1 face detection, wrap in an array:
    const detectStates = detectStatesArg.length
      ? detectStatesArg
      : [detectStatesArg];

    // update video and THREE faceFollowers poses:
    JeelizThreeFiberHelper.update(detectStates, _threeFiber.camera);

    // render the video texture on the faceFilter canvas:
    JEELIZFACEFILTER.render_video();

    // get expressions factors:
    detectStates.forEach((detectState, faceIndex) => {
      const expr = detectState.expressions;

      const newState = { ...this.state };
      const newExpressions = this.state.expressions.slice(0);
      newState.expressions = newExpressions;

      newExpressions[faceIndex] = {
        // expressions depends on the neural net model
        mouthOpen: expr[0],
        mouthSmile: expr[1],

        eyebrowFrown: expr[2], // not used here
        eyebrowRaised: expr[3], // not used here
      };

      this.setState(newState);
    });
  }

  componentWillUnmount() {
    JEELIZFACEFILTER.destroy();
  }

  callbackDetect(faceIndex, isDetected) {
    if (isDetected) {
      console.log("DETECTED");
    } else {
      console.log("LOST");
    }
  }

  componentDidMount() {
    // init FACEFILTER:
    const canvas = this.refs.faceFilterCanvas;
    // JEELIZFACEFILTER.init({
    //
    //
    //   maxFacesDetected: 1,
    //
    //   callbackReady: this.callbackReady,
    //   callbackTrack: this.callbackTrack,
    // });
    var CVD;
    const callbackDetect = this.callbackDetect;
    const callbackReady = this.callbackReady;
    const callbackTrack = this.callbackTrack;
    JEELIZFACEFILTERGEN.init({
      // canvasId: "faceTrackCanvas",
      // NNCpath: "https://appstatic.jeeliz.com/faceFilter/", //root of NNC.json file
      canvas,
      NNC: NN_4EXPR,
      followZRot: true,
      //called when video stream is ready and lib initialized :
      callbackReady: function (errCode, spec) {
        // JeelizThreeFiberHelper.init(spec, _faceFollowers, callbackDetect);
        if (errCode) throw errCode;
        callbackReady(errCode, spec);
        CVD = JeelizCanvas2DHelper(spec);
        CVD.ctx.strokeStyle = "yellow";
      }, //end callbackReady()

      //called at each render iteration (drawing loop) :
      callbackTrack: function (detectState) {
        callbackTrack(detectState);
        if (detectState.detected > 0.6) {
          //draw a border around the face
          var faceCoo = CVD.getCoordinates(detectState);
          CVD.ctx.clearRect(0, 0, CVD.canvas.width, CVD.canvas.height);
          CVD.ctx.strokeRect(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);
          CVD.update_canvasTexture();
        }
        CVD.Draw();
      }, //end callbackTrack()
    });
  }

  render() {
    // generate canvases:
    return (
      <div>
        <div className="video-parent">
          {/* Canvas managed by three fiber, for AR: */}
          <Canvas
            className="mirrorX"
            style={{
              position: "absolute",
              top: 0,
              // zIndex: 2,
              ...this.state.sizing,
            }}
            gl={{
              preserveDrawingBuffer: true, // allow image capture
            }}
            updateDefaultCamera={false}
          >
            <DirtyHook sizing={this.state.sizing} />
            <FaceFollower
              faceIndex={0}
              expressions={this.state.expressions[0]}
            />
          </Canvas>

          {/* Canvas managed by FaceFilter, just displaying the video (and used for WebGL computations) */}
          <canvas
            className="mirrorX"
            ref="faceFilterCanvas"
            style={{
              // position: "fixed",
              // zIndex: 1,
              ...this.state.sizing,
            }}
            width={this.state.sizing.width}
            height={this.state.sizing.height}
          />
          <img className="img-cover" src={person} alt="person" />
        </div>
        <div className="backprogress">
          <div id="myProgress">
            <div className="flex">
              <div className="myin" style={{ float: "right" }} id="myBar"></div>
            </div>
            <div className="flex">
              <div className="myin" id="myb"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppCanvas;
