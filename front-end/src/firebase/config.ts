import * as firebase from "firebase";

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
});

export interface UserData {
  userId: string;
  ducks: string[];
  concentration: ConcentrationSettings;
  finance: FinanceSettings;
  amountSpent: number;
  weekNumber: number;
}

export interface FinanceSettings {
  total: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
  weekly: number;
}

export interface ConcentrationSettings {
  work: number;
  break: number;
}
