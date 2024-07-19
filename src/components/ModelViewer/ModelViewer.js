import React, { useRef, useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import QRCode from "qrcode.react";
import Help from "./Help";
const ModelViewer = ({ item }) => {
  const [display, setDisplay] = useState(false);
  const [ARSupported, setARSupported] = useState(false);

  let modelViewer1 = {
    backgroundColor: " #ecf0f3",
    overflowX: "hidden",
    posterColor: "#eee",
    width: "100%",
    height: ARSupported ? "calc(100vh - 350px)" : "calc(100vh - 380px)",
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
      >
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
