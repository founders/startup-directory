import '../styles/globals.css';
import React from "react";
import ReactDOM from "react-dom";
import Form from "./form";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
