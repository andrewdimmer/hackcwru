import * as functions from "firebase-functions";
import { pairDuck, unpairDuck, unpairAllDucks } from "./pairUnpair";
import {
  updateConcentrationMode,
  updateFinanceMode,
  duckQuack
} from "./updateModes";
import {
  getCreateUser,
  makePayment,
  nextWeek,
  resetUser
} from "./userManagment";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const pair_duck = pairDuck;
export const unpair_duck = unpairDuck;
export const update_concentration_mode = updateConcentrationMode;
export const update_finance_mode = updateFinanceMode;
export const get_create_user = getCreateUser;
export const make_payment = makePayment;
export const next_week = nextWeek;
export const quack = duckQuack;
export const reset_user = resetUser;
export const unpair_all_ducks = unpairAllDucks;
