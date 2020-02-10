import { UserData, firebaseApp } from "./config";
import { unpairDuck } from "./user";
import ky from "ky";
const database = firebaseApp.firestore();

export function makePayment(amount: number, userId: string): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/make_payment",
      { body: JSON.stringify({ amount, userId }) }
    )
    .then(() => true)
    .catch(() => false);
}

export function nextWeek(userId: string): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/next_week",
      { body: userId }
    )
    .then(() => true)
    .catch(() => false);
}

export function quack(duckId: string): Promise<boolean> {
  return ky
    .post("https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/quack", {
      body: duckId
    })
    .then(() => true)
    .catch(() => false);
}

export function resetUser(userId: string): Promise<boolean> {
  return ky
    .post(
      "https://us-central1-hackcwru-2020-gcp.cloudfunctions.net/reset_user",
      {
        body: userId
      }
    )
    .then(() => true)
    .catch(() => false);
}

export function unpairAllDucks(): Promise<boolean> {
  const duckDoc = database.collection("ducks").doc("DUCKS");
  return duckDoc
    .get()
    .then(value => {
      const data = value.data();
      if (data) {
        const ducks = data.ducks;
        const promises = [];
        for (const duck in ducks) {
          promises.push(unpairDuck(duck));
        }
        const finalPromise = Promise.all(promises);
        return finalPromise
          .then(values => {
            for (const bool in values) {
              if (!bool) {
                return false;
              }
            }
            return true;
          })
          .catch(() => false);
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}
