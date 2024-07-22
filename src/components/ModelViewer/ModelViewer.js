// import React, { useRef, useState, useEffect } from "react";
// import LazyLoad from "react-lazyload";
// import QRCode from "qrcode.react";
// import Help from "./Help";

// const ModelViewer = ({ item }) => {
//   const [display, setDisplay] = useState(false);
//   const [ARSupported, setARSupported] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   let modelViewer1 = {
//     backgroundColor: " #ecf0f3",
//     overflowX: "hidden",
//     posterColor: "#eee",
//     width: "100%",
//     height: ARSupported ? "calc(100vh - 350px)" : "calc(100vh - 380px)",
//   };

//   const model = useRef();

//   useEffect(() => {
//     const userAgent = navigator.userAgent.toLowerCase();
//     if (
//       userAgent.match(/iphone/i) ||
//       userAgent.match(/webos/i) ||
//       userAgent.match(/android/i) ||
//       userAgent.match(/ipad/i) ||
//       userAgent.match(/ipod/i) ||
//       userAgent.match(/blackberry/i) ||
//       userAgent.match(/windows phone/i)
//     ) {
//       setARSupported(true);
//       setIsMobile(true);
//     }
//   }, []);

//   useEffect(() => {
//     const modelViewer = model.current;
//     modelViewer && modelViewer.addEventListener("load", () => {});
//   }, []);

//   const startRecording = async () => {
//     let stream;
//     if (isMobile) {
//       stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     } else {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     }
    
//     mediaRecorderRef.current = new MediaRecorder(stream);
//     chunksRef.current = [];

//     mediaRecorderRef.current.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         chunksRef.current.push(event.data);
//       }
//     };

//     mediaRecorderRef.current.onstop = () => {
//       const blob = new Blob(chunksRef.current, { type: 'video/webm' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'recording.webm';
//       a.click();
//     };

//     mediaRecorderRef.current.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setIsRecording(false);
//   };

//   return (
//     <div className="model-view">
//       <model-viewer
//         key={item.id}
//         ref={model}
//         style={modelViewer1}
//         src={item.modelSrc}
//         ios-src={item.iOSSrc}
//         alt="A 3D model"
//         ar
//         ar-modes="webxr scene-viewer quick-look"
//         camera-controls
//         auto-rotate
//       >
//         {ARSupported && (
//           <button slot="ar-button" className="arbutton">
//             View in your space
//           </button>
//         )}
//         {display ? (
//           <>
//             <button
//               className={document.fullscreenElement ? "close fz" : "close"}
//               onClick={() => setDisplay(false)}
//             >
//               &#10006;
//             </button>
//             <Help />
//           </>
//         ) : (
//           <>
//             <button className="help-btn" onClick={() => setDisplay(true)}>
//               ?<span>Help</span>
//             </button>
//           </>
//         )}
//         <button onClick={isRecording ? stopRecording : startRecording} className="record-btn">
//           {isRecording ? 'Stop Recording' : 'Record Screen'}
//         </button>
//       </model-viewer>

//       <LazyLoad>
//         <div className="qr-sec">
//           {!ARSupported && (
//             <QRCode
//               id={item.name}
//               value={window.location.href}
//               size={110}
//               bgColor="#ffffff"
//               fgColor="#000000"
//               level="H"
//               includeMargin
//             />
//           )}

//           <div className="product-details">
//             <div>
//               <div className="pname">{item.name}</div>
//               <div className="rating-sec">
//                 <div>Rating</div>
//                 <div>
//                   <span className="star">&#9733;</span>
//                   <span className="star">&#9733;</span>
//                   <span className="star">&#9733;</span>
//                   <span>&#9733;</span>
//                   <span>&#9733;</span>
//                 </div>
//               </div>
//               <div>Rs. 1000</div>
//               {!ARSupported && <h5>Scan the QR code for AR View on mobile</h5>}
//             </div>
//           </div>
//         </div>
//       </LazyLoad>
//     </div>
//   );
// };

// export default ModelViewer;


import React, { useRef, useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import QRCode from "qrcode.react";
import Help from "./Help";

const ModelViewer = ({ item }) => {
  const [display, setDisplay] = useState(false);
  const [ARSupported, setARSupported] = useState(false);
  const [bgColor, setBgColor] = useState("#ecf0f3");
  const [brightness, setBrightness] = useState(1);
  const [shadowIntensity, setShadowIntensity] = useState(1);

  let modelViewer1 = {
    backgroundColor: bgColor,
    overflowX: "hidden",
    posterColor: "#eee",
    width: "100%",
    height: ARSupported ? "calc(100vh - 390px)" : "calc(100vh - 430px)",
    filter: `brightness(${brightness})`,
  };

  // Accessing product for full screen start
  const model = useRef();

  useEffect(() => {
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      setARSupported(true);
    }
  }, []);

  useEffect(() => {
    // set up event listeners
    const modelViewer = model.current;
    modelViewer && modelViewer.addEventListener("load", () => {});
  }, []);

  return (
    <div className="model-view">
      <model-viewer
        key={item.id}
        ref={model}
        style={modelViewer1}
        src={item.modelSrc}
        ios-src={item.iOSSrc}
        alt="A 3D model"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity={shadowIntensity}
        environment-image="neutral"
        exposure="1"
        shadow-softness="1"
      >
        <directional-light
          slot="lighting"
          intensity="1"
          shadow-bias="-0.001"
        ></directional-light>

        {ARSupported && (
          <button slot="ar-button" className="arbutton">
            View in your space
          </button>
        )}
        {display ? (
          <>
            <button
              className={document.fullscreenElement ? "close fz" : "close"}
              onClick={() => setDisplay(false)}
            >
              &#10006;
            </button>
            <Help />
          </>
        ) : (
          <>
            <button className="help-btn" onClick={() => setDisplay(true)}>
              ?<span>Help</span>
            </button>
          </>
        )}
      </model-viewer>

      <div className="controls">
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
        <label>
          Brightness:
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        </label>
        <label>
          Shadow Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={shadowIntensity}
            onChange={(e) => setShadowIntensity(e.target.value)}
          />
        </label>
      </div>

      <LazyLoad>
        <div className="qr-sec">
          {!ARSupported && (
            <QRCode
              id={item.name}
              value={window.location.href}
              size={110}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin
            />
          )}

          <div className="product-details">
            <div>
              <div className="pname">{item.name}</div>
              <div className="rating-sec">
                <div>Rating</div>
                <div>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </div>
              </div>
              <div>Rs. 1000</div>
              {!ARSupported && <h5>Scan the QR code for AR View on mobile</h5>}
            </div>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default ModelViewer;
