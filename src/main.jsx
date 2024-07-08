import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
// import * as firebase from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyBAKANetC8kYXM1ieEubVG69D7tR-aF0A4",
//   authDomain: "comfyzvitv02.firebaseapp.com",
//   databaseURL: "https://comfyzvitv02-default-rtdb.firebaseio.com",
//   projectId: "comfyzvitv02",
//   storageBucket: "comfyzvitv02.appspot.com",
//   messagingSenderId: "997160002567",
//   appId: "1:997160002567:web:33308b0bbd4854a095b6a2",
// };

// firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
