import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDsG3R_YM2KAwswtTjf4pOUD2WkR5_n_FU",
    authDomain: "diffusionweb-3ec9f.firebaseapp.com",
    databaseURL: "https://diffusionweb-3ec9f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "diffusionweb-3ec9f",
    storageBucket: "diffusionweb-3ec9f.appspot.com",
    messagingSenderId: "897491671708",
    appId: "1:897491671708:web:68698a0fcc1407a7b5eb59"
  };
  
  
  export const app = getApps().length === 0 ? initializeApp(firebaseConfig, 'DiffusionWeb') : getApp('DiffusionWeb');
  export const db = getDatabase(app);
  export const storage = getStorage(app);