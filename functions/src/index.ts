import * as functions from "firebase-functions";
import { pairDuck, unpairDuck } from "./pairUnpair";
import { updateConcentrationMode, updateFinanceMode } from "./updateModes";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const pair_duck = pairDuck;
export const unpair_duck = unpairDuck;
export const update_concentration_mode = updateConcentrationMode;
export const update_finance_mode = updateFinanceMode;
