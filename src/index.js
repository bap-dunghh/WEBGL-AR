import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Helmet } from "react-helmet";
import { metaConfig } from "./config";

ReactDOM.render(
  <>
    <Helmet>
      <title>{metaConfig.title}</title>
      <meta name="description" content={metaConfig.description} />
      <link rel="icon" href={metaConfig.favicon} />
    </Helmet>
    <App />
  </>,
  document.getElementById("root")
);
