import {
  FinanceSettings,
  ConcentrationSettings,
  UserData,
  firebaseApp
} from "./config";
import ky from "ky";
const database = firebaseApp.firestore();

export function pairDuck(duckId: string, userId: string): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/pair_duck",
      { body: JSON.stringify({ duckId, userId }) }
    )
    .then(() => true)
    .catch(() => false);
}

export function unpairDuck(duckId: string): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/unpair_duck",
      { body: duckId }
    )
    .then(() => true)
    .catch(() => false);
}

export function updateConcentrationMode(
  settings: ConcentrationSettings,
  userId: string
): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/update_concentration_mode",
      { body: JSON.stringify({ settings, userId }) }
    )
    .then(() => true)
    .catch(() => false);
}

export function updateFinanceMode(
  settings: FinanceSettings,
  userId: string
): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/update_finance_mode",
      { body: JSON.stringify({ settings, userId }) }
    )
    .then(() => true)
    .catch(() => false);
}

export function getCreateUser(userId: string): Promise<UserData | null> {
  const userDoc = database.collection("users").doc(userId);
  return userDoc
    .get()
    .then(value => {
      const data = value.data() as UserData | undefined;
      if (data) {
        return data;
      } else {
        const userSettings: UserData = {
          userId,
          ducks: [],
          concentration: { work: 25, break: 5 },
          finance: {
            total: 0,
            week1: 0,
            week2: 0,
            week3: 0,
            week4: 0,
            weekly: 0
          },
          amountSpent: 0,
          weekNumber: 1
        };
        return userDoc
          .set(userSettings)
          .then(() => userSettings)
          .catch(err => {
            console.log(err);
            return null;
          });
      }
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
