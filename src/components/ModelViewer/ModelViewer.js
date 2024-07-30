import React, { useRef, useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import QRCode from "qrcode.react";
// import Help from "./Help";
import { configGlobal } from "../../config";

const ModelViewer = ({ item }) => {
  const [ARSupported, setARSupported] = useState(false);
  const [bgColor, setBgColor] = useState(
    configGlobal.control.options.defaultBackgroundColor
  );
  const [brightness, setBrightness] = useState(
    configGlobal.control.options.defaultBrightness
  );
  const [shadowIntensity, setShadowIntensity] = useState(
    configGlobal.control.options.defaultShadowIntensity
  );
  const [zoom, setZoom] = useState(configGlobal.control.options.defaultZoom);
  const [loading, setLoading] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(false);

  let modelViewerStyle = {
    backgroundColor: bgColor,
    overflowX: "hidden",
    posterColor: "#eee",
    width: "100%",
    height: ARSupported ? "calc(100vh - 185px)" : "calc(100vh - 360px)",
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
    if (modelViewer) {
      modelViewer.addEventListener("load", () => setLoading(false));
      modelViewer.addEventListener("preload", () => setLoading(true));
    }
  }, []);
  const ListControls = (
    <>
      {configGlobal.control.options.showBackgroundColor && (
        <label>
          Background Color
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      )}
      {configGlobal.control.options.showBrightness && (
        <label>
          Brightness
          <input
            type="range"
            min={configGlobal.control.options.minBrightness}
            max={configGlobal.control.options.maxBrightness}
            step={configGlobal.control.options.stepBrightness}
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        </label>
      )}
      {configGlobal.control.options.showShadowIntensity && (
        <label>
          Shadow Intensity
          <input
            type="range"
            min={configGlobal.control.options.minShadowIntensity}
            max={configGlobal.control.options.maxShadowIntensity}
            step={configGlobal.control.options.stepShadowIntensity}
            value={shadowIntensity}
            onChange={(e) => setShadowIntensity(e.target.value)}
          />
        </label>
      )}
      {configGlobal.control.options.showZoom && (
        <label>
          Zoom
          <input
            type="range"
            min={configGlobal.control.options.minZoom}
            max={configGlobal.control.options.maxZoom}
            step={configGlobal.control.options.stepZoom}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
        </label>
      )}
    </>
  );
  const Control = ARSupported ? (
    <>
      <button
        className="toggle-controls-btn"
        onClick={() => setControlsVisible(!controlsVisible)}
      >
        {controlsVisible ? "Hide Controls" : "Show Controls"}
      </button>

      <div className={`controls ${controlsVisible ? "visible" : "hidden"}`}>
        {ListControls}
      </div>
    </>
  ) : (
    <div style={{
      textAlign: '-webkit-center'
    }}>
      <div className={`controls`}>{ListControls}</div>
    </div>
  );

  return (
    <div className="model-view">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner">Loading...</div>
        </div>
      )}
      <model-viewer
        key={item.id}
        ref={model}
        style={modelViewerStyle}
        src={item.modelSrc}
        ios-src={item.iOSSrc}
        alt="A 3D model"
        {...(ARSupported && item.showAR && { ar: true })}
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        disable-pan
        auto-rotate
        shadow-intensity={shadowIntensity}
        environment-image="neutral"
        exposure="1"
        shadow-softness="1"
        ar-scale={configGlobal.modelViewer.arScale}
        scale={`${zoom} ${zoom} ${zoom}`}
        interaction-prompt="none"
        onLoad={() => setLoading(false)}
        onPreload={() => setLoading(true)}
        // xr-environment
      >
        <directional-light
          slot="lighting"
          intensity="1"
          shadow-bias="-0.001"
        ></directional-light>

        {/* {ARSupported && item.showAR && (
          <button slot="ar-button" className="arbutton">
          </button>
        )} */}
        {/* {display ? (
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
        )} */}
      </model-viewer>
      {configGlobal.control.show && Control}
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

          {item.showDetails && (
            <div className="product-details">
              <div>
                <div className="pname">{item.name}</div>
                <div className="rating-sec">
                  <div>Rating</div>
                  <div>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} className="star">
                        {index < item.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <div>Rs. {item.price}</div>
                {!ARSupported && (
                  <h5>Scan the QR code for AR View on mobile</h5>
                )}
              </div>
            </div>
          )}
        </div>
      </LazyLoad>
    </div>
  );
};

export default ModelViewer;
