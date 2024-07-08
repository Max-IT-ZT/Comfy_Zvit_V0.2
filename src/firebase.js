import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAKANetC8kYXM1ieEubVG69D7tR-aF0A4",
  authDomain: "comfyzvitv02.firebaseapp.com",
  databaseURL: "https://comfyzvitv02-default-rtdb.firebaseio.com",
  projectId: "comfyzvitv02",
  storageBucket: "comfyzvitv02.appspot.com",
  messagingSenderId: "997160002567",
  appId: "1:997160002567:web:33308b0bbd4854a095b6a2",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child };
