import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4D8n4HEMXGpT8DWINql6A9DMmw7zM4vc",
  authDomain: "archintel-imagestorage.firebaseapp.com",
  projectId: "archintel-imagestorage",
  storageBucket: "archintel-imagestorage.appspot.com",
  messagingSenderId: "276891578246",
  appId: "1:276891578246:web:fa25fcf9c8bfdc3372c607",
  measurementId: "G-6TY1Q66G6R",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
