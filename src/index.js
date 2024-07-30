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
      <meta name="keywords" content={metaConfig.keywords} />
      <meta name="robots" content={metaConfig.robots} />
      <meta name="language" content={metaConfig.language} />
      <meta name="revisit-after" content={metaConfig.revisitAfter} />
      <meta name="distribution" content={metaConfig.distribution} />
      <meta name="geo.region" content={metaConfig.region} />
      <meta name="googlebot" content={metaConfig.googlebot} />
      <meta
        http-equiv="content-language"
        content={metaConfig.contentLanguage}
      />
      <meta property="og:title" content={metaConfig.ogTitle} />
      <meta property="og:description" content={metaConfig.ogDescription} />
      <meta property="og:image" content={metaConfig.ogImage} />
      <meta property="og:url" content={metaConfig.ogUrl} />
      <meta property="og:type" content={metaConfig.ogType} />
      <meta property="og:site_name" content={metaConfig.ogSiteName} />
      <meta property="og:video" content={metaConfig.ogVideo} />
      <meta property="og:author" content={metaConfig.ogAuthor} />
      <meta property="og:locale" content={metaConfig.ogLocale} />
      <meta property="og:website:author" content={metaConfig.ogWebsiteAuthor} />
      <link rel="canonical" href={metaConfig.canonical} />
    </Helmet>
    <App />
  </>,
  document.getElementById("root")
);
